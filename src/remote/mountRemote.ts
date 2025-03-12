export class MountRemoteError extends Error {
  constructor(
    message: string,
    public readonly prev?: unknown,
  ) {
    super(message);
  }
}

export type MountRemoteType = 'js' | 'css' | string;

export type MountRemoteResult<R = unknown> = {
  id: string;
  type: string;
  url: string;
  [ken: string]: unknown;
} & R;

export type MountRemoteHandle<R> = (
  res: MountRemoteResult,
) => Promise<MountRemoteResult<R>> | MountRemoteResult<R>;

export type MountRemoteOptions<R> = {
  /**
   * 远程资源的 URL，必填
   */
  url: string;
  /**
   * 远程资源加载后的 ID，必填
   */
  id: string | (() => string);
  /**
   * 远程资源类型，必填
   */
  type: MountRemoteType | (() => MountRemoteType);
  /**
   * 远程资源加载的标签需要额外写入的标签属性
   */
  attrs?: Record<string, string>;
  /**
   * 自定义的远程资源加载方式，用于实现更多加载机制，诸如 rjs, blob, image 等
   *
   * @param res
   */
  handle?: MountRemoteHandle<R>;
  /**
   * 加载成功时
   *
   * @param res
   */
  onLoad?: (res: MountRemoteResult<R>) => void | Promise<void>;
  /**
   * 加载出错时
   *
   * @param error
   * @param res
   */
  onError?: (
    error: unknown,
    res?: MountRemoteResult<R>,
  ) => void | Promise<void>;
};

/**
 * 挂载远程的资源
 *
 * 内置实现了 `js` 和 `css` 两种资源，主要在当前 html 中加入 `script` 和 `link` 标签实现。
 *
 * 更多的资源加载，可以使用 `handle` 来实现。`handle` 函数可以返回 {@link MountRemoteResult} 的扩展结构以扩充返回的结果
 *
 * ```ts
 * await mountRemote({
 *   url: 'xxx.js',
 *   id: 'xxx_js',
 *   type: 'js',
 *   onLoad: () => {
 *     // 加载成功时执行
 *   }
 * });
 * ```
 *
 * @param opts
 */
export const mountRemote = async <R = unknown>(opts: MountRemoteOptions<R>) => {
  return new Promise<MountRemoteResult<R>>((resolve, reject) => {
    const { url, attrs, onError, onLoad } = opts;
    const id = typeof opts.id === 'function' ? opts.id() : opts.id;
    const type = typeof opts.type === 'function' ? opts.type() : opts.type;

    const mounted = async (handle?: MountRemoteHandle<R>) => {
      let res: MountRemoteResult<R> | undefined;
      if (handle != null) {
        try {
          res = await handle({ id, type, url });
        } catch (err) {
          const error = new MountRemoteError('Custom mount error', err);
          onError?.(error, res);
          throw err;
        }
      } else {
        res = { id, type, url } as MountRemoteResult<R>;
      }

      try {
        await onLoad?.(res);
        return res;
      } catch (err) {
        const error = new MountRemoteError(
          `Resource ${url} onload error!`,
          err,
        );
        onError?.(error, res);
        throw err;
      }
    };

    if (document.getElementById(id) != null) {
      mounted().then(resolve).catch(reject);
      return;
    }

    if ('handle' in opts && typeof opts.handle === 'function') {
      mounted(opts.handle).then(resolve).catch(reject);
      return;
    }

    let tag: HTMLElement | undefined;

    if (type === 'js') {
      tag = document.createElement('script');
      tag.setAttribute('type', 'text/javascript');
      tag.setAttribute('src', url);
    } else if (type === 'css') {
      tag = document.createElement('link');
      tag.setAttribute('rel', 'stylesheet');
      tag.setAttribute('href', url);
    } else {
      const error = new MountRemoteError(`Unsupported type for ${type}`);
      onError?.(error, { id, type, url } as MountRemoteResult<R>);
      reject(error);
    }

    if (tag) {
      if (attrs != null) {
        for (const [key, value] of Object.entries(attrs)) {
          if (!key) continue;
          tag.setAttribute(key, value);
        }
      }
      tag.setAttribute('id', id);
      tag.addEventListener('load', async () => {
        mounted().then(resolve).catch(reject);
      });
      tag.addEventListener('error', () => {
        unmountRemote(id);
        const error = new MountRemoteError(`Mount remote failed: ${url}`);
        onError?.(error, { id, type, url } as MountRemoteResult<R>);
        reject(error);
      });
      document.head.appendChild(tag);
    }
  });
};

/**
 * 基于 id 移除已经挂载的 Remote 资源
 *
 * @param id
 * @param onRemove
 */
export const unmountRemote = (id: string, onRemove?: () => void) => {
  const el = document.getElementById(id);
  if (el != null) {
    el.remove();
    onRemove?.();
  }
};
