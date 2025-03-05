[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / DownloadQueue

# Class: DownloadQueue

Defined in: [src/fetch-download/DownloadQueue.ts:26](https://github.com/janpoem/ts-utils/blob/dd074ed257fa79d98e072518ca260e5de071ed30/src/fetch-download/DownloadQueue.ts#L26)

## Constructors

### new DownloadQueue()

> **new DownloadQueue**(`tasks`): [`DownloadQueue`](DownloadQueue.md)

Defined in: [src/fetch-download/DownloadQueue.ts:79](https://github.com/janpoem/ts-utils/blob/dd074ed257fa79d98e072518ca260e5de071ed30/src/fetch-download/DownloadQueue.ts#L79)

创建 [DownloadQueue](DownloadQueue.md) 实例，允许多种 input 类型

```ts
// DownloadTask
const task1 = new DownloadQueue([new DownloadTask('url')]);
const task2 = new DownloadQueue([fetchDownload('url')]);

// URL 输入
const task3 = new DownloadQueue(['url']);
const task4 = new DownloadQueue([new URL('url')]);

// Request or DownloadRequest 结构
const task5 = new DownloadQueue([new Request('url')]);
const task6 = new DownloadQueue([{ url: 'url' }]);

// Promise<Response>
const abort = new AbortController();
const task7 = new DownloadQueue([
  fetch('url', { signal: abort.signal }),
]);

// Response
const task8 = new DownloadTask([
  await fetch('url'),
]);
```

#### Parameters

##### tasks

[`DownloadQueueInput`](../type-aliases/DownloadQueueInput.md)[]

#### Returns

[`DownloadQueue`](DownloadQueue.md)

## Accessors

### completeTs

#### Get Signature

> **get** **completeTs**(): `number`

Defined in: [src/fetch-download/DownloadQueue.ts:189](https://github.com/janpoem/ts-utils/blob/dd074ed257fa79d98e072518ca260e5de071ed30/src/fetch-download/DownloadQueue.ts#L189)

read 完成时间戳（所有下载任务都完成）

- 如果下载未开始，返回 0
- 如果下载已开始，但并未下载完成，则会返回当前时间的时间戳

##### Returns

`number`

***

### contentLength

#### Get Signature

> **get** **contentLength**(): `number`

Defined in: [src/fetch-download/DownloadQueue.ts:128](https://github.com/janpoem/ts-utils/blob/dd074ed257fa79d98e072518ca260e5de071ed30/src/fetch-download/DownloadQueue.ts#L128)

所有下载任务的 Content-Length 总和

##### Returns

`number`

***

### elapsedMs

#### Get Signature

> **get** **elapsedMs**(): `number`

Defined in: [src/fetch-download/DownloadQueue.ts:203](https://github.com/janpoem/ts-utils/blob/dd074ed257fa79d98e072518ca260e5de071ed30/src/fetch-download/DownloadQueue.ts#L203)

read 数据经过多少时间（毫秒，所有下载任务都完成）

如果为实际完成，则返回当前时间的时间戳

如果未开始，则返回 0

##### Returns

`number`

***

### error

#### Get Signature

> **get** **error**(): `unknown`

Defined in: [src/fetch-download/DownloadQueue.ts:179](https://github.com/janpoem/ts-utils/blob/dd074ed257fa79d98e072518ca260e5de071ed30/src/fetch-download/DownloadQueue.ts#L179)

获取错误信息

##### Returns

`unknown`

***

### id

#### Get Signature

> **get** **id**(): `string`

Defined in: [src/fetch-download/DownloadQueue.ts:89](https://github.com/janpoem/ts-utils/blob/dd074ed257fa79d98e072518ca260e5de071ed30/src/fetch-download/DownloadQueue.ts#L89)

[DownloadQueue](DownloadQueue.md) Id

##### Returns

`string`

***

### isReaded

#### Get Signature

> **get** **isReaded**(): `boolean`

Defined in: [src/fetch-download/DownloadQueue.ts:172](https://github.com/janpoem/ts-utils/blob/dd074ed257fa79d98e072518ca260e5de071ed30/src/fetch-download/DownloadQueue.ts#L172)

是否已经 read 完毕

##### Returns

`boolean`

***

### isStarted

#### Get Signature

> **get** **isStarted**(): `boolean`

Defined in: [src/fetch-download/DownloadQueue.ts:165](https://github.com/janpoem/ts-utils/blob/dd074ed257fa79d98e072518ca260e5de071ed30/src/fetch-download/DownloadQueue.ts#L165)

是否开始 read

##### Returns

`boolean`

***

### percent

#### Get Signature

> **get** **percent**(): `number`

Defined in: [src/fetch-download/DownloadQueue.ts:158](https://github.com/janpoem/ts-utils/blob/dd074ed257fa79d98e072518ca260e5de071ed30/src/fetch-download/DownloadQueue.ts#L158)

所有下载任务的接收 Response body 进度百分比（0 - 100）

##### Returns

`number`

***

### progress

#### Get Signature

> **get** **progress**(): `number`

Defined in: [src/fetch-download/DownloadQueue.ts:146](https://github.com/janpoem/ts-utils/blob/dd074ed257fa79d98e072518ca260e5de071ed30/src/fetch-download/DownloadQueue.ts#L146)

所有下载任务的接收 Response body 进度小数（0 - 1）

##### Returns

`number`

***

### received

#### Get Signature

> **get** **received**(): `number`

Defined in: [src/fetch-download/DownloadQueue.ts:137](https://github.com/janpoem/ts-utils/blob/dd074ed257fa79d98e072518ca260e5de071ed30/src/fetch-download/DownloadQueue.ts#L137)

所有下载任务的已接收 Response body 大小

##### Returns

`number`

***

### size

#### Get Signature

> **get** **size**(): `number`

Defined in: [src/fetch-download/DownloadQueue.ts:119](https://github.com/janpoem/ts-utils/blob/dd074ed257fa79d98e072518ca260e5de071ed30/src/fetch-download/DownloadQueue.ts#L119)

所有下载任务的实际总大小

##### Returns

`number`

***

### speed

#### Get Signature

> **get** **speed**(): `number`

Defined in: [src/fetch-download/DownloadQueue.ts:221](https://github.com/janpoem/ts-utils/blob/dd074ed257fa79d98e072518ca260e5de071ed30/src/fetch-download/DownloadQueue.ts#L221)

接收速度（所有下载任务的平均值），单位为字节/秒，需要自行转换

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

Defined in: [src/fetch-download/DownloadQueue.ts:112](https://github.com/janpoem/ts-utils/blob/dd074ed257fa79d98e072518ca260e5de071ed30/src/fetch-download/DownloadQueue.ts#L112)

当前状态 [DownloadTaskState](../enumerations/DownloadTaskState.md)

注意 [DownloadQueue](DownloadQueue.md) 不应该出现 `fetching` 状态

##### Returns

[`DownloadTaskState`](../enumerations/DownloadTaskState.md)

***

### tasks

#### Get Signature

> **get** **tasks**(): [`DownloadTask`](DownloadTask.md)[]

Defined in: [src/fetch-download/DownloadQueue.ts:96](https://github.com/janpoem/ts-utils/blob/dd074ed257fa79d98e072518ca260e5de071ed30/src/fetch-download/DownloadQueue.ts#L96)

所有下载任务

##### Returns

[`DownloadTask`](DownloadTask.md)[]

***

### tasksCount

#### Get Signature

> **get** **tasksCount**(): `number`

Defined in: [src/fetch-download/DownloadQueue.ts:103](https://github.com/janpoem/ts-utils/blob/dd074ed257fa79d98e072518ca260e5de071ed30/src/fetch-download/DownloadQueue.ts#L103)

所有下载任务的总数

##### Returns

`number`

## Methods

### \_initTasksQueue()

> `protected` **\_initTasksQueue**(`opts`?): `Promise`\<[`DownloadTask`](DownloadTask.md)\>[]

Defined in: [src/fetch-download/DownloadQueue.ts:228](https://github.com/janpoem/ts-utils/blob/dd074ed257fa79d98e072518ca260e5de071ed30/src/fetch-download/DownloadQueue.ts#L228)

#### Parameters

##### opts?

[`DownloadQueueProcessOptions`](../type-aliases/DownloadQueueProcessOptions.md)

#### Returns

`Promise`\<[`DownloadTask`](DownloadTask.md)\>[]

***

### newErr()

> **newErr**(`msg`): [`DownloadQueueError`](DownloadQueueError.md)

Defined in: [src/fetch-download/DownloadQueue.ts:291](https://github.com/janpoem/ts-utils/blob/dd074ed257fa79d98e072518ca260e5de071ed30/src/fetch-download/DownloadQueue.ts#L291)

#### Parameters

##### msg

`string`

#### Returns

[`DownloadQueueError`](DownloadQueueError.md)

***

### read()

> **read**(`opts`?): `Promise`\<[`DownloadQueue`](DownloadQueue.md)\>

Defined in: [src/fetch-download/DownloadQueue.ts:251](https://github.com/janpoem/ts-utils/blob/dd074ed257fa79d98e072518ca260e5de071ed30/src/fetch-download/DownloadQueue.ts#L251)

Queue 读取方法（调用每一个 task 的 read）

1. `onFetch`、`onHeaders`、`onProgress`、`onComplete`、`onError` 保留对应每一个 task 的事件
2. `onFinish` 对应 Queue 全部 tasks 读取完毕
3. `onQueueError` 对应 Queue 任意一个 task 读取过程中出错

#### Parameters

##### opts?

[`DownloadTaskProcessCallback`](../type-aliases/DownloadTaskProcessCallback.md) | [`DownloadQueueProcessOptions`](../type-aliases/DownloadQueueProcessOptions.md)

#### Returns

`Promise`\<[`DownloadQueue`](DownloadQueue.md)\>

***

### reduce()

> **reduce**\<`T`\>(`fn`, `initValue`): `T`

Defined in: [src/fetch-download/DownloadQueue.ts:239](https://github.com/janpoem/ts-utils/blob/dd074ed257fa79d98e072518ca260e5de071ed30/src/fetch-download/DownloadQueue.ts#L239)

#### Type Parameters

• **T**

#### Parameters

##### fn

(`acc`, `it`) => `T`

##### initValue

`T`

#### Returns

`T`
