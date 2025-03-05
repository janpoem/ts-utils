import { calcProgress } from '../number';
import { isInferObj } from '../object';
import { notEmptyStr } from '../string';
import type {
  DownloadFetchCallback,
  DownloadInput,
  DownloadRequest,
} from './types';

export class DownloadTaskError extends Error {
  constructor(
    msg: string,
    public readonly task: DownloadTask,
  ) {
    super(msg);
  }
}

const compressedEncodings = ['gzip', 'compress', 'deflate', 'br', 'zstd'];

export enum DownloadTaskState {
  error = -1,
  init = 0,
  fetching = 1,
  reading = 2,
  complete = 3,
}

export type DownloadTaskProcessCallback = (
  task: DownloadTask,
) => void | Promise<void>;

export type DownloadTaskProcessOptions = {
  onFetch?: DownloadTaskProcessCallback;
  onHeaders?: DownloadTaskProcessCallback;
  onProgress?: DownloadTaskProcessCallback;
  onComplete?: DownloadTaskProcessCallback;
  onError?: DownloadTaskProcessCallback;
};

export class DownloadTask {
  static #idIndex = 0;

  #id: string;

  #fetch?: DownloadFetchCallback;

  #resp?: Response;

  #state = DownloadTaskState.init;

  #contentLength = 0;

  #encoding: string | null = null;

  #mimeType: string | null = null;

  #size = 0;

  #received = 0;

  #chunks?: Uint8Array;

  #progress = 0;

  #error: unknown;

  /**
   * fetch 开始时间
   *
   * @private
   */
  #fetchTs = 0;

  /**
   * read 开始时间，仅针对 stream.read 开始时间
   *
   * @private
   */
  #startTs = 0;

  #completeTs = 0;

  /**
   * 创建 {@link DownloadTask} 实例，允许多种 input 类型
   *
   * ```ts
   * // URL 输入
   * const task1 = new DownloadTask('url');
   * const task2 = new DownloadTask(new URL('url'));
   *
   * // Request or DownloadRequest 结构
   * const task3 = new DownloadTask(new Request('url'));
   * const task4 = new DownloadTask({ url: 'url' });
   *
   * // Promise<Response>
   * const abort = new AbortController();
   * const task5 = new DownloadTask(fetch('url', { signal: abort.signal }));
   *
   * // Response
   * const task6 = new DownloadTask(await fetch('url'));
   * ```
   *
   * 下载的目标 url ，必须要输出有效的 `content-length`，否则将会抛出异常
   *
   * @param input
   */
  constructor(input: DownloadInput | Response) {
    this.#id = `DownloadTask_${DownloadTask.#idIndex++}`;
    if (input instanceof Response) {
      this.#resp = input;
    } else {
      this._initFetch(input);
    }
  }

  protected _initFetch = (input: DownloadInput) => {
    if (input instanceof Promise) {
      this.#fetch = () =>
        new Promise((resolve, reject) => input.then(resolve).catch(reject));
    } else if (input instanceof Request) {
      this.#fetch = () => fetch(input);
    } else if (
      isInferObj<DownloadRequest>(
        input,
        (it) => notEmptyStr(it.url) || it.url instanceof URL,
      )
    ) {
      const { url, ...rest } = input;
      this.#fetch = () => fetch(url, rest);
    } else {
      this.#fetch = () => fetch(input);
    }
  };

  /**
   * {@link DownloadTask} Id
   *
   * 用于给 {@link DownloadTask} 的 Key 使用
   */
  get id() {
    return this.#id;
  }

  /**
   * 获取 response
   */
  get resp() {
    return this.#resp;
  }

  /**
   * 当前状态 {@link DownloadTaskState}
   */
  get state() {
    return this.#state;
  }

  /**
   * 获取 Response Content-Length
   */
  get contentLength() {
    return this.#contentLength;
  }

  /**
   * 获取 Response Content-Encoding
   */
  get encoding() {
    return this.#encoding;
  }

  /**
   * 获取 Response Content-Type
   */
  get mimeType() {
    return this.#mimeType;
  }

  /**
   * 实际接收内容的大小
   */
  get size() {
    return this.#size;
  }

  /**
   * Response 是否经过压缩（基于 Content-Encoding 判定）
   */
  get isCompressed() {
    return !!this.#encoding && compressedEncodings.includes(this.#encoding);
  }

  /**
   * 已接收 Response body 大小
   */
  get received() {
    return this.#received;
  }

  /**
   * 接收 Response body 进度小数（0 - 1）
   */
  get progress() {
    return this.#progress;
  }

  /**
   * 接收 Response body 进度百分比（0 - 100）
   */
  get percent() {
    return Math.floor(this.progress * 100);
  }

  /**
   * 获取 Response body 的 chunks
   */
  get chunks() {
    return this.#chunks;
  }

  /**
   * 是否开始 read
   */
  get isStarted() {
    return this.#state !== DownloadTaskState.init;
  }

  /**
   * 是否已经读取（完毕） Response body
   */
  get isReaded() {
    return this.#received > 0 && this.#chunks != null;
  }

  /**
   * 获取错误信息
   */
  get error() {
    return this.#error;
  }

  /**
   * read 完成时间戳
   *
   * - 如果下载未开始，返回 0
   * - 如果下载已开始，但并未下载完成，则会返回当前时间的时间戳
   */
  get completeTs() {
    if (this.isStarted) {
      return this.#completeTs > 0 ? this.#completeTs : new Date().valueOf();
    }
    return 0;
  }

  /**
   * read 数据经过多少时间（毫秒）
   *
   * 如果为实际完成，则返回当前时间的时间戳
   *
   * 如果未开始，则返回 0
   */
  get elapsedMs() {
    return this.isStarted ? this.completeTs - this.#startTs : 0;
  }

  /**
   * 接收速度，单位为字节/秒，需要自行转换
   *
   * 如果未开始，返回 0
   *
   * ```ts
   * import { filesize } from 'filesize';
   *
   * const task = await fetchDownload().read();
   *
   * console.log(`${filesize(task.speed, { bits: true })}/s`); // kbit/s
   * console.log(`${filesize(task.speed)}/s`); // KB/s
   * ```
   */
  get speed() {
    if (!this.isStarted) return 0;
    const ms = this.elapsedMs;
    if (ms <= 0) return this.#contentLength;
    return Math.floor(this.#contentLength / (ms / 1000));
  }

  /**
   * read response body（下载）
   *
   * 主要的流程：
   *
   * 1. 如果创建 {@link DownloadTask} 实例时输入的非 Response 实例 {@link DownloadInput}
   * 会创建一个函数去 fetch 输入（主要是 fetch headers，如果传入的是 Response 实例，则跳过这一步）。
   *     - `onFetch` 对应 fetch 前
   * 2. 解析 `Response.headers`，并提取 `content-length`、`content-type`、`content-encoding`，
   * 其中 `content-length` 为必须的（缺失或小于或等于0时将抛出错误）。
   *     - `onHeaders`
   * 3. `stream.read` 实际开始下载
   *     - `onProgress` 每一次接收 chunk 流
   *     - `onComplete` 下载完成
   *     - `onError` 出错时
   *
   * 默认状态下，任意错误都会抛出异常，可通过 `opts.isNotThrow` 为 `true` 禁用抛出异常。
   *
   * ```ts
   * const task = new DownloadTask('download_url');
   * await task.read({
   *   onFetch: () => {},    // fetch 前
   *   onHeaders: () => {},  // 读取 headers 时，stream read 之前
   *   onProgress: () => {}, // 每一次接收 chunk 流时
   *   onComplete: () => {}, // 下载完成时
   *   onError: () => {},    // 出错时
   * });
   * ```
   *
   * @param opts
   */
  read = async (
    opts?: DownloadTaskProcessCallback | DownloadTaskProcessOptions,
  ): Promise<this> => {
    if (typeof opts === 'function') {
      return this.read({ onProgress: opts });
    }
    // 已经读取 #chunks 则表示已经读完了
    if (this.#chunks != null) return this;

    const chunkAry: Uint8Array[] = [];

    try {
      if (this.isStarted) {
        throw this.newErr('Download task is start');
      }

      // reset
      this.#completeTs = 0;

      if (this.#resp == null) {
        if (this.#fetch == null) {
          throw this.newErr('Unspecified download task fetch input');
        }
        await opts?.onFetch?.(this);
        this.#state = DownloadTaskState.fetching;
        this.#fetchTs = new Date().valueOf();
        this.#resp = await this.#fetch();
      }

      if (
        this.#resp == null ||
        this.#resp.headers == null ||
        this.#resp.body == null
      ) {
        throw this.newErr('Invalid response');
      }

      const reader = this.#resp.body.getReader();
      if (reader == null) {
        throw this.newErr('Create stream reader error');
      }

      // load response headers
      this.#size = this.#contentLength = +(
        this.#resp.headers.get('content-length') || 0
      );
      this.#mimeType = this.#resp.headers.get('content-type');
      this.#encoding = this.#resp.headers.get('content-encoding');

      if (
        Number.isNaN(this.#contentLength) ||
        !Number.isFinite(this.#contentLength) ||
        this.#contentLength <= 0
      ) {
        throw this.newErr('Invalid response content length');
      }
      if (this.isCompressed) {
        this.#size = this.inferUncompressedSize(this.#contentLength);
      }

      await opts?.onHeaders?.(this);

      this.#state = DownloadTaskState.reading;
      this.#chunks = undefined;
      this.#received = 0;
      this.#startTs = new Date().valueOf();

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          // 用实际接收的大小替代实际的 size
          this.#size = this.#received;
          this.#completeTs = new Date().valueOf();
          this.#state = DownloadTaskState.complete;
          break;
        }

        chunkAry.push(value);
        this.#received += value.length;
        this.#progress = calcProgress(this.#received, this.#size);
        await opts?.onProgress?.(this);
      }
    } catch (err) {
      this.#state = DownloadTaskState.error;
      this.#error = err;
      await opts?.onError?.(this);
    }

    if (this.#received > 0) {
      const chunks = new Uint8Array(this.#received);
      let position = 0;
      for (const chunk of chunkAry) {
        chunks.set(chunk, position);
        position += chunk.length;
      }
      this.#chunks = chunks;
    }

    if (this.#error != null) {
      await opts?.onError?.(this);
      throw this.#error;
    }

    await opts?.onComplete?.(this);

    return this;
  };

  /**
   * 根据压缩后文件大小，推算出未压缩前的文件大小
   *
   * 文本内容的压缩率，实际取决于源内容的重复率，所以无法一概而论。
   * 这里只是尽可能放大压缩后的尺寸，以取得一个较为接近的值
   *
   * @param compressedSize 压缩后的文件大小
   */
  inferUncompressedSize = (compressedSize: number) => {
    const compressionRatio = 0.55 * Math.log(compressedSize) - 3.0;
    return Math.floor(
      Math.min(Math.max(compressionRatio, 1), 7) * compressedSize,
    );
  };

  newErr = (msg: string) => new DownloadTaskError(msg, this);
}
