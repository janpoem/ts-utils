[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / pendingFn

# Function: pendingFn()

> **pendingFn**\<`T`, `Args`\>(`scope`, `fn`): (...`args`) => `Promise`\<`Awaited`\<`T`\>\>

Defined in: [src/async/pending.ts:93](https://github.com/janpoem/ts-utils/blob/a9ae0d5ab8db50d99f88de922674a4455e94f5fc/src/async/pending.ts#L93)

感知 pending 状态的 inflight 去重

fn 的第一个参数为 PendingFnParams，包含 scope 和 getPendingCount，
允许根据 pending 状态做自定义处理（如短路检查、日志等）。
返回的函数剥掉 PendingFnParams，只暴露业务参数。

## Type Parameters

### T

`T`

### Args

`Args` *extends* `unknown`[]

## Parameters

### scope

`string` \| ((...`args`) => `string`)

静态 scope 字符串，或基于参数动态生成 scope 的函数

### fn

[`PendingCallbackFn`](../type-aliases/PendingCallbackFn.md)\<`T`, `Args`\>

接收 PendingFnParams 的回调函数

## Returns

只保留业务参数的包装函数

(...`args`) => `Promise`\<`Awaited`\<`T`\>\>

## Example

```ts
const mountScript = pendingFn(
  (url: string) => `script:${url}`,
  ({ scope, getPendingCount }, url: string) => {
    // 短路：已挂载
    const existing = document.getElementById(scope);
    if (existing) return { element: existing };

    // 实际挂载，执行期间 getPendingCount() 可获取等待数
    return loadScript(url);
  },
);

// 并发调用，只执行一次挂载
await Promise.all([mountScript('/lib.js'), mountScript('/lib.js')]);
```
