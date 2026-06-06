[**@zenstone/ts-utils**](../../README.md)

***

[@zenstone/ts-utils](../../modules.md) / [guards](../README.md) / isBool

# Function: isBool()

> **isBool**(`val`): `val is boolean`

Defined in: [src/guards/index.ts:290](https://github.com/janpoem/ts-utils/blob/cc47b42336ba4f377a5b240d70447dc1812f8c94/src/guards/index.ts#L290)

检查值是否为布尔值

## Parameters

### val

`unknown`

任意值

## Returns

`val is boolean`

## Example

```ts
if (isBool(value)) {
  console.log(value ? 'yes' : 'no');
}
```
