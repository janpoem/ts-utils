[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / MountDomOptions

# Type Alias: MountDomOptions

> **MountDomOptions** = `object`

Defined in: [src/remote/mountRemote.ts:40](https://github.com/janpoem/ts-utils/blob/a9ae0d5ab8db50d99f88de922674a4455e94f5fc/src/remote/mountRemote.ts#L40)

DOM 类型 handler 的通用选项

## Properties

### attrs?

> `optional` **attrs?**: `Record`\<`string`, `string`\>

Defined in: [src/remote/mountRemote.ts:42](https://github.com/janpoem/ts-utils/blob/a9ae0d5ab8db50d99f88de922674a4455e94f5fc/src/remote/mountRemote.ts#L42)

***

### onError?

> `optional` **onError?**: (`err`, `ctx`, `opts`) => `void`

Defined in: [src/remote/mountRemote.ts:44](https://github.com/janpoem/ts-utils/blob/a9ae0d5ab8db50d99f88de922674a4455e94f5fc/src/remote/mountRemote.ts#L44)

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

Defined in: [src/remote/mountRemote.ts:43](https://github.com/janpoem/ts-utils/blob/a9ae0d5ab8db50d99f88de922674a4455e94f5fc/src/remote/mountRemote.ts#L43)

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

Defined in: [src/remote/mountRemote.ts:41](https://github.com/janpoem/ts-utils/blob/a9ae0d5ab8db50d99f88de922674a4455e94f5fc/src/remote/mountRemote.ts#L41)
