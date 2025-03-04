import * as fs from 'node:fs';
import { join, resolve } from 'node:path';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import type { RollupOptions } from 'rollup';
import { dts } from 'rollup-plugin-dts';
import { defineRollupSwcOption, swc } from 'rollup-plugin-swc3';
import { scanEntries, scanInternalDeps } from './scripts/module';

const outputDir = resolve(process.cwd(), './dist');
const srcDir = resolve(process.cwd(), 'src');

const rmdir = (dir: string) =>
  dir &&
  fs.existsSync(dir) &&
  fs.statSync(dir).isDirectory() &&
  fs.rmSync(dir, { recursive: true });

const entries = scanEntries(srcDir);
const deps = await scanInternalDeps(srcDir, entries);

const config: RollupOptions[] = [];

for (const entry of entries) {
  config.push({
    input: entry.path,
    output: [
      {
        file: join(outputDir, entry.output.cjs),
        format: 'cjs',
      },
      {
        file: join(outputDir, entry.output.mjs),
        format: 'es',
        exports: 'named',
      },
    ],
    plugins: [
      swc(
        defineRollupSwcOption({
          include: /\.[mc]?[jt]sx?$/,
          exclude: /node_modules/,
          tsconfig: 'tsconfig.json',
          jsc: {
            target: 'es2022',
          },
        }),
      ),
      nodeResolve({}),
      commonjs({
        extensions: ['.node', '.cjs', '.js', '.mjs'],
      }),
    ],
    external: deps,
  });
  config.push({
    input: entry.path,
    output: [
      {
        file: join(outputDir, entry.output.dts),
        format: 'es',
      },
    ],
    plugins: [dts()],
  });
}

export default config;
