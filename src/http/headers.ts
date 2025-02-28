/**
 * 单个 Http Header 的数组类型
 *
 * @example
 * const header: HeaderAry = ['Content-Type', 'application/json'];
 */
export type AryHeaderItem = [string, string];

export type HeadersInitInput = HeadersInit | undefined | null;

/**
 * 将任意 `HeadersInit` 转为多个 {@link AryHeaderItem} 的数组
 *
 * 浏览器环境或 bun 环境下，`HeadersInit` 类型如下：
 *
 * `type HeadersInit = [string, string][] | Record<string, string> | Headers;`
 *
 * 需要注意的是，在使用 `headers<Headers>.entries()` 时，Header 的 Key 会转为小写：
 *
 * ```ts
 * const h = new Headers();
 * h.set('Content-Type', 'application/json');
 * console.log([...h.keys()]); // 将输出 => ['content-type']
 * ```
 *
 * 所以，当输入的 `headers` 为 `[string, string][]` 或 `Record<string, string>` 类
 * 型时，应该确保 Key 为小写。即：
 *
 * ```ts
 * const h1 = [['content-Type', 'application/json']];
 * const h2 = { 'content-Type': 'application/json' };
 * ```
 *
 * @param headers
 * @returns {AryHeaderItem[]}
 */
export const toAryHeaders = (headers?: HeadersInitInput): AryHeaderItem[] => {
  if (headers == null) return [];
  if (headers instanceof Headers) {
    // @ts-ignore
    return Array.from(headers.entries());
  }
  if (Array.isArray(headers)) return headers;
  return Object.entries(headers);
};

/**
 * 合并多个 {@link HeadersInitInput} 为 `Headers` 对象
 *
 * Key(Header name) 会进行 trim 操作：
 *
 * - Key(Header name) 头尾的空格（制表符、回车符）会被去除
 * - 当 Key(Header name) 为空字符（trim 后），将跳过该 Key
 *
 * 注意：当输入的 `headers` 为 `[string, string][]` 或 `Record<string, string>` 类
 * 型时，应该确保 Key(Header name) 为小写（以确保同 Key 的 Header 会被有效覆盖）。
 *
 * @param inputs 多个 {@link HeadersInitInput} 对象，Key(Header name) 应为小写（中划线）
 * @returns {Headers}
 */
export const mergeHeaders = (...inputs: HeadersInitInput[]): Headers => {
  const headers = new Headers();

  for (const it of inputs) {
    if (it == null) continue;
    for (const [key, value] of toAryHeaders(it)) {
      const _key = key.trim();
      if (_key === '') continue;
      headers.set(_key, value);
    }
  }

  return headers;
};
