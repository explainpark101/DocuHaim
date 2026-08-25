/**
 * Ad-hoc codesign for local macOS builds (no Apple Developer account).
 * Signs DocuHaim.app with "-" identity and keychain entitlements so
 * tauri-plugin-biometry can persist secrets after "Always Allow" on first prompt.
 *
 * Usage:
 *   bun run tauri:build && bun run macos:adhoc
 *   bun run macos:adhoc -- --build
 *   MACOS_ADHOC_APP=/path/to/DocuHaim.app bun run macos:adhoc
 */
import { existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const productName = 'DocuHaim';
const defaultAppPath = join(
  root,
  'src-tauri/target/release/bundle/macos',
  `${productName}.app`,
);
const entitlements = join(root, 'src-tauri/macos-adhoc.entitlements.plist');

if (process.platform !== 'darwin') {
  console.error('macos:adhoc is only available on macOS.');
  process.exit(1);
}

if (!existsSync(entitlements)) {
  console.error(`Entitlements not found: ${entitlements}`);
  process.exit(1);
}

const shouldBuild = process.argv.includes('--build');
if (shouldBuild) {
  execSync('bun run tauri:build', { cwd: root, stdio: 'inherit' });
}

const appPath = process.env.MACOS_ADHOC_APP?.trim() || defaultAppPath;

if (!existsSync(appPath)) {
  console.error(`App bundle not found: ${appPath}`);
  console.error('Build first: bun run tauri:build');
  console.error('Or set MACOS_ADHOC_APP to an existing .app path.');
  process.exit(1);
}

const quote = (value) => `'${value.replace(/'/g, "'\\''")}'`;

console.log(`Ad-hoc signing ${appPath}`);

execSync(
  `codesign --force --deep --sign - --entitlements ${quote(entitlements)} ${quote(appPath)}`,
  { stdio: 'inherit' },
);

execSync(`codesign --verify --deep --strict ${quote(appPath)}`, {
  stdio: 'inherit',
});

console.log('Ad-hoc sign complete.');
console.log(
  'On first keychain access, choose "Always Allow" in the macOS security dialog.',
);
