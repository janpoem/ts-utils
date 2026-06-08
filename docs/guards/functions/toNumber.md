[**@zenstone/ts-utils**](../../README.md)

***

[@zenstone/ts-utils](../../modules.md) / [guards](../README.md) / toNumber

# Function: toNumber()

> **toNumber**(`val`, `dft?`): `number`

Defined in: [src/guards/index.ts:64](https://github.com/janpoem/ts-utils/blob/e6f0e2dae5b274785affda26cac7db86fc0832b2/src/guards/index.ts#L64)

将包含有效数值的 val 转换为对应的数字类型，只支持以下情形：

- 字符串包含数值，如 `"123"`，转换为 `123`
- 数字类型，如 `123`，转换为 `123`
- 布尔类型，如 `true`，转换为 `1`，`false` 转换为 `0`

## Parameters

### val

`unknown`

### dft?

`number` = `0`

默认值，仅当 val 为 `null` 或 `undefined` 或 非包含有效数值时生效

## Returns

`number`
