[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / sleep

# Function: sleep()

## Call Signature

> **sleep**(`ms`): `Promise`\<`void`\>

Defined in: [src/async/index.ts:255](https://github.com/janpoem/ts-utils/blob/738489a3f4830c04acd7944aaed6b04e6b346155/src/async/index.ts#L255)

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

Defined in: [src/async/index.ts:256](https://github.com/janpoem/ts-utils/blob/738489a3f4830c04acd7944aaed6b04e6b346155/src/async/index.ts#L256)

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
