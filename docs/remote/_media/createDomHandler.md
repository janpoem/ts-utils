[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / createDomHandler

# Function: createDomHandler()

> **createDomHandler**(`tagName`, `setup`): [`MountHandlerFn`](../type-aliases/MountHandlerFn.md)\<[`MountDomOptions`](../type-aliases/MountDomOptions.md), [`MountDomResult`](../type-aliases/MountDomResult.md)\>

Defined in: [src/remote/mountRemote.ts:135](https://github.com/janpoem/ts-utils/blob/a9ae0d5ab8db50d99f88de922674a4455e94f5fc/src/remote/mountRemote.ts#L135)

创建基于 DOM 元素的挂载处理器

适用于通过 script/link 等标签加载的资源。自动处理：
- `getElementById` 短路检查
- 创建元素并设置属性
- 设置 id（使用 scope）
- 监听 load/error 事件
- 挂载到 document.head

## Parameters

### tagName

`string`

标签名

### setup

(`el`, `ctx`) => `void`

元素初始化函数

## Returns

[`MountHandlerFn`](../type-aliases/MountHandlerFn.md)\<[`MountDomOptions`](../type-aliases/MountDomOptions.md), [`MountDomResult`](../type-aliases/MountDomResult.md)\>

## Example

```ts
registerMountHandler('img', createDomHandler('img', (el, ctx) => {
  el.setAttribute('src', ctx.url);
}));
```
