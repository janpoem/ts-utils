[**@zenstone/ts-utils**](../../README.md)

***

[@zenstone/ts-utils](../../modules.md) / [http](../README.md) / mergeRespInit

# Function: mergeRespInit()

> **mergeRespInit**(...`opts`): `ResponseInit`

Defined in: [src/http/response.ts:34](https://github.com/janpoem/ts-utils/blob/e6f0e2dae5b274785affda26cac7db86fc0832b2/src/http/response.ts#L34)

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
