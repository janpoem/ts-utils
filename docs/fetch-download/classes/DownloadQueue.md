[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / DownloadQueue

# Class: DownloadQueue

Defined in: [src/fetch-download/DownloadQueue.ts:17](https://github.com/janpoem/ts-utils/blob/647769c6ab17fbf959411c087c243d48d7d88bf8/src/fetch-download/DownloadQueue.ts#L17)

## Implements

- [`DownloadProcessImpl`](../interfaces/DownloadProcessImpl.md)

## Constructors

### new DownloadQueue()

> **new DownloadQueue**(`tasks`): [`DownloadQueue`](DownloadQueue.md)

Defined in: [src/fetch-download/DownloadQueue.ts:20](https://github.com/janpoem/ts-utils/blob/647769c6ab17fbf959411c087c243d48d7d88bf8/src/fetch-download/DownloadQueue.ts#L20)

#### Parameters

##### tasks

[`DownloadTask`](DownloadTask.md)[]

#### Returns

[`DownloadQueue`](DownloadQueue.md)

## Methods

### newErr()

> **newErr**(`msg`): [`DownloadQueueError`](DownloadQueueError.md)

Defined in: [src/fetch-download/DownloadQueue.ts:48](https://github.com/janpoem/ts-utils/blob/647769c6ab17fbf959411c087c243d48d7d88bf8/src/fetch-download/DownloadQueue.ts#L48)

#### Parameters

##### msg

`string`

#### Returns

[`DownloadQueueError`](DownloadQueueError.md)

#### Implementation of

[`DownloadProcessImpl`](../interfaces/DownloadProcessImpl.md).[`newErr`](../interfaces/DownloadProcessImpl.md#newerr)

***

### read()

> **read**(`opts`): `Promise`\<[`DownloadQueue`](DownloadQueue.md)\>

Defined in: [src/fetch-download/DownloadQueue.ts:24](https://github.com/janpoem/ts-utils/blob/647769c6ab17fbf959411c087c243d48d7d88bf8/src/fetch-download/DownloadQueue.ts#L24)

#### Parameters

##### opts

[`DownloadProcessCallback`](../type-aliases/DownloadProcessCallback.md)\<[`DownloadQueue`](DownloadQueue.md)\> | [`DownloadProcessOptions`](../type-aliases/DownloadProcessOptions.md)\<[`DownloadQueue`](DownloadQueue.md)\>

#### Returns

`Promise`\<[`DownloadQueue`](DownloadQueue.md)\>

#### Implementation of

[`DownloadProcessImpl`](../interfaces/DownloadProcessImpl.md).[`read`](../interfaces/DownloadProcessImpl.md#read)
