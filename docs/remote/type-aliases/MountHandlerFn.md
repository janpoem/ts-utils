[**@zenstone/ts-utils**](../../README.md)

***

[@zenstone/ts-utils](../../modules.md) / [remote](../README.md) / MountHandlerFn

# Type Alias: MountHandlerFn\<Options, Result\>

> **MountHandlerFn**\<`Options`, `Result`\> = (`ctx`, `opts`) => `Promise`\<[`MountRemoteResult`](MountRemoteResult.md)\<`Result`\>\> \| [`MountRemoteResult`](MountRemoteResult.md)\<`Result`\>

Defined in: [src/remote/mountRemote.ts:65](https://github.com/janpoem/ts-utils/blob/cc47b42336ba4f377a5b240d70447dc1812f8c94/src/remote/mountRemote.ts#L65)

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
