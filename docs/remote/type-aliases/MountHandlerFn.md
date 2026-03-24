[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / MountHandlerFn

# Type Alias: MountHandlerFn\<Options, Result\>

> **MountHandlerFn**\<`Options`, `Result`\> = (`ctx`, `opts`) => `Promise`\<[`MountRemoteResult`](MountRemoteResult.md)\<`Result`\>\> \| [`MountRemoteResult`](MountRemoteResult.md)\<`Result`\>

Defined in: [src/remote/mountRemote.ts:58](https://github.com/janpoem/ts-utils/blob/a9ae0d5ab8db50d99f88de922674a4455e94f5fc/src/remote/mountRemote.ts#L58)

类型安全的 handler 函数

## Type Parameters

### Options

`Options` *extends* `Record`\<`string`, `unknown`\> = `Record`\<`string`, `unknown`\>

### Result

`Result` *extends* `Record`\<`string`, `unknown`\> = `Record`\<`string`, `unknown`\>

## Parameters

### ctx

[`MountHandlerContext`](MountHandlerContext.md)\<`Options`\>

### opts

`Options`

## Returns

`Promise`\<[`MountRemoteResult`](MountRemoteResult.md)\<`Result`\>\> \| [`MountRemoteResult`](MountRemoteResult.md)\<`Result`\>
