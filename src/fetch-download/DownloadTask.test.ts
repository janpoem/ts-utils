import { describe, expect, it } from 'bun:test';
import { mockStreamResp, randomChars } from './_mocks';
import {
  DownloadTask,
  DownloadTaskError,
  DownloadTaskState,
} from './DownloadTask';

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
        expect(task.progress).toBeGreaterThanOrEqual(progress);

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

  // it('task fetch abort', async () => {
  //   const url = urls.npmReact;
  //   const abort = new AbortController();
  //   const task = new DownloadTask(
  //     fetch(url, { signal: abort.signal, cache: 'reload' }),
  //   );
  //   const reason = 'download cancel a';
  //
  //   try {
  //     await task.read({
  //       onProgress: () => {
  //         if (task.progress > 0) {
  //           abort.abort(reason);
  //         }
  //       },
  //     });
  //   } catch (error) {
  //     expect(() => {
  //       throw error;
  //     }).toThrowError(reason);
  //   }
  //
  //   expect(task.state).toBe(DownloadTaskState.error);
  //   expect(task.progress).toBeGreaterThan(0);
  //   expect(task.received).toBe(task.chunks?.length ?? 0);
  //   expect(task.received).toBeLessThan(task.size);
  //   expect(task.isReaded).toBe(true);
  // });

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

  it('test zero content length', async () => {
    const text = randomChars(1000);
    const task = new DownloadTask(mockStreamResp(text, null, 10, false));

    await task.read({
      onProgress: (t) => {
        expect(t.progress).toBe(1);
        expect(t.percent).toBe(100);
      },
    });

    expect(task.size).toBe(1000);
    expect(task.progress).toBe(1);
    expect(task.percent).toBe(100);
    expect(task.size).toBe(task.received);
  });

  // it('cf-worker', async () => {
  //   const task = fetchDownload(
  //     'http://127.0.0.1:8787/libs/monaco-editor/0.52.2/editor.main.umd.js',
  //   );
  //   await task.read(() => {
  //     console.log(task.percent);
  //   });
  // });
});
