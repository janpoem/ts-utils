[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / DownloadQueue

# Class: DownloadQueue

Defined in: [src/fetch-download/DownloadQueue.ts:26](https://github.com/janpoem/ts-utils/blob/034fdce9c8e357e20394a193c81088a159ce6f86/src/fetch-download/DownloadQueue.ts#L26)

## Constructors

### new DownloadQueue()

> **new DownloadQueue**(`tasks`): [`DownloadQueue`](DownloadQueue.md)

Defined in: [src/fetch-download/DownloadQueue.ts:49](https://github.com/janpoem/ts-utils/blob/034fdce9c8e357e20394a193c81088a159ce6f86/src/fetch-download/DownloadQueue.ts#L49)

#### Parameters

##### tasks

[`DownloadQueueInput`](../type-aliases/DownloadQueueInput.md)[]

#### Returns

[`DownloadQueue`](DownloadQueue.md)

## Accessors

### completeTs

#### Get Signature

> **get** **completeTs**(): `number`

Defined in: [src/fetch-download/DownloadQueue.ts:153](https://github.com/janpoem/ts-utils/blob/034fdce9c8e357e20394a193c81088a159ce6f86/src/fetch-download/DownloadQueue.ts#L153)

read 完成时间戳

- 如果下载未开始，返回 0
- 如果下载已开始，但并未下载完成，则会返回当前时间的时间戳

##### Returns

`number`

***

### contentLength

#### Get Signature

> **get** **contentLength**(): `number`

Defined in: [src/fetch-download/DownloadQueue.ts:92](https://github.com/janpoem/ts-utils/blob/034fdce9c8e357e20394a193c81088a159ce6f86/src/fetch-download/DownloadQueue.ts#L92)

获取 Response Content-Length

##### Returns

`number`

***

### elapsedMs

#### Get Signature

> **get** **elapsedMs**(): `number`

Defined in: [src/fetch-download/DownloadQueue.ts:167](https://github.com/janpoem/ts-utils/blob/034fdce9c8e357e20394a193c81088a159ce6f86/src/fetch-download/DownloadQueue.ts#L167)

read 数据经过多少时间（毫秒）

如果为实际完成，则返回当前时间的时间戳

如果未开始，则返回 0

##### Returns

`number`

***

### error

#### Get Signature

> **get** **error**(): `unknown`

Defined in: [src/fetch-download/DownloadQueue.ts:143](https://github.com/janpoem/ts-utils/blob/034fdce9c8e357e20394a193c81088a159ce6f86/src/fetch-download/DownloadQueue.ts#L143)

获取错误信息

##### Returns

`unknown`

***

### id

#### Get Signature

> **get** **id**(): `string`

Defined in: [src/fetch-download/DownloadQueue.ts:59](https://github.com/janpoem/ts-utils/blob/034fdce9c8e357e20394a193c81088a159ce6f86/src/fetch-download/DownloadQueue.ts#L59)

[DownloadQueue](DownloadQueue.md) Id

##### Returns

`string`

***

### isReaded

#### Get Signature

> **get** **isReaded**(): `boolean`

Defined in: [src/fetch-download/DownloadQueue.ts:136](https://github.com/janpoem/ts-utils/blob/034fdce9c8e357e20394a193c81088a159ce6f86/src/fetch-download/DownloadQueue.ts#L136)

是否已经 read 完毕

##### Returns

`boolean`

***

### isStarted

#### Get Signature

> **get** **isStarted**(): `boolean`

Defined in: [src/fetch-download/DownloadQueue.ts:129](https://github.com/janpoem/ts-utils/blob/034fdce9c8e357e20394a193c81088a159ce6f86/src/fetch-download/DownloadQueue.ts#L129)

是否开始 read

##### Returns

`boolean`

***

### percent

#### Get Signature

> **get** **percent**(): `number`

Defined in: [src/fetch-download/DownloadQueue.ts:122](https://github.com/janpoem/ts-utils/blob/034fdce9c8e357e20394a193c81088a159ce6f86/src/fetch-download/DownloadQueue.ts#L122)

接收 Response body 进度百分比（0 - 100）

##### Returns

`number`

***

### progress

#### Get Signature

> **get** **progress**(): `number`

Defined in: [src/fetch-download/DownloadQueue.ts:110](https://github.com/janpoem/ts-utils/blob/034fdce9c8e357e20394a193c81088a159ce6f86/src/fetch-download/DownloadQueue.ts#L110)

接收 Response body 进度小数（0 - 1）

##### Returns

`number`

***

### received

#### Get Signature

> **get** **received**(): `number`

Defined in: [src/fetch-download/DownloadQueue.ts:101](https://github.com/janpoem/ts-utils/blob/034fdce9c8e357e20394a193c81088a159ce6f86/src/fetch-download/DownloadQueue.ts#L101)

已接收 Response body 大小

##### Returns

`number`

***

### size

#### Get Signature

> **get** **size**(): `number`

Defined in: [src/fetch-download/DownloadQueue.ts:83](https://github.com/janpoem/ts-utils/blob/034fdce9c8e357e20394a193c81088a159ce6f86/src/fetch-download/DownloadQueue.ts#L83)

实际接收内容的大小

##### Returns

`number`

***

### speed

#### Get Signature

> **get** **speed**(): `number`

Defined in: [src/fetch-download/DownloadQueue.ts:176](https://github.com/janpoem/ts-utils/blob/034fdce9c8e357e20394a193c81088a159ce6f86/src/fetch-download/DownloadQueue.ts#L176)

接收速度，单位为字节/秒，需要自行转换

如果未开始，返回 0

##### Returns

`number`

***

### state

#### Get Signature

> **get** **state**(): [`DownloadTaskState`](../enumerations/DownloadTaskState.md)

Defined in: [src/fetch-download/DownloadQueue.ts:76](https://github.com/janpoem/ts-utils/blob/034fdce9c8e357e20394a193c81088a159ce6f86/src/fetch-download/DownloadQueue.ts#L76)

当前状态 [DownloadTaskState](../enumerations/DownloadTaskState.md)

注意 [DownloadQueue](DownloadQueue.md) 不应该出现 `fetching` 状态

##### Returns

[`DownloadTaskState`](../enumerations/DownloadTaskState.md)

***

### tasks

#### Get Signature

> **get** **tasks**(): [`DownloadTask`](DownloadTask.md)[]

Defined in: [src/fetch-download/DownloadQueue.ts:63](https://github.com/janpoem/ts-utils/blob/034fdce9c8e357e20394a193c81088a159ce6f86/src/fetch-download/DownloadQueue.ts#L63)

##### Returns

[`DownloadTask`](DownloadTask.md)[]

***

### tasksCount

#### Get Signature

> **get** **tasksCount**(): `number`

Defined in: [src/fetch-download/DownloadQueue.ts:67](https://github.com/janpoem/ts-utils/blob/034fdce9c8e357e20394a193c81088a159ce6f86/src/fetch-download/DownloadQueue.ts#L67)

##### Returns

`number`

## Methods

### \_initTasksQueue()

> `protected` **\_initTasksQueue**(`opts`?): `Promise`\<[`DownloadTask`](DownloadTask.md)\>[]

Defined in: [src/fetch-download/DownloadQueue.ts:183](https://github.com/janpoem/ts-utils/blob/034fdce9c8e357e20394a193c81088a159ce6f86/src/fetch-download/DownloadQueue.ts#L183)

#### Parameters

##### opts?

[`DownloadQueueProcessOptions`](../type-aliases/DownloadQueueProcessOptions.md)

#### Returns

`Promise`\<[`DownloadTask`](DownloadTask.md)\>[]

***

### newErr()

> **newErr**(`msg`): [`DownloadQueueError`](DownloadQueueError.md)

Defined in: [src/fetch-download/DownloadQueue.ts:237](https://github.com/janpoem/ts-utils/blob/034fdce9c8e357e20394a193c81088a159ce6f86/src/fetch-download/DownloadQueue.ts#L237)

#### Parameters

##### msg

`string`

#### Returns

[`DownloadQueueError`](DownloadQueueError.md)

***

### read()

> **read**(`opts`?): `Promise`\<[`DownloadQueue`](DownloadQueue.md)\>

Defined in: [src/fetch-download/DownloadQueue.ts:197](https://github.com/janpoem/ts-utils/blob/034fdce9c8e357e20394a193c81088a159ce6f86/src/fetch-download/DownloadQueue.ts#L197)

#### Parameters

##### opts?

[`DownloadTaskProcessCallback`](../type-aliases/DownloadTaskProcessCallback.md) | [`DownloadQueueProcessOptions`](../type-aliases/DownloadQueueProcessOptions.md)

#### Returns

`Promise`\<[`DownloadQueue`](DownloadQueue.md)\>

***

### reduce()

> **reduce**\<`T`\>(`fn`, `initValue`): `T`

Defined in: [src/fetch-download/DownloadQueue.ts:194](https://github.com/janpoem/ts-utils/blob/034fdce9c8e357e20394a193c81088a159ce6f86/src/fetch-download/DownloadQueue.ts#L194)

#### Type Parameters

• **T**

#### Parameters

##### fn

(`acc`, `it`) => `T`

##### initValue

`T`

#### Returns

`T`
