[**@zenstone/ts-utils**](../../README.md)

***

[@zenstone/ts-utils](../../modules.md) / [remote](../README.md) / MountHandlerMap

# Interface: MountHandlerMap

Defined in: [src/remote/mountRemote.ts:85](https://github.com/janpoem/ts-utils/blob/a6181273044ad30164507cc181a58cccd8e952df/src/remote/mountRemote.ts#L85)

Handler 类型映射表

通过 interface 声明合并扩展：
```ts
declare module '@zenstone/ts-utils/remote' {
  interface MountHandlerMap {
    wasm: MountHandlerFn<{ url: string; importObject?: WebAssembly.Imports }>;
  }
}
```

## Properties

### css

> **css**: [`MountHandlerFn`](../type-aliases/MountHandlerFn.md)\<[`MountDomOptions`](../type-aliases/MountDomOptions.md), [`MountDomResult`](../type-aliases/MountDomResult.md)\>

Defined in: [src/remote/mountRemote.ts:87](https://github.com/janpoem/ts-utils/blob/a6181273044ad30164507cc181a58cccd8e952df/src/remote/mountRemote.ts#L87)

***

### js

> **js**: [`MountHandlerFn`](../type-aliases/MountHandlerFn.md)\<[`MountDomOptions`](../type-aliases/MountDomOptions.md), [`MountDomResult`](../type-aliases/MountDomResult.md)\>

Defined in: [src/remote/mountRemote.ts:86](https://github.com/janpoem/ts-utils/blob/a6181273044ad30164507cc181a58cccd8e952df/src/remote/mountRemote.ts#L86)

***

### mjs

> **mjs**: [`MountHandlerFn`](../type-aliases/MountHandlerFn.md)\<[`MountDomOptions`](../type-aliases/MountDomOptions.md), [`MountDomResult`](../type-aliases/MountDomResult.md)\>

Defined in: [src/remote/mountRemote.ts:88](https://github.com/janpoem/ts-utils/blob/a6181273044ad30164507cc181a58cccd8e952df/src/remote/mountRemote.ts#L88)
