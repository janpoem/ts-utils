[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / RetryOptions

# Type Alias: RetryOptions

> **RetryOptions** = `object`

Defined in: [src/async/index.ts:27](https://github.com/janpoem/ts-utils/blob/738489a3f4830c04acd7944aaed6b04e6b346155/src/async/index.ts#L27)

重试选项

## Properties

### attempts?

> `optional` **attempts?**: `number`

Defined in: [src/async/index.ts:29](https://github.com/janpoem/ts-utils/blob/738489a3f4830c04acd7944aaed6b04e6b346155/src/async/index.ts#L29)

最大尝试次数，默认 3

***

### delay?

> `optional` **delay?**: `number` \| ((`params`) => `number`)

Defined in: [src/async/index.ts:31](https://github.com/janpoem/ts-utils/blob/738489a3f4830c04acd7944aaed6b04e6b346155/src/async/index.ts#L31)

重试间隔（毫秒），支持固定值或基于 RetryFnParams 的动态计算

***

### onRetry?

> `optional` **onRetry?**: (`params`) => `void`

Defined in: [src/async/index.ts:33](https://github.com/janpoem/ts-utils/blob/738489a3f4830c04acd7944aaed6b04e6b346155/src/async/index.ts#L33)

重试前的回调，可用于日志记录

#### Parameters

##### params

[`RetryFnParams`](RetryFnParams.md)

#### Returns

`void`
