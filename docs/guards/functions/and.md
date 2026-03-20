[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / and

# Function: and()

> **and**\<`T`\>(...`guards`): [`TypeGuard`](../type-aliases/TypeGuard.md)\<`T`\>

Defined in: index.ts:430

组合守卫（AND）

所有守卫都必须通过才返回 true

## Type Parameters

### T

`T`

## Parameters

### guards

...\[(`val`) => `val is T`, `...((val: T) => boolean)[]`\]

一个或多个守卫函数

## Returns

[`TypeGuard`](../type-aliases/TypeGuard.md)\<`T`\>

组合后的守卫函数

## Example

```ts
const isStrAry = isAry(isStr);
const isNonEmptyStrAry = and(isAry(isStr), (arr) => arr.length > 0);
```
