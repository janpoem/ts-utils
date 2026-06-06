[**@zenstone/ts-utils**](../../README.md)

***

[@zenstone/ts-utils](../../modules.md) / [events](../README.md) / linkEvents

# Function: linkEvents()

> **linkEvents**\<`E`\>(`emitter`, `input`, `mode?`): [`EventsEmitter`](../interfaces/EventsEmitter.md)\<`E`\>

Defined in: [src/events/index.ts:183](https://github.com/janpoem/ts-utils/blob/cc47b42336ba4f377a5b240d70447dc1812f8c94/src/events/index.ts#L183)

将 callbacks 对象或 delegator 附加到（或从）emitter 上

## Type Parameters

### E

`E` *extends* [`EventsDefinition`](../type-aliases/EventsDefinition.md) = [`EventsDefinition`](../type-aliases/EventsDefinition.md)

## Parameters

### emitter

[`EventsEmitter`](../interfaces/EventsEmitter.md)\<`E`\>

目标发射器

### input

`Partial`\<\{ \[K in string \| number \| symbol\]: EventCallbackDeclaration\<E\[K\]\> \}\> \| [`EventsDelegator`](../interfaces/EventsDelegator.md)\<`E`\>

EventsCallbacks 或 EventsDelegator

### mode?

[`LinkEventMode`](../type-aliases/LinkEventMode.md) = `'on'`

'on'（默认，添加监听）或 'off'（移除监听）

## Returns

[`EventsEmitter`](../interfaces/EventsEmitter.md)\<`E`\>

emitter 本身（链式调用）
