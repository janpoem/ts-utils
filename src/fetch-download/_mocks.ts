export const randomChars = (length = 8) => {
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

export const makeChunks = (value: string, chunksCount: number) => {
  const length = value.length;
  if (chunksCount <= 0 || length < chunksCount) return [value];
  const chunkSize = Math.ceil(length / chunksCount);
  return new Array(chunksCount).fill('').map((_, i) => {
    return value.slice(i * chunkSize, (i + 1) * chunkSize);
  });
};

export const mockStreamResp = (
  text: string,
  signal: AbortSignal | undefined | null = undefined,
  chunkSize = 10,
  withContentLength = true,
) =>
  new Promise<Response>((resolve) => {
    const chunks = makeChunks(text, chunkSize);
    let interval: NodeJS.Timer;
    let isBreak = false;
    const stream = new ReadableStream({
      start(controller) {},
      pull(controller) {
        if (signal?.aborted) {
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

    const headers: [string, string][] = [['content-type', 'text/plain']];

    if (withContentLength) {
      headers.push(['content-length', `${text.length}`]);
    }

    resolve(new Response(stream, { headers }));
  });
