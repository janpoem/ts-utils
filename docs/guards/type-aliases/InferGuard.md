[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / InferGuard

# Type Alias: InferGuard\<G\>

> **InferGuard**\<`G`\> = `G` *extends* [`TypeGuard`](TypeGuard.md)\<infer T\> ? `T` : `never`

Defined in: [index.ts:465](https://github.com/janpoem/ts-utils/blob/738489a3f4830c04acd7944aaed6b04e6b346155/src/guards/index.ts#L465)

从 TypeGuard 提取被守卫的类型

## Type Parameters

### G

`G`
