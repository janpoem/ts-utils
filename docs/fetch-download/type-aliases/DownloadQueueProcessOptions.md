[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / DownloadQueueProcessOptions

# Type Alias: DownloadQueueProcessOptions

> **DownloadQueueProcessOptions** = `object`

Defined in: [src/fetch-download/DownloadQueue.ts:21](https://github.com/janpoem/ts-utils/blob/a9ae0d5ab8db50d99f88de922674a4455e94f5fc/src/fetch-download/DownloadQueue.ts#L21)

## Properties

### onComplete?

> `optional` **onComplete?**: [`DownloadQueueProcessCallback`](DownloadQueueProcessCallback.md)

Defined in: [src/fetch-download/DownloadQueue.ts:25](https://github.com/janpoem/ts-utils/blob/a9ae0d5ab8db50d99f88de922674a4455e94f5fc/src/fetch-download/DownloadQueue.ts#L25)

***

### onError?

> `optional` **onError?**: [`DownloadQueueProcessCallback`](DownloadQueueProcessCallback.md)

Defined in: [src/fetch-download/DownloadQueue.ts:26](https://github.com/janpoem/ts-utils/blob/a9ae0d5ab8db50d99f88de922674a4455e94f5fc/src/fetch-download/DownloadQueue.ts#L26)

***

### onFetch?

> `optional` **onFetch?**: [`DownloadQueueProcessCallback`](DownloadQueueProcessCallback.md)

Defined in: [src/fetch-download/DownloadQueue.ts:22](https://github.com/janpoem/ts-utils/blob/a9ae0d5ab8db50d99f88de922674a4455e94f5fc/src/fetch-download/DownloadQueue.ts#L22)

***

### onFinish?

> `optional` **onFinish?**: (`queue`) => `void` \| `Promise`\<`void`\>

Defined in: [src/fetch-download/DownloadQueue.ts:27](https://github.com/janpoem/ts-utils/blob/a9ae0d5ab8db50d99f88de922674a4455e94f5fc/src/fetch-download/DownloadQueue.ts#L27)

#### Parameters

##### queue

[`DownloadQueue`](../classes/DownloadQueue.md)

#### Returns

`void` \| `Promise`\<`void`\>

***

### onHeaders?

> `optional` **onHeaders?**: [`DownloadQueueProcessCallback`](DownloadQueueProcessCallback.md)

Defined in: [src/fetch-download/DownloadQueue.ts:23](https://github.com/janpoem/ts-utils/blob/a9ae0d5ab8db50d99f88de922674a4455e94f5fc/src/fetch-download/DownloadQueue.ts#L23)

***

### onProgress?

> `optional` **onProgress?**: [`DownloadQueueProcessCallback`](DownloadQueueProcessCallback.md)

Defined in: [src/fetch-download/DownloadQueue.ts:24](https://github.com/janpoem/ts-utils/blob/a9ae0d5ab8db50d99f88de922674a4455e94f5fc/src/fetch-download/DownloadQueue.ts#L24)

***

### onQueueError?

> `optional` **onQueueError?**: (`queue`) => `void` \| `Promise`\<`void`\>

Defined in: [src/fetch-download/DownloadQueue.ts:28](https://github.com/janpoem/ts-utils/blob/a9ae0d5ab8db50d99f88de922674a4455e94f5fc/src/fetch-download/DownloadQueue.ts#L28)

#### Parameters

##### queue

[`DownloadQueue`](../classes/DownloadQueue.md)

#### Returns

`void` \| `Promise`\<`void`\>
