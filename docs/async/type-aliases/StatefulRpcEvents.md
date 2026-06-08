[**@zenstone/ts-utils**](../../README.md)

***

[@zenstone/ts-utils](../../modules.md) / [async](../README.md) / StatefulRpcEvents

# Type Alias: StatefulRpcEvents\<Result, Params\>

> **StatefulRpcEvents**\<`Result`, `Params`\> = `object`

Defined in: [src/async/StatefulRpc.ts:13](https://github.com/janpoem/ts-utils/blob/e6f0e2dae5b274785affda26cac7db86fc0832b2/src/async/StatefulRpc.ts#L13)

事件映射：pending / resolve / reject / settle

## Type Parameters

### Result

`Result`

### Params

`Params`

## Properties

### pending

> **pending**: `object`

Defined in: [src/async/StatefulRpc.ts:14](https://github.com/janpoem/ts-utils/blob/e6f0e2dae5b274785affda26cac7db86fc0832b2/src/async/StatefulRpc.ts#L14)

#### task

> **task**: [`StatefulRpcTask`](../interfaces/StatefulRpcTask.md)\<`Params`\>

***

### reject

> **reject**: `object`

Defined in: [src/async/StatefulRpc.ts:16](https://github.com/janpoem/ts-utils/blob/e6f0e2dae5b274785affda26cac7db86fc0832b2/src/async/StatefulRpc.ts#L16)

#### result

> **result**: `unknown`

#### task

> **task**: [`StatefulRpcTask`](../interfaces/StatefulRpcTask.md)\<`Params`\>

***

### resolve

> **resolve**: `object`

Defined in: [src/async/StatefulRpc.ts:15](https://github.com/janpoem/ts-utils/blob/e6f0e2dae5b274785affda26cac7db86fc0832b2/src/async/StatefulRpc.ts#L15)

#### result

> **result**: `Result`

#### task

> **task**: [`StatefulRpcTask`](../interfaces/StatefulRpcTask.md)\<`Params`\>

***

### settle

> **settle**: [`StatefulRpcSettled`](StatefulRpcSettled.md)\<`Result`\> & `object`

Defined in: [src/async/StatefulRpc.ts:17](https://github.com/janpoem/ts-utils/blob/e6f0e2dae5b274785affda26cac7db86fc0832b2/src/async/StatefulRpc.ts#L17)

#### Type Declaration

##### task

> **task**: [`StatefulRpcTask`](../interfaces/StatefulRpcTask.md)\<`Params`\>
