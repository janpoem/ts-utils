import { isInferObj } from './object';
import { notEmptyStr } from './string';

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
  if (err instanceof Error) return err.message || ''; // maybe undefined
  if (isErrLike(err)) return err.message || err.error || '';
  return '';
};
