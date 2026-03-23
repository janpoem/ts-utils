[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / aryGuard

# Function: aryGuard()

> **aryGuard**\<`T`\>(`guard`): [`TypeGuard`](../type-aliases/TypeGuard.md)\<`T`[]\>

Defined in: [index.ts:406](https://github.com/janpoem/ts-utils/blob/738489a3f4830c04acd7944aaed6b04e6b346155/src/guards/index.ts#L406)

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
