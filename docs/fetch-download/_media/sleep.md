[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / sleep

# Function: sleep()

## Call Signature

> **sleep**(`ms`): `Promise`\<`void`\>

Defined in: [src/async/index.ts:264](https://github.com/janpoem/ts-utils/blob/a9ae0d5ab8db50d99f88de922674a4455e94f5fc/src/async/index.ts#L264)

延迟指定毫秒数，可选延迟后执行函数

### Parameters

#### ms

`number`

延迟毫秒数

### Returns

`Promise`\<`void`\>

无 fn 时返回 Promise<void>，有 fn 时返回 Promise<Awaited<ReturnType<F>>>

### Example

```ts
// 纯等待
await sleep(1000);

// 延迟后执行
const data = await sleep(1000, () => fetchData());
```

## Call Signature

> **sleep**\<`F`\>(`ms`, `fn`): `Promise`\<`Awaited`\<`ReturnType`\<`F`\>\>\>

Defined in: [src/async/index.ts:265](https://github.com/janpoem/ts-utils/blob/a9ae0d5ab8db50d99f88de922674a4455e94f5fc/src/async/index.ts#L265)

延迟指定毫秒数，可选延迟后执行函数

### Type Parameters

#### F

`F` *extends* [`AnyFn`](../type-aliases/AnyFn.md)

### Parameters

#### ms

`number`

延迟毫秒数

#### fn

`F`

延迟后执行的函数（可选）

### Returns

`Promise`\<`Awaited`\<`ReturnType`\<`F`\>\>\>

无 fn 时返回 Promise<void>，有 fn 时返回 Promise<Awaited<ReturnType<F>>>

### Example

```ts
// 纯等待
await sleep(1000);

// 延迟后执行
const data = await sleep(1000, () => fetchData());
```
