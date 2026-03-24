import { type PendingFnParams, pendingFn } from '../async';

// ============================================================================
// Errors
// ============================================================================

export class MountRemoteError extends Error {
  constructor(
    message: string,
    public readonly prev?: unknown,
  ) {
    super(message);
    this.name = 'MountRemoteError';
  }
}

// ============================================================================
// Types
// ============================================================================

export type MountRemoteResult<
  Result extends Record<string, unknown> = Record<string, unknown>,
> = {
  type: string;
  scope: string;
} & Result;

/**
 * Handler 上下文，继承 PendingFnParams
 */
export type MountHandlerContext<
  Options extends Record<string, unknown> = Record<string, unknown>,
> = PendingFnParams & {
  type: string;
} & Options;

/**
 * DOM 类型 handler 的通用选项
 */
export type MountDomOptions = {
  url: string;
  attrs?: Record<string, string>;
  onLoad?: (el: HTMLElement, res: MountRemoteResult<MountDomResult>) => void | Promise<void>;
  onError?: (err: unknown, ctx: MountHandlerContext<MountDomOptions>, opts: MountDomOptions) => void;
};

/**
 * DOM handler 的扩展返回字段（不含 MountRemoteResult 的基础字段）
 */
export type MountDomResult = MountDomOptions & {
  id: string;
  el: HTMLElement;
};

/**
 * 类型安全的 handler 函数
 */
export type MountHandlerFn<
  Options extends Record<string, unknown> = Record<string, unknown>,
  Result extends Record<string, unknown> = Record<string, unknown>,
> = (
  ctx: MountHandlerContext<Options>,
  opts: Options,
) => Promise<MountRemoteResult<Result>> | MountRemoteResult<Result>;

/**
 * Handler 类型映射表
 *
 * 通过 interface 声明合并扩展：
 * ```ts
 * declare module '@zenstone/ts-utils/remote' {
 *   interface MountHandlerMap {
 *     wasm: MountHandlerFn<{ url: string; importObject?: WebAssembly.Imports }>;
 *   }
 * }
 * ```
 */
export interface MountHandlerMap {
  js: MountHandlerFn<MountDomOptions, MountDomResult>;
  css: MountHandlerFn<MountDomOptions, MountDomResult>;
  mjs: MountHandlerFn<MountDomOptions, MountDomResult>;
}

// ============================================================================
// Handler Registry
// ============================================================================

// biome-ignore lint/suspicious/noExplicitAny: handler opts/result vary by type
type AnyMountHandler = MountHandlerFn<any, any>;

const handlers = new Map<string, AnyMountHandler>();

/**
 * 注册挂载类型处理器
 *
 * @param type 资源类型标识
 * @param handler 处理函数
 *
 * @example
 * ```ts
 * registerMountHandler('wasm', async (ctx, opts) => {
 *   const response = await fetch(opts.url);
 *   const module = await WebAssembly.instantiateStreaming(response, opts.importObject);
 *   return { type: ctx.type, scope: ctx.scope, url: opts.url, module };
 * });
 * ```
 */
export const registerMountHandler = <K extends keyof MountHandlerMap>(
  type: K,
  handler: MountHandlerMap[K],
) => {
  handlers.set(type as string, handler as AnyMountHandler);
};

/**
 * 创建基于 DOM 元素的挂载处理器
 *
 * 适用于通过 script/link 等标签加载的资源。自动处理：
 * - `getElementById` 短路检查
 * - 创建元素并设置属性
 * - 设置 id（使用 scope）
 * - 监听 load/error 事件
 * - 挂载到 document.head
 *
 * @param tagName 标签名
 * @param setup 元素初始化函数
 *
 * @example
 * ```ts
 * registerMountHandler('img', createDomHandler('img', (el, ctx) => {
 *   el.setAttribute('src', ctx.url);
 * }));
 * ```
 */
export const createDomHandler = (
  tagName: string,
  setup: (
    el: HTMLElement,
    ctx: MountHandlerContext<MountDomOptions>,
  ) => void,
): MountHandlerFn<MountDomOptions, MountDomResult> => {
  const safeOnLoad = async (
    el: HTMLElement,
    res: MountRemoteResult<MountDomResult>,
    opts: MountDomOptions,
  ) => {
    try {
      await opts.onLoad?.(el, res);
    } catch (err) {
      console.warn(`mountRemote ${res.scope} onLoad error:`, err);
    }
  };

  const safeOnError = (
    err: unknown,
    ctx: MountHandlerContext<MountDomOptions>,
    opts: MountDomOptions,
  ) => {
    try {
      opts.onError?.(err, ctx, opts);
    } catch (callbackErr) {
      console.warn(`mountRemote ${ctx.scope} onError error:`, callbackErr);
    }
  };

  return (ctx, opts) => {
    const { type, scope } = ctx;
    const id = scope;

    // 短路：DOM 中已存在该 scope 对应的元素
    const existing = document.getElementById(id);
    if (existing) {
      const res = { type, scope, ...opts, id, el: existing };
      safeOnLoad(existing, res, opts);
      return res;
    }

    return new Promise<MountRemoteResult<MountDomResult>>(
      (resolve, reject) => {
        const el = document.createElement(tagName);
        setup(el, ctx);

        if (opts.attrs) {
          for (const [key, value] of Object.entries(opts.attrs)) {
            if (key) el.setAttribute(key, value);
          }
        }
        el.setAttribute('id', id);

        el.addEventListener('load', async () => {
          const res = { type, scope, ...opts, id, el };
          await safeOnLoad(el, res, opts);
          resolve(res);
        });
        el.addEventListener('error', () => {
          el.remove();
          const error = new MountRemoteError(
            `Mount remote ${scope} failed: ${ctx.url}`,
          );
          safeOnError(error, ctx, opts);
          reject(error);
        });

        try {
          document.head.appendChild(el);
        } catch (err) {
          el.remove();
          const error = new MountRemoteError(
            `Mount remote ${scope} failed: ${ctx.url}`,
            err,
          );
          safeOnError(error, ctx, opts);
          reject(error);
        }
      },
    );
  };
};

// ============================================================================
// Built-in Handlers
// ============================================================================

registerMountHandler(
  'js',
  createDomHandler('script', (el, ctx) => {
    el.setAttribute('type', 'text/javascript');
    el.setAttribute('src', ctx.url);
  }),
);

registerMountHandler(
  'mjs',
  createDomHandler('script', (el, ctx) => {
    el.setAttribute('type', 'module');
    el.setAttribute('src', ctx.url);
  }),
);

registerMountHandler(
  'css',
  createDomHandler('link', (el, ctx) => {
    el.setAttribute('rel', 'stylesheet');
    el.setAttribute('href', ctx.url);
  }),
);

// ============================================================================
// Mount / Unmount
// ============================================================================

/**
 * mountRemote 的内部实现，使用 pendingFn 做 inflight 去重
 */
const _mountRemote = pendingFn(
  // biome-ignore lint/suspicious/noExplicitAny: typed facade handles safety
  (scope: string, _opts: any) => scope,
  async (
    params: PendingFnParams,
    _scope: string,
    // biome-ignore lint/suspicious/noExplicitAny: typed facade handles safety
    opts: any,
  ): Promise<MountRemoteResult> => {
    const handler = handlers.get(opts.type);
    if (!handler) {
      throw new MountRemoteError(`Unsupported mount type: ${opts.type}`);
    }

    return handler({ ...params, ...opts }, opts);
  },
);

/**
 * 挂载远程资源
 *
 * 基于 scope 做 inflight 去重：并发调用同 scope 只执行一次，结果共享。
 * Options 类型由 `type` 字段决定，通过 {@link MountHandlerMap} 接口扩展。
 *
 * 内置支持 `js`、`mjs`、`css` 三种类型，其他类型需通过
 * {@link registerMountHandler} 注册处理器。
 *
 * @param scope 去重标识，同时用作 DOM 元素 id（对于 DOM handler）
 * @param options 挂载选项，类型由 `type` 决定
 *
 * @example
 * ```ts
 * await mountRemote('jquery', {
 *   type: 'js',
 *   url: 'https://cdn.example.com/jquery.min.js',
 * });
 * ```
 *
 * @example 并发去重
 * ```ts
 * await Promise.all([
 *   mountRemote('lib', { type: 'js', url }),
 *   mountRemote('lib', { type: 'js', url }),
 * ]);
 * // 只加载一次
 * ```
 */
export function mountRemote<K extends keyof MountHandlerMap>(
  scope: string,
  options: { type: K } & Parameters<MountHandlerMap[K]>[1],
): Promise<MountRemoteResult> {
  return _mountRemote(scope, options);
}

/**
 * 基于 id 移除已挂载的远程资源
 *
 * @param id 元素 ID
 * @param onRemove 移除后回调
 */
export const unmountDomRemote = (id: string, onRemove?: () => void) => {
  const el = document.getElementById(id);
  if (el != null) {
    el.remove();
    onRemove?.();
  }
};
