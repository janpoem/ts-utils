[**@zenstone/ts-utils**](../../README.md)

***

[@zenstone/ts-utils](../../modules.md) / [path](../README.md) / createPathUtils

# Function: createPathUtils()

> **createPathUtils**(`options`): `object`

Defined in: [src/path.ts:24](https://github.com/janpoem/ts-utils/blob/e6f0e2dae5b274785affda26cac7db86fc0832b2/src/path.ts#L24)

创建路径处理工具

## Parameters

### options

[`PathUtilsOptions`](../type-aliases/PathUtilsOptions.md)

## Returns

`object`

### joinPath

> **joinPath**: (...`paths`) => `string`

#### Parameters

##### paths

...[`PathInput`](../type-aliases/PathInput.md)[]

#### Returns

`string`

### purgePath

> **purgePath**: (`path`) => `string`

#### Parameters

##### path

[`PathInput`](../type-aliases/PathInput.md)

#### Returns

`string`
