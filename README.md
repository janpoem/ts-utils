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

## 文档

### `@zenstone/ts-utils`

[文档入口](https://github.com/janpoem/ts-utils/blob/main/docs/globals.md)

`@zenstone/ts-utils` 包含以下子模块（0.0.11 以后，全部整合，不再分子目录）。

- `error`
- `number`
- `object`
- `path`
- `string`
- `http`
- `remote`
- `fetch-download`

#### `error`

- [isErrLike](https://github.com/janpoem/ts-utils/blob/main/docs/functions/isErrLike.md)
- [errMsg](https://github.com/janpoem/ts-utils/blob/main/docs/functions/errMsg.md)

#### `number`

- [isNumber](https://github.com/janpoem/ts-utils/blob/main/docs/functions/isNumber.md)
- [isNumberVal](https://github.com/janpoem/ts-utils/blob/main/docs/functions/isNumberVal.md)
- [toNumber](https://github.com/janpoem/ts-utils/blob/main/docs/functions/toNumber.md)
- [limitNumberMax](https://github.com/janpoem/ts-utils/blob/main/docs/functions/limitNumberMax.md)
- [limitNumberMin](https://github.com/janpoem/ts-utils/blob/main/docs/functions/limitNumberMin.md)
- [limitNumberMinMax](https://github.com/janpoem/ts-utils/blob/main/docs/functions/limitNumberMinMax.md)
- [decimalAdjust](https://github.com/janpoem/ts-utils/blob/main/docs/functions/decimalAdjust.md)
    - [round10](https://github.com/janpoem/ts-utils/blob/main/docs/functions/round10.md)
    - [ceil10](https://github.com/janpoem/ts-utils/blob/main/docs/functions/ceil10.md)
    - [floor10](https://github.com/janpoem/ts-utils/blob/main/docs/functions/floor10.md)
- [calcProgress](https://github.com/janpoem/ts-utils/blob/main/docs/functions/calcProgress.md)

#### `object`

- [isInferObj](https://github.com/janpoem/ts-utils/blob/main/docs/functions/isInferObj.md)

#### `path`

- [createPathUtils](https://github.com/janpoem/ts-utils/blob/main/docs/functions/createPathUtils.md)
- [purgeHttpPath](https://github.com/janpoem/ts-utils/blob/main/docs/functions/purgeHttpPath.md)
- [joinHttpPath](https://github.com/janpoem/ts-utils/blob/main/docs/functions/joinHttpPath.md)

#### `string`

- [isStr](https://github.com/janpoem/ts-utils/blob/main/docs/functions/isStr.md)
- [notEmptyStr](https://github.com/janpoem/ts-utils/blob/main/docs/functions/notEmptyStr.md)

#### `http`

- [mergeHeaders](https://github.com/janpoem/ts-utils/blob/main/docs/functions/mergeHeaders.md)
- [mergeRespInit](https://github.com/janpoem/ts-utils/blob/main/docs/functions/mergeRespInit.md)
- [toAryHeaders](https://github.com/janpoem/ts-utils/blob/main/docs/functions/toAryHeaders.md)
- [mergeAbortSignals](https://github.com/janpoem/ts-utils/blob/main/docs/functions/mergeAbortSignals.md)

#### `fetch-download`

[文档入口](https://github.com/janpoem/ts-utils/blob/main/docs/fetch-download/globals.md)

- [saveChunks](https://github.com/janpoem/ts-utils/blob/main/docs/fetch-download/functions/saveChunks.md)
- [fetchDownload](https://github.com/janpoem/ts-utils/blob/main/docs/fetch-download/functions/fetchDownload.md)
- [DownloadTask](https://github.com/janpoem/ts-utils/blob/main/docs/fetch-download/classes/DownloadTask.md)
- [DownloadTaskError](https://github.com/janpoem/ts-utils/blob/main/docs/fetch-download/classes/DownloadTaskError.md)
- [DownloadQueue](https://github.com/janpoem/ts-utils/blob/main/docs/fetch-download/classes/DownloadQueue.md)
- [DownloadQueueError](https://github.com/janpoem/ts-utils/blob/main/docs/fetch-download/classes/DownloadQueueError.md)

#### `remote`

[文档入口](https://github.com/janpoem/ts-utils/blob/main/docs/remote/globals.md)

- [mountRemote](https://github.com/janpoem/ts-utils/blob/main/docs/remote/functions/mountRemote.md)
- [unmountRemote](https://github.com/janpoem/ts-utils/blob/main/docs/remote/functions/unmountRemote.md)
