[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / RetryOptions

# Type Alias: RetryOptions

> **RetryOptions** = `object`

Defined in: [src/async/index.ts:36](https://github.com/janpoem/ts-utils/blob/a9ae0d5ab8db50d99f88de922674a4455e94f5fc/src/async/index.ts#L36)

重试选项

## Properties

### attempts?

> `optional` **attempts?**: `number`

Defined in: [src/async/index.ts:38](https://github.com/janpoem/ts-utils/blob/a9ae0d5ab8db50d99f88de922674a4455e94f5fc/src/async/index.ts#L38)

最大尝试次数，默认 3

***

### delay?

> `optional` **delay?**: `number` \| ((`params`) => `number`)

Defined in: [src/async/index.ts:40](https://github.com/janpoem/ts-utils/blob/a9ae0d5ab8db50d99f88de922674a4455e94f5fc/src/async/index.ts#L40)

重试间隔（毫秒），支持固定值或基于 RetryFnParams 的动态计算

***

### onRetry?

> `optional` **onRetry?**: (`params`) => `void`

Defined in: [src/async/index.ts:42](https://github.com/janpoem/ts-utils/blob/a9ae0d5ab8db50d99f88de922674a4455e94f5fc/src/async/index.ts#L42)

重试前的回调，可用于日志记录

#### Parameters

##### params

[`RetryFnParams`](RetryFnParams.md)

#### Returns

`void`
