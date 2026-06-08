[**@zenstone/ts-utils**](../../README.md)

***

[@zenstone/ts-utils](../../modules.md) / [async](../README.md) / PendingFnParams

# Type Alias: PendingFnParams

> **PendingFnParams** = `object`

Defined in: [src/async/pending.ts:28](https://github.com/janpoem/ts-utils/blob/e6f0e2dae5b274785affda26cac7db86fc0832b2/src/async/pending.ts#L28)

pendingFn 回调函数接收的参数

## Properties

### getPendingCount

> **getPendingCount**: () => `number`

Defined in: [src/async/pending.ts:32](https://github.com/janpoem/ts-utils/blob/e6f0e2dae5b274785affda26cac7db86fc0832b2/src/async/pending.ts#L32)

获取当前等待中的 caller 数量（实时值）

#### Returns

`number`

***

### scope

> **scope**: `string`

Defined in: [src/async/pending.ts:30](https://github.com/janpoem/ts-utils/blob/e6f0e2dae5b274785affda26cac7db86fc0832b2/src/async/pending.ts#L30)

解析后的 scope key
