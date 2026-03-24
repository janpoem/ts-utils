[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / timeout

# Function: timeout()

> **timeout**\<`F`\>(`fn`, `ms`): (...`args`) => `Promise`\<`Awaited`\<`ReturnType`\<`F`\>\>\>

Defined in: [src/async/index.ts:233](https://github.com/janpoem/ts-utils/blob/a9ae0d5ab8db50d99f88de922674a4455e94f5fc/src/async/index.ts#L233)

包装函数，添加超时控制

返回的函数保持原函数的参数签名，返回值统一为 Promise。
如果执行超过指定时间，将抛出 TimeoutError。

## Type Parameters

### F

`F` *extends* [`AnyFn`](../type-aliases/AnyFn.md)

## Parameters

### fn

`F`

要包装的函数（同步或异步）

### ms

`number`

超时毫秒数

## Returns

包装后的函数

(...`args`) => `Promise`\<`Awaited`\<`ReturnType`\<`F`\>\>\>

## Example

```ts
const fetchWithTimeout = timeout(
  (url: string) => fetch(url).then(r => r.json()),
  5000,
);

const data = await fetchWithTimeout('/api/data');
```
