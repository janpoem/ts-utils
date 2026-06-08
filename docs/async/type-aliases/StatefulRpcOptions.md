[**@zenstone/ts-utils**](../../README.md)

***

[@zenstone/ts-utils](../../modules.md) / [async](../README.md) / StatefulRpcOptions

# Type Alias: StatefulRpcOptions\<Result, Params\>

> **StatefulRpcOptions**\<`Result`, `Params`\> = `object`

Defined in: [src/async/StatefulRpc.ts:21](https://github.com/janpoem/ts-utils/blob/e6f0e2dae5b274785affda26cac7db86fc0832b2/src/async/StatefulRpc.ts#L21)

构造选项

## Type Parameters

### Result

`Result`

### Params

`Params`

## Properties

### events?

> `optional` **events?**: [`EventsCallbacks`](../../events/type-aliases/EventsCallbacks.md)\<[`StatefulRpcEvents`](StatefulRpcEvents.md)\<`Result`, `Params`\>\>

Defined in: [src/async/StatefulRpc.ts:27](https://github.com/janpoem/ts-utils/blob/e6f0e2dae5b274785affda26cac7db86fc0832b2/src/async/StatefulRpc.ts#L27)

事件回调

***

### idPrefix?

> `optional` **idPrefix?**: `string`

Defined in: [src/async/StatefulRpc.ts:23](https://github.com/janpoem/ts-utils/blob/e6f0e2dae5b274785affda26cac7db86fc0832b2/src/async/StatefulRpc.ts#L23)

实例 id 前缀，默认 `"stateful-rpc"`

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [src/async/StatefulRpc.ts:25](https://github.com/janpoem/ts-utils/blob/e6f0e2dae5b274785affda26cac7db86fc0832b2/src/async/StatefulRpc.ts#L25)

默认超时毫秒数，默认 30000。必须 > 0，否则回退到 30000
