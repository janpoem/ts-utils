[**@zenstone/ts-utils**](../../README.md)

***

[@zenstone/ts-utils](../../modules.md) / [guards](../README.md) / limitNumberMin

# Function: limitNumberMin()

> **limitNumberMin**(`val`, `min`, `dft?`): `number`

Defined in: [src/guards/index.ts:78](https://github.com/janpoem/ts-utils/blob/e6f0e2dae5b274785affda26cac7db86fc0832b2/src/guards/index.ts#L78)

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
