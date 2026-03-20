[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / createPathUtils

# Function: createPathUtils()

> **createPathUtils**(`options`): `object`

Defined in: [path.ts:24](https://github.com/janpoem/ts-utils/blob/609cab258976feb4eb74bcad1a8b6a0cbc4381ba/src/path.ts#L24)

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
