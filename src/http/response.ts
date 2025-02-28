import { isNumber } from '../number';
import { mergeHeaders } from './headers';

export type HttpStatusCode = number;

export type ResponseInitInput =
  | ResponseInit
  | HttpStatusCode
  | null
  | undefined;

/**
 * 合并多个 {@link ResponseInitInput} 为 `ResponseInit` 对象
 *
 * 主要针对：
 * - 允许传入 {@link HttpStatusCode} 作为 `ResponseInit`，即：`new Response(body, mergeRespInit(404))`
 * - 处理多个 `ResponseInit` 对象的 `headers` 合并
 * - 合并多个 `ResponseInit`
 *
 * ```ts
 * new Response(body,
 *   mergeRespInit(
 *     404,
 *     { headers: { 'x-a': '1' } },
 *     { headers: { 'x-b': '2', 'x-a': 'replaced' } },
 *     { status: 502, statusText: 'Bad Gateway' },
 *   )
 * );
 * ```
 *
 * @param opts
 * @returns
 */
export const mergeRespInit = (...opts: ResponseInitInput[]): ResponseInit => {
  const headersInit: HeadersInit[] = [];
  const init: ResponseInit = {};

  for (const opt of opts) {
    if (opt == null) continue;
    if (isNumber(opt)) {
      Object.assign(init, { status: opt });
    } else {
      const { headers, ...rest } = opt;
      Object.assign(init, rest);
      if (headers != null) {
        headersInit.push(headers);
      }
    }
  }

  if (headersInit.length) init.headers = mergeHeaders(...headersInit);

  return init;
};
