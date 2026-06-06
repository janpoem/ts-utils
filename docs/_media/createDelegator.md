[**@zenstone/ts-utils**](../../README.md)

***

[@zenstone/ts-utils](../../modules.md) / [events](../README.md) / createDelegator

# Function: createDelegator()

> **createDelegator**\<`E`\>(`callbacks`): [`EventsDelegator`](../interfaces/EventsDelegator.md)\<`E`\>

Defined in: [src/events/index.ts:259](https://github.com/janpoem/ts-utils/blob/cc47b42336ba4f377a5b240d70447dc1812f8c94/src/events/index.ts#L259)

创建函数式事件委托者

将一组回调映射（EventsCallbacks）封装为 EventsDelegator，通过 inject/eject
与 emitter 绑定或解绑。inject 时存储反注册函数，eject 时统一清理。

## Type Parameters

### E

`E` *extends* [`EventsDefinition`](../type-aliases/EventsDefinition.md) = [`EventsDefinition`](../type-aliases/EventsDefinition.md)

## Parameters

### callbacks

[`EventsCallbacks`](../type-aliases/EventsCallbacks.md)\<`E`\>

事件回调映射

## Returns

[`EventsDelegator`](../interfaces/EventsDelegator.md)\<`E`\>

EventsDelegator 实例

## Example

```ts
type AppEvents = { data: { value: number }; close: undefined };

const delegator = createDelegator<AppEvents>({
  data: ({ value }) => console.log('received', value),
  close: [() => console.log('closed'), () => cleanup()],
});

delegator.inject(emitter);  // 注册所有回调
delegator.eject();          // 取消所有回调（无需传 emitter）
```
