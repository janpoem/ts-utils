[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / or

# Function: or()

> **or**\<`G`\>(...`guards`): [`TypeGuard`](../type-aliases/TypeGuard.md)\<[`InferGuard`](../type-aliases/InferGuard.md)\<`G`\[`number`\]\>\>

Defined in: [index.ts:484](https://github.com/janpoem/ts-utils/blob/738489a3f4830c04acd7944aaed6b04e6b346155/src/guards/index.ts#L484)

组合守卫（OR）

任意一个守卫通过即返回 true，自动推断联合类型

## Type Parameters

### G

`G` *extends* \[[`TypeGuard`](../type-aliases/TypeGuard.md)\<`any`\>, `...TypeGuard<any>[]`\]

## Parameters

### guards

...`G`

一个或多个守卫函数

## Returns

[`TypeGuard`](../type-aliases/TypeGuard.md)\<[`InferGuard`](../type-aliases/InferGuard.md)\<`G`\[`number`\]\>\>

组合后的守卫函数

## Example

```ts
const isStrOrNum = or(isStr, isNumber);
if (isStrOrNum(value)) {
  // value: string | number
}
```
