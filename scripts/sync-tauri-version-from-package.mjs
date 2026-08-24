/**
 * Sync src-tauri/Cargo.toml [package].version from root package.json.
 * tauri.conf.json version is "../package.json" (read by Tauri directly).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pkgPath = path.join(root, 'package.json');
const cargoPath = path.join(root, 'src-tauri', 'Cargo.toml');

const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
const version = String(pkg.version || '').trim();
if (!/^\d+\.\d+\.\d+/.test(version)) {
  console.error(`Invalid package.json version: ${version}`);
  process.exit(1);
}

let cargo = fs.readFileSync(cargoPath, 'utf8');
const next = cargo.replace(/^version = "[^"]+"/m, `version = "${version}"`);
if (!/^version = "/m.test(cargo)) {
  console.error('Failed to find version = "..." in src-tauri/Cargo.toml');
  process.exit(1);
}
if (next !== cargo) {
  fs.writeFileSync(cargoPath, next);
}
console.log(`Cargo.toml version → ${version}`);
