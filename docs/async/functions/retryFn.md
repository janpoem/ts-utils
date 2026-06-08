[**@zenstone/ts-utils**](../../README.md)

***

[@zenstone/ts-utils](../../modules.md) / [async](../README.md) / retryFn

# Function: retryFn()

> **retryFn**\<`T`, `Args`\>(`fn`, `options?`): (...`args`) => `Promise`\<`Awaited`\<`T`\>\>

Defined in: [src/async/index.ts:198](https://github.com/janpoem/ts-utils/blob/e6f0e2dae5b274785affda26cac7db86fc0832b2/src/async/index.ts#L198)

创建感知重试状态的函数

fn 的第一个参数为 RetryFnParams，包含 attempt 和 options，
允许根据重试次数做差异化处理。返回的函数剥掉 RetryFnParams，
只暴露业务参数。

## Type Parameters

### T

`T`

### Args

`Args` *extends* `unknown`[]

## Parameters

### fn

[`RetryCallbackFn`](../type-aliases/RetryCallbackFn.md)\<`T`, `Args`\>

接收 RetryFnParams 的回调函数

### options?

[`RetryOptions`](../type-aliases/RetryOptions.md) = `{}`

重试选项

## Returns

只保留业务参数的包装函数

(...`args`) => `Promise`\<`Awaited`\<`T`\>\>

## Example

```ts
const fetchWithFallback = retryFn(
  ({ attempt }, id: string) => {
    const url = attempt === 1 ? '/api/primary' : '/api/fallback';
    return fetch(`${url}/${id}`).then(r => r.json());
  },
  { attempts: 3 },
);

const data = await fetchWithFallback('123');
```
