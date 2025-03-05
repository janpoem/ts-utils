[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / mergeAbortSignals

# Function: mergeAbortSignals()

> **mergeAbortSignals**(...`signals`): `undefined` \| `AbortSignal`

Defined in: [http/request.ts:13](https://github.com/janpoem/ts-utils/blob/b9219c6997c227d9b9eb09f22e1ab95d12d9260c/src/http/request.ts#L13)

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
