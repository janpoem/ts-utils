[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / isPromise

# Function: isPromise()

> **isPromise**\<`T`\>(`val`): `val is Promise<T>`

Defined in: [index.ts:425](https://github.com/janpoem/ts-utils/blob/a9ae0d5ab8db50d99f88de922674a4455e94f5fc/src/guards/index.ts#L425)

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
