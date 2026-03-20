[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / retry

# Function: retry()

> **retry**\<`T`\>(`fn`, `options?`): `Promise`\<`T`\>

Defined in: src/async/index.ts:104

重试异步函数

## Type Parameters

### T

`T`

## Parameters

### fn

`AsyncFn`\<`T`\>

异步函数

### options?

[`RetryOptions`](../type-aliases/RetryOptions.md) = `{}`

重试选项

## Returns

`Promise`\<`T`\>

返回原始函数的 Promise 结果

## Example

```ts
const result = await retry(
  () => fetch('/api/data').then(r => r.json()),
  { attempts: 3, delay: 1000 }
);
```
