/**
 * Rewrites relative imports (./ ../) under src/ and tests/ to @/ alias paths.
 * Run: bun scripts/convert-relative-to-alias.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const srcDir = path.join(rootDir, 'src');

const EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.json'];
const IMPORT_RE =
  /(?<=(?:import|export)(?:\s+type)?(?:[\s\S]*?\sfrom\s+|\s*\()|import\()['"](\.\.?\/[^'"]+)['"]/g;

function extensionSwapCandidates(filePath) {
  const ext = path.extname(filePath);
  const stem = filePath.slice(0, -ext.length);
  const out = [filePath];
  if (ext === '.js') out.push(`${stem}.ts`, `${stem}.tsx`, `${stem}.jsx`);
  if (ext === '.jsx') out.push(`${stem}.tsx`, `${stem}.ts`, `${stem}.js`);
  if (ext === '.ts') out.push(`${stem}.js`);
  if (ext === '.tsx') out.push(`${stem}.jsx`, `${stem}.js`);
  return out;
}

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (name === 'node_modules' || name === 'dist') continue;
      walk(full, out);
      continue;
    }
    if (/\.(ts|tsx|js|jsx|mjs)$/.test(name)) out.push(full);
  }
  return out;
}

function resolveImport(fromFile, specifier) {
  const fromDir = path.dirname(fromFile);
  const raw = path.resolve(fromDir, specifier);
  const candidates = [];

  if (path.extname(raw)) {
    for (const candidate of extensionSwapCandidates(raw)) candidates.push(candidate);
  } else {
    for (const ext of EXTENSIONS) candidates.push(raw + ext);
    for (const ext of EXTENSIONS) candidates.push(path.join(raw, `index${ext}`));
  }

  for (const candidate of candidates) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return candidate;
  }
  return null;
}

function toAlias(fromFile, specifier) {
  const resolved = resolveImport(fromFile, specifier);
  if (!resolved) {
    console.warn(`[skip] unresolved: ${path.relative(rootDir, fromFile)} -> ${specifier}`);
    return null;
  }

  const rel = path.relative(srcDir, resolved).split(path.sep).join('/');
  if (rel.startsWith('..')) {
    console.warn(`[skip] outside src: ${path.relative(rootDir, fromFile)} -> ${specifier}`);
    return null;
  }

  const hadJsExt = /\.(?:jsx?|tsx?)$/.test(specifier);
  const importExt = path.extname(specifier);
  const ext = path.extname(resolved);
  let aliasPath = rel;
  if (hadJsExt && (importExt === '.js' || importExt === '.jsx')) {
    aliasPath = `${rel.slice(0, -ext.length)}${importExt}`;
  } else if (!hadJsExt && EXTENSIONS.includes(ext)) {
    aliasPath = rel.slice(0, -ext.length);
  }
  return `@/${aliasPath}`;
}

function convertFile(filePath) {
  const original = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  const next = original.replace(IMPORT_RE, (match, specifier) => {
    const alias = toAlias(filePath, specifier);
    if (!alias) return match;
    changed = true;
    return match.replace(specifier, alias);
  });

  if (changed && next !== original) {
    fs.writeFileSync(filePath, next);
    return true;
  }
  return false;
}

const files = [
  ...walk(srcDir),
  ...walk(path.join(rootDir, 'tests')),
  path.join(rootDir, 'tailwind.config.ts'),
].filter((f) => fs.existsSync(f));

let count = 0;
for (const file of files) {
  if (convertFile(file)) {
    count += 1;
    console.log(`updated ${path.relative(rootDir, file)}`);
  }
}

console.log(`\nDone. Updated ${count} file(s).`);
