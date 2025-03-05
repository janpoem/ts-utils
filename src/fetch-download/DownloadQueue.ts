import { calcProgress } from '../number';
import {
  DownloadTask,
  type DownloadTaskProcessCallback,
  type DownloadTaskProcessOptions,
  DownloadTaskState,
} from './DownloadTask';
import type { DownloadInput } from './types';

export class DownloadQueueError extends Error {
  constructor(
    msg: string,
    public readonly queue: DownloadQueue,
  ) {
    super(msg);
  }
}

export type DownloadQueueInput = DownloadInput | Response | DownloadTask;

export type DownloadQueueProcessOptions = DownloadTaskProcessOptions & {
  onFinish?: (q: DownloadQueue) => void | Promise<void>;
  onQueueError?: (q: DownloadQueue) => void | Promise<void>;
};

export class DownloadQueue {
  static #idIndex = 0;

  #id: string;

  #tasks: DownloadTask[];

  #state = DownloadTaskState.init;

  #size = 0;

  #contentLength = 0;

  #received = 0;

  #progress = 0;

  #error: unknown;

  #startTs = 0;

  #completeTs = 0;

  constructor(tasks: DownloadQueueInput[]) {
    this.#id = `DownloadTask_${DownloadQueue.#idIndex++}`;
    this.#tasks = tasks.map((it) =>
      it instanceof DownloadTask ? it : new DownloadTask(it),
    );
  }

  /**
   * {@link DownloadQueue} Id
   */
  get id() {
    return this.#id;
  }

  get tasks() {
    return this.#tasks;
  }

  get tasksCount() {
    return this.#tasks.length;
  }

  /**
   * 当前状态 {@link DownloadTaskState}
   *
   * 注意 {@link DownloadQueue} 不应该出现 `fetching` 状态
   */
  get state() {
    return this.#state;
  }

  /**
   * 实际接收内容的大小
   */
  get size() {
    return this.isReaded
      ? this.#size
      : this.reduce((acc, it) => acc + it.size, 0);
  }

  /**
   * 获取 Response Content-Length
   */
  get contentLength() {
    return this.isReaded
      ? this.#contentLength
      : this.reduce((acc, it) => acc + it.contentLength, 0);
  }

  /**
   * 已接收 Response body 大小
   */
  get received() {
    return this.isReaded
      ? this.#received
      : this.reduce((acc, it) => acc + it.received, 0);
  }

  /**
   * 接收 Response body 进度小数（0 - 1）
   */
  get progress() {
    return this.isReaded
      ? this.#progress
      : calcProgress(
          this.reduce((acc, it) => acc + it.progress, 0),
          this.#tasks.length,
        );
  }

  /**
   * 接收 Response body 进度百分比（0 - 100）
   */
  get percent() {
    return Math.floor(this.progress * 100);
  }

  /**
   * 是否开始 read
   */
  get isStarted() {
    return this.#state !== DownloadTaskState.init;
  }

  /**
   * 是否已经 read 完毕
   */
  get isReaded() {
    return this.#state === DownloadTaskState.complete;
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
   */
  get speed() {
    if (!this.isStarted) return 0;
    const ms = this.elapsedMs;
    if (ms <= 0) return this.contentLength;
    return Math.floor(this.contentLength / (ms / 1000));
  }

  protected _initTasksQueue = (
    opts?: DownloadQueueProcessOptions,
  ): Promise<DownloadTask>[] => {
    return this.#tasks.map((task) => {
      if (!task.isStarted) {
        return task.read(opts);
      }
      return Promise.resolve(task);
    });
  };

  reduce = <T>(fn: (acc: T, it: DownloadTask) => T, initValue: T) =>
    this.#tasks.reduce(fn, initValue);

  read = (
    opts?: DownloadTaskProcessCallback | DownloadQueueProcessOptions,
  ): Promise<this> => {
    if (typeof opts === 'function') {
      return this.read({ onProgress: opts });
    }

    return new Promise((resolve, reject) => {
      this.#state = DownloadTaskState.reading;
      this.#startTs = new Date().valueOf();
      Promise.all(this._initTasksQueue(opts))
        .then(async () => {
          const count = this.#tasks.length;
          [this.#size, this.#contentLength, this.#received, this.#progress] =
            this.reduce(
              (acc, it) => {
                acc[0] += it.size;
                acc[1] += it.contentLength;
                acc[2] += it.received;
                acc[3] += it.progress;
                return acc;
              },
              [0, 0, 0, 0],
            );
          this.#progress = calcProgress(this.#progress, count);
          this.#state = DownloadTaskState.complete;
          this.#completeTs = new Date().valueOf();
          await opts?.onFinish?.(this);
          resolve(this);
        })
        .catch(async (reason) => {
          this.#state = DownloadTaskState.error;
          this.#completeTs = new Date().valueOf();
          this.#error = reason;
          await opts?.onQueueError?.(this);
          reject(reason);
        });
    });
  };

  newErr = (msg: string): DownloadQueueError =>
    new DownloadQueueError(msg, this);
}
