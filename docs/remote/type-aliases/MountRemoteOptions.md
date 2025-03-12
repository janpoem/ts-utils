[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / MountRemoteOptions

# Type Alias: MountRemoteOptions\<R\>

> **MountRemoteOptions**\<`R`\>: `object`

Defined in: [src/remote/mountRemote.ts:23](https://github.com/janpoem/ts-utils/blob/b61bddc532949fab14342589ffa2d587c10fb6e1/src/remote/mountRemote.ts#L23)

## Type Parameters

• **R**

## Type declaration

### attrs?

> `optional` **attrs**: `Record`\<`string`, `string`\>

远程资源加载的标签需要额外写入的标签属性

### handle?

> `optional` **handle**: [`MountRemoteHandle`](MountRemoteHandle.md)\<`R`\>

自定义的远程资源加载方式，用于实现更多加载机制，诸如 rjs, blob, image 等

#### Param

### id

> **id**: `string` \| () => `string`

远程资源加载后的 ID，必填

### onError()?

> `optional` **onError**: (`error`, `res`?) => `void` \| `Promise`\<`void`\>

加载出错时

#### Parameters

##### error

`unknown`

##### res?

[`MountRemoteResult`](MountRemoteResult.md)\<`R`\>

#### Returns

`void` \| `Promise`\<`void`\>

### onLoad()?

> `optional` **onLoad**: (`res`) => `void` \| `Promise`\<`void`\>

加载成功时

#### Parameters

##### res

[`MountRemoteResult`](MountRemoteResult.md)\<`R`\>

#### Returns

`void` \| `Promise`\<`void`\>

### type

> **type**: [`MountRemoteType`](MountRemoteType.md) \| () => [`MountRemoteType`](MountRemoteType.md)

远程资源类型，必填

### url

> **url**: `string`

远程资源的 URL，必填
