[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / pending

# Function: pending()

> **pending**\<`F`\>(`scope`, `fn`): (...`args`) => `Promise`\<`Awaited`\<`ReturnType`\<`F`\>\>\>

Defined in: [src/async/pending.ts:158](https://github.com/janpoem/ts-utils/blob/a9ae0d5ab8db50d99f88de922674a4455e94f5fc/src/async/pending.ts#L158)

基于 scope 的 inflight 去重

同一 scope 下并发调用只执行一次 fn，所有 callers 共享同一个 Promise 结果。
执行完毕后 scope 释放，下一次调用开启新的执行周期。

## Type Parameters

### F

`F` *extends* [`AnyFn`](../type-aliases/AnyFn.md)

## Parameters

### scope

`string` \| ((...`args`) => `string`)

静态 scope 字符串，或基于参数动态生成 scope 的函数

### fn

`F`

要包装的函数（同步或异步）

## Returns

包装后的去重函数

(...`args`) => `Promise`\<`Awaited`\<`ReturnType`\<`F`\>\>\>

## Examples

```ts
const fetchConfig = pending('config', () => fetch('/api/config').then(r => r.json()));

// 并发调用 3 次，只执行 1 次 fetch
const [a, b, c] = await Promise.all([fetchConfig(), fetchConfig(), fetchConfig()]);
// a === b === c
```

```ts
const fetchUser = pending(
  (id: string) => `user:${id}`,
  (id: string) => fetch(`/api/user/${id}`).then(r => r.json()),
);

// 相同 id 去重，不同 id 独立执行
await Promise.all([fetchUser('1'), fetchUser('1'), fetchUser('2')]);
// fetchUser('1') 只执行一次，fetchUser('2') 独立执行一次
```
