[**@zenstone/ts-utils**](../../README.md)

***

[@zenstone/ts-utils](../../modules.md) / [events](../README.md) / createEmitter

# Function: createEmitter()

> **createEmitter**\<`E`\>(): [`EventsEmitter`](../interfaces/EventsEmitter.md)\<`E`\>

Defined in: [src/events/index.ts:119](https://github.com/janpoem/ts-utils/blob/cc47b42336ba4f377a5b240d70447dc1812f8c94/src/events/index.ts#L119)

创建事件发射器

- 同一事件的所有监听器并发执行（Promise.all）
- `on` 返回反注册函数
- 任意监听器抛出时，emit 返回的 Promise 以 AggregateError 拒绝

## Type Parameters

### E

`E` *extends* [`EventsDefinition`](../type-aliases/EventsDefinition.md) = [`EventsDefinition`](../type-aliases/EventsDefinition.md)

## Returns

[`EventsEmitter`](../interfaces/EventsEmitter.md)\<`E`\>

## Example

```ts
type AppEvents = { connect: { id: string }; disconnect: undefined };

const emitter = createEmitter<AppEvents>();

const off = emitter.on('connect', ({ id }) => console.log('connected', id));
await emitter.emit('connect', { id: 'user-1' });
off(); // 取消监听
```
