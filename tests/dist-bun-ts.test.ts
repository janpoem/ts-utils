import * as assert from 'node:assert';
import { basename, resolve } from 'node:path';
import pkg from '../package.json';
import keys from './keys.json';

const mod = await import(resolve(import.meta.dirname, '../', pkg.module));

console.log(basename(import.meta.filename));
console.log('check module -', pkg.module);
assert.strictEqual(typeof mod === 'object', true);

let c = 0;
for (const key of keys) {
  assert.strictEqual(key in mod, true);
  c += 1;
}
console.log('check module.keys -', c);
