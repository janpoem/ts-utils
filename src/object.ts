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
 * @typeParam T - obj 的推断类型
 * @param fn 检查函数
 */
export const isInferObj = <T extends RecordObj = RecordObj>(
  obj: unknown,
  fn?: (it: T) => boolean,
): obj is T =>
  obj != null && typeof obj === 'object' && !Array.isArray(obj)
    ? typeof fn === 'function'
      ? fn(obj as T)
      : true
    : false;
