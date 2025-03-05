[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / fetchDownload

# Function: fetchDownload()

> **fetchDownload**\<`T`, `R`\>(`input`): `R`

Defined in: [src/fetch-download/fetchDownload.ts:18](https://github.com/janpoem/ts-utils/blob/034fdce9c8e357e20394a193c81088a159ce6f86/src/fetch-download/fetchDownload.ts#L18)

创建 [DownloadTask](../classes/DownloadTask.md) 或 [DownloadQueue](../classes/DownloadQueue.md) 的快捷方法

```ts
// DownloadTask
const task = fetchDownload('url');

// DownloadQueue
const queue = fetchDownload(['url-a', 'url-b', 'url-c']);
```

## Type Parameters

• **T** *extends* [`DownloadInput`](../type-aliases/DownloadInput.md) \| [`DownloadInput`](../type-aliases/DownloadInput.md)[]

• **R** = `T` *extends* [`DownloadInput`](../type-aliases/DownloadInput.md) ? [`DownloadTask`](../classes/DownloadTask.md) : [`DownloadQueue`](../classes/DownloadQueue.md)

## Parameters

### input

`T`

## Returns

`R`
