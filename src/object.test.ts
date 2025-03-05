import { describe, expect, test } from 'bun:test';
import { isInferObj } from './object';

describe('isInferObj', () => {
  test('obj type check', () => {
    class TestClass {}

    // https://github.com/sindresorhus/is-obj/blob/main/test.js
    expect(isInferObj({})).toBe(true);
    expect(isInferObj(new Object())).toBe(true);
    expect(isInferObj(new TestClass())).toBe(true);
    expect(isInferObj(new Date())).toBe(true);
    expect(isInferObj(Symbol('TTT'))).toBe(false);
    expect(isInferObj(Object.create(null))).toBe(true);
    expect(isInferObj({ foo: true })).toBe(true);
    expect(isInferObj([])).toBe(false);
    expect(isInferObj(['foo', 'bar'])).toBe(false);
    expect(isInferObj(() => {})).toBe(false);
    expect(isInferObj(/./)).toBe(true);
    expect(isInferObj(new Object(0))).toBe(true);
    expect(isInferObj(new Object('foo'))).toBe(true);
    expect(isInferObj(new Object(false))).toBe(true);
    expect(isInferObj(null)).toBe(false);
    expect(isInferObj(undefined)).toBe(false);
    expect(isInferObj(Number.NaN)).toBe(false);
    expect(isInferObj('')).toBe(false);
    expect(isInferObj(0)).toBe(false);
    expect(isInferObj(false)).toBe(false);

    // additional
    expect(isInferObj(new Map())).toBe(true);
    expect(isInferObj(new Set())).toBe(true);
  });

  type TestType = {
    key: string;
  };

  type TestType2 = {
    id: string;
  };

  const isTestType = (it: TestType) =>
    it.key != null && typeof it.key === 'string';

  const isTestType2 = (obj: unknown) =>
    isInferObj<TestType2>(
      obj,
      (it) => it.id != null && typeof it.id === 'string',
    );

  test('check by callback', () => {
    expect(isInferObj({ key: 'aa' }, isTestType)).toBe(true);
    expect(isInferObj({ key: 123 }, isTestType)).toBe(false);
    expect(isInferObj({}, isTestType)).toBe(false);
  });

  test('type infer', () => {
    const a = { key: 'test a' };

    if (isInferObj(a, isTestType)) {
      expect(a.key).toBe('test a');
    }

    const b = { id: 'test b' };

    if (isTestType2(b)) {
      expect(b.id).toBe('test b');
    }
  });
});
