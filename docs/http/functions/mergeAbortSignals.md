[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / mergeAbortSignals

# Function: mergeAbortSignals()

> **mergeAbortSignals**(...`signals`): `undefined` \| `AbortSignal`

Defined in: [request.ts:13](https://github.com/janpoem/ts-utils/blob/0cd4777c12ff7de2b512ea29cc29419037e8cb6f/src/http/request.ts#L13)

合并多个 AbortSignals

```ts
const maybeSignal: AbortSignal | null = null;
mergeAbortSignals(new AbortController, AbortSignal.timeout(5000), maybeSignal);
// AbortSignal.any([new AbortController, AbortSignal.timeout(5000)])
```

## Parameters

### signals

...(`undefined` \| `null` \| `AbortSignal`)[]

## Returns

`undefined` \| `AbortSignal`
