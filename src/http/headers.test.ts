import { describe, expect, test } from 'bun:test';
import { type HeadersInitInput, mergeHeaders, toAryHeaders } from './headers';

describe('http/headers.ts', () => {
  describe('toAryHeaders', () => {
    test('should return an empty array for null', () => {
      expect(toAryHeaders(null)).toEqual([]);
    });

    test('should return an empty array for undefined', () => {
      expect(toAryHeaders(undefined)).toEqual([]);
    });

    test('should return an array of headers for a Headers object', () => {
      const headers = new Headers();
      headers.set('content-type', 'application/json');
      expect(toAryHeaders(headers)).toEqual([
        ['content-type', 'application/json'],
      ]);
    });

    test('should return an array of headers for a HeadersInit object', () => {
      const headers = { 'Content-Type': 'application/json' };
      expect(toAryHeaders(headers)).toEqual([
        ['Content-Type', 'application/json'],
      ]);
    });

    test('should return an array of headers for a HeadersInit array', () => {
      const headers: HeadersInit = [['Content-Type', 'application/json']];
      expect(toAryHeaders(headers)).toEqual([
        ['Content-Type', 'application/json'],
      ]);
    });
  });

  describe('mergeHeaders', () => {
    test('should return a new Headers object', () => {
      const headers1 = new Headers();
      headers1.set('content-type', 'application/json');
      const headers2 = new Headers();
      headers2.set('accept', 'application/json');
      let mergedHeaders = mergeHeaders(headers1, headers2);
      expect(mergedHeaders).toBeInstanceOf(Headers);
      expect(mergedHeaders.get('content-type')).toBe('application/json');
      expect(mergedHeaders.get('accept')).toBe('application/json');

      mergedHeaders = mergeHeaders(mergedHeaders, [
        ['content-type', 'text/html'],
      ]);
      expect(mergedHeaders).toBeInstanceOf(Headers);
      expect(mergedHeaders.get('content-type')).toBe('text/html');
      expect(mergedHeaders.get('accept')).toBe('application/json');
    });

    test('should return a new Headers object with multiple headers type inputs', () => {
      const cookie = 'cookie1=value1; cookie2=value2';
      const inputs: HeadersInitInput[] = [
        new Headers([['content-type', 'application/json']]),
        null,
        [['content-type', 'text/html']],
        undefined,
        { accept: 'application/json' },
        { 'set-cookie': cookie },
      ];

      const res = mergeHeaders(...inputs);
      expect(res).toBeInstanceOf(Headers);
      expect(res.get('content-type')).toBe('text/html');
      expect(res.get('accept')).toBe('application/json');
      expect(res.get('set-cookie')).toBe(cookie);
    });

    test('should be tune or skip when invalid header name', () => {
      const key = `
accept`;
      const inputs: HeadersInitInput[] = [
        [
          // start/end space => tune to 'content-type'
          [' content-type ', 'text/html'],
          // empty name => skip
          ['  ', 'test1'],
          // empty name => skip
          ['', 'test2'],
        ],
        // invalid name => tune to 'accept'
        { [key]: 'application/json' },
      ];

      const res = mergeHeaders(...inputs);
      expect(res).toBeInstanceOf(Headers);
      expect(res.get('content-type')).toBe('text/html');
      expect(res.get('accept')).toBe('application/json');
    });

    test('should return a new Headers object with empty headers', () => {
      const mergedHeaders = mergeHeaders(null);
      expect(mergedHeaders).toBeInstanceOf(Headers);
      // @ts-ignore
      expect(mergedHeaders.entries().next().done).toBe(true);
    });
  });
});
