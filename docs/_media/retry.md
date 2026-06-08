[**@zenstone/ts-utils**](../../README.md)

***

[@zenstone/ts-utils](../../modules.md) / [async](../README.md) / retry

# Function: retry()

> **retry**\<`F`\>(`fn`, `options?`): (...`args`) => `Promise`\<`Awaited`\<`ReturnType`\<`F`\>\>\>

Defined in: [src/async/index.ts:166](https://github.com/janpoem/ts-utils/blob/e6f0e2dae5b274785affda26cac7db86fc0832b2/src/async/index.ts#L166)

透明包装异步/同步函数，返回自动重试的版本

返回的函数保持原函数的参数签名，返回值统一为 Promise

## Type Parameters

### F

`F` *extends* [`AnyFn`](../type-aliases/AnyFn.md)

## Parameters

### fn

`F`

要包装的函数（同步或异步）

### options?

[`RetryOptions`](../type-aliases/RetryOptions.md) = `{}`

重试选项

## Returns

包装后的函数

(...`args`) => `Promise`\<`Awaited`\<`ReturnType`\<`F`\>\>\>

## Examples

```ts
const fetchUserWithRetry = retry(
  (id: string) => fetch(`/api/user/${id}`).then(r => r.json()),
  { attempts: 3, delay: 1000 },
);

const user = await fetchUserWithRetry('123');
```

**指数退避**

```ts
const fetchWithBackoff = retry(fetchData, {
  attempts: 5,
  delay: ({ attempt }) => Math.min(1000 * 2 ** (attempt - 1), 30000),
});
```
