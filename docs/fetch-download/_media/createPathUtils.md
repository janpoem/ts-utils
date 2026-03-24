[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / createPathUtils

# Function: createPathUtils()

> **createPathUtils**(`options`): `object`

Defined in: [path.ts:24](https://github.com/janpoem/ts-utils/blob/a9ae0d5ab8db50d99f88de922674a4455e94f5fc/src/path.ts#L24)

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
