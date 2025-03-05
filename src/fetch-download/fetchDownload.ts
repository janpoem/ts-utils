import { DownloadQueue } from './DownloadQueue';
import { DownloadTask } from './DownloadTask';
import type { DownloadInput } from './types';

/**
 * 创建 {@link DownloadTask} 或 {@link DownloadQueue} 的快捷方法
 *
 * ```ts
 * // DownloadTask
 * const task = fetchDownload('url');
 *
 * // DownloadQueue
 * const queue = fetchDownload(['url-a', 'url-b', 'url-c']);
 * ```
 *
 * @param input
 */
export const fetchDownload = <
  T extends DownloadInput | DownloadInput[],
  R = T extends DownloadInput ? DownloadTask : DownloadQueue,
>(
  input: T,
): R => {
  if (Array.isArray(input)) {
    return new DownloadQueue(input.map(fetchDownload)) as R;
  }
  return new DownloadTask(input) as R;
};
