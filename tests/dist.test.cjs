const pkg = require('../package.json');
const { resolve, basename } = require('node:path');
const mod = require(resolve(__dirname, '../', pkg.main));
const keys = require('./keys.json');
const assert = require('node:assert');

console.log(basename(__filename));
console.log('check module -', pkg.main);
const res = assert.strictEqual(typeof mod === 'object', true);

let c = 0;
for (const key of keys) {
  assert.strictEqual(key in mod, true);
  c += 1;
}
console.log('check module.keys -', c);
