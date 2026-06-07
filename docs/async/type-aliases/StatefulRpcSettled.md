[**@zenstone/ts-utils**](../../README.md)

***

[@zenstone/ts-utils](../../modules.md) / [async](../README.md) / StatefulRpcSettled

# Type Alias: StatefulRpcSettled\<Result\>

> **StatefulRpcSettled**\<`Result`\> = \{ `key`: `string`; `result`: `Result`; `type`: `"resolve"`; \} \| \{ `key`: `string`; `result`: `unknown`; `type`: `"reject"`; \}

Defined in: [src/async/StatefulRpc.ts:54](https://github.com/janpoem/ts-utils/blob/a6181273044ad30164507cc181a58cccd8e952df/src/async/StatefulRpc.ts#L54)

`settle()` 的结果描述，区分 resolve / reject 两种情况。

## Type Parameters

### Result

`Result`
