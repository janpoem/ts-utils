[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / mergeRespInit

# Function: mergeRespInit()

> **mergeRespInit**(...`opts`): `ResponseInit`

Defined in: [http/response.ts:34](https://github.com/janpoem/ts-utils/blob/df5fa129179bf9218996bf53428f8189a02eea4a/src/http/response.ts#L34)

合并多个 [ResponseInitInput](../type-aliases/ResponseInitInput.md) 为 `ResponseInit` 对象

主要针对：
- 允许传入 [HttpStatusCode](../type-aliases/HttpStatusCode.md) 作为 `ResponseInit`，即：`new Response(body, mergeRespInit(404))`
- 处理多个 `ResponseInit` 对象的 `headers` 合并
- 合并多个 `ResponseInit`

```ts
new Response(body,
  mergeRespInit(
    404,
    { headers: { 'x-a': '1' } },
    { headers: { 'x-b': '2', 'x-a': 'replaced' } },
    { status: 502, statusText: 'Bad Gateway' },
  )
);
```

## Parameters

### opts

...[`ResponseInitInput`](../type-aliases/ResponseInitInput.md)[]

## Returns

`ResponseInit`
