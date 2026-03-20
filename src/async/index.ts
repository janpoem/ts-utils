/**
 * 异步工具模块
 */

// ============================================================================
// Errors
// ============================================================================

/**
 * 重试耗尽错误
 *
 * 当异步操作在达到最大重试次数后仍然失败时抛出
 */
export class RetryExhaustedError extends Error {
  /**
   * @param originalError 原始错误
   * @param attempts 尝试次数
   */
  constructor(
    public readonly originalError: unknown,
    public readonly attempts: number,
  ) {
    super(
      `Retry exhausted after ${attempts} attempts: ${formatError(originalError)}`,
    );
    this.name = 'RetryExhaustedError';
  }
}

/**
 * 超时错误
 *
 * 当异步操作超过指定时间仍未完成时抛出
 */
export class TimeoutError extends Error {
  /**
   * @param ms 超时毫秒数
   */
  constructor(public readonly ms: number) {
    super(`Operation timed out after ${ms}ms`);
    this.name = 'TimeoutError';
  }
}

const formatError = (err: unknown): string => {
  if (err == null) return 'Unknown error';
  if (err instanceof Error) return err.message;
  if (typeof err === 'string') return err;
  return String(err);
};

// ============================================================================
// Async Utilities
// ============================================================================

/**
 * 异步函数类型
 */
type AsyncFn<T = unknown> = (...args: unknown[]) => Promise<T>;

/**
 * 重试选项
 */
export type RetryOptions = {
  /** 最大尝试次数，默认 3 */
  attempts?: number;
  /** 重试间隔（毫秒），默认 100 */
  delay?: number;
  /** 重试前的回调，可用于日志记录 */
  onRetry?: (err: unknown, attempt: number) => void;
};

/**
 * 带退避的重试选项
 */
export type RetryWithBackoffOptions = {
  /** 最大尝试次数，默认 3 */
  attempts?: number;
  /** 初始延迟（毫秒），默认 1000 */
  initialDelay?: number;
  /** 退避因子，默认 2 */
  factor?: number;
  /** 最大延迟（毫秒），默认 30000 */
  maxDelay?: number;
  /** 重试前的回调，可用于日志记录 */
  onRetry?: (err: unknown, attempt: number, delay: number) => void;
};

/**
 * 重试异步函数
 *
 * @param fn 异步函数
 * @param options 重试选项
 * @returns 返回原始函数的 Promise 结果
 *
 * @example
 * ```ts
 * const result = await retry(
 *   () => fetch('/api/data').then(r => r.json()),
 *   { attempts: 3, delay: 1000 }
 * );
 * ```
 */
export const retry = <T>(
  fn: AsyncFn<T>,
  options: RetryOptions = {},
): Promise<T> => {
  const { attempts = 3, delay = 100, onRetry } = options;
  return retryWithBackoff(fn, {
    attempts,
    initialDelay: delay,
    factor: 1,
    maxDelay: delay,
    onRetry: (err, attempt) => onRetry?.(err, attempt),
  });
};

/**
 * 带指数退避的重试异步函数
 *
 * @param fn 异步函数
 * @param options 重试选项
 * @returns 返回原始函数的 Promise 结果
 *
 * @example
 * ```ts
 * const result = await retryWithBackoff(
 *   () => fetch('/api/data').then(r => r.json()),
 *   { attempts: 5, initialDelay: 1000, factor: 2, maxDelay: 30000 }
 * );
 * ```
 */
export const retryWithBackoff = <T>(
  fn: AsyncFn<T>,
  options: RetryWithBackoffOptions = {},
): Promise<T> => {
  const {
    attempts = 3,
    initialDelay = 1000,
    factor = 2,
    maxDelay = 30000,
    onRetry,
  } = options;

  const execute = async (attempt: number): Promise<T> => {
    try {
      return await fn();
    } catch (err) {
      if (attempt >= attempts) {
        throw new RetryExhaustedError(err, attempts);
      }

      const delay = Math.min(initialDelay * factor ** (attempt - 1), maxDelay);
      onRetry?.(err, attempt, delay);

      await sleep(delay);
      return execute(attempt + 1);
    }
  };

  return execute(1);
};

/**
 * 带超时的 Promise
 *
 * @param promise 要包装的 Promise
 * @param ms 超时毫秒数
 * @returns 原 Promise 结果或超时错误
 *
 * @example
 * ```ts
 * const result = await timeout(fetch('/api/data'), 5000);
 * ```
 */
export const timeout = <T>(promise: Promise<T>, ms: number): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new TimeoutError(ms)), ms),
    ),
  ]);
};

/**
 * 异步函数缓存选项
 */
export type AsyncMemoizeOptions = {
  /** 缓存生存时间（毫秒），默认不过期 */
  ttl?: number;
  /** 缓存 key 生成器，默认使用第一个参数 */
  keyGenerator?: (...args: unknown[]) => string;
  /** 最大缓存条目数，默认 100 */
  maxSize?: number;
};

/**
 * 异步函数记忆化
 *
 * @param fn 异步函数
 * @param options 缓存选项
 * @returns 记忆化后的函数
 *
 * @example
 * ```ts
 * const fetchUser = asyncMemoize(
 *   (id: string) => fetch(`/api/user/${id}`).then(r => r.json()),
 *   { ttl: 60000 }
 * );
 *
 * // 第一次调用，会执行 fetch
 * const user1 = await fetchUser('123');
 *
 * // 60秒内再次调用，直接返回缓存结果
 * const user2 = await fetchUser('123');
 * ```
 */
export const asyncMemoize = <T>(
  fn: AsyncFn<T>,
  options: AsyncMemoizeOptions = {},
): ((...args: unknown[]) => Promise<T>) & {
  clear: () => void;
  delete: (...args: unknown[]) => boolean;
} => {
  const {
    ttl,
    keyGenerator = (args: unknown[]) => JSON.stringify(args),
    maxSize = 100,
  } = options;

  const cache = new Map<string, { value: T; expiresAt: number }>();

  const memoized = async (...args: unknown[]): Promise<T> => {
    const key = keyGenerator(args);
    const cached = cache.get(key);

    if (cached) {
      if (ttl == null || cached.expiresAt > Date.now()) {
        return cached.value;
      }
      cache.delete(key);
    }

    const value = await fn(...args);
    const expiresAt = ttl != null ? Date.now() + ttl : Number.POSITIVE_INFINITY;

    if (cache.size >= maxSize) {
      const firstKey = cache.keys().next().value;
      if (firstKey) cache.delete(firstKey);
    }

    cache.set(key, { value, expiresAt });
    return value;
  };

  memoized.clear = () => cache.clear();
  memoized.delete = (...args: unknown[]) => cache.delete(keyGenerator(args));

  return memoized;
};

/**
 * 异步队列选项
 */
export type AsyncQueueOptions = {
  /** 最大并发数，默认 1（串行） */
  concurrency?: number;
  /** 队列满时的回调 */
  onQueueFull?: (size: number) => void;
  /** 队列有空位时的回调 */
  onQueueDrain?: () => void;
};

/**
 * 异步任务
 */
type QueuedTask<T> = {
  fn: AsyncFn<T>;
  resolve: (value: T) => void;
  reject: (error: unknown) => void;
};

/**
 * 异步并发控制队列
 *
 * @param options 队列选项
 * @returns 队列控制器
 *
 * @example
 * ```ts
 * const queue = asyncQueue({ concurrency: 3 });
 *
 * // 所有任务会按照最大并发数 3 执行
 * const task1 = queue.add(() => fetch('/api/1').then(r => r.json()));
 * const task2 = queue.add(() => fetch('/api/2').then(r => r.json()));
 * const task3 = queue.add(() => fetch('/api/3').then(r => r.json()));
 * ```
 */
export const asyncQueue = <T = unknown>(options: AsyncQueueOptions = {}) => {
  const { concurrency = 1, onQueueFull, onQueueDrain } = options;

  const queue: QueuedTask<T>[] = [];
  let running = 0;

  const processNext = () => {
    if (running >= concurrency || queue.length === 0) {
      if (running === 0 && queue.length === 0) {
        onQueueDrain?.();
      }
      return;
    }

    running++;
    const task = queue.shift();
    if (!task) return;

    task
      .fn()
      .then(task.resolve)
      .catch(task.reject)
      .finally(() => {
        running--;
        processNext();
      });
  };

  const add = (fn: AsyncFn<T>): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
      if (queue.length >= 1000) {
        onQueueFull?.(queue.length);
      }
      queue.push({ fn, resolve, reject });
      processNext();
    });
  };

  const clear = () => {
    queue.length = 0;
  };

  const size = () => queue.length;

  const getConcurrency = () => running;

  return { add, clear, size, getConcurrency };
};

/**
 * 睡眠指定毫秒数
 */
const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));
