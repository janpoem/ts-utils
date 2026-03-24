[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / InferGuard

# Type Alias: InferGuard\<G\>

> **InferGuard**\<`G`\> = `G` *extends* [`TypeGuard`](TypeGuard.md)\<infer T\> ? `T` : `never`

Defined in: [index.ts:465](https://github.com/janpoem/ts-utils/blob/a9ae0d5ab8db50d99f88de922674a4455e94f5fc/src/guards/index.ts#L465)

从 TypeGuard 提取被守卫的类型

## Type Parameters

### G

`G`
