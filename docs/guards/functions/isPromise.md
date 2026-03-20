[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / isPromise

# Function: isPromise()

> **isPromise**(`val`): `val is Promise<unknown>`

Defined in: index.ts:404

检查值是否为 Promise

## Parameters

### val

`unknown`

任意值

## Returns

`val is Promise<unknown>`

## Example

```ts
if (isPromise(value)) {
  await value;
}
```
