[**@zenstone/ts-utils**](../../README.md)

***

[@zenstone/ts-utils](../../modules.md) / [guards](../README.md) / isPromise

# Function: isPromise()

> **isPromise**\<`T`\>(`val`): `val is Promise<T>`

Defined in: [src/guards/index.ts:429](https://github.com/janpoem/ts-utils/blob/cc47b42336ba4f377a5b240d70447dc1812f8c94/src/guards/index.ts#L429)

检查值是否为 Promise

## Type Parameters

### T

`T` = `unknown`

## Parameters

### val

`unknown`

任意值

## Returns

`val is Promise<T>`

## Example

```ts
if (isPromise(value)) {
  await value;
}
```
