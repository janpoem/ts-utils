[**@zenstone/ts-utils**](../../README.md)

***

[@zenstone/ts-utils](../../modules.md) / [guards](../README.md) / limitNumberMax

# Function: limitNumberMax()

> **limitNumberMax**(`val`, `max`, `dft?`): `number`

Defined in: [src/guards/index.ts:89](https://github.com/janpoem/ts-utils/blob/a6181273044ad30164507cc181a58cccd8e952df/src/guards/index.ts#L89)

限制 val 在最大值范围内

## Parameters

### val

`unknown`

### max

`number`

最大值

### dft?

`number` = `0`

默认值，仅当 val 为 `null` 或 `undefined` 或 非包含有效数值时生效

## Returns

`number`
