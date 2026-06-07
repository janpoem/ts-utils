[**@zenstone/ts-utils**](../../README.md)

***

[@zenstone/ts-utils](../../modules.md) / [async](../README.md) / StatefulRpc

# Class: StatefulRpc\<Result, Params\>

Defined in: [src/async/StatefulRpc.ts:92](https://github.com/janpoem/ts-utils/blob/a6181273044ad30164507cc181a58cccd8e952df/src/async/StatefulRpc.ts#L92)

有状态的 RPC 等待注册表。

对同一个 `key` 的多个并发调用方共享同一次异步结果：任意一方调用
`resolve(key, result)` 或 `reject(key, error)` 时，所有等待该 key
的 Promise 会同时被 settle。

### 超时行为
每个 task 拥有独立的定时器。当任意一个 task 超时时，`onTimeout` 会
调用 `settle(key)`，将该 key 下的**所有** task 一并 reject（含尚未
超时的 task）。如需自定义超时逻辑，子类可覆盖 `protected onTimeout`。

## Example

```ts
const rpc = new StatefulRpc<UserProfile, { userId: string }>();

// 多个调用方等待同一个 key
const p1 = rpc.pending('user:42', { userId: '42' });
const p2 = rpc.pending('user:42', { userId: '42' });

// 外部拿到数据后 resolve，p1 和 p2 同时得到结果
rpc.resolve('user:42', profile);
```

## Type Parameters

### Result

`Result` = `object`

### Params

`Params` = `object`

## Constructors

### Constructor

> **new StatefulRpc**\<`Result`, `Params`\>(`__namedParameters?`): `StatefulRpc`\<`Result`, `Params`\>

Defined in: [src/async/StatefulRpc.ts:103](https://github.com/janpoem/ts-utils/blob/a6181273044ad30164507cc181a58cccd8e952df/src/async/StatefulRpc.ts#L103)

#### Parameters

##### \_\_namedParameters?

[`StatefulRpcOptions`](../type-aliases/StatefulRpcOptions.md)\<`Result`, `Params`\> = `{}`

#### Returns

`StatefulRpc`\<`Result`, `Params`\>

## Accessors

### id

#### Get Signature

> **get** **id**(): `string`

Defined in: [src/async/StatefulRpc.ts:115](https://github.com/janpoem/ts-utils/blob/a6181273044ad30164507cc181a58cccd8e952df/src/async/StatefulRpc.ts#L115)

实例唯一 id

##### Returns

`string`

***

### timeout

#### Get Signature

> **get** **timeout**(): `number`

Defined in: [src/async/StatefulRpc.ts:120](https://github.com/janpoem/ts-utils/blob/a6181273044ad30164507cc181a58cccd8e952df/src/async/StatefulRpc.ts#L120)

实例级默认超时毫秒数

##### Returns

`number`

## Methods

### abort()

> **abort**(`key`, `reason?`): `this`

Defined in: [src/async/StatefulRpc.ts:258](https://github.com/janpoem/ts-utils/blob/a6181273044ad30164507cc181a58cccd8e952df/src/async/StatefulRpc.ts#L258)

以 `RpcAbortError` 中止指定 key 的所有 task。

#### Parameters

##### key

`string`

资源标识

##### reason?

`unknown`

可选的中止原因，会附加到 `RpcAbortError.reason`

#### Returns

`this`

***

### addPendingItem()

> **addPendingItem**(`item`): `PendingItem`\<`Result`, `Params`\>

Defined in: [src/async/StatefulRpc.ts:149](https://github.com/janpoem/ts-utils/blob/a6181273044ad30164507cc181a58cccd8e952df/src/async/StatefulRpc.ts#L149)

**`Internal`**

将 item 写入 Map 并启动定时器

#### Parameters

##### item

`PendingItem`\<`Result`, `Params`\>

#### Returns

`PendingItem`\<`Result`, `Params`\>

***

### clear()

> **clear**(`reason?`): `this`

Defined in: [src/async/StatefulRpc.ts:266](https://github.com/janpoem/ts-utils/blob/a6181273044ad30164507cc181a58cccd8e952df/src/async/StatefulRpc.ts#L266)

以 `RpcAbortError` 中止**所有** key 下的全部 task。
通常在连接断开、组件卸载等场景下调用。

#### Parameters

##### reason?

`unknown`

可选的中止原因

#### Returns

`this`

***

### getPendingCount()

> **getPendingCount**(`key?`): `number`

Defined in: [src/async/StatefulRpc.ts:128](https://github.com/janpoem/ts-utils/blob/a6181273044ad30164507cc181a58cccd8e952df/src/async/StatefulRpc.ts#L128)

返回当前挂起的 task 数量。

#### Parameters

##### key?

`string`

指定 key 时只统计该 key；省略时统计全部

#### Returns

`number`

***

### newPendingItem()

> **newPendingItem**(`key`, `params`, `rest`): `PendingItem`\<`Result`, `Params`\>

Defined in: [src/async/StatefulRpc.ts:136](https://github.com/janpoem/ts-utils/blob/a6181273044ad30164507cc181a58cccd8e952df/src/async/StatefulRpc.ts#L136)

**`Internal`**

创建 PendingItem，不写入 Map、不启动计时器

#### Parameters

##### key

`string`

##### params

`Params`

##### rest

`Omit`\<`PendingItem`\<`Result`, `Params`\>, `"task"`\>

#### Returns

`PendingItem`\<`Result`, `Params`\>

***

### onTimeout()

> `protected` **onTimeout**(`__namedParameters`): `void`

Defined in: [src/async/StatefulRpc.ts:169](https://github.com/janpoem/ts-utils/blob/a6181273044ad30164507cc181a58cccd8e952df/src/async/StatefulRpc.ts#L169)

task 超时时触发，默认行为：以 `TimeoutError` reject 整个 key 下的所有 task。

子类可覆盖此方法实现自定义超时策略（如只 reject 超时的单个 task）。

#### Parameters

##### \_\_namedParameters

`PendingItem`\<`Result`, `Params`\>

#### Returns

`void`

***

### pending()

> **pending**(`key`, `params`, `timeout?`): `Promise`\<`Result`\>

Defined in: [src/async/StatefulRpc.ts:201](https://github.com/janpoem/ts-utils/blob/a6181273044ad30164507cc181a58cccd8e952df/src/async/StatefulRpc.ts#L201)

注册一个等待 `key` 结果的 Promise。

同一个 `key` 可以多次调用 `pending()`；所有调用方会在同一次
`settle()` 时一起被 resolve 或 reject。

#### Parameters

##### key

`string`

资源标识，与 `resolve` / `reject` / `abort` 对应

##### params

`Params`

本次请求的参数，会附加到 task 描述中

##### timeout?

`number`

覆盖实例默认超时时间（毫秒）

#### Returns

`Promise`\<`Result`\>

***

### reject()

> **reject**(`key`, `result`): `this`

Defined in: [src/async/StatefulRpc.ts:250](https://github.com/janpoem/ts-utils/blob/a6181273044ad30164507cc181a58cccd8e952df/src/async/StatefulRpc.ts#L250)

reject 指定 key 的所有 task。

#### Parameters

##### key

`string`

资源标识

##### result

`unknown`

错误原因

#### Returns

`this`

***

### removePendingItem()

> **removePendingItem**(`item`): `PendingItem`\<`Result`, `Params`\>

Defined in: [src/async/StatefulRpc.ts:178](https://github.com/janpoem/ts-utils/blob/a6181273044ad30164507cc181a58cccd8e952df/src/async/StatefulRpc.ts#L178)

**`Internal`**

从 Map 中移除 item 并清除其定时器

#### Parameters

##### item

`PendingItem`\<`Result`, `Params`\>

#### Returns

`PendingItem`\<`Result`, `Params`\>

***

### resolve()

> **resolve**(`key`, `result`): `this`

Defined in: [src/async/StatefulRpc.ts:242](https://github.com/janpoem/ts-utils/blob/a6181273044ad30164507cc181a58cccd8e952df/src/async/StatefulRpc.ts#L242)

resolve 指定 key 的所有 task。

#### Parameters

##### key

`string`

资源标识

##### result

`Result`

返回值

#### Returns

`this`

***

### settle()

> **settle**(`settled`): `this`

Defined in: [src/async/StatefulRpc.ts:219](https://github.com/janpoem/ts-utils/blob/a6181273044ad30164507cc181a58cccd8e952df/src/async/StatefulRpc.ts#L219)

以指定的 `settled` 结果一次性 settle `key` 下的所有 task，
并触发对应事件。settle 后该 key 的所有 task 及定时器均被清除。

#### Parameters

##### settled

[`StatefulRpcSettled`](../type-aliases/StatefulRpcSettled.md)\<`Result`\>

#### Returns

`this`

`this`，支持链式调用
