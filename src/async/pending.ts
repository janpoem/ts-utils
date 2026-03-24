import type { AnyFn } from './index';

/**
 * 全局 scope 注册表，防止不同 pending 声明使用相同的静态 scope
 */
const scopeRegistry = new Set<string>();

/**
 * Scope 冲突错误
 */
export class PendingScopeConflictError extends Error {
  constructor(public readonly scope: string) {
    super(`Pending scope "${scope}" is already registered`);
    this.name = 'PendingScopeConflictError';
  }
}

/**
 * 基于 scope 的 inflight 去重
 *
 * 同一 scope 下并发调用只执行一次 fn，所有 callers 共享同一个 Promise 结果。
 * 执行完毕后 scope 释放，下一次调用开启新的执行周期。
 *
 * @param scope 静态 scope 字符串，或基于参数动态生成 scope 的函数
 * @param fn 要包装的函数（同步或异步）
 * @returns 包装后的去重函数
 *
 * @example 静态 scope
 * ```ts
 * const fetchConfig = pending('config', () => fetch('/api/config').then(r => r.json()));
 *
 * // 并发调用 3 次，只执行 1 次 fetch
 * const [a, b, c] = await Promise.all([fetchConfig(), fetchConfig(), fetchConfig()]);
 * // a === b === c
 * ```
 *
 * @example 动态 scope
 * ```ts
 * const fetchUser = pending(
 *   (id: string) => `user:${id}`,
 *   (id: string) => fetch(`/api/user/${id}`).then(r => r.json()),
 * );
 *
 * // 相同 id 去重，不同 id 独立执行
 * await Promise.all([fetchUser('1'), fetchUser('1'), fetchUser('2')]);
 * // fetchUser('1') 只执行一次，fetchUser('2') 独立执行一次
 * ```
 */
export const pending = <F extends AnyFn>(
  scope: string | ((...args: Parameters<F>) => string),
  fn: F,
): ((...args: Parameters<F>) => Promise<Awaited<ReturnType<F>>>) => {
  if (typeof scope === 'string') {
    if (scopeRegistry.has(scope)) {
      throw new PendingScopeConflictError(scope);
    }
    scopeRegistry.add(scope);
  }

  const inflight = new Map<string, Promise<Awaited<ReturnType<F>>>>();

  return (...args: Parameters<F>) => {
    const key = typeof scope === 'function' ? scope(...args) : scope;

    const existing = inflight.get(key);
    if (existing) return existing;

    const promise = new Promise<Awaited<ReturnType<F>>>((resolve) => {
      resolve(fn(...args));
    }).finally(() => {
      inflight.delete(key);
    });

    inflight.set(key, promise);
    return promise;
  };
};

/**
 * 清除全局 scope 注册表（用于测试）
 */
pending.clearRegistry = () => {
  scopeRegistry.clear();
};
