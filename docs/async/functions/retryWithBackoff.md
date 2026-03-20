[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / retryWithBackoff

# Function: retryWithBackoff()

> **retryWithBackoff**\<`T`\>(`fn`, `options?`): `Promise`\<`T`\>

Defined in: src/async/index.ts:133

带指数退避的重试异步函数

## Type Parameters

### T

`T`

## Parameters

### fn

`AsyncFn`\<`T`\>

异步函数

### options?

[`RetryWithBackoffOptions`](../type-aliases/RetryWithBackoffOptions.md) = `{}`

重试选项

## Returns

`Promise`\<`T`\>

返回原始函数的 Promise 结果

## Example

```ts
const result = await retryWithBackoff(
  () => fetch('/api/data').then(r => r.json()),
  { attempts: 5, initialDelay: 1000, factor: 2, maxDelay: 30000 }
);
```
