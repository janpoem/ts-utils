[**@zenstone/ts-utils**](../../README.md)

***

[@zenstone/ts-utils](../../modules.md) / [guards](../README.md) / isBool

# Function: isBool()

> **isBool**(`val`): `val is boolean`

Defined in: [src/guards/index.ts:290](https://github.com/janpoem/ts-utils/blob/e6f0e2dae5b274785affda26cac7db86fc0832b2/src/guards/index.ts#L290)

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
