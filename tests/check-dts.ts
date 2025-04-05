import { existsSync } from 'node:fs';
import { basename, relative, resolve } from 'node:path';
import pkg from '../package.json';

const base = resolve(import.meta.dirname, '../');

const files: string[] = [];

if ('types' in pkg) {
  files.push(resolve(base, pkg.types));
}

if ('exports' in pkg && '.' in pkg.exports) {
  const it = pkg.exports['.'];
  if ('import' in it && 'types' in it.import) {
    files.push(resolve(base, it.import.types));
  }
  if ('require' in it && 'types' in it.require) {
    files.push(resolve(base, it.require.types));
  }
}

console.log(basename(import.meta.filename));
for (const file of files) {
  console.log(relative(base, file), existsSync(file));
}
