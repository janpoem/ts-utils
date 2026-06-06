[**@zenstone/ts-utils**](../../README.md)

***

[@zenstone/ts-utils](../../modules.md) / [async](../README.md) / RetryFnParams

# Type Alias: RetryFnParams

> **RetryFnParams** = `object`

Defined in: [src/async/index.ts:24](https://github.com/janpoem/ts-utils/blob/cc47b42336ba4f377a5b240d70447dc1812f8c94/src/async/index.ts#L24)

重试回调参数

## Properties

### attempt

> **attempt**: `number`

Defined in: [src/async/index.ts:26](https://github.com/janpoem/ts-utils/blob/cc47b42336ba4f377a5b240d70447dc1812f8c94/src/async/index.ts#L26)

当前尝试次数（从 1 开始）

***

### error

> **error**: `unknown`

Defined in: [src/async/index.ts:28](https://github.com/janpoem/ts-utils/blob/cc47b42336ba4f377a5b240d70447dc1812f8c94/src/async/index.ts#L28)

触发重试的错误（首次执行时为 undefined）

***

### options

> `readonly` **options**: [`RetryOptions`](RetryOptions.md)

Defined in: [src/async/index.ts:30](https://github.com/janpoem/ts-utils/blob/cc47b42336ba4f377a5b240d70447dc1812f8c94/src/async/index.ts#L30)

只读的重试选项
