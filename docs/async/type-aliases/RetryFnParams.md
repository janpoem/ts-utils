[**@zenstone/ts-utils**](../../README.md)

***

[@zenstone/ts-utils](../../modules.md) / [async](../README.md) / RetryFnParams

# Type Alias: RetryFnParams

> **RetryFnParams** = `object`

Defined in: [src/async/index.ts:37](https://github.com/janpoem/ts-utils/blob/e6f0e2dae5b274785affda26cac7db86fc0832b2/src/async/index.ts#L37)

重试回调参数

## Properties

### attempt

> **attempt**: `number`

Defined in: [src/async/index.ts:39](https://github.com/janpoem/ts-utils/blob/e6f0e2dae5b274785affda26cac7db86fc0832b2/src/async/index.ts#L39)

当前尝试次数（从 1 开始）

***

### error

> **error**: `unknown`

Defined in: [src/async/index.ts:41](https://github.com/janpoem/ts-utils/blob/e6f0e2dae5b274785affda26cac7db86fc0832b2/src/async/index.ts#L41)

触发重试的错误（首次执行时为 undefined）

***

### options

> `readonly` **options**: [`RetryOptions`](RetryOptions.md)

Defined in: [src/async/index.ts:43](https://github.com/janpoem/ts-utils/blob/e6f0e2dae5b274785affda26cac7db86fc0832b2/src/async/index.ts#L43)

只读的重试选项
