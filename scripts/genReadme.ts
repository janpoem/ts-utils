import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { scanEntries } from './module';

const README_PATH = join(process.cwd(), 'README.md');
const PKG_PATH = join(process.cwd(), 'package.json');
const SRC_DIR = join(process.cwd(), 'src');

const MODULE_DESCRIPTIONS: Record<string, string> = {
  async: '异步工具函数',
  guards: 'Type Guards 和基础类型工具',
  path: '路径处理',
  http: 'HTTP 相关工具',
  remote: '远程模块加载',
  'fetch-download': '下载工具',
  misc: '杂项工具（timer、singleton、configurable 等）',
  events: '事件发布订阅',
};

type ExportItem = {
  name: string;
  kind: 'class' | 'function' | 'enum';
  link: string;
};

type ModuleInfo = {
  name: string;
  description: string;
  importPath: string;
  globalsLink: string;
  classes: ExportItem[];
  functions: ExportItem[];
};

const wikiBaseUrl = (): string => {
  const pkg = JSON.parse(readFileSync(PKG_PATH, 'utf-8')) as {
    repository?: { url?: string };
  };
  const raw = pkg.repository?.url ?? 'https://github.com/janpoem/ts-utils';
  const repoPath = raw
    .replace(/^git\+/, '')
    .replace(/\.git$/, '')
    .replace(/^https?:\/\/github\.com\//, '');
  return `https://github.com/${repoPath}/wiki`;
};

/** typedoc-github-wiki-theme 页面名：{module}.{Kind}.{name} */
const wikiMemberPage = (
  moduleName: string,
  item: Pick<ExportItem, 'name' | 'kind'>,
): string => {
  const kind =
    item.kind === 'class'
      ? 'Class'
      : item.kind === 'enum'
        ? 'Enumeration'
        : 'Function';
  return `${moduleName}.${kind}.${item.name}`;
};

const wikiModuleUrl = (base: string, moduleName: string): string =>
  `${base}/${moduleName}`;

const wikiMemberUrl = (
  base: string,
  moduleName: string,
  item: Pick<ExportItem, 'name' | 'kind'>,
): string => `${base}/${wikiMemberPage(moduleName, item)}`;

// 从源文件中提取 export 的 class 和 function/const，递归跟踪 export *
const scanExports = (
  filePath: string,
  seen = new Set<string>(),
): ExportItem[] => {
  if (seen.has(filePath)) return [];
  seen.add(filePath);

  let content: string;
  try {
    content = readFileSync(filePath, 'utf-8');
  } catch {
    try {
      content = readFileSync(`${filePath}.ts`, 'utf-8');
    } catch {
      return [];
    }
  }

  const items: ExportItem[] = [];
  const names = new Set<string>();

  for (const m of content.matchAll(/^export\s+class\s+(\w+)/gm)) {
    if (!names.has(m[1])) {
      names.add(m[1]);
      items.push({ name: m[1], kind: 'class', link: '' });
    }
  }

  for (const m of content.matchAll(
    /^export\s+(?:const|function)\s+(\w+)/gm,
  )) {
    if (!names.has(m[1])) {
      names.add(m[1]);
      items.push({ name: m[1], kind: 'function', link: '' });
    }
  }

  for (const m of content.matchAll(/^export\s+enum\s+(\w+)/gm)) {
    if (!names.has(m[1])) {
      names.add(m[1]);
      items.push({ name: m[1], kind: 'enum', link: '' });
    }
  }

  const dir = dirname(filePath);
  for (const m of content.matchAll(
    /^export\s+(?:\*|\{[^}]+\})\s+from\s+['"](\.\/[^'"]+)['"]/gm,
  )) {
    const refPath = resolve(dir, m[1]);
    const subItems = scanExports(refPath, seen);
    for (const item of subItems) {
      if (!names.has(item.name)) {
        names.add(item.name);
        items.push(item);
      }
    }
  }

  return items;
};

const getModuleName = (entry: { exportEntry: string }): string =>
  entry.exportEntry.replace(/^\.\//, '').replace(/^\.$/, 'index');

const generateReadme = () => {
  const wikiBase = wikiBaseUrl();
  const entries = scanEntries(SRC_DIR);

  const descKeys = Object.keys(MODULE_DESCRIPTIONS);
  const sorted = entries
    .map((entry) => ({ entry, name: getModuleName(entry) }))
    .filter((it) => it.name !== 'index')
    .sort((a, b) => {
      const ai = descKeys.indexOf(a.name);
      const bi = descKeys.indexOf(b.name);
      const av = ai === -1 ? descKeys.length : ai;
      const bv = bi === -1 ? descKeys.length : bi;
      return av - bv;
    });

  const modules: ModuleInfo[] = [];

  for (const { entry, name: moduleName } of sorted) {
    const items = scanExports(entry.path);
    if (items.length === 0) continue;

    const classes: ExportItem[] = [];
    const functions: ExportItem[] = [];

    for (const item of items) {
      item.link = wikiMemberUrl(wikiBase, moduleName, item);
      if (item.kind === 'class' || item.kind === 'enum') {
        classes.push(item);
      } else {
        functions.push(item);
      }
    }

    classes.sort((a, b) => a.name.localeCompare(b.name));
    functions.sort((a, b) => a.name.localeCompare(b.name));

    modules.push({
      name: moduleName,
      description: MODULE_DESCRIPTIONS[moduleName] ?? moduleName,
      importPath: `@zenstone/ts-utils/${moduleName}`,
      globalsLink: wikiModuleUrl(wikiBase, moduleName),
      classes,
      functions,
    });
  }

  const lines: string[] = [];

  lines.push('# @zenstone/ts-utils');
  lines.push('');
  lines.push(
    '[![version](https://img.shields.io/npm/v/@zenstone/ts-utils?style=for-the-badge)](https://www.npmjs.com/package/@zenstone/ts-utils) [![dt](https://img.shields.io/npm/dt/@zenstone/ts-utils?style=for-the-badge)](https://www.npmjs.com/package/@zenstone/ts-utils)',
  );
  lines.push('');
  lines.push(
    '从实际项目中沉淀的 TypeScript 工具库。不追求大而全，只收录真正在生产中反复使用的函数。',
  );
  lines.push('');
  lines.push('核心设计原则：');
  lines.push('');
  lines.push(
    '- **类型推断优先** — 泛型从原函数推断，不需要手动指定。`retry(fn)` 返回的函数自动保持 `fn` 的参数和返回值类型。',
  );
  lines.push(
    '- **高阶函数模式** — `retry`、`timeout` 等都是 `fn => fn` 的包装器，返回增强后的函数而非立即执行。',
  );
  lines.push(
    '- **`unknown` 守住边界** — 对外暴露的类型一律 `unknown`，迫使使用者显式收窄；`any` 只出现在泛型约束的基底声明中。',
  );
  lines.push(
    '- **不过度抽象** — 没有 DI、没有装饰器、没有配置体系。三行能解决的事不封装成类。',
  );
  lines.push('');
  lines.push('使用 Bun.js 开发，兼容 Node.js 运行时。');
  lines.push('');
  lines.push(
    `API 文档见 [GitHub Wiki](${wikiBase})（由 TypeDoc + \`typedoc-github-wiki-theme\` 生成）。`,
  );
  lines.push('');

  lines.push('## 安装');
  lines.push('');
  lines.push('```bash');
  lines.push('# node');
  lines.push('npm install @zenstone/ts-utils');
  lines.push('# bun');
  lines.push('bun add @zenstone/ts-utils');
  lines.push('```');
  lines.push('');

  lines.push('## 使用');
  lines.push('');
  lines.push('### 整体导入');
  lines.push('');
  lines.push('```ts');
  lines.push("import { retry, isStr, errMsg } from '@zenstone/ts-utils';");
  lines.push('```');
  lines.push('');
  lines.push('### 独立导入（推荐）');
  lines.push('');
  lines.push('ESM 支持子路径导入：');
  lines.push('');
  lines.push('```ts');
  lines.push(
    "import { retry, RetryExhaustedError, TimeoutError } from '@zenstone/ts-utils/async';",
  );
  lines.push(
    "import { isStr, errMsg, isNumber, isInferObj } from '@zenstone/ts-utils/guards';",
  );
  lines.push("import { createPathUtils } from '@zenstone/ts-utils/path';");
  lines.push('```');
  lines.push('');

  lines.push('## 模块列表');
  lines.push('');
  lines.push('| 模块 | 说明 | 导入路径 |');
  lines.push('|------|------|----------|');
  for (const mod of modules) {
    lines.push(
      `| [\`${mod.name}\`](${mod.globalsLink}) | ${mod.description} | \`${mod.importPath}\` |`,
    );
  }
  lines.push('');

  lines.push('## 模块详情');
  lines.push('');

  for (const mod of modules) {
    lines.push(`### [\`${mod.name}\`](${mod.globalsLink})`);
    lines.push('');
    lines.push(mod.description);
    lines.push('');

    if (mod.classes.length > 0) {
      lines.push('**Classes:**');
      lines.push('');
      for (const item of mod.classes) {
        lines.push(`- [\`${item.name}\`](${item.link})`);
      }
      lines.push('');
    }

    if (mod.functions.length > 0) {
      lines.push('**Functions:**');
      lines.push('');
      for (const item of mod.functions) {
        lines.push(`- [\`${item.name}\`](${item.link})`);
      }
      lines.push('');
    }
  }

  const content = lines.join('\n');
  writeFileSync(README_PATH, content);
  console.log(`README.md generated (${modules.length} modules, wiki: ${wikiBase})`);

  for (const mod of modules) {
    const total = mod.classes.length + mod.functions.length;
    console.log(
      `  ${mod.name}: ${total} exports (${mod.classes.length} classes, ${mod.functions.length} functions)`,
    );
  }
};

generateReadme();