import { existsSync, rmSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import type {RenderedChunk, RollupOptions} from 'rollup';
import { dts } from 'rollup-plugin-dts';
import { defineRollupSwcOption, swc } from 'rollup-plugin-swc3';
import { scanEntries, scanInternalDeps } from './scripts/module';

const inWatchMode = process.argv.includes('--watch');
const outputDir = resolve(process.cwd(), './dist');
const srcDir = resolve(process.cwd(), 'src');

const rmdir = (dir: string, enable = true) => {
  return {
    buildStart() {
      if (enable && dir) {
        existsSync(outputDir) &&
          statSync(outputDir).isDirectory() &&
          rmSync(outputDir, { recursive: true });
      }
    },
  };
};

const entries = scanEntries(srcDir);
const deps = await scanInternalDeps(srcDir, entries);

const config: RollupOptions[] = [];

// Shared swc plugin config
const swcPlugin = swc(
  defineRollupSwcOption({
    include: /\.[mc]?[jt]sx?$/,
    exclude: /node_modules/,
    tsconfig: 'tsconfig.json',
    jsc: {
      target: 'es2022',
    },
  }),
);

const nodeResolvePlugin = nodeResolve({});
const commonjsPlugin = commonjs({
  extensions: ['.node', '.cjs', '.js', '.mjs'],
});

const sharedPlugins = [swcPlugin, nodeResolvePlugin, commonjsPlugin];

// Plugin to fix CJS require paths - adds .cjs extension for internal modules
const cjsRequirePlugin = (): ReturnType<typeof createRequirePlugin> => {
  function createRequirePlugin() {
    return {
      name: 'cjs-require-fix',
      renderChunk(code: string, chunk: RenderedChunk) {
        if (!chunk.fileName.endsWith('.cjs')) return null;

        return code.replace(
          /require\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
          (match, specifier) => {
            if (!specifier.startsWith('./') && !specifier.startsWith('../')) {
              return match;
            }

            if (
              !specifier.endsWith('.cjs') &&
              !specifier.endsWith('.js') &&
              !specifier.endsWith('.mjs')
            ) {
              return match.replace(specifier, `${specifier}/index.cjs`);
            }

            return match;
          },
        );
      },
    };
  }

  return createRequirePlugin();
};

// Plugin to fix ESM import paths - adds .mjs extension for internal modules
const esmImportPlugin = (): ReturnType<typeof createEsmPlugin> => {
  function createEsmPlugin() {
    return {
      name: 'esm-import-fix',
      renderChunk(code: string, chunk: RenderedChunk) {
        if (!chunk.fileName.endsWith('.mjs')) return null;

        return code.replace(
          /import\s+(?:(?:\{[^}]*\}|\*\s+as\s+\w+|\w+)\s+from\s+)?['"]([^'"]+)['"]/g,
          (match, specifier) => {
            if (!specifier.startsWith('./') && !specifier.startsWith('../')) {
              return match;
            }

            if (
              !specifier.endsWith('.cjs') &&
              !specifier.endsWith('.js') &&
              !specifier.endsWith('.mjs')
            ) {
              return match.replace(specifier, `${specifier}/index.mjs`);
            }

            return match;
          },
        );
      },
    };
  }

  return createEsmPlugin();
};

export default [
  // Main entry - CJS (single) + ESM (single)
  {
    input: 'src/index.ts',
    output: [
      {
        file: join(outputDir, 'cjs/index.cjs'),
        format: 'cjs',
      },
      {
        file: join(outputDir, 'esm/index.mjs'),
        format: 'es',
        exports: 'named',
      },
    ],
    plugins: [rmdir(outputDir, !inWatchMode), ...sharedPlugins],
  },
  // Main entry types - CJS
  {
    input: 'src/index.ts',
    output: {
      file: join(outputDir, 'cjs/index.d.cts'),
      format: 'es',
    },
    plugins: [dts()],
  },
  // Main entry types - ESM
  {
    input: 'src/index.ts',
    output: {
      file: join(outputDir, 'esm/index.d.ts'),
      format: 'es',
    },
    plugins: [dts()],
  },

  // CJS multi-entries (submodules)
  ...entries.map((entry) => ({
    input: entry.path,
    output: [
      {
        file: join(outputDir, entry.output.cjs),
        format: 'cjs',
      },
    ],
    plugins: [...sharedPlugins, cjsRequirePlugin()],
    external: deps,
  })),

  // CJS multi-entry types
  ...entries.map((entry) => ({
    input: entry.path,
    output: [
      {
        file: join(outputDir, entry.output.cjs.replace('.cjs', '.d.cts')),
        format: 'es',
      },
    ],
    plugins: [dts()],
  })),

  // ESM multi-entries (submodules)
  ...entries.map((entry) => ({
    input: entry.path,
    output: [
      {
        file: join(outputDir, entry.output.mjs),
        format: 'es',
        exports: 'named',
      },
    ],
    plugins: [...sharedPlugins, esmImportPlugin()],
    external: deps,
  })),

  // ESM multi-entry types
  ...entries.map((entry) => ({
    input: entry.path,
    output: [
      {
        // file: join(outputDir, entry.output.dts),
        file: join(outputDir, entry.output.mjs.replace('.mjs', '.d.ts')),
        format: 'es',
      },
    ],
    plugins: [dts()],
  })),
];
//
// export default config;
