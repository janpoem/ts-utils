import { DownloadQueue } from './DownloadQueue';
import { DownloadTask } from './DownloadTask';
import type { DownloadInput } from './types';

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
