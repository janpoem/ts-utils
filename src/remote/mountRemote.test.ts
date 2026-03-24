import { afterAll, afterEach, beforeAll, describe, expect, it } from 'bun:test';
import { GlobalRegistrator } from '@happy-dom/global-registrator';
import {
  MountRemoteError,
  createDomHandler,
  mountRemote,
  registerMountHandler,
  unmountDomRemote,
} from './mountRemote';

declare global {
  interface Window {
    jQuery: unknown;
    $: unknown;
  }
}

beforeAll(() => {
  GlobalRegistrator.register();
});

afterAll((done) => {
  GlobalRegistrator.unregister().then(done).catch(done);
});

describe('MountRemote', () => {
  let _unmount: { id: string; fn?: () => void } | undefined;

  const urls = {
    jq: 'https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js',
    bootstrap:
      'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
  };

  const deleteJq = () => {
    // biome-ignore lint/performance/noDelete: test cleanup
    delete window.jQuery;
    // biome-ignore lint/performance/noDelete: test cleanup
    delete window.$;
  };

  const addUnmount = (id: string, fn?: () => void) => {
    _unmount = { id, fn };
  };

  afterEach(() => {
    if (_unmount != null) {
      unmountDomRemote(_unmount.id, _unmount.fn);
      _unmount = undefined;
    }
  });

  describe('built-in types', () => {
    it('mount js', async () => {
      const scope = 'jquery';
      const res = await mountRemote(scope, {
        type: 'js',
        url: urls.jq,
      });
      addUnmount(scope, deleteJq);

      expect(res.url).toBe(urls.jq);
      expect(res.scope).toBe(scope);
      expect(document.getElementById(scope)?.tagName).toBe('SCRIPT');
      expect(window.jQuery).toBeDefined();
      expect(typeof window.jQuery).toBe('function');
    });

    it('mount css with attrs', async () => {
      const scope = 'bootstrap';
      const res = await mountRemote(scope, {
        type: 'css',
        url: urls.bootstrap,
        attrs: { 'data-name': scope, class: 'test-class' },
      });
      addUnmount(scope);

      const tag = document.getElementById(scope);
      expect(tag?.tagName).toBe('LINK');
      expect(tag?.dataset.name).toBe(scope);
      expect(tag?.classList.contains('test-class')).toBeTrue();
    });
  });

  describe('short-circuit', () => {
    it('should return immediately if element already exists', async () => {
      const scope = 'existing-el';
      const el = document.createElement('div');
      el.id = scope;
      document.head.appendChild(el);
      addUnmount(scope);

      const res = await mountRemote(scope, {
        type: 'js',
        url: 'any',
      });
      expect(res.scope).toBe(scope);
      expect(res.url).toBe('any');
    });
  });

  describe('custom handler', () => {
    it('registerMountHandler + custom type', async () => {
      // 在测试中通过 interface 声明合并扩展
      type CustomOpts = { url: string; flag: boolean };
      type CustomResult = { url: string; flag: boolean; custom: true };

      (registerMountHandler as (type: string, handler: unknown) => void)(
        'custom-test',
        async (
          ctx: import('./mountRemote').MountHandlerContext<CustomOpts>,
          opts: CustomOpts,
        ): Promise<import('./mountRemote').MountRemoteResult<CustomResult>> => {
          return {
            scope: ctx.scope,
            type: ctx.type,
            url: opts.url,
            flag: opts.flag,
            custom: true,
          };
        },
      );

      // biome-ignore lint/suspicious/noExplicitAny: testing unregistered custom type
      const mount = mountRemote as (...args: any[]) => Promise<any>;
      const res = await mount(
        'custom-el',
        { type: 'custom-test', url: 'https://example.com/resource', flag: true },
      );

      expect(res.scope).toBe('custom-el');
      expect(res.custom).toBe(true);
      expect(res.flag).toBe(true);
    });

    it('createDomHandler helper', () => {
      const handler = createDomHandler('img', (el, ctx) => {
        el.setAttribute('src', ctx.url);
        el.setAttribute('alt', ctx.scope);
      });
      expect(typeof handler).toBe('function');
    });
  });

  describe('error handling', () => {
    it('unsupported type', async () => {
      try {
        await mountRemote('unsupported', {
          type: 'not-supported' as 'js',
          url: 'any',
        });
        expect.unreachable('should have thrown');
      } catch (err) {
        expect(err).toBeInstanceOf(MountRemoteError);
        expect((err as MountRemoteError).message).toContain('not-supported');
      }
    });

    it('MountRemoteError preserves prev', () => {
      const prev = new Error('original');
      const err = new MountRemoteError('wrapper', prev);
      expect(err.message).toBe('wrapper');
      expect(err.prev).toBe(prev);
      expect(err.name).toBe('MountRemoteError');
    });
  });

  describe('unmountRemote', () => {
    it('should remove element and call callback', () => {
      const el = document.createElement('div');
      el.id = 'to-remove';
      document.head.appendChild(el);

      let called = false;
      unmountDomRemote('to-remove', () => {
        called = true;
      });

      expect(document.getElementById('to-remove')).toBeNull();
      expect(called).toBe(true);
    });

    it('should do nothing for non-existent id', () => {
      let called = false;
      unmountDomRemote('does-not-exist', () => {
        called = true;
      });
      expect(called).toBe(false);
    });
  });
});
