[**@zenstone/ts-utils**](../../README.md)

***

[@zenstone/ts-utils](../../modules.md) / [events](../README.md) / EventsEmitter

# Interface: EventsEmitter\<E\>

Defined in: [src/events/index.ts:41](https://github.com/janpoem/ts-utils/blob/cc47b42336ba4f377a5b240d70447dc1812f8c94/src/events/index.ts#L41)

事件发射器接口

`on` 返回反注册函数，无需持有 callback 引用即可取消监听。

## Type Parameters

### E

`E` *extends* [`EventsDefinition`](../type-aliases/EventsDefinition.md) = [`EventsDefinition`](../type-aliases/EventsDefinition.md)

## Methods

### emit()

> **emit**\<`N`\>(`name`, `params`): `Promise`\<`void`\>

Defined in: [src/events/index.ts:49](https://github.com/janpoem/ts-utils/blob/cc47b42336ba4f377a5b240d70447dc1812f8c94/src/events/index.ts#L49)

#### Type Parameters

##### N

`N` *extends* `string` \| `number` \| `symbol`

#### Parameters

##### name

`N`

##### params

`E`\[`N`\]

#### Returns

`Promise`\<`void`\>

***

### off()

> **off**\<`N`\>(`name`, `callback`): `void`

Defined in: [src/events/index.ts:47](https://github.com/janpoem/ts-utils/blob/cc47b42336ba4f377a5b240d70447dc1812f8c94/src/events/index.ts#L47)

#### Type Parameters

##### N

`N` *extends* `string` \| `number` \| `symbol`

#### Parameters

##### name

`N`

##### callback

[`EventCallbackFn`](../type-aliases/EventCallbackFn.md)\<`E`\[`N`\]\>

#### Returns

`void`

***

### on()

> **on**\<`N`\>(`name`, `callback`): [`EventUnsubscribeFn`](../type-aliases/EventUnsubscribeFn.md)

Defined in: [src/events/index.ts:42](https://github.com/janpoem/ts-utils/blob/cc47b42336ba4f377a5b240d70447dc1812f8c94/src/events/index.ts#L42)

#### Type Parameters

##### N

`N` *extends* `string` \| `number` \| `symbol`

#### Parameters

##### name

`N`

##### callback

[`EventCallbackFn`](../type-aliases/EventCallbackFn.md)\<`E`\[`N`\]\>

#### Returns

[`EventUnsubscribeFn`](../type-aliases/EventUnsubscribeFn.md)
