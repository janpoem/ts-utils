[**@zenstone/ts-utils**](../../README.md)

***

[@zenstone/ts-utils](../../modules.md) / [events](../README.md) / EventsDelegator

# Interface: EventsDelegator\<E\>

Defined in: [src/events/index.ts:57](https://github.com/janpoem/ts-utils/blob/e6f0e2dae5b274785affda26cac7db86fc0832b2/src/events/index.ts#L57)

事件委托者接口

通过 inject/eject 将自身的事件处理映射附加到或从 emitter 上解除。

## Type Parameters

### E

`E` *extends* [`EventsDefinition`](../type-aliases/EventsDefinition.md) = [`EventsDefinition`](../type-aliases/EventsDefinition.md)

## Methods

### eject()

> **eject**(`emitter?`): `void`

Defined in: [src/events/index.ts:61](https://github.com/janpoem/ts-utils/blob/e6f0e2dae5b274785affda26cac7db86fc0832b2/src/events/index.ts#L61)

#### Parameters

##### emitter?

[`EventsEmitter`](EventsEmitter.md)\<`E`\>

#### Returns

`void`

***

### inject()

> **inject**(`emitter?`): `void`

Defined in: [src/events/index.ts:60](https://github.com/janpoem/ts-utils/blob/e6f0e2dae5b274785affda26cac7db86fc0832b2/src/events/index.ts#L60)

#### Parameters

##### emitter?

[`EventsEmitter`](EventsEmitter.md)\<`E`\>

#### Returns

`void`
