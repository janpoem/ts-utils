import { isInferObj } from './object';
import { notEmptyStr } from './string';

export type ErrLike = {
  message?: string;
  error?: string;
};

export const isErrLike = (err: unknown): err is ErrLike =>
  isInferObj<ErrLike>(
    err,
    (it) => notEmptyStr(it.message) || notEmptyStr(it.error),
  );

export const errMsg = (err: unknown) => {
  if (err == null) return '';
  if (notEmptyStr(err)) return err;
  if (err instanceof Error) return err.message || ''; // maybe undefined
  if (isErrLike(err)) return err.message || err.error || '';
  return '';
};
