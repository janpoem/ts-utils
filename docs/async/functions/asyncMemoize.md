[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / asyncMemoize

# Function: asyncMemoize()

> **asyncMemoize**\<`T`\>(`fn`, `options?`): (...`args`) => `Promise`\<`T`\> & `object`

Defined in: src/async/index.ts:218

异步函数记忆化

## Type Parameters

### T

`T`

## Parameters

### fn

`AsyncFn`\<`T`\>

异步函数

### options?

[`AsyncMemoizeOptions`](../type-aliases/AsyncMemoizeOptions.md) = `{}`

缓存选项

## Returns

(...`args`) => `Promise`\<`T`\> & `object`

记忆化后的函数

## Example

```ts
const fetchUser = asyncMemoize(
  (id: string) => fetch(`/api/user/${id}`).then(r => r.json()),
  { ttl: 60000 }
);

// 第一次调用，会执行 fetch
const user1 = await fetchUser('123');

// 60秒内再次调用，直接返回缓存结果
const user2 = await fetchUser('123');
```
