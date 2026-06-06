[**@zenstone/ts-utils**](../../README.md)

***

[@zenstone/ts-utils](../../modules.md) / [misc](../README.md) / configurable

# Function: configurable()

> **configurable**\<`T`\>(`presets`): [`Configurable`](../type-aliases/Configurable.md)\<`T`\>

Defined in: [src/misc/configurable.ts:52](https://github.com/janpoem/ts-utils/blob/cc47b42336ba4f377a5b240d70447dc1812f8c94/src/misc/configurable.ts#L52)

创建可配置对象

内部维护两层数据：
- presets：初始化时传入的预设值（克隆后存储，避免引用污染）
- users：用户写入的覆盖值

get 时优先返回 users 中的值，users 中无对应 key 则返回 presets 值。

## Type Parameters

### T

`T` *extends* `object`

## Parameters

### presets

`T`

预设配置对象

## Returns

[`Configurable`](../type-aliases/Configurable.md)\<`T`\>

Configurable 实例

## Example

```ts
const cfg = configurable({ timeout: 3000, retries: 3, debug: false });

cfg.get('timeout'); // 3000（来自 presets）
cfg.set('timeout', 5000);
cfg.get('timeout'); // 5000（来自 users）

cfg.getAll(); // { timeout: 5000, retries: 3, debug: false }

cfg.reset();
cfg.get('timeout'); // 3000（回退到 presets）
```
