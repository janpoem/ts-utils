[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / isPlainObj

# Function: isPlainObj()

> **isPlainObj**\<`T`\>(`val`): `val is T`

Defined in: [index.ts:343](https://github.com/janpoem/ts-utils/blob/a9ae0d5ab8db50d99f88de922674a4455e94f5fc/src/guards/index.ts#L343)

检查值是否为一个普通对象（不包括数组、Date、RegExp 等特殊对象）

## Type Parameters

### T

`T` *extends* `Record`\<`string`, `unknown`\> = `Record`\<`string`, `unknown`\>

## Parameters

### val

`unknown`

任意值

## Returns

`val is T`

## Example

```ts
if (isPlainObj(value)) {
  console.log(Object.keys(value));
}
```
