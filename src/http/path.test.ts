import { describe, expect, test } from 'bun:test';
import { joinHttpPath, purgeHttpPath } from './path';

describe('purgeHttpPath', () => {
  test('should remove leading and trailing separators', () => {
    expect(purgeHttpPath('/test/')).toBe('test');
    expect(purgeHttpPath('\\test\\')).toBe('test');
  });

  test('should replace duplicate separators with a single separator', () => {
    expect(purgeHttpPath('/test//test/')).toBe('test/test');
    expect(purgeHttpPath('\\test\\\\test\\')).toBe('test/test');
  });

  test('should replace danger directory separator', () => {
    expect(purgeHttpPath('\\test\\test\\')).toBe('test/test');
    expect(purgeHttpPath('/test/test/')).toBe('test/test');

    expect(purgeHttpPath('///\\test\\/\\test/\\')).toBe('test/test');
  });

  test('should return empty string if input is null or undefined', () => {
    expect(purgeHttpPath(null)).toBe('');
    expect(purgeHttpPath(undefined)).toBe('');
  });

  test('should return trimmed string if input is a string with leading and trailing spaces', () => {
    expect(purgeHttpPath(' /test/ ')).toBe('test');
    expect(purgeHttpPath(' \\test\\ ')).toBe('test');
  });
});

describe('joinHttpPath', () => {
  test('should join paths with a single separator', () => {
    expect(joinHttpPath('test', 'test')).toBe('test/test');
    expect(joinHttpPath('test/', 'test')).toBe('test/test');
    expect(joinHttpPath('test', '/test')).toBe('test/test');
    expect(joinHttpPath('test/', '/test')).toBe('test/test');
  });

  test('multiple parts with ".."', () => {
    expect(joinHttpPath('test/', '../../..', '/test')).toBe('../../test');
    expect(joinHttpPath('a', 'b', 'c', '../../../../../..', 'd')).toBe(
      '../../../d',
    );

    expect(
      joinHttpPath('a', 'b', 'c', '../../../../../..', 'd', '../../..', 'e'),
    ).toBe('../../../../../e');
  });

  test('should handle null or undefined paths', () => {
    expect(joinHttpPath(null, 'test')).toBe('test');
    expect(joinHttpPath(undefined, 'test')).toBe('test');
    expect(joinHttpPath('test', null)).toBe('test');
    expect(joinHttpPath('test', undefined)).toBe('test');
  });

  test('should handle empty paths', () => {
    expect(joinHttpPath('', 'test')).toBe('test');
    expect(joinHttpPath('test', '')).toBe('test');
  });

  test('should handle paths with leading and trailing spaces', () => {
    expect(joinHttpPath(' test', 'test')).toBe('test/test');
    expect(joinHttpPath('test', 'test ')).toBe('test/test');
  });

  test('should handle paths with duplicate separators', () => {
    expect(joinHttpPath('test//', 'test')).toBe('test/test');
    expect(joinHttpPath('test', '//test')).toBe('test/test');
  });

  test('should handle paths with danger directory separator', () => {
    expect(joinHttpPath('test\\', 'test')).toBe('test/test');
    expect(joinHttpPath('test', '\\test')).toBe('test/test');
  });
});
