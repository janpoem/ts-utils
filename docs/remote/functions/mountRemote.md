[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / mountRemote

# Function: mountRemote()

> **mountRemote**\<`R`\>(`opts`): `Promise`\<[`MountRemoteResult`](../type-aliases/MountRemoteResult.md)\<`R`\>\>

Defined in: [src/remote/mountRemote.ts:84](https://github.com/janpoem/ts-utils/blob/b61bddc532949fab14342589ffa2d587c10fb6e1/src/remote/mountRemote.ts#L84)

挂载远程的资源

内置实现了 `js` 和 `css` 两种资源，主要在当前 html 中加入 `script` 和 `link` 标签实现。

更多的资源加载，可以使用 `handle` 来实现。`handle` 函数可以返回 [MountRemoteResult](../type-aliases/MountRemoteResult.md) 的扩展结构以扩充返回的结果

```ts
await mountRemote({
  url: 'xxx.js',
  id: 'xxx_js',
  type: 'js',
  onLoad: () => {
    // 加载成功时执行
  }
});
```

## Type Parameters

• **R** = `unknown`

## Parameters

### opts

[`MountRemoteOptions`](../type-aliases/MountRemoteOptions.md)\<`R`\>

## Returns

`Promise`\<[`MountRemoteResult`](../type-aliases/MountRemoteResult.md)\<`R`\>\>
