[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / notEmptyAry

# Function: notEmptyAry()

## Call Signature

> **notEmptyAry**\<`T`\>(`val`): `val is T[]`

Defined in: [index.ts:374](https://github.com/janpoem/ts-utils/blob/e1c9059704283c01ba11cb71f495bc809435613d/src/guards/index.ts#L374)

检查值是否为非空数组，支持可选的元素类型守卫

### Type Parameters

#### T

`T` = `unknown`

### Parameters

#### val

`unknown`

任意值

### Returns

`val is T[]`

### Example

```ts
if (notEmptyAry(value)) {
  console.log(value[0]); // value is unknown[]
}

if (notEmptyAry(value, isStr)) {
  console.log(value[0].toUpperCase()); // value is string[]
}
```

## Call Signature

> **notEmptyAry**\<`T`\>(`val`, `guard`): `val is T[]`

Defined in: [index.ts:375](https://github.com/janpoem/ts-utils/blob/e1c9059704283c01ba11cb71f495bc809435613d/src/guards/index.ts#L375)

检查值是否为非空数组，支持可选的元素类型守卫

### Type Parameters

#### T

`T`

### Parameters

#### val

`unknown`

任意值

#### guard

(`item`) => `item is T`

可选的元素类型守卫

### Returns

`val is T[]`

### Example

```ts
if (notEmptyAry(value)) {
  console.log(value[0]); // value is unknown[]
}

if (notEmptyAry(value, isStr)) {
  console.log(value[0].toUpperCase()); // value is string[]
}
```
