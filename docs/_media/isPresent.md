[**@zenstone/ts-utils**](../../README.md)

***

[@zenstone/ts-utils](../../modules.md) / [guards](../README.md) / isPresent

# Function: isPresent()

> **isPresent**\<`T`\>(`val`): `val is T`

Defined in: [src/guards/index.ts:328](https://github.com/janpoem/ts-utils/blob/e6f0e2dae5b274785affda26cac7db86fc0832b2/src/guards/index.ts#L328)

检查值是否不为 null 且不为 undefined

## Type Parameters

### T

`T`

## Parameters

### val

`T` \| `null` \| `undefined`

任意值

## Returns

`val is T`

## Example

```ts
if (isPresent(value)) {
  console.log(value);
}
```
