import { afterEach, describe, expect, test } from 'bun:test';
import { clearTicker, clearTimer, ticker, timer } from './timer';

// Use unique key prefixes per test to avoid cross-test interference
let seq = 0;
const key = (label: string) => `test:${label}:${++seq}`;

afterEach(() => {
  // best-effort cleanup — individual tests clear their own timers
});

describe('timer', () => {
  test('fires callback after delay', async () => {
    let called = false;
    const k = key('fire');
    timer(k, () => { called = true; }, 20);
    expect(called).toBe(false);
    await Bun.sleep(50);
    expect(called).toBe(true);
  });

  test('replaces existing timer on same key', async () => {
    let count = 0;
    const k = key('replace');
    timer(k, () => { count++; }, 30);
    timer(k, () => { count++; }, 30); // replaces the first
    await Bun.sleep(60);
    expect(count).toBe(1);
  });

  test('clearTimer prevents callback from firing', async () => {
    let called = false;
    const k = key('clear');
    timer(k, () => { called = true; }, 30);
    clearTimer(k);
    await Bun.sleep(60);
    expect(called).toBe(false);
  });

  test('clearTimer is a noop for unknown key', () => {
    expect(() => clearTimer('nonexistent:key:999')).not.toThrow();
  });

  test('supports async callback', async () => {
    let resolved = false;
    const k = key('async');
    timer(k, async () => {
      await Bun.sleep(5);
      resolved = true;
    }, 20);
    await Bun.sleep(60);
    expect(resolved).toBe(true);
  });
});

describe('ticker', () => {
  test('fires callback multiple times', async () => {
    let count = 0;
    const k = key('tick');
    ticker(k, () => { count++; }, 20);
    await Bun.sleep(90);
    clearTicker(k);
    expect(count).toBeGreaterThanOrEqual(3);
  });

  test('replaces existing ticker on same key', async () => {
    let count = 0;
    const k = key('replace-tick');
    ticker(k, () => { count++; }, 20);
    ticker(k, () => { count += 10; }, 20); // replaces
    await Bun.sleep(50);
    clearTicker(k);
    // only second ticker fired — increments by 10
    expect(count % 10).toBe(0);
    expect(count).toBeGreaterThan(0);
  });

  test('clearTicker stops the ticker', async () => {
    let count = 0;
    const k = key('stop');
    ticker(k, () => { count++; }, 20);
    await Bun.sleep(50);
    const snapshot = count;
    clearTicker(k);
    await Bun.sleep(50);
    expect(count).toBe(snapshot);
  });

  test('clearTicker is a noop for unknown key', () => {
    expect(() => clearTicker('nonexistent:key:999')).not.toThrow();
  });
});
