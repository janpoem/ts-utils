[**@zenstone/ts-utils**](../../README.md)

***

[@zenstone/ts-utils](../../modules.md) / [guards](../README.md) / or

# Function: or()

> **or**\<`G`\>(...`guards`): [`TypeGuard`](../type-aliases/TypeGuard.md)\<[`InferGuard`](../type-aliases/InferGuard.md)\<`G`\[`number`\]\>\>

Defined in: [src/guards/index.ts:488](https://github.com/janpoem/ts-utils/blob/a6181273044ad30164507cc181a58cccd8e952df/src/guards/index.ts#L488)

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
