[**@zenstone/ts-utils**](../../README.md)

***

[@zenstone/ts-utils](../../modules.md) / [fetch-download](../README.md) / fetchDownload

# Function: fetchDownload()

> **fetchDownload**\<`T`, `R`\>(`input`): `R`

Defined in: [src/fetch-download/fetchDownload.ts:18](https://github.com/janpoem/ts-utils/blob/cc47b42336ba4f377a5b240d70447dc1812f8c94/src/fetch-download/fetchDownload.ts#L18)

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
