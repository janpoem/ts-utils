[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / AsyncQueueOptions

# Type Alias: AsyncQueueOptions

> **AsyncQueueOptions** = `object`

Defined in: src/async/index.ts:265

异步队列选项

## Properties

### concurrency?

> `optional` **concurrency?**: `number`

Defined in: src/async/index.ts:267

最大并发数，默认 1（串行）

***

### onQueueDrain?

> `optional` **onQueueDrain?**: () => `void`

Defined in: src/async/index.ts:271

队列有空位时的回调

#### Returns

`void`

***

### onQueueFull?

> `optional` **onQueueFull?**: (`size`) => `void`

Defined in: src/async/index.ts:269

队列满时的回调

#### Parameters

##### size

`number`

#### Returns

`void`
