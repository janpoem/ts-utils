import { describe, expect, test } from 'bun:test';
import {
  createDelegator,
  createEmitter,
  initEventsEmitter,
  isEventsDelegator,
  isEventsEmitter,
  linkEvents,
} from './index';

type TestEvents = {
  data: { value: number };
  close: undefined;
  error: { message: string };
};

// ============================================================================
// createEmitter
// ============================================================================

describe('createEmitter', () => {
  test('on + emit: listener receives params', async () => {
    const emitter = createEmitter<TestEvents>();
    const received: number[] = [];
    emitter.on('data', ({ value }) => { received.push(value); });
    await emitter.emit('data', { value: 42 });
    expect(received).toEqual([42]);
  });

  test('on returns an unsubscribe function', async () => {
    const emitter = createEmitter<TestEvents>();
    const received: number[] = [];
    const off = emitter.on('data', ({ value }) => { received.push(value); });
    await emitter.emit('data', { value: 1 });
    off();
    await emitter.emit('data', { value: 2 });
    expect(received).toEqual([1]);
  });

  test('off removes specific listener', async () => {
    const emitter = createEmitter<TestEvents>();
    const log: string[] = [];
    const cbA = () => { log.push('A'); };
    const cbB = () => { log.push('B'); };
    emitter.on('close', cbA);
    emitter.on('close', cbB);
    emitter.off('close', cbA);
    await emitter.emit('close', undefined);
    expect(log).toEqual(['B']);
  });

  test('multiple listeners on same event all fire', async () => {
    const emitter = createEmitter<TestEvents>();
    const log: number[] = [];
    emitter.on('data', ({ value }) => { log.push(value); });
    emitter.on('data', ({ value }) => { log.push(value * 2); });
    await emitter.emit('data', { value: 3 });
    expect(log).toHaveLength(2);
    expect(log).toContain(3);
    expect(log).toContain(6);
  });

  test('emit with no listeners is a noop', async () => {
    const emitter = createEmitter<TestEvents>();
    await expect(emitter.emit('close', undefined)).resolves.toBeUndefined();
  });

  test('listeners run concurrently', async () => {
    const emitter = createEmitter<TestEvents>();
    const order: string[] = [];
    emitter.on('close', async () => {
      await Bun.sleep(30);
      order.push('slow');
    });
    emitter.on('close', async () => {
      await Bun.sleep(5);
      order.push('fast');
    });
    await emitter.emit('close', undefined);
    // concurrent: fast finishes before slow
    expect(order).toEqual(['fast', 'slow']);
  });

  test('emit throws AggregateError when listeners throw', async () => {
    const emitter = createEmitter<TestEvents>();
    emitter.on('error', () => { throw new Error('listener-error'); });
    await expect(emitter.emit('error', { message: 'x' })).rejects.toBeInstanceOf(AggregateError);
  });

  test('emit collects all errors before rejecting', async () => {
    const emitter = createEmitter<TestEvents>();
    emitter.on('error', () => { throw new Error('err1'); });
    emitter.on('error', () => { throw new Error('err2'); });
    try {
      await emitter.emit('error', { message: 'x' });
    } catch (e) {
      expect(e).toBeInstanceOf(AggregateError);
      expect((e as AggregateError).errors).toHaveLength(2);
    }
  });
});

// ============================================================================
// isEventsEmitter / isEventsDelegator
// ============================================================================

describe('isEventsEmitter', () => {
  test('returns true for createEmitter instance', () => {
    expect(isEventsEmitter(createEmitter())).toBe(true);
  });

  test('returns false for plain objects missing methods', () => {
    expect(isEventsEmitter({ on: 1, off: 2, emit: 3 })).toBe(false);
    expect(isEventsEmitter(null)).toBe(false);
    expect(isEventsEmitter({})).toBe(false);
  });
});

describe('isEventsDelegator', () => {
  test('returns true for createDelegator instance', () => {
    expect(isEventsDelegator(createDelegator({}))).toBe(true);
  });

  test('returns false for non-delegator objects', () => {
    expect(isEventsDelegator({ inject: 1, eject: 2 })).toBe(false);
    expect(isEventsDelegator(null)).toBe(false);
  });
});

// ============================================================================
// linkEvents
// ============================================================================

describe('linkEvents', () => {
  test('attaches callbacks to emitter', async () => {
    const emitter = createEmitter<TestEvents>();
    const received: number[] = [];
    linkEvents(emitter, {
      data: ({ value }) => { received.push(value); },
    });
    await emitter.emit('data', { value: 7 });
    expect(received).toEqual([7]);
  });

  test('attaches array of callbacks per event', async () => {
    const emitter = createEmitter<TestEvents>();
    const log: string[] = [];
    linkEvents(emitter, {
      close: [
        () => { log.push('a'); },
        () => { log.push('b'); },
      ],
    });
    await emitter.emit('close', undefined);
    expect(log).toContain('a');
    expect(log).toContain('b');
  });

  test('mode=off detaches callbacks', async () => {
    const emitter = createEmitter<TestEvents>();
    const log: number[] = [];
    const cb = ({ value }: { value: number }) => { log.push(value); };
    linkEvents(emitter, { data: cb }, 'on');
    await emitter.emit('data', { value: 1 });
    linkEvents(emitter, { data: cb }, 'off');
    await emitter.emit('data', { value: 2 });
    expect(log).toEqual([1]);
  });

  test('delegates to delegator inject/eject', async () => {
    const emitter = createEmitter<TestEvents>();
    const log: number[] = [];
    const delegator = createDelegator<TestEvents>({
      data: ({ value }) => { log.push(value); },
    });
    linkEvents(emitter, delegator, 'on');
    await emitter.emit('data', { value: 5 });
    linkEvents(emitter, delegator, 'off');
    await emitter.emit('data', { value: 6 });
    expect(log).toEqual([5]);
  });

  test('returns emitter for chaining', () => {
    const emitter = createEmitter<TestEvents>();
    const result = linkEvents(emitter, {});
    expect(result).toBe(emitter);
  });
});

// ============================================================================
// initEventsEmitter
// ============================================================================

describe('initEventsEmitter', () => {
  test('creates new emitter when input is null', () => {
    const emitter = initEventsEmitter(null);
    expect(isEventsEmitter(emitter)).toBe(true);
  });

  test('creates new emitter when input is undefined', () => {
    const emitter = initEventsEmitter();
    expect(isEventsEmitter(emitter)).toBe(true);
  });

  test('returns input as-is when it is already an emitter', () => {
    const existing = createEmitter<TestEvents>();
    const result = initEventsEmitter<TestEvents>(existing);
    expect(result).toBe(existing);
  });

  test('creates emitter and links callbacks', async () => {
    const received: number[] = [];
    const emitter = initEventsEmitter<TestEvents>({
      data: ({ value }) => { received.push(value); },
    });
    await emitter.emit('data', { value: 99 });
    expect(received).toEqual([99]);
  });

  test('creates emitter and injects delegator', async () => {
    const received: number[] = [];
    const delegator = createDelegator<TestEvents>({
      data: ({ value }) => { received.push(value); },
    });
    const emitter = initEventsEmitter<TestEvents>(delegator);
    await emitter.emit('data', { value: 11 });
    expect(received).toEqual([11]);
  });

  test('uses custom create function', () => {
    let createCalled = false;
    const custom = () => {
      createCalled = true;
      return createEmitter<TestEvents>();
    };
    initEventsEmitter(null, custom);
    expect(createCalled).toBe(true);
  });
});

// ============================================================================
// createDelegator
// ============================================================================

describe('createDelegator', () => {
  test('inject registers callbacks on emitter', async () => {
    const emitter = createEmitter<TestEvents>();
    const log: number[] = [];
    const d = createDelegator<TestEvents>({
      data: ({ value }) => { log.push(value); },
    });
    d.inject(emitter);
    await emitter.emit('data', { value: 3 });
    expect(log).toEqual([3]);
  });

  test('eject removes all callbacks', async () => {
    const emitter = createEmitter<TestEvents>();
    const log: number[] = [];
    const d = createDelegator<TestEvents>({
      data: ({ value }) => { log.push(value); },
    });
    d.inject(emitter);
    await emitter.emit('data', { value: 1 });
    d.eject();
    await emitter.emit('data', { value: 2 });
    expect(log).toEqual([1]);
  });

  test('eject without prior inject is a noop', () => {
    const d = createDelegator<TestEvents>({ data: () => {} });
    expect(() => d.eject()).not.toThrow();
  });

  test('inject clears previous subscriptions before re-registering', async () => {
    const emitter = createEmitter<TestEvents>();
    const log: number[] = [];
    const d = createDelegator<TestEvents>({
      data: ({ value }) => { log.push(value); },
    });
    d.inject(emitter);
    d.inject(emitter); // re-inject should not double-register
    await emitter.emit('data', { value: 5 });
    expect(log).toEqual([5]);
  });

  test('inject does nothing when emitter is undefined', () => {
    const d = createDelegator<TestEvents>({ data: () => {} });
    expect(() => d.inject(undefined)).not.toThrow();
  });

  test('supports array of callbacks per event', async () => {
    const emitter = createEmitter<TestEvents>();
    const log: string[] = [];
    const d = createDelegator<TestEvents>({
      close: [
        () => { log.push('first'); },
        () => { log.push('second'); },
      ],
    });
    d.inject(emitter);
    await emitter.emit('close', undefined);
    expect(log).toContain('first');
    expect(log).toContain('second');
  });
});
