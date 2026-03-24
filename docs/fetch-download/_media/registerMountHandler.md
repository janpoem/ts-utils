[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / registerMountHandler

# Function: registerMountHandler()

> **registerMountHandler**\<`K`\>(`type`, `handler`): `void`

Defined in: [src/remote/mountRemote.ts:108](https://github.com/janpoem/ts-utils/blob/a9ae0d5ab8db50d99f88de922674a4455e94f5fc/src/remote/mountRemote.ts#L108)

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
