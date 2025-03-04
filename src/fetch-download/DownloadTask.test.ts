import { describe, expect, it } from 'bun:test';
import {
  DownloadTask,
  DownloadTaskError,
  DownloadTaskState,
} from './DownloadTask';

const randomChars = (length = 8) => {
  const startCharCode = 32;
  const maxCharCode = 126;
  const maxValue = maxCharCode - startCharCode;
  return new Array(length)
    .fill('')
    .map(() =>
      String.fromCharCode(startCharCode + Math.floor(Math.random() * maxValue)),
    )
    .join('');
};

const makeChunks = (value: string, chunksCount: number) => {
  const length = value.length;
  if (chunksCount <= 0 || length < chunksCount) return [value];
  const chunkSize = Math.ceil(length / chunksCount);
  return new Array(chunksCount).fill('').map((_, i) => {
    return value.slice(i * chunkSize, (i + 1) * chunkSize);
  });
};

const mockStreamResp = (text: string, signal: AbortSignal, chunkSize = 10) =>
  new Promise<Response>((resolve) => {
    const chunks = makeChunks(text, chunkSize);
    let interval: NodeJS.Timer;
    let isBreak = false;
    const stream = new ReadableStream({
      start(controller) {
      },
      pull(controller) {
        if (signal.aborted) {
          isBreak = true;
          clearInterval(interval);
          throw new Error(signal.reason);
        }
        interval = setInterval(() => {
          const first = chunks.pop();
          if (first != null && !isBreak) {
            controller.enqueue(Buffer.from(first));

            if (chunks.length <= 0) {
              isBreak = true;
              controller.close();
              clearInterval(interval);
            }
          }
        }, 20);
      },
      cancel() {
        clearInterval(interval);
      },
    });

    resolve(
      new Response(stream, {
        headers: {
          'content-type': 'text/plain',
          'content-length': `${text.length}`,
        },
      }),
    );
  });

describe('DownloadTask', () => {
  const urls = {
    jq: 'https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js',
    react:
      'https://cdn.jsdelivr.net/npm/react@19.0.0/cjs/react.production.min.js',
    npmReact: 'https://registry.npmjs.org/react/-/react-19.0.0.tgz',
  };

  it('static json response', async () => {
    const mimeType = 'application/json';
    const data = JSON.stringify({ id: '123', text: 'Hello World' });
    const resp = new Response(data, {
      headers: {
        'content-type': mimeType,
        'content-length': `${data.length}`,
      },
    });
    const task = new DownloadTask(resp);

    expect(task.id).toBeDefined();
    expect(task.isStarted).toBe(false);
    expect(task.isReaded).toBe(false);
    expect(task.state).toBe(DownloadTaskState.init);
    expect(task.chunks).toBeUndefined();
    expect(task.resp).toBe(resp);

    await task.read();

    expect(task.state).toBe(DownloadTaskState.complete);
    expect(task.isStarted).toBe(true);
    expect(task.isReaded).toBe(true);
    expect(task.mimeType).toBe(mimeType);
    expect(task.encoding).toBe(null);
    expect(task.contentLength).toBe(data.length);
    expect(task.contentLength).toBe(task.size);
    expect(task.received).toBe(data.length);
    expect(task.progress).toBe(1);
    expect(task.percent).toBe(100);
    expect(task.completeTs).toBeGreaterThan(0);
    expect(task.error).toBeNil();

    // 这个测试无法测试速度，要在 fetch 中进行测试
    // expect(task.speed).toBeGreaterThan(0);
    expect(new TextDecoder().decode(task.chunks)).toBe(data);

    const message = `${task.id} error`;
    const error = new DownloadTaskError(message, task);

    expect(error.message).toBe(message);
    expect(error.task.id).toBe(task.id);
    expect(() => {
      throw error;
    }).toThrowError(error);
  });

  it('create by URL', async () => {
    const url = urls.jq;
    const task = new DownloadTask(new URL(url));

    let progress = 0;

    expect(task.resp).toBeUndefined();

    await task.read({
      onHeaders: () => {
        expect(task.contentLength).toBeGreaterThan(0);
      },
      onProgress: () => {
        expect(task.state).toBe(DownloadTaskState.reading);
        expect(task.progress).toBeGreaterThan(progress);

        // progress 每次读取都会递增
        // 所以下一次必然大于上一次的值
        progress = task.progress;
      },
      onComplete: () => {
        expect(task.isReaded).toBe(true);
      },
    });

    expect(task.speed).toBeGreaterThan(0);
    expect(task.state).toBe(DownloadTaskState.complete);
    expect(task.chunks).not.toBeNil();
    expect(task.progress).toBe(1);
    expect(task.percent).toBe(100);
  });

  it('create by string url', async () => {
    const url = urls.jq;
    const task = new DownloadTask(url);

    let progress = 0;

    await task.read({
      onHeaders: () => {
        expect(task.contentLength).toBeGreaterThan(0);
        expect(task.mimeType).toStartWith('application/javascript');
      },
      onProgress: () => {
        expect(task.state).toBe(DownloadTaskState.reading);
        expect(task.progress).toBeGreaterThanOrEqual(progress);
        progress = task.progress;
      },
      onComplete: () => {
        expect(task.isReaded).toBe(true);
      },
    });

    expect(task.speed).toBeGreaterThanOrEqual(0);
    expect(task.state).toBe(DownloadTaskState.complete);
    expect(task.chunks).not.toBeNil();
    expect(task.progress).toBe(1);
    expect(task.percent).toBe(100);
  });

  it('create by Request', async () => {
    const url = urls.react;
    const task = new DownloadTask(new Request(url, { cache: 'reload' }));

    let progress = 0;

    await task.read({
      onHeaders: () => {
        expect(task.contentLength).toBeGreaterThan(0);
        expect(task.mimeType).toStartWith('application/javascript');
      },
      onProgress: () => {
        expect(task.state).toBe(DownloadTaskState.reading);
        expect(task.progress).toBeGreaterThanOrEqual(progress);
        progress = task.progress;
      },
      onComplete: () => {
        expect(task.isReaded).toBe(true);
      },
    });

    expect(task.speed).toBeGreaterThanOrEqual(0);
    expect(task.state).toBe(DownloadTaskState.complete);
    expect(task.chunks).not.toBeNil();
    expect(task.progress).toBe(1);
    expect(task.percent).toBe(100);
  });

  it('create by DownloadRequest', async () => {
    const url = urls.react;
    const task = new DownloadTask({ url, cache: 'reload' });

    let progress = 0;

    await task.read({
      onHeaders: () => {
        expect(task.contentLength).toBeGreaterThan(0);
        expect(task.mimeType).toStartWith('application/javascript');
      },
      onProgress: () => {
        expect(task.state).toBe(DownloadTaskState.reading);
        expect(task.progress).toBeGreaterThanOrEqual(progress);
        progress = task.progress;
      },
      onComplete: () => {
        expect(task.isReaded).toBe(true);
      },
    });

    expect(task.speed).toBeGreaterThanOrEqual(0);
    expect(task.state).toBe(DownloadTaskState.complete);
    expect(task.chunks).not.toBeNil();
    expect(task.progress).toBe(1);
    expect(task.percent).toBe(100);
  });

  it('task fetch abort', () => {
    const url = urls.npmReact;
    const abort = new AbortController();
    const task = new DownloadTask(
      fetch(url, { signal: abort.signal, cache: 'reload' }),
    );
    const reason = 'download cancel a';

    expect(async () => {
      await task.read({
        onProgress: () => {
          if (task.progress > 0) {
            abort.abort(reason);
          }
        },
      });
    }).toThrowError(reason);

    expect(task.state).toBe(DownloadTaskState.error);
    expect(task.progress).toBeGreaterThan(0);
    expect(task.received).toBe(task.chunks?.length ?? 0);
    expect(task.received).toBeLessThan(task.size);
    expect(task.isReaded).toBe(true);
  });

  it('task mock stream abort', async () => {
    const text = randomChars(100);
    const abort = new AbortController();
    const task = new DownloadTask(mockStreamResp(text, abort.signal, 10));
    const reason = 'download cancel b';

    expect(async () => {
      await task.read({
        onProgress: () => {
          if (task.progress > 0) {
            abort.abort(reason);
          }
        },
      });
    }).toThrowError(reason);

    expect(task.state).toBe(DownloadTaskState.error);
    expect(task.progress).toBeGreaterThan(0);
    expect(task.received).toBe(task.chunks?.length ?? 0);
    expect(task.received).toBeLessThan(task.size);
    expect(task.isReaded).toBe(true);
  });
});
