[**@zenstone/ts-utils**](../../README.md)

***

[@zenstone/ts-utils](../../modules.md) / [guards](../README.md) / InferGuard

# Type Alias: InferGuard\<G\>

> **InferGuard**\<`G`\> = `G` *extends* [`TypeGuard`](TypeGuard.md)\<infer T\> ? `T` : `never`

Defined in: [src/guards/index.ts:469](https://github.com/janpoem/ts-utils/blob/a6181273044ad30164507cc181a58cccd8e952df/src/guards/index.ts#L469)

从 TypeGuard 提取被守卫的类型

## Type Parameters

### G

`G`
