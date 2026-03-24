[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / limitNumberMinMax

# Function: limitNumberMinMax()

> **limitNumberMinMax**(`val`, `min`, `max`, `dft?`): `number`

Defined in: [index.ts:101](https://github.com/janpoem/ts-utils/blob/e1c9059704283c01ba11cb71f495bc809435613d/src/guards/index.ts#L101)

限制 val 在最小值和最大值范围内

## Parameters

### val

`unknown`

### min

`number`

最小值

### max

`number`

最大值

### dft?

`number` = `0`

默认值，仅当 val 为 `null` 或 `undefined` 或 非包含有效数值时生效

## Returns

`number`
