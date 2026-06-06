[**@zenstone/ts-utils**](../../README.md)

***

[@zenstone/ts-utils](../../modules.md) / [path](../README.md) / joinHttpPath

# Variable: joinHttpPath

> **joinHttpPath**: (...`paths`) => `string`

Defined in: [src/path.ts:116](https://github.com/janpoem/ts-utils/blob/cc47b42336ba4f377a5b240d70447dc1812f8c94/src/path.ts#L116)

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
