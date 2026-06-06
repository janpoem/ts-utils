[**@zenstone/ts-utils**](../../README.md)

***

[@zenstone/ts-utils](../../modules.md) / [guards](../README.md) / limitNumberMin

# Function: limitNumberMin()

> **limitNumberMin**(`val`, `min`, `dft?`): `number`

Defined in: [src/guards/index.ts:78](https://github.com/janpoem/ts-utils/blob/cc47b42336ba4f377a5b240d70447dc1812f8c94/src/guards/index.ts#L78)

限制 val 在最小值范围内

## Parameters

### val

`unknown`

### min

`number`

最小值

### dft?

`number` = `0`

默认值，仅当 val 为 `null` 或 `undefined` 或 非包含有效数值时生效

## Returns

`number`
