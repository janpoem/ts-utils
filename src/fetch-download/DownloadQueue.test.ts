import { describe, expect, it } from 'bun:test';
import { mockStreamResp, randomChars } from './_mocks';
import { DownloadTaskState } from './DownloadTask';
import { fetchDownload } from './fetchDownload';

type FetchOptions = {
  signal?: AbortSignal;
  size?: number;
  chunkSize?: number;
};

const mockFetch = ({ signal, size = 100, chunkSize = 10 }: FetchOptions = {}) =>
  mockStreamResp(randomChars(size), signal, chunkSize);

describe('DownloadQueue', () => {
  it('basic test', async () => {
    const sizes = [100, 100, 100];
    let totalSize = 0;
    const tasks = sizes.map((size) => {
      totalSize += size;
      return mockFetch({ size });
    });
    const q = fetchDownload(tasks);

    expect(q.id).toBeDefined();
    expect(q.isStarted).toBe(false);
    expect(q.isReaded).toBe(false);
    expect(q.state).toBe(DownloadTaskState.init);
    expect(q.tasks).toBeArray();
    expect(q.tasksCount).toBe(tasks.length);
    expect(q.completeTs).toBe(0);
    expect(q.elapsedMs).toBe(0);

    const startTs = new Date().valueOf();
    let progress = 0;

    await q.read({
      onProgress: () => {
        expect(q.state).toBe(DownloadTaskState.reading);
        expect(q.isStarted).toBe(true);
        expect(q.isReaded).toBe(false);
        expect(q.size).toBeGreaterThan(0);
        expect(q.contentLength).toBeGreaterThan(0);
        expect(q.progress).toBeGreaterThanOrEqual(progress);

        const now = new Date().valueOf();

        expect(q.completeTs).toBeGreaterThanOrEqual(now);
        // 不同的测试环境，这个测试可能会有不同的结果
        // expect(q.elapsedMs).toBeCloseTo(now - startTs, 10);

        progress = q.progress;
      },
      onFinish: () => {
        expect(q.progress).toBe(1);
        expect(q.percent).toBe(100);
        expect(q.isStarted).toBe(true);
        expect(q.isReaded).toBe(true);
        expect(q.size).toBe(totalSize);
        expect(q.received).toBe(totalSize);
      },
    });

    expect(q.state).toBe(DownloadTaskState.complete);
    expect(q.completeTs).toBeGreaterThan(0);
    expect(q.speed).toBeGreaterThan(0);
    expect(q.error).toBeUndefined();

    const message = `${q.id} error`;
    const error = q.newErr(message);
    expect(error.message).toBe(message);
    expect(error.queue.id).toBe(q.id);
    expect(() => {
      throw error;
    }).toThrowError(error);
  });

  it('abort test', async () => {
    const sizes = [100, 100, 100];
    const abort = new AbortController();
    let totalSize = 0;
    const tasks = sizes.map((size, i) => {
      totalSize += size;
      return mockFetch({ size, signal: i === 1 ? abort.signal : undefined });
    });
    const q = fetchDownload(tasks);
    const reason = `cancel ${new Date().valueOf()}`;

    expect(async () => {
      await q.read({
        onProgress: () => {
          if (q.percent > 0) {
            abort.abort(reason);
          }
        },
        onQueueError: () => {
          expect(q.error).toBeDefined();
        },
      });
    }).toThrowError(reason);

    expect(() => q.error).toThrowError(reason);
    expect(q.state).toBe(DownloadTaskState.error);
    expect(q.speed).toBeGreaterThan(0);
    expect(q.size).toBe(totalSize);
    expect(q.received).toBeGreaterThan(0);
    expect(q.progress).toBeGreaterThan(0);
    expect(q.percent).toBeGreaterThan(0);
  });
});
