[**@zenstone/ts-utils**](../../README.md)

***

[@zenstone/ts-utils](../../modules.md) / [http](../README.md) / mergeAbortSignals

# Function: mergeAbortSignals()

> **mergeAbortSignals**(...`signals`): `AbortSignal` \| `undefined`

Defined in: [src/http/request.ts:13](https://github.com/janpoem/ts-utils/blob/e6f0e2dae5b274785affda26cac7db86fc0832b2/src/http/request.ts#L13)

合并多个 AbortSignals

```ts
const maybeSignal: AbortSignal | null = null;
mergeAbortSignals(new AbortController, AbortSignal.timeout(5000), maybeSignal);
// AbortSignal.any([new AbortController, AbortSignal.timeout(5000)])
```

## Parameters

### signals

...(`AbortSignal` \| `null` \| `undefined`)[]

## Returns

`AbortSignal` \| `undefined`
