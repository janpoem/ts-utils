[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / and

# Function: and()

> **and**\<`T`\>(...`guards`): [`TypeGuard`](../type-aliases/TypeGuard.md)\<`T`\>

Defined in: [index.ts:451](https://github.com/janpoem/ts-utils/blob/738489a3f4830c04acd7944aaed6b04e6b346155/src/guards/index.ts#L451)

组合守卫（AND）

第一个守卫收窄类型到 T，后续守卫在 T 上做进一步筛选

## Type Parameters

### T

`T`

## Parameters

### guards

...\[(`val`) => `val is T`, `...((val: T) => boolean)[]`\]

第一个为类型守卫，后续为断言函数

## Returns

[`TypeGuard`](../type-aliases/TypeGuard.md)\<`T`\>

组合后的守卫函数

## Example

```ts
const isStrAry = aryGuard(isStr);
const isNonEmptyStrAry = and(isStrAry, (arr) => arr.length > 0);
```
