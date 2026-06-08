[**@zenstone/ts-utils**](../../README.md)

***

[@zenstone/ts-utils](../../modules.md) / [async](../README.md) / StatefulRpcTask

# Interface: StatefulRpcTask\<Params\>

Defined in: [src/async/StatefulRpc.ts:33](https://github.com/janpoem/ts-utils/blob/e6f0e2dae5b274785affda26cac7db86fc0832b2/src/async/StatefulRpc.ts#L33)

单次异步任务的描述信息，创建后冻结，不可修改。

## Type Parameters

### Params

`Params`

## Properties

### date

> `readonly` **date**: `Date`

Defined in: [src/async/StatefulRpc.ts:41](https://github.com/janpoem/ts-utils/blob/e6f0e2dae5b274785affda26cac7db86fc0832b2/src/async/StatefulRpc.ts#L41)

task 创建时间

***

### key

> `readonly` **key**: `string`

Defined in: [src/async/StatefulRpc.ts:35](https://github.com/janpoem/ts-utils/blob/e6f0e2dae5b274785affda26cac7db86fc0832b2/src/async/StatefulRpc.ts#L35)

外部资源 key，同一个 key 可同时存在多个 task

***

### params

> `readonly` **params**: `Params`

Defined in: [src/async/StatefulRpc.ts:39](https://github.com/janpoem/ts-utils/blob/e6f0e2dae5b274785affda26cac7db86fc0832b2/src/async/StatefulRpc.ts#L39)

调用 `pending()` 时传入的参数

***

### taskId

> `readonly` **taskId**: `string`

Defined in: [src/async/StatefulRpc.ts:37](https://github.com/janpoem/ts-utils/blob/e6f0e2dae5b274785affda26cac7db86fc0832b2/src/async/StatefulRpc.ts#L37)

内部唯一 task id，格式：`{instanceId}:{key}:{counter}`
