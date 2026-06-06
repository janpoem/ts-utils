[**@zenstone/ts-utils**](../../README.md)

***

[@zenstone/ts-utils](../../modules.md) / [events](../README.md) / EventsCallbacks

# Type Alias: EventsCallbacks\<E\>

> **EventsCallbacks**\<`E`\> = `Partial`\<`{ [K in keyof E]: EventCallbackDeclaration<E[K]> }`\>

Defined in: [src/events/index.ts:27](https://github.com/janpoem/ts-utils/blob/cc47b42336ba4f377a5b240d70447dc1812f8c94/src/events/index.ts#L27)

多个事件的回调声明映射

## Type Parameters

### E

`E` *extends* [`EventsDefinition`](EventsDefinition.md) = [`EventsDefinition`](EventsDefinition.md)
