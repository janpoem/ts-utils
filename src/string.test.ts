import { describe, test, expect } from 'bun:test';
import { isStr, notEmptyStr } from './string';

describe('string.ts', () => {
	describe('isStr', () => {
		test('test', () => {
			// https://stackoverflow.com/questions/4059147/check-if-a-variable-is-a-string-in-javascript
			// falseCases
			expect(isStr(null)).toBe(false);
			expect(isStr(undefined)).toBe(false);
			expect(isStr({ a: 1, b: 2 })).toBe(false);
			expect(isStr([1, 2, 3])).toBe(false);
			expect(isStr(123)).toBe(false);
			expect(isStr(0)).toBe(false);
			expect(isStr(false)).toBe(false);
			expect(isStr(/Hello/)).toBe(false);
			expect(isStr(Object.assign(10, { valueOf: () => 'abc' }))).toBe(false);
			expect(isStr({ constructor: String })).toBe(false);
			expect(isStr(Symbol('TTT'))).toBe(false);

			// trueCases
			expect(isStr('')).toBe(true);
			expect(isStr(String.fromCharCode(10000))).toBe(true);
			expect(isStr(new String(''))).toBe(true);
			expect(isStr(new String(String.fromCharCode(10000)))).toBe(true);
			expect(isStr(Object.assign('hi', { constructor: Array }))).toBe(true);
			expect(isStr(Object.assign('hi', { toString: 123 }))).toBe(true);
			expect(isStr(Object.assign('hi', { valueOf: 123 }))).toBe(true);
			expect(isStr(Object.assign('hi', { constructor: RegExp  }))).toBe(true);
			expect(isStr(new Proxy(new String('hello'), {}))).toBe(true);
		});
	});

	describe('notEmptyStr', () => {
		test('test', () => {
			expect(notEmptyStr('')).toBe(false);
			expect(notEmptyStr(null)).toBe(false);
			expect(notEmptyStr(false)).toBe(false);
			expect(notEmptyStr(undefined)).toBe(false);
			expect(notEmptyStr([])).toBe(false);
			expect(notEmptyStr(' ')).toBe(true);
			expect(notEmptyStr(`
`)).toBe(true);
		})
	});
});
