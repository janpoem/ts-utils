const defaultMimeType = 'application/octet-stream';

/**
 * 将 chunks 保存到本机，该方法只可在浏览器中执行
 *
 * ```ts
 * const task = fetchDownload('url');
 * await task.read();
 *
 * saveChunks(task.chunks, 'test.js');
 * ```
 *
 * @param chunks
 * @param filename
 * @param mimeType
 */
export const saveChunks = (
  chunks: Uint8Array,
  filename: string | (() => string),
  mimeType?: string | null,
) => {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    throw new Error('This method needs to be run in the browser');
  }
  const blob = new Blob([chunks as BlobPart], {
    type: mimeType || defaultMimeType,
  });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = typeof filename === 'function' ? filename() : filename;
  link.click();
  // 延迟释放，确保浏览器缓冲下载完成后再撤销 URL
  setTimeout(() => window.URL.revokeObjectURL(link.href), 100);
};
