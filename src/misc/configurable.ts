import { cloneObj } from './cloneObj';

export type Configurable<T extends object> = {
  /**
   * 读取配置值，优先级：用户设置 > 预设值
   */
  get<K extends keyof T>(key: K): T[K];
  /**
   * 设置单个配置值（写入用户空间）
   */
  set<K extends keyof T>(key: K, value: T[K]): void;
  /**
   * 获取合并后的完整配置：{ ...presets, ...users }
   */
  getAll(): T;
  /**
   * 批量设置配置值（写入用户空间）
   */
  setAll(data: Partial<T>): void;
  /**
   * 重置用户设置，回退到预设值
   */
  reset(): void;
};

/**
 * 创建可配置对象
 *
 * 内部维护两层数据：
 * - presets：初始化时传入的预设值（克隆后存储，避免引用污染）
 * - users：用户写入的覆盖值
 *
 * get 时优先返回 users 中的值，users 中无对应 key 则返回 presets 值。
 *
 * @param presets 预设配置对象
 * @returns Configurable 实例
 *
 * @example
 * ```ts
 * const cfg = configurable({ timeout: 3000, retries: 3, debug: false });
 *
 * cfg.get('timeout'); // 3000（来自 presets）
 * cfg.set('timeout', 5000);
 * cfg.get('timeout'); // 5000（来自 users）
 *
 * cfg.getAll(); // { timeout: 5000, retries: 3, debug: false }
 *
 * cfg.reset();
 * cfg.get('timeout'); // 3000（回退到 presets）
 * ```
 */
export const configurable = <T extends object>(presets: T): Configurable<T> => {
  const _presets = cloneObj(presets);
  const users: Partial<T> = {};

  return {
    get: <K extends keyof T>(key: K): T[K] =>
      key in users ? (users[key] as T[K]) : _presets[key],

    set: <K extends keyof T>(key: K, value: T[K]): void => {
      users[key] = value;
    },

    getAll: (): T => ({ ..._presets, ...users }) as T,

    setAll: (data: Partial<T>): void => {
      Object.assign(users, data);
    },

    reset: (): void => {
      for (const key of Object.keys(users) as (keyof T)[]) {
        delete users[key];
      }
    },
  };
};
