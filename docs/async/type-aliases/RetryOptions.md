[**@zenstone/ts-utils**](../../README.md)

***

[@zenstone/ts-utils](../../modules.md) / [async](../README.md) / RetryOptions

# Type Alias: RetryOptions

> **RetryOptions** = `object`

Defined in: [src/async/index.ts:49](https://github.com/janpoem/ts-utils/blob/e6f0e2dae5b274785affda26cac7db86fc0832b2/src/async/index.ts#L49)

重试选项

## Properties

### attempts?

> `optional` **attempts?**: `number`

Defined in: [src/async/index.ts:51](https://github.com/janpoem/ts-utils/blob/e6f0e2dae5b274785affda26cac7db86fc0832b2/src/async/index.ts#L51)

最大尝试次数，默认 3

***

### delay?

> `optional` **delay?**: `number` \| ((`params`) => `number`)

Defined in: [src/async/index.ts:53](https://github.com/janpoem/ts-utils/blob/e6f0e2dae5b274785affda26cac7db86fc0832b2/src/async/index.ts#L53)

重试间隔（毫秒），支持固定值或基于 RetryFnParams 的动态计算

***

### onRetry?

> `optional` **onRetry?**: (`params`) => `void`

Defined in: [src/async/index.ts:55](https://github.com/janpoem/ts-utils/blob/e6f0e2dae5b274785affda26cac7db86fc0832b2/src/async/index.ts#L55)

重试前的回调，可用于日志记录

#### Parameters

##### params

[`RetryFnParams`](RetryFnParams.md)

#### Returns

`void`
