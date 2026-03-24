# @zenstone/ts-utils

[![version](https://img.shields.io/npm/v/@zenstone/ts-utils?style=for-the-badge)](https://www.npmjs.com/package/@zenstone/ts-utils) [![dt](https://img.shields.io/npm/dt/@zenstone/ts-utils?style=for-the-badge)](https://www.npmjs.com/package/@zenstone/ts-utils)

从实际项目中沉淀的 TypeScript 工具库。不追求大而全，只收录真正在生产中反复使用的函数。

核心设计原则：

- **类型推断优先** — 泛型从原函数推断，不需要手动指定。`retry(fn)` 返回的函数自动保持 `fn` 的参数和返回值类型。
- **高阶函数模式** — `retry`、`timeout` 等都是 `fn => fn` 的包装器，返回增强后的函数而非立即执行。
- **`unknown` 守住边界** — 对外暴露的类型一律 `unknown`，迫使使用者显式收窄；`any` 只出现在泛型约束的基底声明中。
- **不过度抽象** — 没有 DI、没有装饰器、没有配置体系。三行能解决的事不封装成类。

使用 Bun.js 开发，兼容 Node.js 运行时。

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
| [`async`](docs/async/globals.md) | 异步工具函数 | `@zenstone/ts-utils/async` |
| [`guards`](docs/guards/globals.md) | Type Guards 和基础类型工具 | `@zenstone/ts-utils/guards` |
| [`path`](docs/path/globals.md) | 路径处理 | `@zenstone/ts-utils/path` |
| [`http`](docs/http/globals.md) | HTTP 相关工具 | `@zenstone/ts-utils/http` |
| [`remote`](docs/remote/globals.md) | 远程模块加载 | `@zenstone/ts-utils/remote` |
| [`fetch-download`](docs/fetch-download/globals.md) | 下载工具 | `@zenstone/ts-utils/fetch-download` |

## 模块详情

### [`async`](docs/async/globals.md)

异步工具函数

**Classes:**

- [`PendingScopeConflictError`](docs/async/classes/PendingScopeConflictError.md)
- [`RetryExhaustedError`](docs/async/classes/RetryExhaustedError.md)
- [`TimeoutError`](docs/async/classes/TimeoutError.md)

**Functions:**

- [`clearPendingRegistry`](docs/async/functions/clearPendingRegistry.md)
- [`pending`](docs/async/functions/pending.md)
- [`pendingFn`](docs/async/functions/pendingFn.md)
- [`retry`](docs/async/functions/retry.md)
- [`retryFn`](docs/async/functions/retryFn.md)
- [`sleep`](docs/async/functions/sleep.md)
- [`timeout`](docs/async/functions/timeout.md)

### [`guards`](docs/guards/globals.md)

Type Guards 和基础类型工具

**Functions:**

- [`and`](docs/guards/functions/and.md)
- [`aryGuard`](docs/guards/functions/aryGuard.md)
- [`calcProgress`](docs/guards/functions/calcProgress.md)
- [`ceil10`](docs/guards/functions/ceil10.md)
- [`decimalAdjust`](docs/guards/functions/decimalAdjust.md)
- [`errMsg`](docs/guards/functions/errMsg.md)
- [`floor10`](docs/guards/functions/floor10.md)
- [`isAry`](docs/guards/functions/isAry.md)
- [`isBool`](docs/guards/functions/isBool.md)
- [`isErrLike`](docs/guards/functions/isErrLike.md)
- [`isInferObj`](docs/guards/functions/isInferObj.md)
- [`isNil`](docs/guards/functions/isNil.md)
- [`isNull`](docs/guards/functions/isNull.md)
- [`isNumber`](docs/guards/functions/isNumber.md)
- [`isNumberVal`](docs/guards/functions/isNumberVal.md)
- [`isPlainObj`](docs/guards/functions/isPlainObj.md)
- [`isPresent`](docs/guards/functions/isPresent.md)
- [`isPromise`](docs/guards/functions/isPromise.md)
- [`isStr`](docs/guards/functions/isStr.md)
- [`isUndefined`](docs/guards/functions/isUndefined.md)
- [`limitNumberMax`](docs/guards/functions/limitNumberMax.md)
- [`limitNumberMin`](docs/guards/functions/limitNumberMin.md)
- [`limitNumberMinMax`](docs/guards/functions/limitNumberMinMax.md)
- [`not`](docs/guards/functions/not.md)
- [`notEmptyAry`](docs/guards/functions/notEmptyAry.md)
- [`notEmptyStr`](docs/guards/functions/notEmptyStr.md)
- [`or`](docs/guards/functions/or.md)
- [`round10`](docs/guards/functions/round10.md)
- [`toNumber`](docs/guards/functions/toNumber.md)

### [`path`](docs/path/globals.md)

路径处理

**Functions:**

- [`createPathUtils`](docs/path/functions/createPathUtils.md)
- [`UnixDS`](docs/path/functions/UnixDS.md)
- [`WinDS`](docs/path/functions/WinDS.md)

### [`http`](docs/http/globals.md)

HTTP 相关工具

**Functions:**

- [`mergeAbortSignals`](docs/http/functions/mergeAbortSignals.md)
- [`mergeHeaders`](docs/http/functions/mergeHeaders.md)
- [`mergeRespInit`](docs/http/functions/mergeRespInit.md)
- [`toAryHeaders`](docs/http/functions/toAryHeaders.md)

### [`remote`](docs/remote/globals.md)

远程模块加载

**Classes:**

- [`MountRemoteError`](docs/remote/classes/MountRemoteError.md)

**Functions:**

- [`createDomHandler`](docs/remote/functions/createDomHandler.md)
- [`mountRemote`](docs/remote/functions/mountRemote.md)
- [`registerMountHandler`](docs/remote/functions/registerMountHandler.md)
- [`unmountDomRemote`](docs/remote/functions/unmountDomRemote.md)

### [`fetch-download`](docs/fetch-download/globals.md)

下载工具

**Classes:**

- [`DownloadQueue`](docs/fetch-download/classes/DownloadQueue.md)
- [`DownloadQueueError`](docs/fetch-download/classes/DownloadQueueError.md)
- [`DownloadTask`](docs/fetch-download/classes/DownloadTask.md)
- [`DownloadTaskError`](docs/fetch-download/classes/DownloadTaskError.md)
- [`DownloadTaskState`](docs/fetch-download/enumerations/DownloadTaskState.md)

**Functions:**

- [`fetchDownload`](docs/fetch-download/functions/fetchDownload.md)
- [`saveChunks`](docs/fetch-download/functions/saveChunks.md)
