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
| `async` | 异步工具函数和错误类型 | `@zenstone/ts-utils/async` |
| `guards` | Type Guards 和基础类型工具 | `@zenstone/ts-utils/guards` |
| `path` | 路径处理 | `@zenstone/ts-utils/path` |
| `http` | HTTP 相关 | `@zenstone/ts-utils/http` |
| `remote` | 远程模块加载 | `@zenstone/ts-utils/remote` |
| `fetch-download` | 下载工具 | `@zenstone/ts-utils/fetch-download` |

## 模块详情

### `async`

异步工具模块，包含错误类型和异步控制函数。

**错误类型：**
- `RetryExhaustedError` - 重试耗尽错误
- `TimeoutError` - 超时错误

**函数：**
- `retry` - 重试异步函数
- `retryWithBackoff` - 带指数退避的重试
- `timeout` - Promise 超时控制
- `asyncMemoize` - 异步函数记忆化
- `asyncQueue` - 异步并发控制队列

### `guards`

Type Guards 和基础类型工具模块。

**字符串：**
- `isStr` - 判断是否为字符串
- `notEmptyStr` - 判断是否为非空字符串

**数字：**
- `isNumber` - 判断是否为有效数字
- `isNumberVal` - 判断是否包含有效数值
- `toNumber` - 转换为数字
- `limitNumberMin` / `limitNumberMax` / `limitNumberMinMax` - 限制数字范围
- `decimalAdjust` / `round10` / `ceil10` / `floor10` - 数字精度调整
- `calcProgress` - 计算进度值

**对象：**
- `isInferObj` - 类型守卫工具

**错误：**
- `isErrLike` - 判断是否为错误对象
- `errMsg` - 提取错误消息

**类型守卫：**
- `isString` / `isStr` - 字符串
- `isBool` - 布尔值
- `isNull` / `isUndefined` / `isNil` / `isPresent` - 空值判断
- `isPlainObj` - 普通对象
- `isAry` - 数组
- `isPromise` - Promise
- `and` - 组合守卫（AND）
- `or` - 组合守卫（OR）
- `not` - 守卫取反

### `path`

- `createPathUtils` - 路径工具工厂
- `purgeHttpPath` / `joinHttpPath` - HTTP 路径处理

### `http`

- `mergeHeaders` / `mergeRespInit` / `toAryHeaders` / `mergeAbortSignals`

### `fetch-download`

- `saveChunks` / `fetchDownload`
- `DownloadTask` / `DownloadTaskError`
- `DownloadQueue` / `DownloadQueueError`

### `remote`

- `mountRemote` / `unmountRemote`
