[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / mergeAbortSignals

# Function: mergeAbortSignals()

> **mergeAbortSignals**(...`signals`): `AbortSignal` \| `undefined`

Defined in: [request.ts:13](https://github.com/janpoem/ts-utils/blob/609cab258976feb4eb74bcad1a8b6a0cbc4381ba/src/http/request.ts#L13)

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
