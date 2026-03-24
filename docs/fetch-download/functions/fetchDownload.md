[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / fetchDownload

# Function: fetchDownload()

> **fetchDownload**\<`T`, `R`\>(`input`): `R`

Defined in: [src/fetch-download/fetchDownload.ts:18](https://github.com/janpoem/ts-utils/blob/a9ae0d5ab8db50d99f88de922674a4455e94f5fc/src/fetch-download/fetchDownload.ts#L18)

创建 [DownloadTask](../classes/DownloadTask.md) 或 [DownloadQueue](../classes/DownloadQueue.md) 的快捷方法

```ts
// DownloadTask
const task = fetchDownload('url');

// DownloadQueue
const queue = fetchDownload(['url-a', 'url-b', 'url-c']);
```

## Type Parameters

### T

`T` *extends* [`DownloadInput`](../type-aliases/DownloadInput.md) \| [`DownloadInput`](../type-aliases/DownloadInput.md)[]

### R

`R` = `T` *extends* [`DownloadInput`](../type-aliases/DownloadInput.md) ? [`DownloadTask`](../classes/DownloadTask.md) : [`DownloadQueue`](../classes/DownloadQueue.md)

## Parameters

### input

`T`

## Returns

`R`
