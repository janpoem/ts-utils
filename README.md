# @zenstone/ts-utils

TypeScript 工具函数库。主要集中近 2 年使用频率较高的工具函数。主要便于快速在
Bun.js 和 TypeScript 项目中使用。

使用 bun 开发。

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

#### Error 处理

- [isErrLike](https://github.com/janpoem/ts-utils/blob/main/docs/functions/isErrLike.md)
- [errMsg](https://github.com/janpoem/ts-utils/blob/main/docs/functions/errMsg.md)

#### 基础类型

- [isStr](https://github.com/janpoem/ts-utils/blob/main/docs/functions/isStr.md)
- [notEmptyStr](https://github.com/janpoem/ts-utils/blob/main/docs/functions/notEmptyStr.md)
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
- [isInferObj](https://github.com/janpoem/ts-utils/blob/main/docs/functions/isInferObj.md)

### `@zenstone/ts-utils/http`

[文档入口](https://github.com/janpoem/ts-utils/blob/main/docs/http/globals.md)

- [createPathUtils](https://github.com/janpoem/ts-utils/blob/main/docs/http/functions/createPathUtils.md)
- [purgeHttpPath](https://github.com/janpoem/ts-utils/blob/main/docs/http/functions/purgeHttpPath.md)
- [joinHttpPath](https://github.com/janpoem/ts-utils/blob/main/docs/http/functions/joinHttpPath.md)
- [mergeHeaders](https://github.com/janpoem/ts-utils/blob/main/docs/http/functions/mergeHeaders.md)
- [mergeRespInit](https://github.com/janpoem/ts-utils/blob/main/docs/http/functions/mergeRespInit.md)
- [toAryHeaders](https://github.com/janpoem/ts-utils/blob/main/docs/http/functions/toAryHeaders.md)
- [mergeAbortSignals](https://github.com/janpoem/ts-utils/blob/main/docs/http/functions/mergeAbortSignals.md)
