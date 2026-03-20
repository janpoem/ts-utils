import { readFileSync } from 'node:fs';
import { basename, dirname, extname, join, resolve } from 'node:path';
import type { Plugin } from 'rollup';

const inlineCjsPlugin = (
  srcDir: string,
  distDir: string,
  entries: { path: string; output: { cjs: string } }[],
): Plugin => {
  const entryOutputs = new Map(entries.map((e) => [e.path, e.output.cjs]));

  const resolveModule = (
    importer: string,
    specifier: string,
  ): string | null => {
    const importerDir = dirname(importer);
    const resolved = resolve(importerDir, specifier);

    // Check if it's an entry module (submodule index)
    const entry = entries.find((e) => {
      const fullPath = resolve(srcDir, e.path);
      return resolved === fullPath || resolved === fullPath.replace(/\\/g, '/');
    });

    if (entry) {
      return join(distDir, entry.output.cjs);
    }

    // Try common patterns
    const patterns = [
      resolved,
      `${resolved}.cjs`,
      `${resolved}.js`,
      `${resolved}/index.cjs`,
      `${resolved}/index.js`,
    ];

    for (const p of patterns) {
      try {
        const content = readFileSync(p, 'utf-8');
        return p;
      } catch {
        // try next pattern
      }
    }

    return null;
  };

  return {
    name: 'inline-cjs',

    renderChunk(code, chunk) {
      if (chunk.fileName.endsWith('.cjs')) {
        const outputPath = join(distDir, chunk.fileName);

        // Find all require() calls and try to inline them
        let inlinedCode = code;
        const requirePattern = /require\s*\(\s*['"]([^'"]+)['"]\s*\)/g;
        const matches = [...code.matchAll(requirePattern)];

        for (const match of matches) {
          const specifier = match[1];
          if (!specifier.startsWith('./') && !specifier.startsWith('../')) {
            continue; // skip node_modules
          }

          const resolvedPath = resolveModule(chunk.fileName, specifier);
          if (resolvedPath && resolvedPath !== outputPath) {
            // Check if it's a dist path (internal module)
            if (
              resolvedPath.startsWith(distDir) ||
              resolvedPath.includes('\\dist\\') ||
              resolvedPath.includes('/dist/')
            ) {
              // Replace with explicit .cjs extension
              const cjsPath = resolvedPath
                .replace(/\.js$/, '.cjs')
                .replace(/\\/g, '/');
              const relPath = getRelativePath(outputPath, cjsPath).replace(
                /\\/g,
                '/',
              );
              inlinedCode = inlinedCode.replace(
                match[0],
                `require('${relPath}')`,
              );
            }
          }
        }

        return inlinedCode;
      }
      return null;
    },
  };
};

function getRelativePath(from: string, to: string): string {
  const fromParts = from.replace(/\\/g, '/').split('/');
  const toParts = to.replace(/\\/g, '/').split('/');

  // Remove filename from fromParts
  fromParts.pop();

  let i = 0;
  while (
    i < fromParts.length &&
    i < toParts.length &&
    fromParts[i] === toParts[i]
  ) {
    i++;
  }

  const upCount = fromParts.length - i;
  const downPath = toParts.slice(i);

  return (
    '.' +
    (upCount > 0 ? '/..'.repeat(upCount) : '') +
    (downPath.length > 0 ? '/' : '') +
    downPath.join('/')
  );
}

export { inlineCjsPlugin };
