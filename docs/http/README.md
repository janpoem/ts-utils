**@zenstone/ts-utils**

***

# @zenstone/ts-utils

[![version](https://img.shields.io/npm/v/@zenstone/ts-utils?style=for-the-badge)](https://www.npmjs.com/package/@zenstone/ts-utils) [![dt](https://img.shields.io/npm/dt/@zenstone/ts-utils?style=for-the-badge)](https://www.npmjs.com/package/@zenstone/ts-utils)

TypeScript 工具函数库。主要集中近 2 年使用频率较高的工具函数。主要便于快速在
Bun.js 和 TypeScript 项目中使用。

使用 Bun.js 开发。

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
| [`async`](_media/globals.md) | 异步工具函数 | `@zenstone/ts-utils/async` |
| [`guards`](_media/globals-1.md) | Type Guards 和基础类型工具 | `@zenstone/ts-utils/guards` |
| [`path`](_media/globals-2.md) | 路径处理 | `@zenstone/ts-utils/path` |
| [`http`](_media/globals-3.md) | HTTP 相关工具 | `@zenstone/ts-utils/http` |
| [`remote`](_media/globals-4.md) | 远程模块加载 | `@zenstone/ts-utils/remote` |
| [`fetch-download`](_media/globals-5.md) | 下载工具 | `@zenstone/ts-utils/fetch-download` |

## 模块详情

### [`async`](_media/globals.md)

异步工具函数

**Classes:**

- [`RetryExhaustedError`](_media/RetryExhaustedError.md)
- [`TimeoutError`](_media/TimeoutError.md)

**Functions:**

- [`retry`](_media/retry.md)
- [`retryFn`](_media/retryFn.md)
- [`sleep`](_media/sleep.md)
- [`timeout`](_media/timeout.md)

### [`guards`](_media/globals-1.md)

Type Guards 和基础类型工具

**Functions:**

- [`and`](_media/and.md)
- [`aryGuard`](_media/aryGuard.md)
- [`calcProgress`](_media/calcProgress.md)
- [`ceil10`](_media/ceil10.md)
- [`decimalAdjust`](_media/decimalAdjust.md)
- [`errMsg`](_media/errMsg.md)
- [`floor10`](_media/floor10.md)
- [`isAry`](_media/isAry.md)
- [`isBool`](_media/isBool.md)
- [`isErrLike`](_media/isErrLike.md)
- [`isInferObj`](_media/isInferObj.md)
- [`isNil`](_media/isNil.md)
- [`isNull`](_media/isNull.md)
- [`isNumber`](_media/isNumber.md)
- [`isNumberVal`](_media/isNumberVal.md)
- [`isPlainObj`](_media/isPlainObj.md)
- [`isPresent`](_media/isPresent.md)
- [`isPromise`](_media/isPromise.md)
- [`isStr`](_media/isStr.md)
- [`isUndefined`](_media/isUndefined.md)
- [`limitNumberMax`](_media/limitNumberMax.md)
- [`limitNumberMin`](_media/limitNumberMin.md)
- [`limitNumberMinMax`](_media/limitNumberMinMax.md)
- [`not`](_media/not.md)
- [`notEmptyAry`](_media/notEmptyAry.md)
- [`notEmptyStr`](_media/notEmptyStr.md)
- [`or`](_media/or.md)
- [`round10`](_media/round10.md)
- [`toNumber`](_media/toNumber.md)

### [`path`](_media/globals-2.md)

路径处理

**Functions:**

- [`createPathUtils`](_media/createPathUtils.md)
- [`UnixDS`](docs/path/functions/UnixDS.md)
- [`WinDS`](docs/path/functions/WinDS.md)

### [`http`](_media/globals-3.md)

HTTP 相关工具

**Functions:**

- [`mergeAbortSignals`](_media/mergeAbortSignals.md)
- [`mergeHeaders`](_media/mergeHeaders.md)
- [`mergeRespInit`](_media/mergeRespInit.md)
- [`toAryHeaders`](_media/toAryHeaders.md)

### [`remote`](_media/globals-4.md)

远程模块加载

**Classes:**

- [`MountRemoteError`](_media/MountRemoteError.md)

**Functions:**

- [`mountRemote`](_media/mountRemote.md)
- [`unmountRemote`](_media/unmountRemote.md)

### [`fetch-download`](_media/globals-5.md)

下载工具

**Classes:**

- [`DownloadQueue`](_media/DownloadQueue.md)
- [`DownloadQueueError`](_media/DownloadQueueError.md)
- [`DownloadTask`](_media/DownloadTask.md)
- [`DownloadTaskError`](_media/DownloadTaskError.md)
- [`DownloadTaskState`](_media/DownloadTaskState.md)

**Functions:**

- [`fetchDownload`](_media/fetchDownload.md)
- [`saveChunks`](_media/saveChunks.md)
