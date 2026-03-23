[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / decimalAdjust

# Function: decimalAdjust()

> **decimalAdjust**(`type`, `value`, `exp?`): `number`

Defined in: [index.ts:120](https://github.com/janpoem/ts-utils/blob/738489a3f4830c04acd7944aaed6b04e6b346155/src/guards/index.ts#L120)

数字精度调整，支持 `round`、`ceil`、`floor` 三种类型

## Parameters

### type

`"round"` \| `"ceil"` \| `"floor"`

调整类型

### value

`number`

### exp?

`number`

指数（10的 exp 次方 —— 10 进制位数，0 表示个位，1 表示十位，-1 表示小数点后一位，-2 表示小数点后两位，以此类推）。

## Returns

`number`

## See

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/round#%E5%B0%8F%E6%95%B0%E8%88%8D%E5%85%A5
