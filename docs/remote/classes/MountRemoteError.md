[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / MountRemoteError

# Class: MountRemoteError

Defined in: [src/remote/mountRemote.ts:1](https://github.com/janpoem/ts-utils/blob/b61bddc532949fab14342589ffa2d587c10fb6e1/src/remote/mountRemote.ts#L1)

## Extends

- `Error`

## Constructors

### new MountRemoteError()

> **new MountRemoteError**(`message`, `prev`?): [`MountRemoteError`](MountRemoteError.md)

Defined in: [src/remote/mountRemote.ts:2](https://github.com/janpoem/ts-utils/blob/b61bddc532949fab14342589ffa2d587c10fb6e1/src/remote/mountRemote.ts#L2)

#### Parameters

##### message

`string`

##### prev?

`unknown`

#### Returns

[`MountRemoteError`](MountRemoteError.md)

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

### prev?

> `readonly` `optional` **prev**: `unknown`

Defined in: [src/remote/mountRemote.ts:4](https://github.com/janpoem/ts-utils/blob/b61bddc532949fab14342589ffa2d587c10fb6e1/src/remote/mountRemote.ts#L4)

***

### stack?

> `optional` **stack**: `string`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1078

#### Inherited from

`Error.stack`

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
