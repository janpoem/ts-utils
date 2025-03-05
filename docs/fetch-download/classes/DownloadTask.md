[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / DownloadTask

# Class: DownloadTask

Defined in: [src/fetch-download/DownloadTask.ts:41](https://github.com/janpoem/ts-utils/blob/dd074ed257fa79d98e072518ca260e5de071ed30/src/fetch-download/DownloadTask.ts#L41)

## Constructors

### new DownloadTask()

> **new DownloadTask**(`input`): [`DownloadTask`](DownloadTask.md)

Defined in: [src/fetch-download/DownloadTask.ts:108](https://github.com/janpoem/ts-utils/blob/dd074ed257fa79d98e072518ca260e5de071ed30/src/fetch-download/DownloadTask.ts#L108)

创建 [DownloadTask](DownloadTask.md) 实例，允许多种 input 类型

```ts
// URL 输入
const task1 = new DownloadTask('url');
const task2 = new DownloadTask(new URL('url'));

// Request or DownloadRequest 结构
const task3 = new DownloadTask(new Request('url'));
const task4 = new DownloadTask({ url: 'url' });

// Promise<Response>
const abort = new AbortController();
const task5 = new DownloadTask(fetch('url', { signal: abort.signal }));

// Response
const task6 = new DownloadTask(await fetch('url'));
```

下载的目标 url ，必须要输出有效的 `content-length`，否则将会抛出异常

#### Parameters

##### input

`Response` | [`DownloadInput`](../type-aliases/DownloadInput.md)

#### Returns

[`DownloadTask`](DownloadTask.md)

## Accessors

### chunks

#### Get Signature

> **get** **chunks**(): `undefined` \| `Uint8Array`\<`ArrayBufferLike`\>

Defined in: [src/fetch-download/DownloadTask.ts:218](https://github.com/janpoem/ts-utils/blob/dd074ed257fa79d98e072518ca260e5de071ed30/src/fetch-download/DownloadTask.ts#L218)

获取 Response body 的 chunks

##### Returns

`undefined` \| `Uint8Array`\<`ArrayBufferLike`\>

***

### completeTs

#### Get Signature

> **get** **completeTs**(): `number`

Defined in: [src/fetch-download/DownloadTask.ts:249](https://github.com/janpoem/ts-utils/blob/dd074ed257fa79d98e072518ca260e5de071ed30/src/fetch-download/DownloadTask.ts#L249)

read 完成时间戳

- 如果下载未开始，返回 0
- 如果下载已开始，但并未下载完成，则会返回当前时间的时间戳

##### Returns

`number`

***

### contentLength

#### Get Signature

> **get** **contentLength**(): `number`

Defined in: [src/fetch-download/DownloadTask.ts:162](https://github.com/janpoem/ts-utils/blob/dd074ed257fa79d98e072518ca260e5de071ed30/src/fetch-download/DownloadTask.ts#L162)

获取 Response Content-Length

##### Returns

`number`

***

### elapsedMs

#### Get Signature

> **get** **elapsedMs**(): `number`

Defined in: [src/fetch-download/DownloadTask.ts:263](https://github.com/janpoem/ts-utils/blob/dd074ed257fa79d98e072518ca260e5de071ed30/src/fetch-download/DownloadTask.ts#L263)

read 数据经过多少时间（毫秒）

如果为实际完成，则返回当前时间的时间戳

如果未开始，则返回 0

##### Returns

`number`

***

### encoding

#### Get Signature

> **get** **encoding**(): `null` \| `string`

Defined in: [src/fetch-download/DownloadTask.ts:169](https://github.com/janpoem/ts-utils/blob/dd074ed257fa79d98e072518ca260e5de071ed30/src/fetch-download/DownloadTask.ts#L169)

获取 Response Content-Encoding

##### Returns

`null` \| `string`

***

### error

#### Get Signature

> **get** **error**(): `unknown`

Defined in: [src/fetch-download/DownloadTask.ts:239](https://github.com/janpoem/ts-utils/blob/dd074ed257fa79d98e072518ca260e5de071ed30/src/fetch-download/DownloadTask.ts#L239)

获取错误信息

##### Returns

`unknown`

***

### id

#### Get Signature

> **get** **id**(): `string`

Defined in: [src/fetch-download/DownloadTask.ts:141](https://github.com/janpoem/ts-utils/blob/dd074ed257fa79d98e072518ca260e5de071ed30/src/fetch-download/DownloadTask.ts#L141)

[DownloadTask](DownloadTask.md) Id

用于给 [DownloadTask](DownloadTask.md) 的 Key 使用

##### Returns

`string`

***

### isCompressed

#### Get Signature

> **get** **isCompressed**(): `boolean`

Defined in: [src/fetch-download/DownloadTask.ts:190](https://github.com/janpoem/ts-utils/blob/dd074ed257fa79d98e072518ca260e5de071ed30/src/fetch-download/DownloadTask.ts#L190)

Response 是否经过压缩（基于 Content-Encoding 判定）

##### Returns

`boolean`

***

### isReaded

#### Get Signature

> **get** **isReaded**(): `boolean`

Defined in: [src/fetch-download/DownloadTask.ts:232](https://github.com/janpoem/ts-utils/blob/dd074ed257fa79d98e072518ca260e5de071ed30/src/fetch-download/DownloadTask.ts#L232)

是否已经读取（完毕） Response body

##### Returns

`boolean`

***

### isStarted

#### Get Signature

> **get** **isStarted**(): `boolean`

Defined in: [src/fetch-download/DownloadTask.ts:225](https://github.com/janpoem/ts-utils/blob/dd074ed257fa79d98e072518ca260e5de071ed30/src/fetch-download/DownloadTask.ts#L225)

是否开始 read

##### Returns

`boolean`

***

### mimeType

#### Get Signature

> **get** **mimeType**(): `null` \| `string`

Defined in: [src/fetch-download/DownloadTask.ts:176](https://github.com/janpoem/ts-utils/blob/dd074ed257fa79d98e072518ca260e5de071ed30/src/fetch-download/DownloadTask.ts#L176)

获取 Response Content-Type

##### Returns

`null` \| `string`

***

### percent

#### Get Signature

> **get** **percent**(): `number`

Defined in: [src/fetch-download/DownloadTask.ts:211](https://github.com/janpoem/ts-utils/blob/dd074ed257fa79d98e072518ca260e5de071ed30/src/fetch-download/DownloadTask.ts#L211)

接收 Response body 进度百分比（0 - 100）

##### Returns

`number`

***

### progress

#### Get Signature

> **get** **progress**(): `number`

Defined in: [src/fetch-download/DownloadTask.ts:204](https://github.com/janpoem/ts-utils/blob/dd074ed257fa79d98e072518ca260e5de071ed30/src/fetch-download/DownloadTask.ts#L204)

接收 Response body 进度小数（0 - 1）

##### Returns

`number`

***

### received

#### Get Signature

> **get** **received**(): `number`

Defined in: [src/fetch-download/DownloadTask.ts:197](https://github.com/janpoem/ts-utils/blob/dd074ed257fa79d98e072518ca260e5de071ed30/src/fetch-download/DownloadTask.ts#L197)

已接收 Response body 大小

##### Returns

`number`

***

### resp

#### Get Signature

> **get** **resp**(): `undefined` \| `Response`

Defined in: [src/fetch-download/DownloadTask.ts:148](https://github.com/janpoem/ts-utils/blob/dd074ed257fa79d98e072518ca260e5de071ed30/src/fetch-download/DownloadTask.ts#L148)

获取 response

##### Returns

`undefined` \| `Response`

***

### size

#### Get Signature

> **get** **size**(): `number`

Defined in: [src/fetch-download/DownloadTask.ts:183](https://github.com/janpoem/ts-utils/blob/dd074ed257fa79d98e072518ca260e5de071ed30/src/fetch-download/DownloadTask.ts#L183)

实际接收内容的大小

##### Returns

`number`

***

### speed

#### Get Signature

> **get** **speed**(): `number`

Defined in: [src/fetch-download/DownloadTask.ts:281](https://github.com/janpoem/ts-utils/blob/dd074ed257fa79d98e072518ca260e5de071ed30/src/fetch-download/DownloadTask.ts#L281)

接收速度，单位为字节/秒，需要自行转换

如果未开始，返回 0

```ts
import { filesize } from 'filesize';

const task = await fetchDownload().read();

console.log(`${filesize(task.speed, { bits: true })}/s`); // kbit/s
console.log(`${filesize(task.speed)}/s`); // KB/s
```

##### Returns

`number`

***

### state

#### Get Signature

> **get** **state**(): [`DownloadTaskState`](../enumerations/DownloadTaskState.md)

Defined in: [src/fetch-download/DownloadTask.ts:155](https://github.com/janpoem/ts-utils/blob/dd074ed257fa79d98e072518ca260e5de071ed30/src/fetch-download/DownloadTask.ts#L155)

当前状态 [DownloadTaskState](../enumerations/DownloadTaskState.md)

##### Returns

[`DownloadTaskState`](../enumerations/DownloadTaskState.md)

## Methods

### \_initFetch()

> `protected` **\_initFetch**(`input`): `void`

Defined in: [src/fetch-download/DownloadTask.ts:117](https://github.com/janpoem/ts-utils/blob/dd074ed257fa79d98e072518ca260e5de071ed30/src/fetch-download/DownloadTask.ts#L117)

#### Parameters

##### input

[`DownloadInput`](../type-aliases/DownloadInput.md)

#### Returns

`void`

***

### inferUncompressedSize()

> **inferUncompressedSize**(`compressedSize`): `number`

Defined in: [src/fetch-download/DownloadTask.ts:435](https://github.com/janpoem/ts-utils/blob/dd074ed257fa79d98e072518ca260e5de071ed30/src/fetch-download/DownloadTask.ts#L435)

根据压缩后文件大小，推算出未压缩前的文件大小

文本内容的压缩率，实际取决于源内容的重复率，所以无法一概而论。
这里只是尽可能放大压缩后的尺寸，以取得一个较为接近的值

#### Parameters

##### compressedSize

`number`

压缩后的文件大小

#### Returns

`number`

***

### newErr()

> **newErr**(`msg`): [`DownloadTaskError`](DownloadTaskError.md)

Defined in: [src/fetch-download/DownloadTask.ts:442](https://github.com/janpoem/ts-utils/blob/dd074ed257fa79d98e072518ca260e5de071ed30/src/fetch-download/DownloadTask.ts#L442)

#### Parameters

##### msg

`string`

#### Returns

[`DownloadTaskError`](DownloadTaskError.md)

***

### read()

> **read**(`opts`?): `Promise`\<[`DownloadTask`](DownloadTask.md)\>

Defined in: [src/fetch-download/DownloadTask.ts:319](https://github.com/janpoem/ts-utils/blob/dd074ed257fa79d98e072518ca260e5de071ed30/src/fetch-download/DownloadTask.ts#L319)

read response body（下载）

主要的流程：

1. 如果创建 [DownloadTask](DownloadTask.md) 实例时输入的非 Response 实例 [DownloadInput](../type-aliases/DownloadInput.md)
会创建一个函数去 fetch 输入（主要是 fetch headers，如果传入的是 Response 实例，则跳过这一步）。
    - `onFetch` 对应 fetch 前
2. 解析 `Response.headers`，并提取 `content-length`、`content-type`、`content-encoding`，
其中 `content-length` 为必须的（缺失或小于或等于0时将抛出错误）。
    - `onHeaders`
3. `stream.read` 实际开始下载
    - `onProgress` 每一次接收 chunk 流
    - `onComplete` 下载完成
    - `onError` 出错时

默认状态下，任意错误都会抛出异常，可通过 `opts.isNotThrow` 为 `true` 禁用抛出异常。

```ts
const task = new DownloadTask('download_url');
await task.read({
  onFetch: () => {},    // fetch 前
  onHeaders: () => {},  // 读取 headers 时，stream read 之前
  onProgress: () => {}, // 每一次接收 chunk 流时
  onComplete: () => {}, // 下载完成时
  onError: () => {},    // 出错时
});
```

#### Parameters

##### opts?

[`DownloadTaskProcessCallback`](../type-aliases/DownloadTaskProcessCallback.md) | [`DownloadTaskProcessOptions`](../type-aliases/DownloadTaskProcessOptions.md)

#### Returns

`Promise`\<[`DownloadTask`](DownloadTask.md)\>
