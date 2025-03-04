[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / DownloadTask

# Class: DownloadTask

Defined in: [src/fetch-download/DownloadTask.ts:32](https://github.com/janpoem/ts-utils/blob/b9219c6997c227d9b9eb09f22e1ab95d12d9260c/src/fetch-download/DownloadTask.ts#L32)

## Implements

- [`DownloadProcessImpl`](../interfaces/DownloadProcessImpl.md)

## Constructors

### new DownloadTask()

> **new DownloadTask**(`input`): [`DownloadTask`](DownloadTask.md)

Defined in: [src/fetch-download/DownloadTask.ts:101](https://github.com/janpoem/ts-utils/blob/b9219c6997c227d9b9eb09f22e1ab95d12d9260c/src/fetch-download/DownloadTask.ts#L101)

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

Defined in: [src/fetch-download/DownloadTask.ts:211](https://github.com/janpoem/ts-utils/blob/b9219c6997c227d9b9eb09f22e1ab95d12d9260c/src/fetch-download/DownloadTask.ts#L211)

获取 Response body 的 chunks

##### Returns

`undefined` \| `Uint8Array`\<`ArrayBufferLike`\>

***

### completeTs

#### Get Signature

> **get** **completeTs**(): `number`

Defined in: [src/fetch-download/DownloadTask.ts:239](https://github.com/janpoem/ts-utils/blob/b9219c6997c227d9b9eb09f22e1ab95d12d9260c/src/fetch-download/DownloadTask.ts#L239)

下载完成时间戳

- 如果下载未开始，返回 0
- 如果下载已开始，但并未下载完成，则会返回当前时间的时间戳

##### Returns

`number`

***

### contentLength

#### Get Signature

> **get** **contentLength**(): `number`

Defined in: [src/fetch-download/DownloadTask.ts:155](https://github.com/janpoem/ts-utils/blob/b9219c6997c227d9b9eb09f22e1ab95d12d9260c/src/fetch-download/DownloadTask.ts#L155)

获取 Response Content-Length 的大小

##### Returns

`number`

***

### elapsedMs

#### Get Signature

> **get** **elapsedMs**(): `number`

Defined in: [src/fetch-download/DownloadTask.ts:249](https://github.com/janpoem/ts-utils/blob/b9219c6997c227d9b9eb09f22e1ab95d12d9260c/src/fetch-download/DownloadTask.ts#L249)

接收数据经过多少时间（秒）

##### Returns

`number`

***

### encoding

#### Get Signature

> **get** **encoding**(): `null` \| `string`

Defined in: [src/fetch-download/DownloadTask.ts:162](https://github.com/janpoem/ts-utils/blob/b9219c6997c227d9b9eb09f22e1ab95d12d9260c/src/fetch-download/DownloadTask.ts#L162)

获取 Content-Encoding

##### Returns

`null` \| `string`

***

### error

#### Get Signature

> **get** **error**(): `unknown`

Defined in: [src/fetch-download/DownloadTask.ts:229](https://github.com/janpoem/ts-utils/blob/b9219c6997c227d9b9eb09f22e1ab95d12d9260c/src/fetch-download/DownloadTask.ts#L229)

获取错误信息

##### Returns

`unknown`

***

### id

#### Get Signature

> **get** **id**(): `string`

Defined in: [src/fetch-download/DownloadTask.ts:134](https://github.com/janpoem/ts-utils/blob/b9219c6997c227d9b9eb09f22e1ab95d12d9260c/src/fetch-download/DownloadTask.ts#L134)

[DownloadTask](DownloadTask.md) Id

用于给 [DownloadTask](DownloadTask.md) 的 Key 使用

##### Returns

`string`

***

### isCompressed

#### Get Signature

> **get** **isCompressed**(): `boolean`

Defined in: [src/fetch-download/DownloadTask.ts:183](https://github.com/janpoem/ts-utils/blob/b9219c6997c227d9b9eb09f22e1ab95d12d9260c/src/fetch-download/DownloadTask.ts#L183)

是否经过压缩

##### Returns

`boolean`

***

### isReaded

#### Get Signature

> **get** **isReaded**(): `boolean`

Defined in: [src/fetch-download/DownloadTask.ts:222](https://github.com/janpoem/ts-utils/blob/b9219c6997c227d9b9eb09f22e1ab95d12d9260c/src/fetch-download/DownloadTask.ts#L222)

是否已经读取 Response body

##### Returns

`boolean`

***

### isStarted

#### Get Signature

> **get** **isStarted**(): `boolean`

Defined in: [src/fetch-download/DownloadTask.ts:215](https://github.com/janpoem/ts-utils/blob/b9219c6997c227d9b9eb09f22e1ab95d12d9260c/src/fetch-download/DownloadTask.ts#L215)

##### Returns

`boolean`

***

### mimeType

#### Get Signature

> **get** **mimeType**(): `null` \| `string`

Defined in: [src/fetch-download/DownloadTask.ts:169](https://github.com/janpoem/ts-utils/blob/b9219c6997c227d9b9eb09f22e1ab95d12d9260c/src/fetch-download/DownloadTask.ts#L169)

获取内容的 MIME 类型

##### Returns

`null` \| `string`

***

### percent

#### Get Signature

> **get** **percent**(): `number`

Defined in: [src/fetch-download/DownloadTask.ts:204](https://github.com/janpoem/ts-utils/blob/b9219c6997c227d9b9eb09f22e1ab95d12d9260c/src/fetch-download/DownloadTask.ts#L204)

接收进度百分比（0 - 100）

##### Returns

`number`

***

### progress

#### Get Signature

> **get** **progress**(): `number`

Defined in: [src/fetch-download/DownloadTask.ts:197](https://github.com/janpoem/ts-utils/blob/b9219c6997c227d9b9eb09f22e1ab95d12d9260c/src/fetch-download/DownloadTask.ts#L197)

接收进度小数（0 - 1）

##### Returns

`number`

***

### received

#### Get Signature

> **get** **received**(): `number`

Defined in: [src/fetch-download/DownloadTask.ts:190](https://github.com/janpoem/ts-utils/blob/b9219c6997c227d9b9eb09f22e1ab95d12d9260c/src/fetch-download/DownloadTask.ts#L190)

已接收的内容大小

##### Returns

`number`

***

### resp

#### Get Signature

> **get** **resp**(): `undefined` \| `Response`

Defined in: [src/fetch-download/DownloadTask.ts:141](https://github.com/janpoem/ts-utils/blob/b9219c6997c227d9b9eb09f22e1ab95d12d9260c/src/fetch-download/DownloadTask.ts#L141)

获取 response

##### Returns

`undefined` \| `Response`

***

### size

#### Get Signature

> **get** **size**(): `number`

Defined in: [src/fetch-download/DownloadTask.ts:176](https://github.com/janpoem/ts-utils/blob/b9219c6997c227d9b9eb09f22e1ab95d12d9260c/src/fetch-download/DownloadTask.ts#L176)

实际接收内容的大小

##### Returns

`number`

***

### speed

#### Get Signature

> **get** **speed**(): `number`

Defined in: [src/fetch-download/DownloadTask.ts:256](https://github.com/janpoem/ts-utils/blob/b9219c6997c227d9b9eb09f22e1ab95d12d9260c/src/fetch-download/DownloadTask.ts#L256)

接收速度，单位为字节/秒，需要自行转换

##### Returns

`number`

***

### state

#### Get Signature

> **get** **state**(): [`DownloadTaskState`](../enumerations/DownloadTaskState.md)

Defined in: [src/fetch-download/DownloadTask.ts:148](https://github.com/janpoem/ts-utils/blob/b9219c6997c227d9b9eb09f22e1ab95d12d9260c/src/fetch-download/DownloadTask.ts#L148)

当前状态

##### Returns

[`DownloadTaskState`](../enumerations/DownloadTaskState.md)

## Methods

### inferUncompressedSize()

> **inferUncompressedSize**(`compressedSize`): `number`

Defined in: [src/fetch-download/DownloadTask.ts:413](https://github.com/janpoem/ts-utils/blob/b9219c6997c227d9b9eb09f22e1ab95d12d9260c/src/fetch-download/DownloadTask.ts#L413)

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

### initFetch()

> **initFetch**(`input`): `void`

Defined in: [src/fetch-download/DownloadTask.ts:110](https://github.com/janpoem/ts-utils/blob/b9219c6997c227d9b9eb09f22e1ab95d12d9260c/src/fetch-download/DownloadTask.ts#L110)

#### Parameters

##### input

[`DownloadInput`](../type-aliases/DownloadInput.md)

#### Returns

`void`

***

### newErr()

> **newErr**(`msg`): [`DownloadTaskError`](DownloadTaskError.md)

Defined in: [src/fetch-download/DownloadTask.ts:420](https://github.com/janpoem/ts-utils/blob/b9219c6997c227d9b9eb09f22e1ab95d12d9260c/src/fetch-download/DownloadTask.ts#L420)

#### Parameters

##### msg

`string`

#### Returns

[`DownloadTaskError`](DownloadTaskError.md)

#### Implementation of

[`DownloadProcessImpl`](../interfaces/DownloadProcessImpl.md).[`newErr`](../interfaces/DownloadProcessImpl.md#newerr)

***

### read()

> **read**(`opts`?): `Promise`\<[`DownloadTask`](DownloadTask.md)\>

Defined in: [src/fetch-download/DownloadTask.ts:295](https://github.com/janpoem/ts-utils/blob/b9219c6997c227d9b9eb09f22e1ab95d12d9260c/src/fetch-download/DownloadTask.ts#L295)

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
  isNotThrow: true,     // 禁止抛出异常
  onFetch: () => {},    // fetch 前
  onHeaders: () => {},  // 读取 headers 时，stream read 之前
  onProgress: () => {}, // 每一次接收 chunk 流时
  onComplete: () => {}, // 下载完成时
  onError: () => {},    // 出错时
});
```

#### Parameters

##### opts?

[`DownloadProcessCallback`](../type-aliases/DownloadProcessCallback.md)\<[`DownloadTask`](DownloadTask.md)\> | [`DownloadProcessOptions`](../type-aliases/DownloadProcessOptions.md)\<[`DownloadTask`](DownloadTask.md)\>

#### Returns

`Promise`\<[`DownloadTask`](DownloadTask.md)\>

#### Implementation of

[`DownloadProcessImpl`](../interfaces/DownloadProcessImpl.md).[`read`](../interfaces/DownloadProcessImpl.md#read)

***

### newId()

> `static` **newId**(): `string`

Defined in: [src/fetch-download/DownloadTask.ts:35](https://github.com/janpoem/ts-utils/blob/b9219c6997c227d9b9eb09f22e1ab95d12d9260c/src/fetch-download/DownloadTask.ts#L35)

#### Returns

`string`
