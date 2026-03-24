[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / MountHandlerMap

# Interface: MountHandlerMap

Defined in: [src/remote/mountRemote.ts:78](https://github.com/janpoem/ts-utils/blob/a9ae0d5ab8db50d99f88de922674a4455e94f5fc/src/remote/mountRemote.ts#L78)

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

Defined in: [src/remote/mountRemote.ts:80](https://github.com/janpoem/ts-utils/blob/a9ae0d5ab8db50d99f88de922674a4455e94f5fc/src/remote/mountRemote.ts#L80)

***

### js

> **js**: [`MountHandlerFn`](../type-aliases/MountHandlerFn.md)\<[`MountDomOptions`](../type-aliases/MountDomOptions.md), [`MountDomResult`](../type-aliases/MountDomResult.md)\>

Defined in: [src/remote/mountRemote.ts:79](https://github.com/janpoem/ts-utils/blob/a9ae0d5ab8db50d99f88de922674a4455e94f5fc/src/remote/mountRemote.ts#L79)

***

### mjs

> **mjs**: [`MountHandlerFn`](../type-aliases/MountHandlerFn.md)\<[`MountDomOptions`](../type-aliases/MountDomOptions.md), [`MountDomResult`](../type-aliases/MountDomResult.md)\>

Defined in: [src/remote/mountRemote.ts:81](https://github.com/janpoem/ts-utils/blob/a9ae0d5ab8db50d99f88de922674a4455e94f5fc/src/remote/mountRemote.ts#L81)
