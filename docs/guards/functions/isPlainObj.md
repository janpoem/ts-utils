[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / isPlainObj

# Function: isPlainObj()

> **isPlainObj**(`val`): `val is Record<string, unknown>`

Defined in: index.ts:358

检查值是否为一个普通对象（不包括数组、Date、RegExp 等特殊对象）

## Parameters

### val

`unknown`

任意值

## Returns

`val is Record<string, unknown>`

## Example

```ts
if (isPlainObj(value)) {
  console.log(Object.keys(value));
}
```
