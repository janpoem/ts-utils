[**@zenstone/ts-utils**](../../README.md)

***

[@zenstone/ts-utils](../../modules.md) / [misc](../README.md) / singleton

# Function: singleton()

## Call Signature

> **singleton**\<`F`\>(`factory`): (...`args`) => `ReturnType`\<`F`\>

Defined in: [src/misc/singleton.ts:33](https://github.com/janpoem/ts-utils/blob/a6181273044ad30164507cc181a58cccd8e952df/src/misc/singleton.ts#L33)

单例工厂

同步工厂返回 T，异步工厂返回 Promise<T>。
异步分支内部处理并发竞态：多个并发调用只执行一次工厂，共享同一个 inflight Promise。

### Type Parameters

#### F

`F` *extends* (...`args`) => `Promise`\<`any`\>

### Parameters

#### factory

`F`

工厂函数（同步或异步均可）

### Returns

包装后的函数，首次调用执行工厂，后续调用直接返回缓存实例

(...`args`) => `ReturnType`\<`F`\>

### Examples

**同步**

```ts
const getDb = singleton(() => new Database());
const db = getDb(); // 每次调用返回同一个实例
```

**异步**

```ts
const getClient = singleton(async () => {
  const client = new ApiClient();
  await client.connect();
  return client;
});

// 并发调用，只初始化一次
const [a, b] = await Promise.all([getClient(), getClient()]);
// a === b
```

## Call Signature

> **singleton**\<`F`\>(`factory`): (...`args`) => `ReturnType`\<`F`\>

Defined in: [src/misc/singleton.ts:36](https://github.com/janpoem/ts-utils/blob/a6181273044ad30164507cc181a58cccd8e952df/src/misc/singleton.ts#L36)

单例工厂

同步工厂返回 T，异步工厂返回 Promise<T>。
异步分支内部处理并发竞态：多个并发调用只执行一次工厂，共享同一个 inflight Promise。

### Type Parameters

#### F

`F` *extends* `AnyFn`

### Parameters

#### factory

`F`

工厂函数（同步或异步均可）

### Returns

包装后的函数，首次调用执行工厂，后续调用直接返回缓存实例

(...`args`) => `ReturnType`\<`F`\>

### Examples

**同步**

```ts
const getDb = singleton(() => new Database());
const db = getDb(); // 每次调用返回同一个实例
```

**异步**

```ts
const getClient = singleton(async () => {
  const client = new ApiClient();
  await client.connect();
  return client;
});

// 并发调用，只初始化一次
const [a, b] = await Promise.all([getClient(), getClient()]);
// a === b
```
