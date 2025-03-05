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
  if (window == null || document == null) {
    throw new Error('This method needs to be run in the browser');
  }
  const blob = new Blob([chunks], { type: mimeType || defaultMimeType });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = typeof filename === 'function' ? filename() : filename;
  link.click();
  window.URL.revokeObjectURL(link.href);
};
