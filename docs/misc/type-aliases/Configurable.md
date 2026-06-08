[**@zenstone/ts-utils**](../../README.md)

***

[@zenstone/ts-utils](../../modules.md) / [misc](../README.md) / Configurable

# Type Alias: Configurable\<T\>

> **Configurable**\<`T`\> = `object`

Defined in: [src/misc/configurable.ts:3](https://github.com/janpoem/ts-utils/blob/e6f0e2dae5b274785affda26cac7db86fc0832b2/src/misc/configurable.ts#L3)

## Type Parameters

### T

`T` *extends* `object`

## Methods

### get()

> **get**\<`K`\>(`key`): `T`\[`K`\]

Defined in: [src/misc/configurable.ts:7](https://github.com/janpoem/ts-utils/blob/e6f0e2dae5b274785affda26cac7db86fc0832b2/src/misc/configurable.ts#L7)

读取配置值，优先级：用户设置 > 预设值

#### Type Parameters

##### K

`K` *extends* `string` \| `number` \| `symbol`

#### Parameters

##### key

`K`

#### Returns

`T`\[`K`\]

***

### getAll()

> **getAll**(): `T`

Defined in: [src/misc/configurable.ts:15](https://github.com/janpoem/ts-utils/blob/e6f0e2dae5b274785affda26cac7db86fc0832b2/src/misc/configurable.ts#L15)

获取合并后的完整配置：{ ...presets, ...users }

#### Returns

`T`

***

### reset()

> **reset**(): `void`

Defined in: [src/misc/configurable.ts:23](https://github.com/janpoem/ts-utils/blob/e6f0e2dae5b274785affda26cac7db86fc0832b2/src/misc/configurable.ts#L23)

重置用户设置，回退到预设值

#### Returns

`void`

***

### set()

> **set**\<`K`\>(`key`, `value`): `void`

Defined in: [src/misc/configurable.ts:11](https://github.com/janpoem/ts-utils/blob/e6f0e2dae5b274785affda26cac7db86fc0832b2/src/misc/configurable.ts#L11)

设置单个配置值（写入用户空间）

#### Type Parameters

##### K

`K` *extends* `string` \| `number` \| `symbol`

#### Parameters

##### key

`K`

##### value

`T`\[`K`\]

#### Returns

`void`

***

### setAll()

> **setAll**(`data`): `void`

Defined in: [src/misc/configurable.ts:19](https://github.com/janpoem/ts-utils/blob/e6f0e2dae5b274785affda26cac7db86fc0832b2/src/misc/configurable.ts#L19)

批量设置配置值（写入用户空间）

#### Parameters

##### data

`Partial`\<`T`\>

#### Returns

`void`
