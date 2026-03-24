[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / mountRemote

# Function: mountRemote()

> **mountRemote**\<`K`\>(`scope`, `options`): `Promise`\<[`MountRemoteResult`](../type-aliases/MountRemoteResult.md)\<`Record`\<`string`, `unknown`\>\>\>

Defined in: [src/remote/mountRemote.ts:302](https://github.com/janpoem/ts-utils/blob/e1c9059704283c01ba11cb71f495bc809435613d/src/remote/mountRemote.ts#L302)

挂载远程资源

基于 scope 做 inflight 去重：并发调用同 scope 只执行一次，结果共享。
Options 类型由 `type` 字段决定，通过 [MountHandlerMap](../interfaces/MountHandlerMap.md) 接口扩展。

内置支持 `js`、`mjs`、`css` 三种类型，其他类型需通过
[registerMountHandler](registerMountHandler.md) 注册处理器。

## Type Parameters

### K

`K` *extends* keyof [`MountHandlerMap`](../interfaces/MountHandlerMap.md)

## Parameters

### scope

`string`

去重标识，同时用作 DOM 元素 id（对于 DOM handler）

### options

`object` & `Parameters`\<[`MountHandlerMap`](../interfaces/MountHandlerMap.md)\[`K`\]\>\[`1`\]

挂载选项，类型由 `type` 决定

## Returns

`Promise`\<[`MountRemoteResult`](../type-aliases/MountRemoteResult.md)\<`Record`\<`string`, `unknown`\>\>\>

## Examples

```ts
await mountRemote('jquery', {
  type: 'js',
  url: 'https://cdn.example.com/jquery.min.js',
});
```

```ts
await Promise.all([
  mountRemote('lib', { type: 'js', url }),
  mountRemote('lib', { type: 'js', url }),
]);
// 只加载一次
```
