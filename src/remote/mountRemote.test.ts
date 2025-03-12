import { GlobalRegistrator } from '@happy-dom/global-registrator';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'bun:test';
import {
  mountRemote,
  MountRemoteError,
  type MountRemoteHandle,
  unmountRemote,
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
    img: 'https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg',
    notExists:
      'https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.aa.js',
  };

  const deleteJq = () => {
    // biome-ignore lint/performance/noDelete: <explanation>
    delete window.jQuery;
    // biome-ignore lint/performance/noDelete: <explanation>
    delete window.$;
  };

  const addUnmount = (id: string, fn?: () => void) => {
    _unmount = { id, fn: fn };
  };

  afterEach(() => {
    if (_unmount != null) {
      unmountRemote(_unmount.id, _unmount.fn);
    }
  });

  it('test mount jquery js', async () => {
    const id = 'jquery';
    const res = await mountRemote({
      url: urls.jq,
      id,
      type: 'js',
      onLoad: (res) => addUnmount(res.id, deleteJq),
    });

    expect(res.url).toBe(urls.jq);
    expect(res.id).toBe(id);
    expect(document.getElementById(res.id)?.tagName).toBe('SCRIPT');
    expect(window.jQuery).toBeDefined();
    expect(typeof window.jQuery).toBe('function');
  });

  it('test bootstrap css', async () => {
    const id = 'bootstrap';
    const res = await mountRemote({
      url: urls.bootstrap,
      id,
      attrs: {
        'data-name': id,
        class: 'test-class',
      },
      type: 'css',
      onLoad: (res) => addUnmount(res.id),
    });

    const tag = document.getElementById(res.id);

    expect(tag?.tagName).toBe('LINK');
    expect(tag?.dataset.name).toBe(id);
    expect(tag?.classList.contains('test-class')).toBeTrue();
  });

  it('custom handle', async () => {
    const width = 100;
    const height = 100;

    const mountImage: MountRemoteHandle<{ width: number; height: number }> = (
      res,
    ) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ ...res, width, height });
        }, 100);
      });

    const id = 'test_image';
    const res = await mountRemote({
      id,
      type: 'image',
      url: urls.img,
      handle: mountImage,
      onLoad: (res) => {
        expect(res.width).toBe(100);
        expect(res.height).toBe(100);
      },
    });

    expect(res.id).toBe(id);
    expect(res.type).toBe('image');
    expect(res.url).toBe(urls.img);
    expect(res.width).toBe(100);
    expect(res.height).toBe(100);
  });

  it('MountRemoteError', () => {
    const msg = 'test';
    const prev = 'prev error';
    const err = new MountRemoteError(msg, prev);

    expect(err.message).toBe(msg);
    expect(err.prev).toBe(prev);
  });

  it('test error type', async () => {
    const id = 'unsupported_type';
    const type = 'not-supported';
    expect(async () => {
      await mountRemote({
        url: 'not-supported',
        id,
        type,
      });
    }).toThrowError(`Unsupported type for ${type}`);
  });

  it('onload error', async () => {
    const id = 'not_exists';
    const type = 'js';
    expect(async () => {
      await mountRemote({
        url: urls.notExists,
        id,
        type,
      });
    }).toThrowError('Mount remote failed:');
  });
});
