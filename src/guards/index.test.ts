import { describe, expect, test } from 'bun:test';
import {
  and,
  calcProgress,
  ceil10,
  decimalAdjust,
  // Error
  errMsg,
  floor10,
  isAry,
  isBool,
  isErrLike,
  // Object
  isInferObj,
  isNil,
  isNull,
  // Number
  isNumber,
  isNumberVal,
  isPlainObj,
  isPresent,
  isPromise,
  // String
  isStr,
  // Type Guards
  isString,
  isUndefined,
  limitNumberMax,
  limitNumberMin,
  limitNumberMinMax,
  not,
  notEmptyStr,
  or,
  round10,
  toNumber,
} from './index';

describe('guards/index.ts - String', () => {
  describe('isStr', () => {
    test('should return true for string types', () => {
      expect(isStr('')).toBe(true);
      expect(isStr(String.fromCharCode(10000))).toBe(true);
      expect(isStr(new String(''))).toBe(true);
      expect(isStr(new String(String.fromCharCode(10000)))).toBe(true);
      expect(isStr(Object.assign('hi', { constructor: Array }))).toBe(true);
      expect(isStr(Object.assign('hi', { toString: 123 }))).toBe(true);
      expect(isStr(Object.assign('hi', { valueOf: 123 }))).toBe(true);
      expect(isStr(Object.assign('hi', { constructor: RegExp }))).toBe(true);
      expect(isStr(new Proxy(new String('hello'), {}))).toBe(true);
    });

    test('should return false for non-string types', () => {
      expect(isStr(null)).toBe(false);
      expect(isStr(undefined)).toBe(false);
      expect(isStr({ a: 1 })).toBe(false);
      expect(isStr([1, 2, 3])).toBe(false);
      expect(isStr(123)).toBe(false);
      expect(isStr(0)).toBe(false);
      expect(isStr(false)).toBe(false);
      expect(isStr(/Hello/)).toBe(false);
      expect(isStr(Symbol('TTT'))).toBe(false);
    });
  });

  describe('notEmptyStr', () => {
    test('should return true for non-empty strings', () => {
      expect(notEmptyStr(' ')).toBe(true);
      expect(notEmptyStr('\n')).toBe(true);
    });

    test('should return false for empty or non-string', () => {
      expect(notEmptyStr('')).toBe(false);
      expect(notEmptyStr(null)).toBe(false);
      expect(notEmptyStr(false)).toBe(false);
      expect(notEmptyStr(undefined)).toBe(false);
      expect(notEmptyStr([])).toBe(false);
    });
  });
});

describe('guards/index.ts - Number', () => {
  test('isNumber', () => {
    expect(isNumber(123)).toBe(true);
    expect(isNumber('123')).toBe(false);
    expect(isNumber(null)).toBe(false);
    expect(isNumber(undefined)).toBe(false);
    expect(isNumber({})).toBe(false);
    expect(isNumber([])).toBe(false);
    expect(isNumber(Number.NaN)).toBe(false);
  });

  test('isNumberVal', () => {
    expect(isNumberVal(123)).toBe(true);
    expect(isNumberVal('123')).toBe(true);
    expect(isNumberVal('abc')).toBe(false);
    expect(isNumberVal(null)).toBe(false);
    expect(isNumberVal(undefined)).toBe(false);
  });

  test('toNumber', () => {
    expect(toNumber(123)).toBe(123);
    expect(toNumber('123')).toBe(123);
    expect(toNumber('abc')).toBe(0);
    expect(toNumber(null)).toBe(0);
    expect(toNumber(undefined)).toBe(0);
    expect(toNumber(true)).toBe(1);
    expect(toNumber(false)).toBe(0);
  });

  test('limitNumberMin', () => {
    expect(limitNumberMin(123, 100)).toBe(123);
    expect(limitNumberMin('123', 100)).toBe(123);
    expect(limitNumberMin('abc', 100)).toBe(100);
    expect(limitNumberMin(99, 100)).toBe(100);
  });

  test('limitNumberMax', () => {
    expect(limitNumberMax(123, 200)).toBe(123);
    expect(limitNumberMax('123', 200)).toBe(123);
    expect(limitNumberMax(201, 200)).toBe(200);
  });

  test('limitNumberMinMax', () => {
    expect(limitNumberMinMax(123, 100, 200)).toBe(123);
    expect(limitNumberMinMax(99, 100, 200)).toBe(100);
    expect(limitNumberMinMax(201, 100, 200)).toBe(200);
  });

  describe('decimalAdjust', () => {
    test('round', () => {
      expect(decimalAdjust('round', 123.456, -2)).toBe(123.46);
      expect(decimalAdjust('round', 55.55, -1)).toBe(55.6);
      expect(round10(55.55, -1)).toBe(55.6);
    });

    test('ceil', () => {
      expect(decimalAdjust('ceil', 123.456, -2)).toBe(123.46);
      expect(decimalAdjust('ceil', 55.51, -1)).toBe(55.6);
      expect(ceil10(55.51, -1)).toBe(55.6);
    });

    test('floor', () => {
      expect(decimalAdjust('floor', 123.456, -2)).toBe(123.45);
      expect(decimalAdjust('floor', 55.59, -1)).toBe(55.5);
      expect(floor10(55.59, -1)).toBe(55.5);
    });
  });

  describe('calcProgress', () => {
    test('should return correct progress', () => {
      expect(calcProgress(50, 100)).toBe(0.5);
      expect(calcProgress(75, 100)).toBe(0.75);
      expect(calcProgress(0, 100)).toBe(0);
    });

    test('should cap at 1', () => {
      expect(calcProgress(150, 100)).toBe(1);
    });

    test('should throw for invalid denominator', () => {
      expect(() => calcProgress(50, 0)).toThrow(
        'The denominator cannot be 0 or NaN',
      );
      expect(() => calcProgress(50, Number.NaN)).toThrow(
        'The denominator cannot be 0 or NaN',
      );
    });
  });
});

describe('guards/index.ts - Object', () => {
  test('isInferObj', () => {
    expect(isInferObj({})).toBe(true);
    expect(isInferObj(new Object())).toBe(true);
    expect(isInferObj({ foo: true })).toBe(true);
    expect(isInferObj([])).toBe(false);
    expect(isInferObj(null)).toBe(false);
    expect(isInferObj(undefined)).toBe(false);
    expect(isInferObj('')).toBe(false);
  });

  test('isInferObj with callback', () => {
    const isTestType = (it: { key: unknown }): it is { key: string } =>
      typeof it.key === 'string';
    expect(isInferObj({ key: 'aa' }, isTestType)).toBe(true);
    expect(isInferObj({ key: 123 }, isTestType)).toBe(false);
  });
});

describe('guards/index.ts - Error', () => {
  describe('isErrLike', () => {
    test('should return true for objects with message or error', () => {
      expect(isErrLike({ message: 'test' })).toBe(true);
      expect(isErrLike({ error: 'test' })).toBe(true);
    });

    test('should return false for objects without message or error', () => {
      expect(isErrLike({})).toBe(false);
      expect(isErrLike('test')).toBe(false);
    });
  });

  describe('errMsg', () => {
    test('should extract message from various sources', () => {
      expect(errMsg({ message: 'test' })).toBe('test');
      expect(errMsg({ error: 'test' })).toBe('test');
      expect(errMsg('test')).toBe('test');
      expect(errMsg(new Error('test'))).toBe('test');
    });

    test('should return empty string for null', () => {
      expect(errMsg(null)).toBe('');
    });
  });
});

describe('guards/index.ts - Type Guards', () => {
  describe('isString', () => {
    test('should return true for string', () => {
      expect(isString('hello')).toBe(true);
      expect(isString('')).toBe(true);
    });

    test('should return false for non-string', () => {
      expect(isString(123)).toBe(false);
      expect(isString(null)).toBe(false);
    });
  });

  describe('isBool', () => {
    test('should return true for boolean', () => {
      expect(isBool(true)).toBe(true);
      expect(isBool(false)).toBe(true);
    });

    test('should return false for non-boolean', () => {
      expect(isBool(0)).toBe(false);
      expect(isBool('true')).toBe(false);
    });
  });

  describe('isNull', () => {
    test('should return true for null', () => {
      expect(isNull(null)).toBe(true);
    });

    test('should return false for non-null', () => {
      expect(isNull(undefined)).toBe(false);
      expect(isNull(0)).toBe(false);
    });
  });

  describe('isUndefined', () => {
    test('should return true for undefined', () => {
      expect(isUndefined(undefined)).toBe(true);
    });

    test('should return false for non-undefined', () => {
      expect(isUndefined(null)).toBe(false);
    });
  });

  describe('isNil', () => {
    test('should return true for null or undefined', () => {
      expect(isNil(null)).toBe(true);
      expect(isNil(undefined)).toBe(true);
    });

    test('should return false for non-nil', () => {
      expect(isNil(0)).toBe(false);
      expect(isNil('')).toBe(false);
    });
  });

  describe('isPresent', () => {
    test('should narrow type for non-null values', () => {
      const value: string | null | undefined = 'hello';
      if (isPresent(value)) {
        expect(typeof value).toBe('string');
      }
    });

    test('should return false for null or undefined', () => {
      expect(isPresent(null)).toBe(false);
      expect(isPresent(undefined)).toBe(false);
    });
  });

  describe('isPlainObj', () => {
    test('should return true for plain objects', () => {
      expect(isPlainObj({})).toBe(true);
      expect(isPlainObj({ a: 1 })).toBe(true);
    });

    test('should return false for arrays and special objects', () => {
      expect(isPlainObj([])).toBe(false);
      expect(isPlainObj(new Date())).toBe(false);
      expect(isPlainObj(null)).toBe(false);
    });
  });

  describe('isAry', () => {
    test('should return true for arrays', () => {
      expect(isAry([])).toBe(true);
      expect(isAry([1, 2, 3])).toBe(true);
    });

    test('should return false for non-arrays', () => {
      expect(isAry({})).toBe(false);
      expect(isAry('hello')).toBe(false);
    });

    test('should support type guard', () => {
      const mixed: unknown[] = ['a', 1, 'b', 2];
      const strings = mixed.filter((item): item is string =>
        isAry(item, isString) ? true : isString(item),
      );
      expect(strings).toEqual(['a', 'b']);
    });
  });

  describe('isPromise', () => {
    test('should return true for Promise', () => {
      expect(isPromise(Promise.resolve())).toBe(true);
      expect(isPromise(new Promise(() => {}))).toBe(true);
    });

    test('should return true for thenable', () => {
      const thenable: { then: () => void; catch: () => void } = {
        then: () => {},
        catch: () => {},
      };
      expect(isPromise(thenable)).toBe(true);
    });

    test('should return false for non-promise', () => {
      expect(isPromise({})).toBe(false);
      expect(isPromise('hello')).toBe(false);
    });
  });
});

describe('guards/index.ts - Combinators', () => {
  describe('and', () => {
    test('should combine guards with AND logic', () => {
      const isPositiveNumber = (val: unknown): val is number =>
        typeof val === 'number' && val > 0;
      const isEven = (val: number): val is number => val % 2 === 0;
      const isPositiveEven = and(isPositiveNumber, isEven);

      expect(isPositiveEven(4)).toBe(true);
      expect(isPositiveEven(3)).toBe(false);
      expect(isPositiveEven(-2)).toBe(false);
    });

    test('should return false if any guard fails', () => {
      const guard = and(isString, (val): val is string => val.length > 3);
      expect(guard('hello')).toBe(true);
      expect(guard('hi')).toBe(false);
      expect(guard(123)).toBe(false);
    });
  });

  describe('or', () => {
    test('should combine guards with OR logic', () => {
      const isStrOrNum = or(
        isString,
        (val: unknown): val is number => typeof val === 'number',
      );
      expect(isStrOrNum('hello')).toBe(true);
      expect(isStrOrNum(123)).toBe(true);
      expect(isStrOrNum(true)).toBe(false);
    });
  });

  describe('not', () => {
    test('should negate guard', () => {
      const isNotNull = not(isNull);
      const isNotStr = not(isString);

      expect(isNotNull('hello')).toBe(true);
      expect(isNotNull(null)).toBe(false);
      expect(isNotStr(123)).toBe(true);
      expect(isNotStr('hello')).toBe(false);
    });
  });
});
