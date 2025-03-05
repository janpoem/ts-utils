[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / saveChunks

# Function: saveChunks()

> **saveChunks**(`chunks`, `filename`, `mimeType`?): `void`

Defined in: [src/fetch-download/saveChunks.ts:17](https://github.com/janpoem/ts-utils/blob/034fdce9c8e357e20394a193c81088a159ce6f86/src/fetch-download/saveChunks.ts#L17)

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
