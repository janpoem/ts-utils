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
  let _value = value;
  let _exp = exp;
  // If the exp is undefined or zero...
  if (typeof _exp === 'undefined' || +_exp === 0) {
    return Math[type](_value);
  }
  _value = +_value;
  _exp = +_exp;
  // If the value is not a number or the exp is not an integer...
  if (Number.isNaN(_value) || !(typeof _exp === 'number' && _exp % 1 === 0)) {
    return Number.NaN;
  }
  // Shift
  // @ts-ignore value type change
  _value = _value.toString().split('e');
  _value = Math[type](
    // @ts-ignore here
    // biome-ignore lint/style/useTemplate: allow no use template to keep source code
    +(_value[0] + 'e' + (_value[1] ? +_value[1] - _exp : -_exp)),
  );
  // Shift back
  // @ts-ignore value type change
  _value = _value.toString().split('e');
  // @ts-ignore here
  // biome-ignore lint/style/useTemplate: allow no use template to keep source code
  return +(_value[0] + 'e' + (_value[1] ? +_value[1] + _exp : _exp));
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
