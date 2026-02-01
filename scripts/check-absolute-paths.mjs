import { promises as fs } from 'fs';
import path from 'path';

const root = process.cwd();
const ignoreDirs = new Set(['node_modules', 'dist', '.git', '.idea']);
const exts = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.json', '.md', '.css', '.html']);

const patterns = [
  { name: 'macOS', regex: /\/Users\/[A-Za-z0-9._-]+\/[^\s"']+/g },
  { name: 'Linux', regex: /\/home\/[A-Za-z0-9._-]+\/[^\s"']+/g },
  // Require a full drive path with at least one nested segment and avoid matching words like "Output:\\n"
  { name: 'Windows', regex: /(?<![A-Za-z0-9])([A-Za-z]):\\[^\s"']+\\[^\s"']+/g }
];

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (ignoreDirs.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
    } else if (exts.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }
  return files;
}

function indexToLine(text, index) {
  return text.slice(0, index).split('\n').length;
}

(async () => {
  const files = await walk(root);
  const hits = [];

  for (const file of files) {
    const content = await fs.readFile(file, 'utf8');
    patterns.forEach(({ name, regex }) => {
      let match;
      while ((match = regex.exec(content)) !== null) {
        hits.push({
          file,
          line: indexToLine(content, match.index),
          snippet: match[0],
          kind: name
        });
      }
    });
  }

  if (hits.length) {
    console.error('\nAbsolute path references found:');
    hits.forEach((hit) => {
      console.error(`- [${hit.kind}] ${hit.file}:${hit.line} -> ${hit.snippet}`);
    });
    console.error(`\nFound ${hits.length} absolute path reference(s).`);
    process.exit(1);
  }

  console.log('No absolute paths found in source files.');
})();
