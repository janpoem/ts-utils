[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / not

# Function: not()

> **not**(`guard`): (`val`) => `boolean`

Defined in: [index.ts:512](https://github.com/janpoem/ts-utils/blob/738489a3f4830c04acd7944aaed6b04e6b346155/src/guards/index.ts#L512)

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
