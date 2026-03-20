[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / or

# Function: or()

> **or**\<`T`\>(...`guards`): [`TypeGuard`](../type-aliases/TypeGuard.md)\<`T`\>

Defined in: index.ts:457

组合守卫（OR）

任意一个守卫通过即返回 true

## Type Parameters

### T

`T`

## Parameters

### guards

...[`TypeGuard`](../type-aliases/TypeGuard.md)\<`unknown`\>[]

一个或多个守卫函数

## Returns

[`TypeGuard`](../type-aliases/TypeGuard.md)\<`T`\>

组合后的守卫函数

## Example

```ts
const isStrOrNum = or(isStr, isNumber);
if (isStrOrNum(value)) {
  console.log(typeof value);
}
```
