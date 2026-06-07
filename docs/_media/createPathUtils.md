[**@zenstone/ts-utils**](../../README.md)

***

[@zenstone/ts-utils](../../modules.md) / [path](../README.md) / createPathUtils

# Function: createPathUtils()

> **createPathUtils**(`options`): `object`

Defined in: [src/path.ts:24](https://github.com/janpoem/ts-utils/blob/a6181273044ad30164507cc181a58cccd8e952df/src/path.ts#L24)

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
