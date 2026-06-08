[**@zenstone/ts-utils**](../../README.md)

***

[@zenstone/ts-utils](../../modules.md) / [async](../README.md) / StatefulRpcSettled

# Type Alias: StatefulRpcSettled\<Result\>

> **StatefulRpcSettled**\<`Result`\> = \{ `key`: `string`; `result`: `Result`; `type`: `"resolve"`; \} \| \{ `key`: `string`; `result`: `unknown`; `type`: `"reject"`; \}

Defined in: [src/async/StatefulRpc.ts:54](https://github.com/janpoem/ts-utils/blob/e6f0e2dae5b274785affda26cac7db86fc0832b2/src/async/StatefulRpc.ts#L54)

`settle()` 的结果描述，区分 resolve / reject 两种情况。

## Type Parameters

### Result

`Result`
