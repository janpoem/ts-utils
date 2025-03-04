import type { DownloadTask } from './DownloadTask';
import type {
  DownloadProcessCallback,
  DownloadProcessImpl,
  DownloadProcessOptions,
} from './types';

export class DownloadQueueError extends Error {
  constructor(
    msg: string,
    public readonly queue: DownloadQueue,
  ) {
    super(msg);
  }
}

export class DownloadQueue implements DownloadProcessImpl {
  #tasks: DownloadTask[];

  constructor(tasks: DownloadTask[]) {
    this.#tasks = tasks;
  }

  read = (
    opts: DownloadProcessCallback<this> | DownloadProcessOptions<this>,
  ): Promise<this> => {
    if (typeof opts === 'function') {
      return this.read({ onProgress: opts });
    }

    return new Promise((resolve, reject) => {
      Promise.all(
        this.#tasks.map((it) =>
          it.read({
            onHeaders: () => {},
            onProgress: () => {},
            onComplete: () => {},
          }),
        ),
      )
        .then((tasks) => {
          resolve(this);
        })
        .catch(reject);
    });
  };

  newErr = (msg: string): DownloadQueueError =>
    new DownloadQueueError(msg, this);
}
