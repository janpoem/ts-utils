import { resolve } from 'node:path';

function test() {
  const scripts = [
    ['node', resolve(import.meta.dirname, 'dist.test.cjs')],
    ['node', resolve(import.meta.dirname, 'dist.test.mjs')],
    ['bun', resolve(import.meta.dirname, 'dist-bun-cjs.test.cjs')],
    ['bun', resolve(import.meta.dirname, 'dist-bun-ts.test.ts')],
    ['bun', resolve(import.meta.dirname, 'dist.test.mjs')],
    ['bun', resolve(import.meta.dirname, 'check-dts.ts')],
  ];

  for (const script of scripts) {
    Bun.spawnSync(script, {
      stdio: ['inherit', 'inherit', 'inherit'],
    });
  }
}

test();
