[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / RetryWithBackoffOptions

# Type Alias: RetryWithBackoffOptions

> **RetryWithBackoffOptions** = `object`

Defined in: src/async/index.ts:76

带退避的重试选项

## Properties

### attempts?

> `optional` **attempts?**: `number`

Defined in: src/async/index.ts:78

最大尝试次数，默认 3

***

### factor?

> `optional` **factor?**: `number`

Defined in: src/async/index.ts:82

退避因子，默认 2

***

### initialDelay?

> `optional` **initialDelay?**: `number`

Defined in: src/async/index.ts:80

初始延迟（毫秒），默认 1000

***

### maxDelay?

> `optional` **maxDelay?**: `number`

Defined in: src/async/index.ts:84

最大延迟（毫秒），默认 30000

***

### onRetry?

> `optional` **onRetry?**: (`err`, `attempt`, `delay`) => `void`

Defined in: src/async/index.ts:86

重试前的回调，可用于日志记录

#### Parameters

##### err

`unknown`

##### attempt

`number`

##### delay

`number`

#### Returns

`void`
