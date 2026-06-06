[**@zenstone/ts-utils**](../../README.md)

***

[@zenstone/ts-utils](../../modules.md) / [events](../README.md) / initEventsEmitter

# Function: initEventsEmitter()

> **initEventsEmitter**\<`E`\>(`input?`, `create?`): [`EventsEmitter`](../interfaces/EventsEmitter.md)\<`E`\>

Defined in: [src/events/index.ts:222](https://github.com/janpoem/ts-utils/blob/cc47b42336ba4f377a5b240d70447dc1812f8c94/src/events/index.ts#L222)

初始化事件发射器

- input 为 null/undefined：创建新 emitter
- input 已是 EventsEmitter：直接返回
- input 为 EventsCallbacks 或 EventsDelegator：创建新 emitter 并挂载

## Type Parameters

### E

`E` *extends* [`EventsDefinition`](../type-aliases/EventsDefinition.md) = [`EventsDefinition`](../type-aliases/EventsDefinition.md)

## Parameters

### input?

[`EventsInput`](../type-aliases/EventsInput.md)\<`E`\> \| `null`

可选输入（三种类型之一）

### create?

() => [`EventsEmitter`](../interfaces/EventsEmitter.md)\<`E`\>

自定义创建函数（默认 createEmitter）

## Returns

[`EventsEmitter`](../interfaces/EventsEmitter.md)\<`E`\>
