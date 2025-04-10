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

## 文档

### `@zenstone/ts-utils`

[文档入口](https://github.com/janpoem/ts-utils/blob/main/docs/globals.md)

`@zenstone/ts-utils` 包含以下子模块。

- `error`
- `number`
- `object`
- `path`
- `string`
- `http`

```ts
import { toNumber, mergeHeaders } from '@zenstone/ts-utils';

const val = toNumber(Number.NaN);
const headers = mergeHeaders(
  { 'content-type': 'application/json' },
  [
    ['content-type', 'text/html'],
  ],
);
```

`error`、`number`、`object`、`path`、`string`、`http` 可以按需来引入

```ts
import { errMsg } from '@zenstone/ts-utils/error';

const msg = errMsg(new Error('test error')) || 'unknown error';
```

`@zenstone/ts-utils/fetch-download` 是独立的子模块，未包含在 `@zenstone/ts-utils`
，根据需求来加载。

```ts
import { fetchDownload, saveChunks } from '@zenstone/ts-utils/fetch-download';

// download and print the progress
const task = await fetchDownload(fetch('https://example.com/test.js')).read(
  (task) => console.log(`${task.percent} %`)
);

// save to local
saveChunks(task.chunks, 'temp.js', task.mimeType);
```

#### `@zenstone/ts-utils/error`

- [isErrLike](https://github.com/janpoem/ts-utils/blob/main/docs/functions/isErrLike.md)
- [errMsg](https://github.com/janpoem/ts-utils/blob/main/docs/functions/errMsg.md)

#### `@zenstone/ts-utils/number`

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

#### `@zenstone/ts-utils/object`

- [isInferObj](https://github.com/janpoem/ts-utils/blob/main/docs/functions/isInferObj.md)

#### `@zenstone/ts-utils/path`

- [createPathUtils](https://github.com/janpoem/ts-utils/blob/main/docs/functions/createPathUtils.md)
- [purgeHttpPath](https://github.com/janpoem/ts-utils/blob/main/docs/functions/purgeHttpPath.md)
- [joinHttpPath](https://github.com/janpoem/ts-utils/blob/main/docs/functions/joinHttpPath.md)

#### `@zenstone/ts-utils/string`

- [isStr](https://github.com/janpoem/ts-utils/blob/main/docs/functions/isStr.md)
- [notEmptyStr](https://github.com/janpoem/ts-utils/blob/main/docs/functions/notEmptyStr.md)

#### `@zenstone/ts-utils/http`

- [mergeHeaders](https://github.com/janpoem/ts-utils/blob/main/docs/functions/mergeHeaders.md)
- [mergeRespInit](https://github.com/janpoem/ts-utils/blob/main/docs/functions/mergeRespInit.md)
- [toAryHeaders](https://github.com/janpoem/ts-utils/blob/main/docs/functions/toAryHeaders.md)
- [mergeAbortSignals](https://github.com/janpoem/ts-utils/blob/main/docs/functions/mergeAbortSignals.md)

### `@zenstone/ts-utils/fetch-download`

[文档入口](https://github.com/janpoem/ts-utils/blob/main/docs/fetch-download/globals.md)

- [saveChunks](https://github.com/janpoem/ts-utils/blob/main/docs/fetch-download/functions/saveChunks.md)
- [fetchDownload](https://github.com/janpoem/ts-utils/blob/main/docs/fetch-download/functions/fetchDownload.md)
- [DownloadTask](https://github.com/janpoem/ts-utils/blob/main/docs/fetch-download/classes/DownloadTask.md)
- [DownloadTaskError](https://github.com/janpoem/ts-utils/blob/main/docs/fetch-download/classes/DownloadTaskError.md)
- [DownloadQueue](https://github.com/janpoem/ts-utils/blob/main/docs/fetch-download/classes/DownloadQueue.md)
- [DownloadQueueError](https://github.com/janpoem/ts-utils/blob/main/docs/fetch-download/classes/DownloadQueueError.md)
