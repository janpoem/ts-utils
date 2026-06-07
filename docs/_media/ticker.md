[**@zenstone/ts-utils**](../../README.md)

***

[@zenstone/ts-utils](../../modules.md) / [misc](../README.md) / ticker

# Function: ticker()

> **ticker**(`key`, `callback`, `ms`): `Timeout`

Defined in: [src/misc/timer.ts:41](https://github.com/janpoem/ts-utils/blob/a6181273044ad30164507cc181a58cccd8e952df/src/misc/timer.ts#L41)

命名 setInterval，同一 key 会先清除已有的间隔器再重新设置

## Parameters

### key

`string`

间隔器标识

### callback

() => `void` \| `Promise`\<`void`\>

回调函数（支持 async）

### ms

`number`

间隔毫秒数

## Returns

`Timeout`
