import { join } from 'node:path';
import { scanEntries } from './module';

const calcExportNameBase = (exportName: string) => exportName.split('/').length;

const transExportName = (exportName: string) =>
  exportName === 'index' ? '.' : `${exportName}`;

export default function genExports() {
  const exports = scanEntries(join(process.cwd(), 'src'))
    .sort((a, b) => {
      const av = calcExportNameBase(a.exportName);
      const bv = calcExportNameBase(b.exportName);
      if (av === bv) {
        return a.exportEntry.localeCompare(b.exportEntry);
      }
      return av - bv;
    })
    .reduce(
      (map, it) => {
        map[it.exportEntry] = {
          import: {
            default: `./dist/${it.output.mjs}`,
            types: `./dist/${it.output.dts}`,
          },
          require: {
            default: `./dist/${it.output.cjs}`,
            types: `./dist/${it.output.dts}`,
          },
        };
        return map;
      },
      {} as Record<string, unknown>,
    );
  console.log(JSON.stringify({ exports }, null, 2));
}

if (import.meta.main) {
  genExports();
}
