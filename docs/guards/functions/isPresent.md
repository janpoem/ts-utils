[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / isPresent

# Function: isPresent()

> **isPresent**\<`T`\>(`val`): `val is T`

Defined in: index.ts:343

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
