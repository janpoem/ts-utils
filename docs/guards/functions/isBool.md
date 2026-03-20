[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / isBool

# Function: isBool()

> **isBool**(`val`): `val is boolean`

Defined in: index.ts:305

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
