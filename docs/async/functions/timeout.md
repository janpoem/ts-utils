[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / timeout

# Function: timeout()

> **timeout**\<`T`\>(`promise`, `ms`): `Promise`\<`T`\>

Defined in: src/async/index.ts:176

带超时的 Promise

## Type Parameters

### T

`T`

## Parameters

### promise

`Promise`\<`T`\>

要包装的 Promise

### ms

`number`

超时毫秒数

## Returns

`Promise`\<`T`\>

原 Promise 结果或超时错误

## Example

```ts
const result = await timeout(fetch('/api/data'), 5000);
```
