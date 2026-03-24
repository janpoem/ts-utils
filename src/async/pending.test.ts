import { afterEach, describe, expect, test } from 'bun:test';
import { PendingScopeConflictError, pending } from './pending';

afterEach(() => {
  pending.clearRegistry();
});

describe('pending', () => {
  describe('scope registration', () => {
    test('should throw on duplicate static scope', () => {
      pending('dup-scope', async () => 'a');
      expect(() => pending('dup-scope', async () => 'b')).toThrow(
        PendingScopeConflictError,
      );
    });

    test('should allow different static scopes', () => {
      expect(() => {
        pending('scope-a', async () => 'a');
        pending('scope-b', async () => 'b');
      }).not.toThrow();
    });

    test('should not conflict between static and dynamic scopes', () => {
      pending('user', async () => 'static');
      expect(() => {
        pending((id: string) => `user:${id}`, async (id: string) => id);
      }).not.toThrow();
    });

    test('clearRegistry should allow reusing scopes', () => {
      pending('reuse', async () => 'first');
      pending.clearRegistry();
      expect(() => pending('reuse', async () => 'second')).not.toThrow();
    });
  });

  describe('static scope dedup', () => {
    test('should execute fn only once for concurrent calls', async () => {
      let execCount = 0;
      const fn = pending('single-exec', async () => {
        execCount++;
        await Bun.sleep(50);
        return 'result';
      });

      const [a, b, c] = await Promise.all([fn(), fn(), fn()]);

      expect(execCount).toBe(1);
      expect(a).toBe('result');
      expect(b).toBe('result');
      expect(c).toBe('result');
    });

    test('should share the same promise reference', async () => {
      const fn = pending('same-promise', async () => {
        await Bun.sleep(30);
        return { id: 1 };
      });

      const p1 = fn();
      const p2 = fn();
      expect(p1).toBe(p2);
      await Promise.all([p1, p2]);
    });

    test('should start new execution after previous completes', async () => {
      let execCount = 0;
      const fn = pending('new-cycle', async () => {
        execCount++;
        await Bun.sleep(20);
        return execCount;
      });

      const first = await fn();
      expect(first).toBe(1);

      const second = await fn();
      expect(second).toBe(2);
      expect(execCount).toBe(2);
    });

    test('should reject all callers on error', async () => {
      let execCount = 0;
      const fn = pending('reject-all', async () => {
        execCount++;
        await Bun.sleep(30);
        throw new Error('boom');
      });

      const results = await Promise.allSettled([fn(), fn(), fn()]);

      expect(execCount).toBe(1);
      for (const r of results) {
        expect(r.status).toBe('rejected');
        if (r.status === 'rejected') {
          expect(r.reason).toBeInstanceOf(Error);
          expect((r.reason as Error).message).toBe('boom');
        }
      }
    });

    test('should allow new execution after rejection', async () => {
      let execCount = 0;
      const fn = pending('recover-after-reject', async () => {
        execCount++;
        if (execCount === 1) throw new Error('first fail');
        return 'ok';
      });

      await expect(fn()).rejects.toThrow('first fail');
      const result = await fn();
      expect(result).toBe('ok');
      expect(execCount).toBe(2);
    });
  });

  describe('dynamic scope dedup', () => {
    test('should dedup by generated key', async () => {
      let execCount = 0;
      const fn = pending(
        (id: string) => `item:${id}`,
        async (id: string) => {
          execCount++;
          await Bun.sleep(50);
          return `data-${id}`;
        },
      );

      const [a, b] = await Promise.all([fn('1'), fn('1')]);
      expect(execCount).toBe(1);
      expect(a).toBe('data-1');
      expect(b).toBe('data-1');
    });

    test('should execute independently for different keys', async () => {
      let execCount = 0;
      const fn = pending(
        (id: string) => `item:${id}`,
        async (id: string) => {
          execCount++;
          await Bun.sleep(30);
          return `data-${id}`;
        },
      );

      const [a, b] = await Promise.all([fn('1'), fn('2')]);
      expect(execCount).toBe(2);
      expect(a).toBe('data-1');
      expect(b).toBe('data-2');
    });

    test('should allow multiple dynamic scope pending without conflict', () => {
      const fn1 = pending(
        (id: string) => `a:${id}`,
        async (id: string) => id,
      );
      const fn2 = pending(
        (id: string) => `b:${id}`,
        async (id: string) => id,
      );
      expect(typeof fn1).toBe('function');
      expect(typeof fn2).toBe('function');
    });
  });

  describe('sync function support', () => {
    test('should handle sync functions', async () => {
      let execCount = 0;
      const fn = pending('sync-fn', (x: number) => {
        execCount++;
        return x * 2;
      });

      const result = await fn(5);
      expect(result).toBe(10);
      expect(execCount).toBe(1);
    });

    test('should catch sync throws and reject all', async () => {
      let execCount = 0;
      const fn = pending('sync-throw', () => {
        execCount++;
        throw new Error('sync error');
      });

      // 同步抛出需要先触发再等一下让 pending 生效
      const p1 = fn();
      const results = await Promise.allSettled([p1]);

      expect(execCount).toBe(1);
      expect(results[0].status).toBe('rejected');
    });
  });

  describe('preserves function signature', () => {
    test('should preserve parameters and return type', async () => {
      const fn = pending(
        'typed',
        async (a: number, b: string) => ({ a, b }),
      );

      const result = await fn(42, 'hello');
      expect(result).toEqual({ a: 42, b: 'hello' });
    });
  });
});
