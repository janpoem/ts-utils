import { describe, expect, test } from 'bun:test';
import {
  ceil10,
  decimalAdjust,
  floor10,
  isNumber,
  isNumberVal,
  limitNumberMax,
  limitNumberMin,
  limitNumberMinMax,
  round10,
  toNumber,
} from './number';

describe('number', () => {
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
    expect(isNumberVal({})).toBe(false);
    expect(isNumberVal([])).toBe(false);
    expect(isNumberVal(Number.NaN)).toBe(false);
  });

  test('toNumber', () => {
    expect(toNumber(123)).toBe(123);
    expect(toNumber('123')).toBe(123);
    expect(toNumber('abc')).toBe(0);
    expect(toNumber(null)).toBe(0);
    expect(toNumber(undefined)).toBe(0);
    expect(toNumber({})).toBe(0);
    expect(toNumber([])).toBe(0);
    expect(toNumber(Number.NaN)).toBe(0);
    expect(toNumber(true)).toBe(1);
    expect(toNumber(false)).toBe(0);
  });

  test('limitNumberMin', () => {
    expect(limitNumberMin(123, 100)).toBe(123);
    expect(limitNumberMin('123', 100)).toBe(123);
    expect(limitNumberMin('abc', 100)).toBe(100);
    expect(limitNumberMin(null, 100)).toBe(100);
    expect(limitNumberMin(undefined, 100)).toBe(100);
    expect(limitNumberMin({}, 100)).toBe(100);
    expect(limitNumberMin([], 100)).toBe(100);
    expect(limitNumberMin(Number.NaN, 100)).toBe(100);
    expect(limitNumberMin(true, 100)).toBe(100);
    expect(limitNumberMin(false, 100)).toBe(100);
    expect(limitNumberMin(99, 100)).toBe(100);

    expect(limitNumberMin(99, 1, 0)).toBe(99);
    expect(limitNumberMin('123', 1, 0)).toBe(123);
    expect(limitNumberMin({}, 1, 0)).toBe(1);
    expect(limitNumberMin([], 1, 0)).toBe(1);
    expect(limitNumberMin(null, 1, 0)).toBe(1);
    expect(limitNumberMin(undefined, 1, 0)).toBe(1);
    expect(limitNumberMin(Number.NaN, 1, 0)).toBe(1);
    expect(limitNumberMin(true, 1, 0)).toBe(1);
    expect(limitNumberMin(false, 1, 0)).toBe(1);
  });

  test('limitNumberMax', () => {
    expect(limitNumberMax(123, 200)).toBe(123);
    expect(limitNumberMax('123', 200)).toBe(123);
    expect(limitNumberMax('abc', 200)).toBe(0);
    expect(limitNumberMax(null, 200)).toBe(0);
    expect(limitNumberMax(undefined, 200)).toBe(0);
    expect(limitNumberMax({}, 200)).toBe(0);
    expect(limitNumberMax([], 200)).toBe(0);
    expect(limitNumberMax(Number.NaN, 200)).toBe(0);
    expect(limitNumberMax(true, 200)).toBe(1);
    expect(limitNumberMax(false, 200)).toBe(0);
    expect(limitNumberMax(201, 200)).toBe(200);

    expect(limitNumberMax(99, 1, 3)).toBe(1);
    expect(limitNumberMax('123', 1, 3)).toBe(1);
    expect(limitNumberMax({}, 1, 3)).toBe(1);
    expect(limitNumberMax([], 1, 3)).toBe(1);
    expect(limitNumberMax(null, 1, 3)).toBe(1);
    expect(limitNumberMax(undefined, 1, 3)).toBe(1);
    expect(limitNumberMax(Number.NaN, 1, 3)).toBe(1);
    expect(limitNumberMax(true, 1, 3)).toBe(1);
    expect(limitNumberMax(false, 1, 3)).toBe(0);
  });

  test('limitNumberMinMax', () => {
    expect(limitNumberMinMax(123, 100, 200)).toBe(123);
    expect(limitNumberMinMax('123', 100, 200)).toBe(123);
    expect(limitNumberMinMax('abc', 100, 200)).toBe(100);
    expect(limitNumberMinMax(null, 100, 200)).toBe(100);
    expect(limitNumberMinMax(undefined, 100, 200)).toBe(100);
    expect(limitNumberMinMax({}, 100, 200)).toBe(100);
    expect(limitNumberMinMax([], 100, 200)).toBe(100);
    expect(limitNumberMinMax(Number.NaN, 100, 200)).toBe(100);
    expect(limitNumberMinMax(true, 100, 200)).toBe(100);
    expect(limitNumberMinMax(false, 100, 200)).toBe(100);
    expect(limitNumberMinMax(99, 100, 200)).toBe(100);
    expect(limitNumberMinMax(201, 100, 200)).toBe(200);

    expect(limitNumberMinMax(99, 100, 300, 50)).toBe(100);
    expect(limitNumberMinMax('123', 100, 300, 50)).toBe(123);
    // toNumber => 5, when 5 > 3 => 3
    expect(limitNumberMinMax({}, 1, 3, 5)).toBe(3);
    expect(limitNumberMinMax([], 1, 3, 2)).toBe(2);
    expect(limitNumberMinMax(null, 1, 3)).toBe(1);
    expect(limitNumberMinMax(undefined, 1, 3)).toBe(1);
    expect(limitNumberMinMax(Number.NaN, 1, 3)).toBe(1);
    expect(limitNumberMinMax(true, 1, 3)).toBe(1);
    expect(limitNumberMinMax(false, 1, 3)).toBe(1);
  });

  describe('decimalAdjust', () => {
    test('round', () => {
      expect(decimalAdjust('round', Number.NaN)).toBe(Number.NaN);
      expect(decimalAdjust('round', 12, 1.5)).toBe(Number.NaN);

      expect(decimalAdjust('round', 123.456, -2)).toBe(123.46);
      expect(decimalAdjust('round', 123.456, -1)).toBe(123.5);
      expect(decimalAdjust('round', 123.456, 0)).toBe(123);

      expect(decimalAdjust('round', 100.64, 0)).toBe(101);
      expect(decimalAdjust('round', 105, 1)).toBe(110);
      expect(decimalAdjust('round', 50, 2)).toBe(100);

      expect(decimalAdjust('round', 55.55, -1)).toBe(55.6);
      expect(decimalAdjust('round', 55.549, -1)).toBe(55.5);
      expect(decimalAdjust('round', 55, 1)).toBe(60);
      expect(decimalAdjust('round', 54.9, 1)).toBe(50);
      expect(decimalAdjust('round', -55.55, -1)).toBe(-55.5);
      expect(decimalAdjust('round', -55.551, -1)).toBe(-55.6);
      expect(decimalAdjust('round', -55, 1)).toBe(-50);
      expect(decimalAdjust('round', -55.1, 1)).toBe(-60);
      expect(decimalAdjust('round', 1.005, -2)).toBe(1.01);

      expect(round10(55.55, -1)).toBe(55.6);
      expect(round10(55.549, -1)).toBe(55.5);
      expect(round10(55, 1)).toBe(60);
      expect(round10(54.9, 1)).toBe(50);
      expect(round10(-55.55, -1)).toBe(-55.5);
      expect(round10(-55.551, -1)).toBe(-55.6);
      expect(round10(-55, 1)).toBe(-50);
      expect(round10(-55.1, 1)).toBe(-60);
      expect(round10(1.005, -2)).toBe(1.01);
    });

    test('ceil', () => {
      expect(decimalAdjust('ceil', Number.NaN)).toBe(Number.NaN);

      expect(decimalAdjust('ceil', 123.456, -2)).toBe(123.46);
      expect(decimalAdjust('ceil', 123.456, -1)).toBe(123.5);
      expect(decimalAdjust('ceil', 123.456, 0)).toBe(124);

      expect(decimalAdjust('ceil', 100.13, 0)).toBe(101);
      expect(decimalAdjust('ceil', 101, 1)).toBe(110);
      expect(decimalAdjust('ceil', 10, 2)).toBe(100);

      expect(decimalAdjust('ceil', 55.51, -1)).toBe(55.6);
      expect(decimalAdjust('ceil', 51, 1)).toBe(60);
      expect(decimalAdjust('ceil', -55.59, -1)).toBe(-55.5);
      expect(decimalAdjust('ceil', -59, 1)).toBe(-50);

      expect(ceil10(55.51, -1)).toBe(55.6);
      expect(ceil10(51, 1)).toBe(60);
      expect(ceil10(-55.59, -1)).toBe(-55.5);
      expect(ceil10(-59, 1)).toBe(-50);
    });

    test('floor', () => {
      expect(decimalAdjust('floor', Number.NaN)).toBe(Number.NaN);

      expect(decimalAdjust('floor', 123.456, -2)).toBe(123.45);
      expect(decimalAdjust('floor', 123.456, -1)).toBe(123.4);
      expect(decimalAdjust('floor', 123.456, 0)).toBe(123);

      expect(decimalAdjust('floor', 100.13, 0)).toBe(100);
      expect(decimalAdjust('floor', 101, 1)).toBe(100);
      expect(decimalAdjust('floor', 10, 2)).toBe(0);

      expect(decimalAdjust('floor', 55.59, -1)).toBe(55.5);
      expect(decimalAdjust('floor', 59, 1)).toBe(50);
      expect(decimalAdjust('floor', -55.51, -1)).toBe(-55.6);
      expect(decimalAdjust('floor', -51, 1)).toBe(-60);

      expect(floor10(55.59, -1)).toBe(55.5);
      expect(floor10(59, 1)).toBe(50);
      expect(floor10(-55.51, -1)).toBe(-55.6);
      expect(floor10(-51, 1)).toBe(-60);
    });
  });
});
