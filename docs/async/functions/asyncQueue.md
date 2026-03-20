[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / asyncQueue

# Function: asyncQueue()

> **asyncQueue**\<`T`\>(`options?`): `object`

Defined in: src/async/index.ts:299

异步并发控制队列

## Type Parameters

### T

`T` = `unknown`

## Parameters

### options?

[`AsyncQueueOptions`](../type-aliases/AsyncQueueOptions.md) = `{}`

队列选项

## Returns

`object`

队列控制器

### add

> **add**: (`fn`) => `Promise`\<`T`\>

#### Parameters

##### fn

`AsyncFn`\<`T`\>

#### Returns

`Promise`\<`T`\>

### clear

> **clear**: () => `void`

#### Returns

`void`

### getConcurrency

> **getConcurrency**: () => `number`

#### Returns

`number`

### size

> **size**: () => `number`

#### Returns

`number`

## Example

```ts
const queue = asyncQueue({ concurrency: 3 });

// 所有任务会按照最大并发数 3 执行
const task1 = queue.add(() => fetch('/api/1').then(r => r.json()));
const task2 = queue.add(() => fetch('/api/2').then(r => r.json()));
const task3 = queue.add(() => fetch('/api/3').then(r => r.json()));
```
