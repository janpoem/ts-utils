---
name: ts-utils
description: "Reference for @zenstone/ts-utils — async utilities, type guards, path, http, remote loading, fetch-download, misc, and events."
user-invocable: false
---

# @zenstone/ts-utils

TypeScript 工具函数库（`peerDependencies`: `typescript ^5`）。支持 **子路径导入**，避免整包打入 bundle：

| 子路径 | 说明 |
|--------|------|
| `@zenstone/ts-utils` | 聚合导出（不含 `events`，events 仅子路径） |
| `@zenstone/ts-utils/async` | 重试、超时、pending、StatefulRpc |
| `@zenstone/ts-utils/guards` | 类型守卫与数值/字符串工具 |
| `@zenstone/ts-utils/path` | 可配置路径 join / purge |
| `@zenstone/ts-utils/http` | Headers / ResponseInit / AbortSignal 合并 |
| `@zenstone/ts-utils/remote` | 浏览器远程资源挂载（pending 去重） |
| `@zenstone/ts-utils/fetch-download` | 流式下载 Task / Queue |
| `@zenstone/ts-utils/misc` | 单例、配置、定时器、浅深克隆 |
| `@zenstone/ts-utils/events` | 类型安全事件发射器与委托 |

```ts
import { retry } from '@zenstone/ts-utils/async';
import { isStr, isInferObj } from '@zenstone/ts-utils/guards';
import { createPathUtils, joinHttpPath } from '@zenstone/ts-utils/path';
import { mergeHeaders } from '@zenstone/ts-utils/http';
import { mountRemote } from '@zenstone/ts-utils/remote';
import { fetchDownload } from '@zenstone/ts-utils/fetch-download';
import { singleton, configurable } from '@zenstone/ts-utils/misc';
import { createEmitter } from '@zenstone/ts-utils/events';
```

### 设计习惯

- **高阶包装**：`retry` / `timeout` / `pending` 等多为 `fn => wrappedFn`，调用方签名用 `Parameters` / `ReturnType` / `Awaited` 保持。
- **AnyFn**（`async` 模块）：`(...args: any[]) => any`，作为泛型函数约束的基底。
- **宽入严出**：守卫模块偏运行时收窄；`unknown` 入口 + 类型守卫出口。

---

## `@zenstone/ts-utils/async`

### retry / retryFn

```ts
retry(fn, options?) => WrappedFn
retryFn(fn, options?) => WrappedFn  // 首参 RetryFnParams，返回函数剥掉该参
```

透明包装，fn 不感知重试状态；`retryFn` 可按 `attempt` 换策略。

```ts
const fetchUser = retry(
  (id: string) => fetch(`/api/user/${id}`).then(r => r.json()),
  { attempts: 3, delay: 1000 },
);

retry(fn, {
  delay: ({ attempt }) => Math.min(500 * 2 ** (attempt - 1), 10000),
});
```

| RetryOptions | 默认 | 说明 |
|--------------|------|------|
| `attempts` | `3` | 最大尝试次数 |
| `delay` | `100` | ms 或 `(RetryFnParams) => number` |
| `onRetry` | — | 重试前回调 |

**RetryFnParams** — `{ attempt, error, options }`（贯穿 `onRetry`、`delay`、`RetryExhaustedError`）。

### timeout / sleep

```ts
timeout(fn, ms) => WrappedFn   // 超时抛 TimeoutError
sleep(ms): Promise<void>
sleep(ms, fn): Promise<Awaited<ReturnType<fn>>>
```

### pending / pendingFn

基于 scope 的 **inflight 去重**（singleflight）。同一 scope 并发只执行一次 fn，共享同一 Promise。

```ts
pending(scope, fn) => WrappedFn
pendingFn(scope, fn) => WrappedFn  // 首参 PendingFnParams
```

- **scope 为 string**：全局注册，重复声明抛 `PendingScopeConflictError`
- **scope 为函数**：`(…args) => string`，按 key 独立去重

**PendingFnParams** — `{ scope, getPendingCount() }`

测试用：`clearPendingRegistry()` 清空静态 scope 注册表。

### StatefulRpc\<Result, Params\>

有状态等待表：同一 **key** 可多次 `pending()`，一次 `resolve` / `reject` / `abort` **同时 settle** 该 key 下所有等待方。

```ts
const rpc = new StatefulRpc<User, { userId: string }>({
  idPrefix: 'my-rpc',
  timeout: 30_000,
  events: { resolve: ({ task, result }) => { /* ... */ } },
});

const p1 = rpc.pending('user:42', { userId: '42' });
rpc.resolve('user:42', profile);

rpc.reject(key, err);
rpc.abort(key, reason?);   // RpcAbortError
rpc.clear(reason?);        // 中止全部 key
```

- **taskId**：`{instanceId}:{key}:{counter}`
- 单 task 超时触发 `onTimeout`（可子类覆盖），默认会 **settle 该 key 下全部 task**
- 事件：`pending` · `resolve` · `reject` · `settle`（依赖 `@zenstone/ts-utils/events`）

### Errors（async）

| 类 | 说明 |
|----|------|
| `RetryExhaustedError` | `attempt`、`error`、`options` |
| `TimeoutError` | `ms`，可选 `data` |
| `PendingScopeConflictError` | `scope` |
| `RpcAbortError` | `reason?`（StatefulRpc `abort` / `clear`） |

---

## `@zenstone/ts-utils/guards`

### 字符串

`isStr(val)` · `notEmptyStr(val)`

### 数字

`isNumber` · `isNumberVal` · `toNumber(val, dft=0)`  
`limitNumberMin` · `limitNumberMax` · `limitNumberMinMax`  
`decimalAdjust(type, value, exp)` · `round10` · `floor10` · `ceil10`  
`calcProgress(value, total)` — 0~1，分母非法抛错

### 对象与错误

**isInferObj\<T\>** — 非数组 object；可只泛型、或第三参 `fn` 做结构判定：

```ts
if (isInferObj(val)) { /* Record<string, unknown> */ }
if (isInferObj<MyType>(val)) { /* 只要是 object 即收窄为 MyType */ }
if (isInferObj(val, (it): it is MyType => typeof it.name === 'string')) { }
```

`isPlainObj<T>(val)` — 排除 Array / Date / RegExp 等  
`isErrLike` · `errMsg(err)` — 从 Error / ErrLike / string 取消息

### 类型守卫

`isBool` · `isNull` · `isUndefined` · `isNil` · `isPresent` · `isPromise` · `isAry<T>`

```ts
notEmptyAry(val) | notEmptyAry(val, isStr)
aryGuard(isStr)  // TypeGuard<string[]>
and(guard, ...predicatesOnT)
or(isStr, isNumber)  // 联合类型推断 InferGuard
not(guard)  // 仅 boolean，不收窄
```

`TypeGuard<T>` · `InferGuard<G>` · `RecordObj`

---

## `@zenstone/ts-utils/path`

### createPathUtils

```ts
const { purgePath, joinPath } = createPathUtils({
  separator: '/',
  dangerReplace?: (path, separator) => string,
  duplicateReplace?: (path, separator) => string,
});
```

- **purgePath**：trim、可选危险/重复分隔符处理、去掉首尾 separator
- **joinPath**：支持 `..`、`.`、内嵌分隔符分段；顶部 `..` 会保留

常量：`UnixDS` · `WinDS`

### 预设 HTTP 路径工具

由 `createPathUtils` 派生：

- **`purgeHttpPath`** — `\` → `/`，合并重复 `/`
- **`joinHttpPath(...paths)`** — 与 `joinPath` 相同语义（文档示例：`joinHttpPath('a','b','../../..','e')`）

---

## `@zenstone/ts-utils/http`

```ts
toAryHeaders(headers?)           // → [key, value][]
mergeHeaders(...inputs)          // → Headers，key trim，空 key 跳过
mergeRespInit(...opts)           // 可传 status 数字；headers 用 mergeHeaders 合并
mergeAbortSignals(...signals)    // 0/1/多路，多用 AbortSignal.any
```

`Record` / 数组形式 headers 建议 **key 小写**，与 `Headers` 行为一致。

---

## `@zenstone/ts-utils/remote`

浏览器环境。`mountRemote` 内部用 **pendingFn** 按 scope 去重；scope 兼作 DOM **id**（内置 DOM handler）。

```ts
await mountRemote('jquery', {
  type: 'js',
  url: 'https://cdn.example.com/jquery.min.js',
  attrs?: Record<string, string>,
  onLoad?, onError?,
});
```

内置类型：**`js`** · **`mjs`** · **`css`**（`MountHandlerMap`）。

```ts
declare module '@zenstone/ts-utils/remote' {
  interface MountHandlerMap {
    wasm: MountHandlerFn<{ url: string; importObject?: WebAssembly.Imports }>;
  }
}
registerMountHandler('wasm', async (ctx, opts) => { /* ... */ });

registerMountHandler('img', createDomHandler('img', (el, ctx) => {
  el.setAttribute('src', ctx.url);
}));

unmountDomRemote(id, onRemove?)
```

| 错误 | 说明 |
|------|------|
| `MountRemoteError` | 挂载失败，`prev?` 原始错误 |

---

## `@zenstone/ts-utils/fetch-download`

### 类型

```ts
DownloadInput = DownloadUrl | DownloadRequest | Request | Promise<Response>
DownloadRequest = { url } & RequestInit
```

### fetchDownload

```ts
fetchDownload('url')              // → DownloadTask
fetchDownload(['a', 'b'])         // → DownloadQueue（每项再包成 Task）
```

### DownloadTask

构造接受 URL / `DownloadRequest` / `Request` / `Promise<Response>` / 已有 `Response`。

**状态** `DownloadTaskState`：`init` → `fetching` → `reading` → `complete`（`error = -1`）

```ts
await task.read({
  onFetch, onHeaders, onProgress, onComplete, onError,
  isNotThrow?: true,  // 默认出错会 throw
});
// 或 read(onProgressFn)
```

- 需要有效 **`content-length`**（解析 headers 后校验；实现允许 0 的边界以源码为准）
- 只读属性：`progress` · `percent` · `chunks` · `speed` · `mimeType` · `encoding` · `isCompressed` 等

### DownloadQueue

多 Task **并行** `read`（`Promise.all`），聚合 `progress` / `size` / `received`。

```ts
await queue.read({
  onFetch/onHeaders/onProgress/onComplete/onError,  // 每 task，回调签名为 (queue, task)
  onFinish,      // 全部成功
  onQueueError,  // 任一失败
});
```

`reduce(fn, init)` 遍历子 task。

### saveChunks

**仅浏览器**：`Blob` + `<a download>`，读后 `saveChunks(task.chunks, filename, mimeType?)`。

| 错误 | 说明 |
|------|------|
| `DownloadTaskError` | 附 `task` |
| `DownloadQueueError` | 附 `queue` |

---

## `@zenstone/ts-utils/misc`

### singleton(factory)

同步：缓存首次返回值。异步：并发共享同一 inflight Promise，只初始化一次。

### configurable(presets)

`get` / `set` / `getAll` / `setAll` / `reset` — presets 克隆存储，users 覆盖层。

### cloneObj(obj)

优先 `structuredClone`，否则 JSON 或 `Object.assign`。

### timer / ticker

命名 **setTimeout** / **setInterval**：同 key 先清再设。`clearTimer(key)` · `clearTicker(key)`。

---

## `@zenstone/ts-utils/events`

```ts
type EventsDefinition = Record<PropertyKey, any>

const emitter = createEmitter<AppEvents>();
const off = emitter.on('connect', (params) => { });
await emitter.emit('connect', { id: '1' });
emitter.off('connect', fn);

linkEvents(emitter, callbacksOrDelegator, 'on' | 'off');
initEventsEmitter(input?)  // null → 新建；已是 emitter → 原样；callbacks/delegator → 新建并 link

const delegator = createDelegator<AppEvents>({ data: fn, close: [fn1, fn2] });
delegator.inject(emitter);
delegator.eject();
```

- `emit`：监听器 **并发** `Promise.all`；失败聚合为 `AggregateError`
- `isEventsEmitter` · `isEventsDelegator`
- `EventsDelegator` · `EventsCallbacks` · `EventsInput` · `MaybePromise<T>`

---

## 选用速查

| 场景 | 入口 |
|------|------|
| 接口重试 / 超时 | `retry` · `timeout` |
| 同参数只请求一次 | `pending` / `pendingFn` |
| WebSocket / 长连等多方等同 key 等待 | `StatefulRpc` |
| 未知 JSON / API 载荷 | `isInferObj` + 自定义 guard |
| 合并 fetch 配置 | `mergeHeaders` · `mergeAbortSignals` · `mergeRespInit` |
| CDN script/link 只加载一次 | `mountRemote` |
| 带进度的大文件下载 | `fetchDownload` + `read` |
| 应用内模块级配置 | `configurable` |
| 解耦模块事件 | `createEmitter` + `createDelegator` |