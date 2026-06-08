[**@zenstone/ts-utils**](../../README.md)

***

[@zenstone/ts-utils](../../modules.md) / [events](../README.md) / EventsCallbacks

# Type Alias: EventsCallbacks\<E\>

> **EventsCallbacks**\<`E`\> = `Partial`\<`{ [K in keyof E]: EventCallbackDeclaration<E[K]> }`\>

Defined in: [src/events/index.ts:27](https://github.com/janpoem/ts-utils/blob/e6f0e2dae5b274785affda26cac7db86fc0832b2/src/events/index.ts#L27)

多个事件的回调声明映射

## Type Parameters

### E

`E` *extends* [`EventsDefinition`](EventsDefinition.md) = [`EventsDefinition`](EventsDefinition.md)
