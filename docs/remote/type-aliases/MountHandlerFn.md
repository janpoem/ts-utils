[**@zenstone/ts-utils**](../../README.md)

***

[@zenstone/ts-utils](../../modules.md) / [remote](../README.md) / MountHandlerFn

# Type Alias: MountHandlerFn\<Options, Result\>

> **MountHandlerFn**\<`Options`, `Result`\> = (`ctx`, `opts`) => `Promise`\<[`MountRemoteResult`](MountRemoteResult.md)\<`Result`\>\> \| [`MountRemoteResult`](MountRemoteResult.md)\<`Result`\>

Defined in: [src/remote/mountRemote.ts:65](https://github.com/janpoem/ts-utils/blob/e6f0e2dae5b274785affda26cac7db86fc0832b2/src/remote/mountRemote.ts#L65)

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
