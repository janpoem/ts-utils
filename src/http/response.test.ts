import { describe, expect, test } from 'bun:test';
import { type ResponseInitInput, mergeRespInit } from './response';

describe('mergeRespInit', () => {
  test('should return a new ResponseInit object with multiple ResponseInit inputs', () => {
    const inputs: ResponseInitInput[] = [
      { headers: { 'x-a': '1' } },
      { headers: { 'x-b': '2', 'x-a': 'replaced' } },
      { status: 502, statusText: 'Bad Gateway' },
      404,
    ];

    const res = mergeRespInit(...inputs);
    expect(res).toEqual({
      headers: new Headers({ 'x-a': 'replaced', 'x-b': '2' }),
      status: 404,
      statusText: 'Bad Gateway',
    });
  });

  test('should return a new ResponseInit object with empty ResponseInit', () => {
    const res = mergeRespInit(null);
    expect(res).toEqual({});
  });
});
