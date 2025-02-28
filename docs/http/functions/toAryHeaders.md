[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / toAryHeaders

# Function: toAryHeaders()

> **toAryHeaders**(`headers`?): [`AryHeaderItem`](../type-aliases/AryHeaderItem.md)[]

Defined in: [headers.ts:37](https://github.com/janpoem/ts-utils/blob/0cd4777c12ff7de2b512ea29cc29419037e8cb6f/src/http/headers.ts#L37)

将任意 `HeadersInit` 转为多个 [AryHeaderItem](../type-aliases/AryHeaderItem.md) 的数组

浏览器环境或 bun 环境下，`HeadersInit` 类型如下：

`type HeadersInit = [string, string][] | Record<string, string> | Headers;`

需要注意的是，在使用 `headers<Headers>.entries()` 时，Header 的 Key 会转为小写：

```ts
const h = new Headers();
h.set('Content-Type', 'application/json');
console.log([...h.keys()]); // 将输出 => ['content-type']
```

所以，当输入的 `headers` 为 `[string, string][]` 或 `Record<string, string>` 类
型时，应该确保 Key 为小写。即：

```ts
const h1 = [['content-Type', 'application/json']];
const h2 = { 'content-Type': 'application/json' };
```

## Parameters

### headers?

[`HeadersInitInput`](../type-aliases/HeadersInitInput.md)

## Returns

[`AryHeaderItem`](../type-aliases/AryHeaderItem.md)[]
