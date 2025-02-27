[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / mergeAbortSignals

# Function: mergeAbortSignals()

> **mergeAbortSignals**(...`signals`): `undefined` \| `AbortSignal`

Defined in: [request.ts:13](https://github.com/janpoem/ts-utils/blob/d3cd470a5c675e0cbb24c01f6f88f5c578c50491/src/http/request.ts#L13)

合并多个 AbortSignals

```ts
cosnt maybeSignal: AbortSignal | null = null;
mergeAbortSignals(new AbortController, AbortSignal.timeout(5000), maybeSignal);
// AbortSignal.any([new AbortController, AbortSignal.timeout(5000)])
```

## Parameters

### signals

...(`undefined` \| `null` \| `AbortSignal`)[]

## Returns

`undefined` \| `AbortSignal`
