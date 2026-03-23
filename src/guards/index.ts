/**
 * Type Guards 和基础类型工具模块
 */

// ============================================================================
// String
// ============================================================================

/**
 * 判定 val 是否为字符串类型（含 infer）
 *
 * @see https://stackoverflow.com/questions/4059147/check-if-a-variable-is-a-string-in-javascript
 * @param val
 */
export const isStr = (val: unknown): val is string =>
  typeof val === 'string' || val instanceof String;

/**
 * 检查 val 是否为非空字符串（含 infer）
 *
 * @param val
 */
export const notEmptyStr = (val: unknown): val is string =>
  isStr(val) && val.length > 0;

// ============================================================================
// Number
// ============================================================================

/**
 * 判断是否为有效的数字类型
 *
 * @param val
 */
export const isNumber = (val: unknown): val is number =>
  typeof val === 'number' && !Number.isNaN(val) && Number.isFinite(val);

/**
 * 判断是否包含有效的数值
 *
 * - 允许字符串包含数值，如 `"123"`
 * - 允许数字类型，如 `123`
 *
 * @param val
 */
export const isNumberVal = (val: unknown): boolean => {
  if (typeof val === 'string') {
    const _v = Number.parseFloat(val);
    return !Number.isNaN(_v) && Number.isFinite(_v);
  }
  return isNumber(val);
};

/**
 * 将包含有效数值的 val 转换为对应的数字类型，只支持以下情形：
 *
 * - 字符串包含数值，如 `"123"`，转换为 `123`
 * - 数字类型，如 `123`，转换为 `123`
 * - 布尔类型，如 `true`，转换为 `1`，`false` 转换为 `0`
 *
 * @param val
 * @param dft 默认值，仅当 val 为 `null` 或 `undefined` 或 非包含有效数值时生效
 */
export const toNumber = (val: unknown, dft = 0): number => {
  if (typeof val === 'boolean') return val ? 1 : 0;
  if (isNumber(val)) return val;
  if (val == null || !isNumberVal(val)) return dft;
  return Number.parseFloat(val as string);
};

/**
 * 限制 val 在最小值范围内
 *
 * @param val
 * @param {number} min 最小值
 * @param {number} dft 默认值，仅当 val 为 `null` 或 `undefined` 或 非包含有效数值时生效
 */
export const limitNumberMin = (val: unknown, min: number, dft = 0) => {
  const v = toNumber(val, dft);
  return v < min ? min : v;
};

/**
 * 限制 val 在最大值范围内
 * @param val
 * @param max 最大值
 * @param dft 默认值，仅当 val 为 `null` 或 `undefined` 或 非包含有效数值时生效
 */
export const limitNumberMax = (val: unknown, max: number, dft = 0) => {
  const v = toNumber(val, dft);
  return v > max ? max : v;
};

/**
 * 限制 val 在最小值和最大值范围内
 * @param val
 * @param min 最小值
 * @param max 最大值
 * @param dft 默认值，仅当 val 为 `null` 或 `undefined` 或 非包含有效数值时生效
 */
export const limitNumberMinMax = (
  val: unknown,
  min: number,
  max: number,
  dft = 0,
) => {
  const v = toNumber(val, dft);
  return v < min ? min : v > max ? max : v;
};

/**
 * 数字精度调整，支持 `round`、`ceil`、`floor` 三种类型
 *
 * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/round#%E5%B0%8F%E6%95%B0%E8%88%8D%E5%85%A5
 * @param {"round" | "ceil" | "floor"} type 调整类型
 * @param {number} value
 * @param {number} exp 指数（10的 exp 次方 —— 10 进制位数，0 表示个位，1 表示十位，-1 表示小数点后一位，-2 表示小数点后两位，以此类推）。
 * @returns {number}
 */
export const decimalAdjust = (
  type: 'round' | 'ceil' | 'floor',
  value: number,
  exp?: number,
): number => {
  let _value: number | string[] = value;
  let _exp = exp;
  if (typeof _exp === 'undefined' || +_exp === 0) {
    return Math[type](_value as number);
  }
  _value = +_value;
  _exp = +_exp;
  if (
    Number.isNaN(_value as number) ||
    !(typeof _exp === 'number' && _exp % 1 === 0)
  ) {
    return Number.NaN;
  }
  let _parts = (_value as number).toString().split('e');
  _value = Math[type](
    // biome-ignore lint/style/useTemplate: preserve original logic
    +(_parts[0] + 'e' + (_parts[1] ? +_parts[1] - _exp : -_exp)),
  ) as number;
  _parts = (_value as number).toString().split('e');
  // biome-ignore lint/style/useTemplate: preserve original logic
  return +(_parts[0] + 'e' + (_parts[1] ? +_parts[1] + _exp : _exp));
};

export const round10 = (value: number, exp?: number): number =>
  decimalAdjust('round', value, exp);

export const floor10 = (value: number, exp?: number): number =>
  decimalAdjust('floor', value, exp);

export const ceil10 = (value: number, exp?: number): number =>
  decimalAdjust('ceil', value, exp);

/**
 * 计算进度值，返回的结果为一个浮点值，表示进度比例，取值在 0 - 1 之间。
 *
 * @param value
 * @param total
 */
export const calcProgress = (value: number, total: number) => {
  if (total === 0 || !isNumber(total)) {
    throw new Error('The denominator cannot be 0 or NaN');
  }
  return limitNumberMinMax(round10(value / total, -2), 0, 1);
};

// ============================================================================
// Object
// ============================================================================

export type RecordObj = Record<string, unknown>;

/**
 * 检查 obj 是否为 Object，结果为真时，推导 obj 为 T 类型
 *
 * - 未指定泛型 T，则 T 默认为 `Record<string, unknown>`
 * - 如果指定泛型 T ，而未传入 fn ，只要 obj 是 Object 即推断 obj 为 T
 * ```ts
 * type TestA = {
 *   name?: string;
 * }
 *
 * if (isInferObj<TestA>(obj)) {
 *   // obj 推断为 TestA
 *   console.log(obj.name || 'noname');
 * }
 * ```
 * - 若果传入了 fn ，则先检查是否 Object，再附加 fn 结果进行推断
 * ```ts
 * type TestB = {
 *   name: string;
 * }
 *
 * if (isInferObj<TestB>(obj, it => typeof it.name === 'string')) {
 *   // obj 推断为 TestB
 *   console.log(obj.name);
 * }
 * ```
 * - 通过传入 `x is T` 的 fn ，可省略指定泛型 T（一般用于复杂的结构判定）
 * ```ts
 * // 由 fn 的结果推导 isInferObj 的 T
 * type WithVersion = {
 *  version: number;
 * };
 *
 * const isWithVersion = (it: WithVersion): it is WithVersion =>
 *   typeof it.version === 'number';
 *
 * const ver1 = { ver: 1 };
 * const ver2 = { version: 2 };
 *
 * if (isInferObj(ver1, isWithVersion)) {
 *   // 不符合
 * }
 *
 * if (isInferObj(ver2, isWithVersion)) {
 *   // ver2 推断为 Version
 *   ver2.version += 1;
 * }
 * ```
 *
 * @param obj 任意类型变量
 * @param fn 断言类型判断函数
 */
export const isInferObj = <T = RecordObj>(
  obj: unknown,
  fn?: (it: T) => boolean,
): obj is T =>
  obj != null && typeof obj === 'object' && !Array.isArray(obj)
    ? typeof fn === 'function'
      ? fn(obj as T)
      : true
    : false;

// ============================================================================
// Error
// ============================================================================

/**
 * 可能是一个包含错误消息的结构
 */
export type ErrLike = {
  message?: string;
  error?: string;
};

/**
 * 判断目标是否是 {@link ErrLike}
 *
 * @param err
 */
export const isErrLike = (err: unknown): err is ErrLike =>
  isInferObj<ErrLike>(
    err,
    (it) => notEmptyStr(it.message) || notEmptyStr(it.error),
  );

/**
 * 取回错误消息
 *
 * @param err
 */
export const errMsg = (err: unknown): string => {
  if (err == null) return '';
  if (notEmptyStr(err)) return err;
  if (err instanceof Error) return err.message || '';
  if (isErrLike(err)) return err.message || err.error || '';
  return '';
};

// ============================================================================
// Type Guards
// ============================================================================

/**
 * 检查值是否为布尔值
 *
 * @param val 任意值
 *
 * @example
 * ```ts
 * if (isBool(value)) {
 *   console.log(value ? 'yes' : 'no');
 * }
 * ```
 */
export const isBool = (val: unknown): val is boolean =>
  typeof val === 'boolean';

/**
 * 检查值是否为 null
 *
 * @param val 任意值
 */
export const isNull = (val: unknown): val is null => val === null;

/**
 * 检查值是否为 undefined
 *
 * @param val 任意值
 */
export const isUndefined = (val: unknown): val is undefined =>
  val === undefined;

/**
 * 检查值是否为 null 或 undefined
 *
 * @param val 任意值
 */
export const isNil = (val: unknown): val is null | undefined =>
  val === null || val === undefined;

/**
 * 检查值是否不为 null 且不为 undefined
 *
 * @param val 任意值
 *
 * @example
 * ```ts
 * if (isPresent(value)) {
 *   console.log(value);
 * }
 * ```
 */
export const isPresent = <T>(val: T | null | undefined): val is T =>
  val !== null && val !== undefined;

/**
 * 检查值是否为一个普通对象（不包括数组、Date、RegExp 等特殊对象）
 *
 * @param val 任意值
 *
 * @example
 * ```ts
 * if (isPlainObj(value)) {
 *   console.log(Object.keys(value));
 * }
 * ```
 */
export const isPlainObj = <T extends Record<string, unknown> = Record<string, unknown>>(val: unknown): val is T =>
  typeof val === 'object' &&
  val !== null &&
  !Array.isArray(val) &&
  !(val instanceof Date) &&
  !(val instanceof RegExp);

/**
 * 检查值是否为数组
 *
 * @param val 任意值
 */
export const isAry = <T = unknown>(val: unknown): val is T[] => Array.isArray(val);

/**
 * 检查值是否为非空数组，支持可选的元素类型守卫
 *
 * @param val 任意值
 * @param guard 可选的元素类型守卫
 *
 * @example
 * ```ts
 * if (notEmptyAry(value)) {
 *   console.log(value[0]); // value is unknown[]
 * }
 *
 * if (notEmptyAry(value, isStr)) {
 *   console.log(value[0].toUpperCase()); // value is string[]
 * }
 * ```
 */
export function notEmptyAry<T = unknown>(val: unknown): val is T[];
export function notEmptyAry<T>(
  val: unknown,
  guard: (item: unknown) => item is T,
): val is T[];
export function notEmptyAry<T = unknown>(
  val: unknown,
  guard?: (item: unknown) => boolean,
): val is T[] {
  if (!Array.isArray(val) || val.length === 0) return false;
  if (guard === undefined) return true;
  return val.every(guard);
}

/**
 * 柯里化的数组类型守卫
 *
 * @param guard 元素类型守卫
 * @returns 数组类型守卫函数
 *
 * @example
 * ```ts
 * const isStrAry = aryGuard(isStr);
 *
 * if (isStrAry(value)) {
 *   // value is string[]
 * }
 *
 * // 配合 and 使用
 * const isNonEmptyStrAry = and(isStrAry, (arr) => arr.length > 0);
 * ```
 */
export const aryGuard = <T>(
  guard: (item: unknown) => item is T,
): TypeGuard<T[]> => {
  return (val: unknown): val is T[] =>
    Array.isArray(val) && val.every(guard);
};

/**
 * 检查值是否为 Promise
 *
 * @param val 任意值
 *
 * @example
 * ```ts
 * if (isPromise(value)) {
 *   await value;
 * }
 * ```
 */
export const isPromise = <T = unknown>(val: unknown): val is Promise<T> =>
  val instanceof Promise ||
  (typeof val === 'object' &&
    val !== null &&
    typeof (val as Promise<T>)?.then === 'function' &&
    typeof (val as Promise<T>)?.catch === 'function');

/**
 * 类型守卫函数类型
 */
export type TypeGuard<T = unknown> = (val: unknown) => val is T;

/**
 * 组合守卫（AND）
 *
 * 第一个守卫收窄类型到 T，后续守卫在 T 上做进一步筛选
 *
 * @param guards 第一个为类型守卫，后续为断言函数
 * @returns 组合后的守卫函数
 *
 * @example
 * ```ts
 * const isStrAry = aryGuard(isStr);
 * const isNonEmptyStrAry = and(isStrAry, (arr) => arr.length > 0);
 * ```
 */
export const and = <T>(
  ...guards: [(val: unknown) => val is T, ...((val: T) => boolean)[]]
): TypeGuard<T> => {
  return (val: unknown): val is T => {
    for (const guard of guards) {
      if (!(guard as (v: unknown) => boolean)(val)) return false;
    }
    return true;
  };
};

/**
 * 从 TypeGuard 提取被守卫的类型
 */
export type InferGuard<G> = G extends TypeGuard<infer T> ? T : never;

/**
 * 组合守卫（OR）
 *
 * 任意一个守卫通过即返回 true，自动推断联合类型
 *
 * @param guards 一个或多个守卫函数
 * @returns 组合后的守卫函数
 *
 * @example
 * ```ts
 * const isStrOrNum = or(isStr, isNumber);
 * if (isStrOrNum(value)) {
 *   // value: string | number
 * }
 * ```
 */
// biome-ignore lint/suspicious/noExplicitAny: TypeGuard<any> needed for generic inference
export const or = <G extends [TypeGuard<any>, ...TypeGuard<any>[]]>(
  ...guards: G
): TypeGuard<InferGuard<G[number]>> => {
  return (val: unknown): val is InferGuard<G[number]> => {
    for (const guard of guards) {
      if (guard(val)) return true;
    }
    return false;
  };
};

/**
 * 守卫取反（NOT）
 *
 * 返回运行时取反函数。由于 TS 类型系统不支持否定类型，
 * 返回值为 `(val: unknown) => boolean`，不作为类型守卫使用。
 *
 * @param guard 要取反的守卫函数
 * @returns 取反后的判断函数
 *
 * @example
 * ```ts
 * const isNotNull = not(isNull);
 * if (isNotNull(value)) {
 *   // 运行时正确，但不会收窄类型
 * }
 * ```
 */
export const not = (guard: TypeGuard): ((val: unknown) => boolean) => {
  return (val: unknown) => !guard(val);
};
