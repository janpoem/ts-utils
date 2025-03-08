[**@zenstone/ts-utils**](../README.md)

***

[@zenstone/ts-utils](../globals.md) / isInferObj

# Function: isInferObj()

> **isInferObj**\<`T`\>(`obj`, `fn`?): `obj is T`

Defined in: [object.ts:101](https://github.com/janpoem/ts-utils/blob/5695f5d0e3c2197ae4233c3f441833765430d482/src/object.ts#L101)

检查 obj 是否为 Object，结果为真时，推导 obj 为 T 类型

- 未指定泛型 T，则 T 默认为 `Record<string, unknown>`
- 如果指定泛型 T ，而未传入 fn ，只要 obj 是 Object 即推断 obj 为 T
```ts
type TestA = {
  name?: string;
}

if (isInferObj<TestA>(obj)) {
  // obj 推断为 TestA
  console.log(obj.name || 'noname');
}
```
- 若果传入了 fn ，则先检查是否 Object，再附加 fn 结果进行推断
```ts
type TestB = {
  name: string;
}

if (isInferObj<TestB>(obj, it => typeof it.name === 'string')) {
  // obj 推断为 TestB
  console.log(obj.name);
}
```
- 通过传入 `x is T` 的 fn ，可省略指定泛型 T（一般用于复杂的结构判定）
```ts
// 由 fn 的结果推导 isInferObj 的 T
type WithVersion = {
 version: number;
};

const isWithVersion = (it: WithVersion): it is WithVersion =>
  typeof it.version === 'number';

const ver1 = { ver: 1 };
const ver2 = { version: 2 };

if (isInferObj(ver1, isWithVersion)) {
  // 不符合
}

if (isInferObj(ver2, isWithVersion)) {
  // ver2 推断为 Version
  ver2.version += 1;
}
```

实际使用的例子：

```ts
export type NpmPackageInfo = {
  _id: string;
  name: string;
  version: string;
  dist: NpmPackageDist;
};

export type NpmPackageDist = {
  shasum: string;
  tarball: string;
};

export const isNpmPackageDist = (obj: unknown) =>
  isInferObj<NpmPackageDist>(
    obj,
    (it) => notEmptyStr(it.shasum) && notEmptyStr(it.tarball),
  );

export const isNpmPackageInfo = (obj: unknown) =>
  isInferObj<NpmPackageInfo>(
    obj,
    (it) =>
      notEmptyStr(it._id) &&
      notEmptyStr(it.name) &&
      notEmptyStr(it.version) &&
      isNpmPackageDist(it.dist),
  );

export const fetchNpmPackage = async (name: string, version?: string) => {
  const ver = version || 'latest';
  verifyPackageName(name);
  const resp = await fetch(`${apiBaseUrl}/${name}/${ver}`);
  const json = await resp.json(); // JSON 这时的类型是 any
  if (typeof json === 'string') {
    throw new NpmPackageError(json, name, ver);
  }
  if (isNpmPackageInfo(json)) { // 在这个 if 条件里，json 被推断为 NpmPackageInfo
    return json;
  }
  throw new NpmPackageError('Invalid package info return', name, ver);
};
```

## Type Parameters

• **T** = [`RecordObj`](../type-aliases/RecordObj.md)

## Parameters

### obj

`unknown`

任意类型变量

### fn?

(`it`) => `boolean`

断言类型判断函数

## Returns

`obj is T`
