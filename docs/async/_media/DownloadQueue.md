[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / DownloadQueue

# Class: DownloadQueue

Defined in: [src/fetch-download/DownloadQueue.ts:31](https://github.com/janpoem/ts-utils/blob/e1c9059704283c01ba11cb71f495bc809435613d/src/fetch-download/DownloadQueue.ts#L31)

## Constructors

### Constructor

> **new DownloadQueue**(`tasks`): `DownloadQueue`

Defined in: [src/fetch-download/DownloadQueue.ts:84](https://github.com/janpoem/ts-utils/blob/e1c9059704283c01ba11cb71f495bc809435613d/src/fetch-download/DownloadQueue.ts#L84)

创建 DownloadQueue 实例，允许多种 input 类型

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

`DownloadQueue`

## Accessors

### completeTs

#### Get Signature

> **get** **completeTs**(): `number`

Defined in: [src/fetch-download/DownloadQueue.ts:194](https://github.com/janpoem/ts-utils/blob/e1c9059704283c01ba11cb71f495bc809435613d/src/fetch-download/DownloadQueue.ts#L194)

read 完成时间戳（所有下载任务都完成）

- 如果下载未开始，返回 0
- 如果下载已开始，但并未下载完成，则会返回当前时间的时间戳

##### Returns

`number`

***

### contentLength

#### Get Signature

> **get** **contentLength**(): `number`

Defined in: [src/fetch-download/DownloadQueue.ts:133](https://github.com/janpoem/ts-utils/blob/e1c9059704283c01ba11cb71f495bc809435613d/src/fetch-download/DownloadQueue.ts#L133)

所有下载任务的 Content-Length 总和

##### Returns

`number`

***

### elapsedMs

#### Get Signature

> **get** **elapsedMs**(): `number`

Defined in: [src/fetch-download/DownloadQueue.ts:208](https://github.com/janpoem/ts-utils/blob/e1c9059704283c01ba11cb71f495bc809435613d/src/fetch-download/DownloadQueue.ts#L208)

read 数据经过多少时间（毫秒，所有下载任务都完成）

如果为实际完成，则返回当前时间的时间戳

如果未开始，则返回 0

##### Returns

`number`

***

### error

#### Get Signature

> **get** **error**(): `unknown`

Defined in: [src/fetch-download/DownloadQueue.ts:184](https://github.com/janpoem/ts-utils/blob/e1c9059704283c01ba11cb71f495bc809435613d/src/fetch-download/DownloadQueue.ts#L184)

获取错误信息

##### Returns

`unknown`

***

### id

#### Get Signature

> **get** **id**(): `string`

Defined in: [src/fetch-download/DownloadQueue.ts:94](https://github.com/janpoem/ts-utils/blob/e1c9059704283c01ba11cb71f495bc809435613d/src/fetch-download/DownloadQueue.ts#L94)

DownloadQueue Id

##### Returns

`string`

***

### isReaded

#### Get Signature

> **get** **isReaded**(): `boolean`

Defined in: [src/fetch-download/DownloadQueue.ts:177](https://github.com/janpoem/ts-utils/blob/e1c9059704283c01ba11cb71f495bc809435613d/src/fetch-download/DownloadQueue.ts#L177)

是否已经 read 完毕

##### Returns

`boolean`

***

### isStarted

#### Get Signature

> **get** **isStarted**(): `boolean`

Defined in: [src/fetch-download/DownloadQueue.ts:170](https://github.com/janpoem/ts-utils/blob/e1c9059704283c01ba11cb71f495bc809435613d/src/fetch-download/DownloadQueue.ts#L170)

是否开始 read

##### Returns

`boolean`

***

### percent

#### Get Signature

> **get** **percent**(): `number`

Defined in: [src/fetch-download/DownloadQueue.ts:163](https://github.com/janpoem/ts-utils/blob/e1c9059704283c01ba11cb71f495bc809435613d/src/fetch-download/DownloadQueue.ts#L163)

所有下载任务的接收 Response body 进度百分比（0 - 100）

##### Returns

`number`

***

### progress

#### Get Signature

> **get** **progress**(): `number`

Defined in: [src/fetch-download/DownloadQueue.ts:151](https://github.com/janpoem/ts-utils/blob/e1c9059704283c01ba11cb71f495bc809435613d/src/fetch-download/DownloadQueue.ts#L151)

所有下载任务的接收 Response body 进度小数（0 - 1）

##### Returns

`number`

***

### received

#### Get Signature

> **get** **received**(): `number`

Defined in: [src/fetch-download/DownloadQueue.ts:142](https://github.com/janpoem/ts-utils/blob/e1c9059704283c01ba11cb71f495bc809435613d/src/fetch-download/DownloadQueue.ts#L142)

所有下载任务的已接收 Response body 大小

##### Returns

`number`

***

### size

#### Get Signature

> **get** **size**(): `number`

Defined in: [src/fetch-download/DownloadQueue.ts:124](https://github.com/janpoem/ts-utils/blob/e1c9059704283c01ba11cb71f495bc809435613d/src/fetch-download/DownloadQueue.ts#L124)

所有下载任务的实际总大小

##### Returns

`number`

***

### speed

#### Get Signature

> **get** **speed**(): `number`

Defined in: [src/fetch-download/DownloadQueue.ts:226](https://github.com/janpoem/ts-utils/blob/e1c9059704283c01ba11cb71f495bc809435613d/src/fetch-download/DownloadQueue.ts#L226)

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

Defined in: [src/fetch-download/DownloadQueue.ts:117](https://github.com/janpoem/ts-utils/blob/e1c9059704283c01ba11cb71f495bc809435613d/src/fetch-download/DownloadQueue.ts#L117)

当前状态 [DownloadTaskState](../enumerations/DownloadTaskState.md)

注意 DownloadQueue 不应该出现 `fetching` 状态

##### Returns

[`DownloadTaskState`](../enumerations/DownloadTaskState.md)

***

### tasks

#### Get Signature

> **get** **tasks**(): [`DownloadTask`](DownloadTask.md)[]

Defined in: [src/fetch-download/DownloadQueue.ts:101](https://github.com/janpoem/ts-utils/blob/e1c9059704283c01ba11cb71f495bc809435613d/src/fetch-download/DownloadQueue.ts#L101)

所有下载任务

##### Returns

[`DownloadTask`](DownloadTask.md)[]

***

### tasksCount

#### Get Signature

> **get** **tasksCount**(): `number`

Defined in: [src/fetch-download/DownloadQueue.ts:108](https://github.com/janpoem/ts-utils/blob/e1c9059704283c01ba11cb71f495bc809435613d/src/fetch-download/DownloadQueue.ts#L108)

所有下载任务的总数

##### Returns

`number`

## Methods

### \_initTasksQueue()

> `protected` **\_initTasksQueue**(`opts?`): `Promise`\<[`DownloadTask`](DownloadTask.md)\>[]

Defined in: [src/fetch-download/DownloadQueue.ts:233](https://github.com/janpoem/ts-utils/blob/e1c9059704283c01ba11cb71f495bc809435613d/src/fetch-download/DownloadQueue.ts#L233)

#### Parameters

##### opts?

[`DownloadQueueProcessOptions`](../type-aliases/DownloadQueueProcessOptions.md)

#### Returns

`Promise`\<[`DownloadTask`](DownloadTask.md)\>[]

***

### newErr()

> **newErr**(`msg`): [`DownloadQueueError`](DownloadQueueError.md)

Defined in: [src/fetch-download/DownloadQueue.ts:305](https://github.com/janpoem/ts-utils/blob/e1c9059704283c01ba11cb71f495bc809435613d/src/fetch-download/DownloadQueue.ts#L305)

#### Parameters

##### msg

`string`

#### Returns

[`DownloadQueueError`](DownloadQueueError.md)

***

### read()

> **read**(`opts?`): `Promise`\<`DownloadQueue`\>

Defined in: [src/fetch-download/DownloadQueue.ts:265](https://github.com/janpoem/ts-utils/blob/e1c9059704283c01ba11cb71f495bc809435613d/src/fetch-download/DownloadQueue.ts#L265)

Queue 读取方法（调用每一个 task 的 read）

1. `onFetch`、`onHeaders`、`onProgress`、`onComplete`、`onError` 保留对应每一个 task 的事件
2. `onFinish` 对应 Queue 全部 tasks 读取完毕
3. `onQueueError` 对应 Queue 任意一个 task 读取过程中出错

#### Parameters

##### opts?

[`DownloadQueueProcessCallback`](../type-aliases/DownloadQueueProcessCallback.md) \| [`DownloadQueueProcessOptions`](../type-aliases/DownloadQueueProcessOptions.md)

#### Returns

`Promise`\<`DownloadQueue`\>

***

### reduce()

> **reduce**\<`T`\>(`fn`, `initValue`): `T`

Defined in: [src/fetch-download/DownloadQueue.ts:253](https://github.com/janpoem/ts-utils/blob/e1c9059704283c01ba11cb71f495bc809435613d/src/fetch-download/DownloadQueue.ts#L253)

#### Type Parameters

##### T

`T`

#### Parameters

##### fn

(`acc`, `it`) => `T`

##### initValue

`T`

#### Returns

`T`
