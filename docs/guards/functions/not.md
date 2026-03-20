[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / not

# Function: not()

> **not**\<`T`\>(`guard`): [`TypeGuard`](../type-aliases/TypeGuard.md)\<`Exclude`\<`unknown`, `T`\>\>

Defined in: index.ts:480

守卫取反（NOT）

## Type Parameters

### T

`T`

## Parameters

### guard

[`TypeGuard`](../type-aliases/TypeGuard.md)\<`T`\>

要取反的守卫函数

## Returns

[`TypeGuard`](../type-aliases/TypeGuard.md)\<`Exclude`\<`unknown`, `T`\>\>

取反后的守卫函数

## Example

```ts
const isNotNull = not(isNull);
if (isNotNull(value)) {
  console.log(value);
}
```
