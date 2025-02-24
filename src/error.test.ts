import { describe, test, expect } from 'bun:test';
import { isErrLike, errMsg } from './error';

describe('error.ts', () => {

  describe('isErrLike', () => {
    test('should return true for an object with a message', () => {
      expect(isErrLike({ message: 'test' })).toBe(true);
    });
  
    test('should return true for an object with an error', () => {
      expect(isErrLike({ error: 'test' })).toBe(true);
    });
  
    test('should return false for an object without a message or error', () => {
      expect(isErrLike({})).toBe(false);
    });
  
    test('should return false for a non-object', () => {
      expect(isErrLike('test')).toBe(false);
    });
  });
  
  describe('errMsg', () => {
    test('should return the message for an object with a message', () => {
      expect(errMsg({ message: 'test' })).toBe('test');
    });
  
    test('should return the error for an object with an error', () => {
      expect(errMsg({ error: 'test' })).toBe('test');
    });
  
    test('should return an empty string for an object without a message or error', () => {
      expect(errMsg({})).toBe('');
    });
  
    test('should return the string for a string', () => {
      expect(errMsg('test')).toBe('test');
    });
  
    test('should return the message for an Error', () => {
      expect(errMsg(new Error('test'))).toBe('test');
    });
  
    test('should return an empty string for a non-object or non-Error', () => {
      expect(errMsg(null)).toBe('');
    });
  });
});