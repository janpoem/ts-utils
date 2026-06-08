[**@zenstone/ts-utils**](../../README.md)

***

[@zenstone/ts-utils](../../modules.md) / [guards](../README.md) / not

# Function: not()

> **not**(`guard`): (`val`) => `boolean`

Defined in: [src/guards/index.ts:516](https://github.com/janpoem/ts-utils/blob/e6f0e2dae5b274785affda26cac7db86fc0832b2/src/guards/index.ts#L516)

守卫取反（NOT）

返回运行时取反函数。由于 TS 类型系统不支持否定类型，
返回值为 `(val: unknown) => boolean`，不作为类型守卫使用。

## Parameters

### guard

[`TypeGuard`](../type-aliases/TypeGuard.md)

要取反的守卫函数

## Returns

取反后的判断函数

(`val`) => `boolean`

## Example

```ts
const isNotNull = not(isNull);
if (isNotNull(value)) {
  // 运行时正确，但不会收窄类型
}
```
