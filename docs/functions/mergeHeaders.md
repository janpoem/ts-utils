[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / mergeHeaders

# Function: mergeHeaders()

> **mergeHeaders**(...`inputs`): `Headers`

Defined in: [http/headers.ts:62](https://github.com/janpoem/ts-utils/blob/5695f5d0e3c2197ae4233c3f441833765430d482/src/http/headers.ts#L62)

合并多个 [HeadersInitInput](../type-aliases/HeadersInitInput.md) 为 `Headers` 对象

Key(Header name) 会进行 trim 操作：

- Key(Header name) 头尾的空格（制表符、回车符）会被去除
- 当 Key(Header name) 为空字符（trim 后），将跳过该 Key

注意：当输入的 `headers` 为 `[string, string][]` 或 `Record<string, string>` 类
型时，应该确保 Key(Header name) 为小写（以确保同 Key 的 Header 会被有效覆盖）。

## Parameters

### inputs

...[`HeadersInitInput`](../type-aliases/HeadersInitInput.md)[]

多个 [HeadersInitInput](../type-aliases/HeadersInitInput.md) 对象，Key(Header name) 应为小写（中划线）

## Returns

`Headers`
