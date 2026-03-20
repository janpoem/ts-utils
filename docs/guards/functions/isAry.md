[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / isAry

# Function: isAry()

> **isAry**\<`T`\>(`val`, `guard?`): `val is T[]`

Defined in: index.ts:383

检查值是否为数组

## Type Parameters

### T

`T`

## Parameters

### val

`unknown`

任意值

### guard?

(`item`) => `item is T`

可选的元素类型守卫

## Returns

`val is T[]`

## Example

```ts
if (isAry(value)) {
  console.log(value.length);
}

const mixed = [1, 'a', 2, 'b'];
if (isAry(mixed, isStr)) {
  // mixed is narrowed to string[]
}
```
