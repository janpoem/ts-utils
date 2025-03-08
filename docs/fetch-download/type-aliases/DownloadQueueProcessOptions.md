[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / DownloadQueueProcessOptions

# Type Alias: DownloadQueueProcessOptions

> **DownloadQueueProcessOptions**: [`DownloadTaskProcessOptions`](DownloadTaskProcessOptions.md) & `object`

Defined in: [src/fetch-download/DownloadQueue.ts:21](https://github.com/janpoem/ts-utils/blob/5695f5d0e3c2197ae4233c3f441833765430d482/src/fetch-download/DownloadQueue.ts#L21)

## Type declaration

### onFinish()?

> `optional` **onFinish**: (`q`) => `void` \| `Promise`\<`void`\>

#### Parameters

##### q

[`DownloadQueue`](../classes/DownloadQueue.md)

#### Returns

`void` \| `Promise`\<`void`\>

### onQueueError()?

> `optional` **onQueueError**: (`q`) => `void` \| `Promise`\<`void`\>

#### Parameters

##### q

[`DownloadQueue`](../classes/DownloadQueue.md)

#### Returns

`void` \| `Promise`\<`void`\>
