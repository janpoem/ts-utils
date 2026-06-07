[**@zenstone/ts-utils**](../../README.md)

***

[@zenstone/ts-utils](../../modules.md) / [events](../README.md) / EventsInput

# Type Alias: EventsInput\<E\>

> **EventsInput**\<`E`\> = [`EventsEmitter`](../interfaces/EventsEmitter.md)\<`E`\> \| [`EventsCallbacks`](EventsCallbacks.md)\<`E`\> \| [`EventsDelegator`](../interfaces/EventsDelegator.md)\<`E`\>

Defined in: [src/events/index.ts:67](https://github.com/janpoem/ts-utils/blob/a6181273044ad30164507cc181a58cccd8e952df/src/events/index.ts#L67)

事件输入联合类型：emitter / callbacks 对象 / delegator 三选一

## Type Parameters

### E

`E` *extends* [`EventsDefinition`](EventsDefinition.md) = [`EventsDefinition`](EventsDefinition.md)
