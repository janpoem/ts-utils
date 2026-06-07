[**@zenstone/ts-utils**](../../README.md)

***

[@zenstone/ts-utils](../../modules.md) / [misc](../README.md) / timer

# Function: timer()

> **timer**(`key`, `callback`, `ms`): `Timeout`

Defined in: [src/misc/timer.ts:10](https://github.com/janpoem/ts-utils/blob/a6181273044ad30164507cc181a58cccd8e952df/src/misc/timer.ts#L10)

命名 setTimeout，同一 key 会先清除已有的定时器再重新设置

## Parameters

### key

`string`

定时器标识

### callback

() => `void` \| `Promise`\<`void`\>

回调函数（支持 async）

### ms

`number`

延迟毫秒数

## Returns

`Timeout`
