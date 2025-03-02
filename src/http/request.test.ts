import { beforeEach, describe, expect, it } from 'bun:test';
import { isRequest, mergeAbortSignals } from './request';

describe('request', () => {
  describe('mergeAbortSignals', () => {
    let abortController1: AbortController;
    let abortController2: AbortController;

    beforeEach(() => {
      abortController1 = new AbortController();
      abortController2 = new AbortController();
    });

    it('should return the same AbortSignal when only one signal is provided', () => {
      const signal = mergeAbortSignals(abortController1.signal);
      expect(signal).toBe(abortController1.signal);
    });

    it('should return a new AbortSignal that aborts when any of the signals abort', () => {
      const signal = mergeAbortSignals(
        abortController1.signal,
        abortController2.signal,
      );
      let aborted = false;
      signal?.addEventListener('abort', () => {
        aborted = true;
      });

      abortController1.abort();
      expect(aborted).toBe(true);
    });

    it('should return undefined when no signals are provided', () => {
      const signal = mergeAbortSignals();
      expect(signal).toBeUndefined();
    });

    it('should ignore undefined and null signals', () => {
      const signal = mergeAbortSignals(
        undefined,
        null,
        abortController1.signal,
      );
      expect(signal).toBe(abortController1.signal);
    });
  });

  describe('isRequest', () => {
    it('should return true when the input is a Request instance', () => {
      const request = new Request('https://example.com');
      expect(isRequest(request)).toBe(true);
    });

    it('should return false when the input is not a Request instance', () => {
      expect(isRequest(null)).toBe(false);
      expect(isRequest(undefined)).toBe(false);
      expect(isRequest({})).toBe(false);
      expect(isRequest('https://example.com')).toBe(false);
    });
  });
});
