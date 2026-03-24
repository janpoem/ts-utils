[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / RetryFnParams

# Type Alias: RetryFnParams

> **RetryFnParams** = `object`

Defined in: [src/async/index.ts:24](https://github.com/janpoem/ts-utils/blob/a9ae0d5ab8db50d99f88de922674a4455e94f5fc/src/async/index.ts#L24)

重试回调参数

## Properties

### attempt

> **attempt**: `number`

Defined in: [src/async/index.ts:26](https://github.com/janpoem/ts-utils/blob/a9ae0d5ab8db50d99f88de922674a4455e94f5fc/src/async/index.ts#L26)

当前尝试次数（从 1 开始）

***

### error

> **error**: `unknown`

Defined in: [src/async/index.ts:28](https://github.com/janpoem/ts-utils/blob/a9ae0d5ab8db50d99f88de922674a4455e94f5fc/src/async/index.ts#L28)

触发重试的错误（首次执行时为 undefined）

***

### options

> `readonly` **options**: [`RetryOptions`](RetryOptions.md)

Defined in: [src/async/index.ts:30](https://github.com/janpoem/ts-utils/blob/a9ae0d5ab8db50d99f88de922674a4455e94f5fc/src/async/index.ts#L30)

只读的重试选项
