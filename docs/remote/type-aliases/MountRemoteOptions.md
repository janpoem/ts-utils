[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / MountRemoteOptions

# Type Alias: MountRemoteOptions\<R\>

> **MountRemoteOptions**\<`R`\> = `object`

Defined in: [src/remote/mountRemote.ts:23](https://github.com/janpoem/ts-utils/blob/738489a3f4830c04acd7944aaed6b04e6b346155/src/remote/mountRemote.ts#L23)

## Type Parameters

### R

`R`

## Properties

### attrs?

> `optional` **attrs?**: `Record`\<`string`, `string`\>

Defined in: [src/remote/mountRemote.ts:39](https://github.com/janpoem/ts-utils/blob/738489a3f4830c04acd7944aaed6b04e6b346155/src/remote/mountRemote.ts#L39)

远程资源加载的标签需要额外写入的标签属性

***

### handle?

> `optional` **handle?**: [`MountRemoteHandle`](MountRemoteHandle.md)\<`R`\>

Defined in: [src/remote/mountRemote.ts:45](https://github.com/janpoem/ts-utils/blob/738489a3f4830c04acd7944aaed6b04e6b346155/src/remote/mountRemote.ts#L45)

自定义的远程资源加载方式，用于实现更多加载机制，诸如 rjs, blob, image 等

#### Param

***

### id

> **id**: `string` \| (() => `string`)

Defined in: [src/remote/mountRemote.ts:31](https://github.com/janpoem/ts-utils/blob/738489a3f4830c04acd7944aaed6b04e6b346155/src/remote/mountRemote.ts#L31)

远程资源加载后的 ID，必填

***

### onError?

> `optional` **onError?**: (`error`, `res?`) => `void` \| `Promise`\<`void`\>

Defined in: [src/remote/mountRemote.ts:58](https://github.com/janpoem/ts-utils/blob/738489a3f4830c04acd7944aaed6b04e6b346155/src/remote/mountRemote.ts#L58)

加载出错时

#### Parameters

##### error

`unknown`

##### res?

[`MountRemoteResult`](MountRemoteResult.md)\<`R`\>

#### Returns

`void` \| `Promise`\<`void`\>

***

### onLoad?

> `optional` **onLoad?**: (`res`) => `void` \| `Promise`\<`void`\>

Defined in: [src/remote/mountRemote.ts:51](https://github.com/janpoem/ts-utils/blob/738489a3f4830c04acd7944aaed6b04e6b346155/src/remote/mountRemote.ts#L51)

加载成功时

#### Parameters

##### res

[`MountRemoteResult`](MountRemoteResult.md)\<`R`\>

#### Returns

`void` \| `Promise`\<`void`\>

***

### type

> **type**: [`MountRemoteType`](MountRemoteType.md) \| (() => [`MountRemoteType`](MountRemoteType.md))

Defined in: [src/remote/mountRemote.ts:35](https://github.com/janpoem/ts-utils/blob/738489a3f4830c04acd7944aaed6b04e6b346155/src/remote/mountRemote.ts#L35)

远程资源类型，必填

***

### url

> **url**: `string`

Defined in: [src/remote/mountRemote.ts:27](https://github.com/janpoem/ts-utils/blob/738489a3f4830c04acd7944aaed6b04e6b346155/src/remote/mountRemote.ts#L27)

远程资源的 URL，必填
