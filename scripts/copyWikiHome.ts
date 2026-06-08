import { copyFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const readme = join(root, 'README.md');
const home = join(root, 'docs-wiki', 'Home.md');

if (!existsSync(readme)) {
  console.error('copyWikiHome: README.md not found (run genReadme first)');
  process.exit(1);
}

if (!existsSync(join(root, 'docs-wiki'))) {
  console.error('copyWikiHome: docs-wiki/ not found (run doc:wiki typedoc first)');
  process.exit(1);
}

copyFileSync(readme, home);
console.log('copyWikiHome: README.md -> docs-wiki/Home.md');