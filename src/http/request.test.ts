import { beforeEach, describe, expect, it } from 'bun:test';
import { mergeAbortSignals } from './request';

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
});
