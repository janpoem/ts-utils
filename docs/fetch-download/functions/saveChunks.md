[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / saveChunks

# Function: saveChunks()

> **saveChunks**(`chunks`, `filename`, `mimeType`?): `void`

Defined in: [src/fetch-download/saveChunks.ts:17](https://github.com/janpoem/ts-utils/blob/1ba63f4eed7fec22e5d5024d881e7ce38561da5d/src/fetch-download/saveChunks.ts#L17)

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

`string` | () => `string`

### mimeType?

`null` | `string`

## Returns

`void`
