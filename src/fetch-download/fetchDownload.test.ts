import { describe, expect, it } from 'bun:test';
import { mockStreamResp, randomChars } from './_mocks';
import { DownloadQueue } from './DownloadQueue';
import { DownloadTask } from './DownloadTask';
import { fetchDownload } from './fetchDownload';

describe('fetchDownload', () => {
  it('should be create DownloadTask', async () => {
    const size = 100;
    const task = await fetchDownload(mockStreamResp(randomChars(size))).read();

    expect(task).toBeInstanceOf(DownloadTask);
    expect(task.size).toBe(size);
    expect(task.received).toBe(size);
  });

  it('should be create DownloadQueue', async () => {
    const sizes = [100, 100, 100];
    let totalSize = 0;
    const tasks = sizes.map((size) => {
      totalSize += size;
      return mockStreamResp(randomChars(size));
    });
    const queue = await fetchDownload(tasks).read();

    expect(queue).toBeInstanceOf(DownloadQueue);
    expect(queue.size).toBe(totalSize);
    expect(queue.received).toBe(totalSize);
  });
});
