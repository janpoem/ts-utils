[**@zenstone/ts-utils**](../../README.md)

***

[@zenstone/ts-utils](../../modules.md) / [remote](../README.md) / registerMountHandler

# Function: registerMountHandler()

> **registerMountHandler**\<`K`\>(`type`, `handler`): `void`

Defined in: [src/remote/mountRemote.ts:115](https://github.com/janpoem/ts-utils/blob/e6f0e2dae5b274785affda26cac7db86fc0832b2/src/remote/mountRemote.ts#L115)

注册挂载类型处理器

## Type Parameters

### K

`K` *extends* keyof [`MountHandlerMap`](../interfaces/MountHandlerMap.md)

## Parameters

### type

`K`

资源类型标识

### handler

[`MountHandlerMap`](../interfaces/MountHandlerMap.md)\[`K`\]

处理函数

## Returns

`void`

## Example

```ts
registerMountHandler('wasm', async (ctx, opts) => {
  const response = await fetch(opts.url);
  const module = await WebAssembly.instantiateStreaming(response, opts.importObject);
  return { type: ctx.type, scope: ctx.scope, url: opts.url, module };
});
```
