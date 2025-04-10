[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / DownloadTaskError

# Class: DownloadTaskError

Defined in: [src/fetch-download/DownloadTask.ts:10](https://github.com/janpoem/ts-utils/blob/5695f5d0e3c2197ae4233c3f441833765430d482/src/fetch-download/DownloadTask.ts#L10)

## Extends

- `Error`

## Constructors

### new DownloadTaskError()

> **new DownloadTaskError**(`msg`, `task`): [`DownloadTaskError`](DownloadTaskError.md)

Defined in: [src/fetch-download/DownloadTask.ts:11](https://github.com/janpoem/ts-utils/blob/5695f5d0e3c2197ae4233c3f441833765430d482/src/fetch-download/DownloadTask.ts#L11)

#### Parameters

##### msg

`string`

##### task

[`DownloadTask`](DownloadTask.md)

#### Returns

[`DownloadTaskError`](DownloadTaskError.md)

#### Overrides

`Error.constructor`

## Properties

### cause?

> `optional` **cause**: `unknown`

Defined in: node\_modules/typescript/lib/lib.es2022.error.d.ts:26

#### Inherited from

`Error.cause`

***

### message

> **message**: `string`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1077

#### Inherited from

`Error.message`

***

### name

> **name**: `string`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1076

#### Inherited from

`Error.name`

***

### stack?

> `optional` **stack**: `string`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1078

#### Inherited from

`Error.stack`

***

### task

> `readonly` **task**: [`DownloadTask`](DownloadTask.md)

Defined in: [src/fetch-download/DownloadTask.ts:13](https://github.com/janpoem/ts-utils/blob/5695f5d0e3c2197ae4233c3f441833765430d482/src/fetch-download/DownloadTask.ts#L13)

***

### prepareStackTrace()?

> `static` `optional` **prepareStackTrace**: (`err`, `stackTraces`) => `any`

Defined in: node\_modules/@types/node/globals.d.ts:143

Optional override for formatting stack traces

#### Parameters

##### err

`Error`

##### stackTraces

`CallSite`[]

#### Returns

`any`

#### See

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Inherited from

`Error.prepareStackTrace`

***

### stackTraceLimit

> `static` **stackTraceLimit**: `number`

Defined in: node\_modules/@types/node/globals.d.ts:145

#### Inherited from

`Error.stackTraceLimit`

## Methods

### captureStackTrace()

#### Call Signature

> `static` **captureStackTrace**(`targetObject`, `constructorOpt`?): `void`

Defined in: node\_modules/@types/node/globals.d.ts:136

Create .stack property on a target object

##### Parameters

###### targetObject

`object`

###### constructorOpt?

`Function`

##### Returns

`void`

##### Inherited from

`Error.captureStackTrace`

#### Call Signature

> `static` **captureStackTrace**(`targetObject`, `constructorOpt`?): `void`

Defined in: node\_modules/bun-types/globals.d.ts:1632

Create .stack property on a target object

##### Parameters

###### targetObject

`object`

###### constructorOpt?

`Function`

##### Returns

`void`

##### Inherited from

`Error.captureStackTrace`
