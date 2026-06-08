[**@zenstone/ts-utils**](../../README.md)

***

[@zenstone/ts-utils](../../modules.md) / [remote](../README.md) / MountDomOptions

# Type Alias: MountDomOptions

> **MountDomOptions** = `object`

Defined in: [src/remote/mountRemote.ts:40](https://github.com/janpoem/ts-utils/blob/e6f0e2dae5b274785affda26cac7db86fc0832b2/src/remote/mountRemote.ts#L40)

DOM 类型 handler 的通用选项

## Properties

### attrs?

> `optional` **attrs?**: `Record`\<`string`, `string`\>

Defined in: [src/remote/mountRemote.ts:42](https://github.com/janpoem/ts-utils/blob/e6f0e2dae5b274785affda26cac7db86fc0832b2/src/remote/mountRemote.ts#L42)

***

### onError?

> `optional` **onError?**: (`err`, `ctx`, `opts`) => `void`

Defined in: [src/remote/mountRemote.ts:47](https://github.com/janpoem/ts-utils/blob/e6f0e2dae5b274785affda26cac7db86fc0832b2/src/remote/mountRemote.ts#L47)

#### Parameters

##### err

`unknown`

##### ctx

[`MountHandlerContext`](MountHandlerContext.md)\<`MountDomOptions`\>

##### opts

`MountDomOptions`

#### Returns

`void`

***

### onLoad?

> `optional` **onLoad?**: (`el`, `res`) => `void` \| `Promise`\<`void`\>

Defined in: [src/remote/mountRemote.ts:43](https://github.com/janpoem/ts-utils/blob/e6f0e2dae5b274785affda26cac7db86fc0832b2/src/remote/mountRemote.ts#L43)

#### Parameters

##### el

`HTMLElement`

##### res

[`MountRemoteResult`](MountRemoteResult.md)\<[`MountDomResult`](MountDomResult.md)\>

#### Returns

`void` \| `Promise`\<`void`\>

***

### url

> **url**: `string`

Defined in: [src/remote/mountRemote.ts:41](https://github.com/janpoem/ts-utils/blob/e6f0e2dae5b274785affda26cac7db86fc0832b2/src/remote/mountRemote.ts#L41)
