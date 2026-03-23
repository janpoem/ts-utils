[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / RetryFnParams

# Type Alias: RetryFnParams

> **RetryFnParams** = `object`

Defined in: [src/async/index.ts:15](https://github.com/janpoem/ts-utils/blob/738489a3f4830c04acd7944aaed6b04e6b346155/src/async/index.ts#L15)

重试回调参数

## Properties

### attempt

> **attempt**: `number`

Defined in: [src/async/index.ts:17](https://github.com/janpoem/ts-utils/blob/738489a3f4830c04acd7944aaed6b04e6b346155/src/async/index.ts#L17)

当前尝试次数（从 1 开始）

***

### error

> **error**: `unknown`

Defined in: [src/async/index.ts:19](https://github.com/janpoem/ts-utils/blob/738489a3f4830c04acd7944aaed6b04e6b346155/src/async/index.ts#L19)

触发重试的错误（首次执行时为 undefined）

***

### options

> `readonly` **options**: [`RetryOptions`](RetryOptions.md)

Defined in: [src/async/index.ts:21](https://github.com/janpoem/ts-utils/blob/738489a3f4830c04acd7944aaed6b04e6b346155/src/async/index.ts#L21)

只读的重试选项
