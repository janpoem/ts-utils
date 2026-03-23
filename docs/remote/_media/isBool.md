[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / isBool

# Function: isBool()

> **isBool**(`val`): `val is boolean`

Defined in: [index.ts:290](https://github.com/janpoem/ts-utils/blob/738489a3f4830c04acd7944aaed6b04e6b346155/src/guards/index.ts#L290)

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
