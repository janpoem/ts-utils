[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / fetchDownload

# Function: fetchDownload()

> **fetchDownload**\<`T`, `R`\>(`input`): `R`

Defined in: [src/fetch-download/fetchDownload.ts:18](https://github.com/janpoem/ts-utils/blob/609cab258976feb4eb74bcad1a8b6a0cbc4381ba/src/fetch-download/fetchDownload.ts#L18)

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
