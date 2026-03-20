[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / AsyncMemoizeOptions

# Type Alias: AsyncMemoizeOptions

> **AsyncMemoizeOptions** = `object`

Defined in: src/async/index.ts:188

异步函数缓存选项

## Properties

### keyGenerator?

> `optional` **keyGenerator?**: (...`args`) => `string`

Defined in: src/async/index.ts:192

缓存 key 生成器，默认使用第一个参数

#### Parameters

##### args

...`unknown`[]

#### Returns

`string`

***

### maxSize?

> `optional` **maxSize?**: `number`

Defined in: src/async/index.ts:194

最大缓存条目数，默认 100

***

### ttl?

> `optional` **ttl?**: `number`

Defined in: src/async/index.ts:190

缓存生存时间（毫秒），默认不过期
