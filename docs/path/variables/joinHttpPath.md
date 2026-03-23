[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / joinHttpPath

# Variable: joinHttpPath

> **joinHttpPath**: (...`paths`) => `string`

Defined in: [path.ts:116](https://github.com/janpoem/ts-utils/blob/738489a3f4830c04acd7944aaed6b04e6b346155/src/path.ts#L116)

连接多个路径，当 '..' 超过最大路径时（顶部）时，会保留下来。

```ts
console.log(joinHttpPath('a', 'b', 'c', '../../../../../..', 'd', '../../..', 'e'));
// => '../../../../../e'
```

## Parameters

### paths

...[`PathInput`](../type-aliases/PathInput.md)[]

输入的路径

## Returns

`string`

连接后的路径
