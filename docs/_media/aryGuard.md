[**@zenstone/ts-utils**](../../README.md)

***

[@zenstone/ts-utils](../../modules.md) / [guards](../README.md) / aryGuard

# Function: aryGuard()

> **aryGuard**\<`T`\>(`guard`): [`TypeGuard`](../type-aliases/TypeGuard.md)\<`T`[]\>

Defined in: [src/guards/index.ts:411](https://github.com/janpoem/ts-utils/blob/a6181273044ad30164507cc181a58cccd8e952df/src/guards/index.ts#L411)

柯里化的数组类型守卫

## Type Parameters

### T

`T`

## Parameters

### guard

(`item`) => `item is T`

元素类型守卫

## Returns

[`TypeGuard`](../type-aliases/TypeGuard.md)\<`T`[]\>

数组类型守卫函数

## Example

```ts
const isStrAry = aryGuard(isStr);

if (isStrAry(value)) {
  // value is string[]
}

// 配合 and 使用
const isNonEmptyStrAry = and(isStrAry, (arr) => arr.length > 0);
```
