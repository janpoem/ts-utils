[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / RetryOptions

# Type Alias: RetryOptions

> **RetryOptions** = `object`

Defined in: src/async/index.ts:64

重试选项

## Properties

### attempts?

> `optional` **attempts?**: `number`

Defined in: src/async/index.ts:66

最大尝试次数，默认 3

***

### delay?

> `optional` **delay?**: `number`

Defined in: src/async/index.ts:68

重试间隔（毫秒），默认 100

***

### onRetry?

> `optional` **onRetry?**: (`err`, `attempt`) => `void`

Defined in: src/async/index.ts:70

重试前的回调，可用于日志记录

#### Parameters

##### err

`unknown`

##### attempt

`number`

#### Returns

`void`
