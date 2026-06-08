# @zenstone/ts-utils

[![version](https://img.shields.io/npm/v/@zenstone/ts-utils?style=for-the-badge)](https://www.npmjs.com/package/@zenstone/ts-utils) [![dt](https://img.shields.io/npm/dt/@zenstone/ts-utils?style=for-the-badge)](https://www.npmjs.com/package/@zenstone/ts-utils)

从实际项目中沉淀的 TypeScript 工具库。不追求大而全，只收录真正在生产中反复使用的函数。

核心设计原则：

- **类型推断优先** — 泛型从原函数推断，不需要手动指定。`retry(fn)` 返回的函数自动保持 `fn` 的参数和返回值类型。
- **高阶函数模式** — `retry`、`timeout` 等都是 `fn => fn` 的包装器，返回增强后的函数而非立即执行。
- **`unknown` 守住边界** — 对外暴露的类型一律 `unknown`，迫使使用者显式收窄；`any` 只出现在泛型约束的基底声明中。
- **不过度抽象** — 没有 DI、没有装饰器、没有配置体系。三行能解决的事不封装成类。

使用 Bun.js 开发，兼容 Node.js 运行时。

API 文档见 [GitHub Wiki](https://github.com/janpoem/ts-utils/wiki)（由 TypeDoc + `typedoc-github-wiki-theme` 生成）。

## 安装

```bash
# node
npm install @zenstone/ts-utils
# bun
bun add @zenstone/ts-utils
```

## 使用

### 整体导入

```ts
import { retry, isStr, errMsg } from '@zenstone/ts-utils';
```

### 独立导入（推荐）

ESM 支持子路径导入：

```ts
import { retry, RetryExhaustedError, TimeoutError } from '@zenstone/ts-utils/async';
import { isStr, errMsg, isNumber, isInferObj } from '@zenstone/ts-utils/guards';
import { createPathUtils } from '@zenstone/ts-utils/path';
```

## 模块列表

| 模块 | 说明 | 导入路径 |
|------|------|----------|
| [`async`](https://github.com/janpoem/ts-utils/wiki/async) | 异步工具函数 | `@zenstone/ts-utils/async` |
| [`guards`](https://github.com/janpoem/ts-utils/wiki/guards) | Type Guards 和基础类型工具 | `@zenstone/ts-utils/guards` |
| [`path`](https://github.com/janpoem/ts-utils/wiki/path) | 路径处理 | `@zenstone/ts-utils/path` |
| [`http`](https://github.com/janpoem/ts-utils/wiki/http) | HTTP 相关工具 | `@zenstone/ts-utils/http` |
| [`remote`](https://github.com/janpoem/ts-utils/wiki/remote) | 远程模块加载 | `@zenstone/ts-utils/remote` |
| [`fetch-download`](https://github.com/janpoem/ts-utils/wiki/fetch-download) | 下载工具 | `@zenstone/ts-utils/fetch-download` |
| [`misc`](https://github.com/janpoem/ts-utils/wiki/misc) | 杂项工具（timer、singleton、configurable 等） | `@zenstone/ts-utils/misc` |
| [`events`](https://github.com/janpoem/ts-utils/wiki/events) | 事件发布订阅 | `@zenstone/ts-utils/events` |
| [`traits`](https://github.com/janpoem/ts-utils/wiki/traits) | traits | `@zenstone/ts-utils/traits` |

## 模块详情

### [`async`](https://github.com/janpoem/ts-utils/wiki/async)

异步工具函数

**Classes:**

- [`PendingScopeConflictError`](https://github.com/janpoem/ts-utils/wiki/async.Class.PendingScopeConflictError)
- [`RetryExhaustedError`](https://github.com/janpoem/ts-utils/wiki/async.Class.RetryExhaustedError)
- [`RpcAbortError`](https://github.com/janpoem/ts-utils/wiki/async.Class.RpcAbortError)
- [`StatefulRpc`](https://github.com/janpoem/ts-utils/wiki/async.Class.StatefulRpc)
- [`TimeoutError`](https://github.com/janpoem/ts-utils/wiki/async.Class.TimeoutError)

**Functions:**

- [`clearPendingRegistry`](https://github.com/janpoem/ts-utils/wiki/async.Function.clearPendingRegistry)
- [`pending`](https://github.com/janpoem/ts-utils/wiki/async.Function.pending)
- [`pendingFn`](https://github.com/janpoem/ts-utils/wiki/async.Function.pendingFn)
- [`retry`](https://github.com/janpoem/ts-utils/wiki/async.Function.retry)
- [`retryFn`](https://github.com/janpoem/ts-utils/wiki/async.Function.retryFn)
- [`sleep`](https://github.com/janpoem/ts-utils/wiki/async.Function.sleep)
- [`timeout`](https://github.com/janpoem/ts-utils/wiki/async.Function.timeout)

### [`guards`](https://github.com/janpoem/ts-utils/wiki/guards)

Type Guards 和基础类型工具

**Functions:**

- [`and`](https://github.com/janpoem/ts-utils/wiki/guards.Function.and)
- [`aryGuard`](https://github.com/janpoem/ts-utils/wiki/guards.Function.aryGuard)
- [`calcProgress`](https://github.com/janpoem/ts-utils/wiki/guards.Function.calcProgress)
- [`ceil10`](https://github.com/janpoem/ts-utils/wiki/guards.Function.ceil10)
- [`decimalAdjust`](https://github.com/janpoem/ts-utils/wiki/guards.Function.decimalAdjust)
- [`errMsg`](https://github.com/janpoem/ts-utils/wiki/guards.Function.errMsg)
- [`floor10`](https://github.com/janpoem/ts-utils/wiki/guards.Function.floor10)
- [`isAry`](https://github.com/janpoem/ts-utils/wiki/guards.Function.isAry)
- [`isBool`](https://github.com/janpoem/ts-utils/wiki/guards.Function.isBool)
- [`isCtor`](https://github.com/janpoem/ts-utils/wiki/guards.Function.isCtor)
- [`isErrLike`](https://github.com/janpoem/ts-utils/wiki/guards.Function.isErrLike)
- [`isInferObj`](https://github.com/janpoem/ts-utils/wiki/guards.Function.isInferObj)
- [`isNil`](https://github.com/janpoem/ts-utils/wiki/guards.Function.isNil)
- [`isNull`](https://github.com/janpoem/ts-utils/wiki/guards.Function.isNull)
- [`isNumber`](https://github.com/janpoem/ts-utils/wiki/guards.Function.isNumber)
- [`isNumberVal`](https://github.com/janpoem/ts-utils/wiki/guards.Function.isNumberVal)
- [`isPlainObj`](https://github.com/janpoem/ts-utils/wiki/guards.Function.isPlainObj)
- [`isPresent`](https://github.com/janpoem/ts-utils/wiki/guards.Function.isPresent)
- [`isPromise`](https://github.com/janpoem/ts-utils/wiki/guards.Function.isPromise)
- [`isStr`](https://github.com/janpoem/ts-utils/wiki/guards.Function.isStr)
- [`isUndefined`](https://github.com/janpoem/ts-utils/wiki/guards.Function.isUndefined)
- [`limitNumberMax`](https://github.com/janpoem/ts-utils/wiki/guards.Function.limitNumberMax)
- [`limitNumberMin`](https://github.com/janpoem/ts-utils/wiki/guards.Function.limitNumberMin)
- [`limitNumberMinMax`](https://github.com/janpoem/ts-utils/wiki/guards.Function.limitNumberMinMax)
- [`not`](https://github.com/janpoem/ts-utils/wiki/guards.Function.not)
- [`notEmptyAry`](https://github.com/janpoem/ts-utils/wiki/guards.Function.notEmptyAry)
- [`notEmptyStr`](https://github.com/janpoem/ts-utils/wiki/guards.Function.notEmptyStr)
- [`or`](https://github.com/janpoem/ts-utils/wiki/guards.Function.or)
- [`round10`](https://github.com/janpoem/ts-utils/wiki/guards.Function.round10)
- [`toNumber`](https://github.com/janpoem/ts-utils/wiki/guards.Function.toNumber)

### [`path`](https://github.com/janpoem/ts-utils/wiki/path)

路径处理

**Functions:**

- [`createPathUtils`](https://github.com/janpoem/ts-utils/wiki/path.Function.createPathUtils)
- [`UnixDS`](https://github.com/janpoem/ts-utils/wiki/path.Function.UnixDS)
- [`WinDS`](https://github.com/janpoem/ts-utils/wiki/path.Function.WinDS)

### [`http`](https://github.com/janpoem/ts-utils/wiki/http)

HTTP 相关工具

**Functions:**

- [`mergeAbortSignals`](https://github.com/janpoem/ts-utils/wiki/http.Function.mergeAbortSignals)
- [`mergeHeaders`](https://github.com/janpoem/ts-utils/wiki/http.Function.mergeHeaders)
- [`mergeRespInit`](https://github.com/janpoem/ts-utils/wiki/http.Function.mergeRespInit)
- [`toAryHeaders`](https://github.com/janpoem/ts-utils/wiki/http.Function.toAryHeaders)

### [`remote`](https://github.com/janpoem/ts-utils/wiki/remote)

远程模块加载

**Classes:**

- [`MountRemoteError`](https://github.com/janpoem/ts-utils/wiki/remote.Class.MountRemoteError)

**Functions:**

- [`createDomHandler`](https://github.com/janpoem/ts-utils/wiki/remote.Function.createDomHandler)
- [`mountRemote`](https://github.com/janpoem/ts-utils/wiki/remote.Function.mountRemote)
- [`registerMountHandler`](https://github.com/janpoem/ts-utils/wiki/remote.Function.registerMountHandler)
- [`unmountDomRemote`](https://github.com/janpoem/ts-utils/wiki/remote.Function.unmountDomRemote)

### [`fetch-download`](https://github.com/janpoem/ts-utils/wiki/fetch-download)

下载工具

**Classes:**

- [`DownloadQueue`](https://github.com/janpoem/ts-utils/wiki/fetch-download.Class.DownloadQueue)
- [`DownloadQueueError`](https://github.com/janpoem/ts-utils/wiki/fetch-download.Class.DownloadQueueError)
- [`DownloadTask`](https://github.com/janpoem/ts-utils/wiki/fetch-download.Class.DownloadTask)
- [`DownloadTaskError`](https://github.com/janpoem/ts-utils/wiki/fetch-download.Class.DownloadTaskError)
- [`DownloadTaskState`](https://github.com/janpoem/ts-utils/wiki/fetch-download.Enumeration.DownloadTaskState)

**Functions:**

- [`fetchDownload`](https://github.com/janpoem/ts-utils/wiki/fetch-download.Function.fetchDownload)
- [`saveChunks`](https://github.com/janpoem/ts-utils/wiki/fetch-download.Function.saveChunks)

### [`misc`](https://github.com/janpoem/ts-utils/wiki/misc)

杂项工具（timer、singleton、configurable 等）

**Functions:**

- [`clearTicker`](https://github.com/janpoem/ts-utils/wiki/misc.Function.clearTicker)
- [`clearTimer`](https://github.com/janpoem/ts-utils/wiki/misc.Function.clearTimer)
- [`cloneObj`](https://github.com/janpoem/ts-utils/wiki/misc.Function.cloneObj)
- [`configurable`](https://github.com/janpoem/ts-utils/wiki/misc.Function.configurable)
- [`singleton`](https://github.com/janpoem/ts-utils/wiki/misc.Function.singleton)
- [`ticker`](https://github.com/janpoem/ts-utils/wiki/misc.Function.ticker)
- [`timer`](https://github.com/janpoem/ts-utils/wiki/misc.Function.timer)

### [`events`](https://github.com/janpoem/ts-utils/wiki/events)

事件发布订阅

**Functions:**

- [`createDelegator`](https://github.com/janpoem/ts-utils/wiki/events.Function.createDelegator)
- [`createEmitter`](https://github.com/janpoem/ts-utils/wiki/events.Function.createEmitter)
- [`initEventsEmitter`](https://github.com/janpoem/ts-utils/wiki/events.Function.initEventsEmitter)
- [`isEventsDelegator`](https://github.com/janpoem/ts-utils/wiki/events.Function.isEventsDelegator)
- [`isEventsEmitter`](https://github.com/janpoem/ts-utils/wiki/events.Function.isEventsEmitter)
- [`linkEvents`](https://github.com/janpoem/ts-utils/wiki/events.Function.linkEvents)

### [`traits`](https://github.com/janpoem/ts-utils/wiki/traits)

traits

**Functions:**

- [`createDebuggableTrait`](https://github.com/janpoem/ts-utils/wiki/traits.Function.createDebuggableTrait)
- [`debugTimeFlag`](https://github.com/janpoem/ts-utils/wiki/traits.Function.debugTimeFlag)
- [`implTraits`](https://github.com/janpoem/ts-utils/wiki/traits.Function.implTraits)
