[**@zenstone/ts-utils**](../../README.md)

***

[@zenstone/ts-utils](../../modules.md) / [guards](../README.md) / InferGuard

# Type Alias: InferGuard\<G\>

> **InferGuard**\<`G`\> = `G` *extends* [`TypeGuard`](TypeGuard.md)\<infer T\> ? `T` : `never`

Defined in: [src/guards/index.ts:469](https://github.com/janpoem/ts-utils/blob/cc47b42336ba4f377a5b240d70447dc1812f8c94/src/guards/index.ts#L469)

从 TypeGuard 提取被守卫的类型

## Type Parameters

### G

`G`
