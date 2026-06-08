[**@zenstone/ts-utils**](../../README.md)

***

[@zenstone/ts-utils](../../modules.md) / [fetch-download](../README.md) / saveChunks

# Function: saveChunks()

> **saveChunks**(`chunks`, `filename`, `mimeType?`): `void`

Defined in: [src/fetch-download/saveChunks.ts:17](https://github.com/janpoem/ts-utils/blob/e6f0e2dae5b274785affda26cac7db86fc0832b2/src/fetch-download/saveChunks.ts#L17)

将 chunks 保存到本机，该方法只可在浏览器中执行

```ts
const task = fetchDownload('url');
await task.read();

saveChunks(task.chunks, 'test.js');
```

## Parameters

### chunks

`Uint8Array`

### filename

`string` \| (() => `string`)

### mimeType?

`string` \| `null`

## Returns

`void`
