import { lstatSync, readFileSync, readdirSync } from 'node:fs';
import { basename, dirname, extname, join, resolve } from 'node:path';
import type { Transpiler } from 'bun';
import { glob } from 'glob';

const transpilers: Partial<Record<string, Transpiler>> = {};

const getTranspiler = (ext: string): Transpiler => {
  const loader = ext.replace(/^\./g, '');
  if (loader !== 'ts' && loader !== 'tsx') {
    throw new Error('Invalid transpiler loader');
  }
  if (transpilers[loader] == null) {
    transpilers[loader] = new Bun.Transpiler({ loader });
  }
  return transpilers[loader];
};

export type EntryOutput = {
  cjs: string;
  mjs: string;
  dts: string;
};

export type Entry = {
  path: string;
  ext: string;
  entryDir?: string;
  baseName: string;
  exportName: string;
  exportEntry: string;
  output: EntryOutput;
};

export const newEntry = (
  path: string,
  entryDir?: string,
): Entry | undefined => {
  try {
    const dir = dirname(path);
    const ext = extname(path);
    const baseName = basename(path, ext);
    let exportEntry = !entryDir ? baseName : basename(entryDir);
    exportEntry = exportEntry === 'index' ? '.' : `./${exportEntry}`;
    const exportName = !entryDir ? baseName : `${basename(entryDir)}/index`;

    const stats = lstatSync(path);
    if (stats.isSymbolicLink()) return;
    if (stats.isDirectory()) {
      return newEntry(join(path, 'index.ts'), path);
    }
    if (stats.isFile()) {
      if (baseName.endsWith('.test') || baseName.endsWith('.spec')) return;
    }

    return {
      path,
      ext,
      entryDir,
      baseName,
      exportName,
      exportEntry,
      output: {
        cjs: `${exportName}.cjs`,
        mjs: `${exportName}.js`,
        dts: `${exportName}.d.ts`,
      },
    };
  } catch (err) {}
};

export const scanEntries = (dirPath: string): Entry[] => {
  return readdirSync(dirPath)
    .map((it) => newEntry(join(dirPath, it)))
    .filter((it) => it != null);
};

export const scanImports = (path: string) => {
  try {
    return getTranspiler(extname(path).toLowerCase()).scanImports(
      readFileSync(path),
    );
  } catch (err) {}
  return [];
};

export const parseModule = (path: string): ParseModule => {
  const dir = dirname(path);
  const ext = extname(path);
  const id = basename(path, ext);
  const modulePath = join(dir, id);
  return { id, dir, path, modulePath, ext };
};

type ParseModule = {
  id: string;
  dir: string;
  path: string;
  modulePath: string;
  ext?: string;
};

export const scanInternalDeps = async (dirPath: string, entries: Entry[]) => {
  const externals: string[] = [];
  // 都有基于文件的 modules
  const allFileModules = (
    await glob('**/*.{ts,tsx}', {
      cwd: dirPath,
      ignore: {
        ignored: (p) => {
          const ext = extname(p.name);
          const baseName = basename(p.name, ext);
          return (
            baseName === 'index' ||
            baseName.endsWith('.test') ||
            baseName.endsWith('.spec')
          );
        },
      },
    })
  ).map((it) => parseModule(join(dirPath, it)));

  for (const module of allFileModules) {
    const imports = scanImports(module.path);
    for (const ipt of imports) {
      if (!ipt.path.startsWith('./') && !ipt.path.startsWith('../')) continue;
      const iptPath = resolve(module.dir, ipt.path);

      // 先从文件 modules 中去找匹配
      const iptModule = allFileModules.find(
        (it) => it.modulePath === iptPath || it.path === iptPath,
      );

      const iptEntry =
        iptModule == null
          ? // 如果在文件 modules 不匹配，则从 entries 里面找 entryDir 进行匹配
            entries.find((it) => it.entryDir === iptPath)
          : entries.find((it) => it.path === iptModule.path);
      if (iptEntry == null) continue;

      externals.push(ipt.path);
    }
  }

  return externals;
};
