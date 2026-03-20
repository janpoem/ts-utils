import { describe, expect, test } from 'bun:test';
import {
  RetryExhaustedError,
  TimeoutError,
  asyncMemoize,
  asyncQueue,
  retry,
  retryWithBackoff,
  timeout,
} from './index';

describe('async/index.ts', () => {
  describe('retry', () => {
    test('should return result on first success', async () => {
      const fn = async () => 'success';
      const result = await retry(fn);
      expect(result).toBe('success');
    });

    test('should retry on failure and succeed', async () => {
      let attempts = 0;
      const fn = async () => {
        attempts++;
        if (attempts < 3) throw new Error('fail');
        return 'success';
      };

      const result = await retry(fn, { attempts: 5, delay: 10 });
      expect(result).toBe('success');
      expect(attempts).toBe(3);
    });

    test('should throw RetryExhaustedError after max attempts', async () => {
      let attempts = 0;
      const fn = async () => {
        attempts++;
        throw new Error('always fails');
      };

      await expect(retry(fn, { attempts: 3, delay: 10 })).rejects.toThrow(
        RetryExhaustedError,
      );
      expect(attempts).toBe(3);
    });

    test('should call onRetry callback', async () => {
      let attempts = 0;
      const callArgs: [unknown, number][] = [];
      const fn = async () => {
        attempts++;
        if (attempts < 3) throw new Error('fail');
        return 'success';
      };

      const onRetry = (err: unknown, attempt: number) => {
        callArgs.push([err, attempt]);
      };
      await retry(fn, { attempts: 5, delay: 10, onRetry });

      expect(callArgs.length).toBe(2);
      expect(callArgs[0][1]).toBe(1);
      expect(callArgs[1][1]).toBe(2);
    });
  });

  describe('retryWithBackoff', () => {
    test('should use exponential backoff', async () => {
      let attempts = 0;
      const fn = async () => {
        attempts++;
        if (attempts < 3) throw new Error('fail');
        return 'success';
      };

      const startTime = Date.now();
      await retryWithBackoff(fn, {
        attempts: 5,
        initialDelay: 100,
        factor: 2,
        maxDelay: 1000,
      });

      const elapsed = Date.now() - startTime;
      expect(elapsed).toBeGreaterThanOrEqual(290);
    });

    test('should cap delay at maxDelay', async () => {
      let attempts = 0;
      const fn = async () => {
        attempts++;
        if (attempts < 3) throw new Error('fail');
        return 'success';
      };

      const delays: number[] = [];
      await retryWithBackoff(fn, {
        attempts: 5,
        initialDelay: 100,
        factor: 10,
        maxDelay: 50,
        onRetry: (_, __, delay) => delays.push(delay),
      });

      for (const delay of delays) {
        expect(delay).toBeLessThanOrEqual(50);
      }
    });
  });

  describe('timeout', () => {
    test('should return result if completed within timeout', async () => {
      const promise = new Promise<string>((resolve) =>
        setTimeout(() => resolve('done'), 10),
      );
      const result = await timeout(promise, 1000);
      expect(result).toBe('done');
    });

    test('should throw TimeoutError if exceeded', async () => {
      const promise = new Promise<string>((resolve) =>
        setTimeout(() => resolve('done'), 100),
      );
      await expect(timeout(promise, 10)).rejects.toThrow(TimeoutError);
    });
  });

  describe('asyncMemoize', () => {
    test('should cache results', async () => {
      let callCount = 0;
      const fn = async (id: string) => {
        callCount++;
        return `result-${id}`;
      };

      const memoized = asyncMemoize<unknown>(
        fn as (...args: unknown[]) => Promise<unknown>,
        { ttl: 1000 },
      );

      const result1 = await memoized('123');
      const result2 = await memoized('123');
      const result3 = await memoized('456');

      expect(result1).toBe('result-123');
      expect(result2).toBe('result-123');
      expect(result3).toBe('result-456');
      expect(callCount).toBe(2);
    });

    test('should expire cache after ttl', async () => {
      let callCount = 0;
      const fn = async (id: string) => {
        callCount++;
        return `result-${id}`;
      };

      const memoized = asyncMemoize<unknown>(
        fn as (...args: unknown[]) => Promise<unknown>,
        { ttl: 50 },
      );

      await memoized('123');
      await Bun.sleep(60);
      await memoized('123');

      expect(callCount).toBe(2);
    });

    test('should support clear and delete', async () => {
      let callCount = 0;
      const fn = async (id: string) => {
        callCount++;
        return `result-${id}`;
      };

      const memoized = asyncMemoize<unknown>(
        fn as (...args: unknown[]) => Promise<unknown>,
      );

      await memoized('123');
      expect(callCount).toBe(1);

      memoized.clear();
      await memoized('123');
      expect(callCount).toBe(2);

      memoized.delete('456');
      await memoized('456');
      expect(callCount).toBe(3);
    });

    test('should respect maxSize', async () => {
      let callCount = 0;
      const fn = async (id: string) => {
        callCount++;
        return `result-${id}`;
      };

      const memoized = asyncMemoize<unknown>(
        fn as (...args: unknown[]) => Promise<unknown>,
        { maxSize: 2 },
      );

      await memoized('1');
      await memoized('2');
      await memoized('3');
      await memoized('1');

      expect(callCount).toBe(4);
    });
  });

  describe('asyncQueue', () => {
    test('should execute tasks serially by default', async () => {
      const results: number[] = [];
      const queue = asyncQueue();

      queue.add(async () => {
        await Bun.sleep(20);
        results.push(1);
        return 1;
      });
      queue.add(async () => {
        results.push(2);
        return 2;
      });
      queue.add(async () => {
        results.push(3);
        return 3;
      });

      await Bun.sleep(50);
      expect(results).toEqual([1, 2, 3]);
    });

    test('should respect concurrency limit', async () => {
      let maxConcurrent = 0;
      let currentConcurrent = 0;

      const queue = asyncQueue<number>({ concurrency: 3 });

      const tasks = [];
      for (let i = 0; i < 5; i++) {
        tasks.push(
          queue.add(async () => {
            currentConcurrent++;
            maxConcurrent = Math.max(maxConcurrent, currentConcurrent);
            await Bun.sleep(30);
            currentConcurrent--;
            return i;
          }),
        );
      }

      await Promise.all(tasks);
      expect(maxConcurrent).toBeLessThanOrEqual(3);
    });

    test('should resolve with result', async () => {
      const queue = asyncQueue();

      const result = await queue.add(async () => 'done');
      expect(result).toBe('done');
    });

    test('should reject on error', async () => {
      const queue = asyncQueue();

      await expect(
        queue.add(async () => {
          throw new Error('fail');
        }),
      ).rejects.toThrow('fail');
    });

    test('should report size and concurrency', async () => {
      const queue = asyncQueue({ concurrency: 1 });

      const p1 = queue.add(async () => Bun.sleep(50));
      expect(queue.size()).toBe(0);
      expect(queue.getConcurrency()).toBe(1);

      const p2 = queue.add(async () => {});
      expect(queue.size()).toBe(1);

      await Promise.all([p1, p2]);
    });
  });
});
