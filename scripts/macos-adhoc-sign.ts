/**
 * Ad-hoc codesign for local macOS builds (no Apple Developer account).
 *
 * Signs with identity "-" only. Do NOT pass keychain entitlements here —
 * `keychain-access-groups` with ad-hoc signing breaks app launch on current macOS.
 * Keychain prompts still work; choose "Always Allow" on first access.
 *
 * `tauri build` removes bundle/macos/*.app after DMG creation, so this script
 * extracts DocuHaim.app from the release DMG when needed.
 *
 * Usage:
 *   bun run tauri:build && bun run macos:adhoc
 *   bun run macos:adhoc -- --build
 *   bun run macos:adhoc -- --install
 *   MACOS_ADHOC_APP=/path/to/DocuHaim.app bun run macos:adhoc
 */
import { execSync } from 'node:child_process';
import { cpSync, existsSync, mkdtempSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const productName = 'DocuHaim';
const bundleMacosDir = join(root, 'src-tauri/target/release/bundle/macos');
const defaultAppPath = join(bundleMacosDir, `${productName}.app`);
const dmgDir = join(root, 'src-tauri/target/release/bundle/dmg');
const installPath = `/Applications/${productName}.app`;

if (process.platform !== 'darwin') {
  console.error('macos:adhoc is only available on macOS.');
  process.exit(1);
}

const quote = (value: string): string => `'${value.replace(/'/g, "'\\''")}'`;

function findLatestDmg(): string | null {
  if (!existsSync(dmgDir)) {
    return null;
  }

  const dmgs = readdirSync(dmgDir)
    .filter((name) => name.endsWith('.dmg'))
    .map((name) => join(dmgDir, name))
    .sort();

  return dmgs.at(-1) ?? null;
}

function extractAppFromDmg(dmgPath: string): string {
  const mountPoint = mkdtempSync(join(tmpdir(), 'docuhaim-dmg-'));
  const stagingApp = join(mountPoint, `${productName}.app`);

  try {
    execSync(
      `hdiutil attach -nobrowse -readonly -mountpoint ${quote(mountPoint)} ${quote(dmgPath)}`,
      { stdio: 'inherit' },
    );

    if (!existsSync(stagingApp)) {
      throw new Error(`DMG does not contain ${productName}.app: ${dmgPath}`);
    }

    const extractedDir = mkdtempSync(join(tmpdir(), 'docuhaim-app-'));
    const extractedApp = join(extractedDir, `${productName}.app`);
    cpSync(stagingApp, extractedApp, { recursive: true });
    return extractedApp;
  } finally {
    try {
      execSync(`hdiutil detach ${quote(mountPoint)} -quiet`, { stdio: 'pipe' });
    } catch {
      // mount may already be detached
    }
    rmSync(mountPoint, { recursive: true, force: true });
  }
}

function resolveAppPath(): string {
  const explicit = process.env.MACOS_ADHOC_APP?.trim();
  if (explicit) {
    if (!existsSync(explicit)) {
      console.error(`App bundle not found: ${explicit}`);
      process.exit(1);
    }
    return explicit;
  }

  if (existsSync(defaultAppPath)) {
    return defaultAppPath;
  }

  const dmgPath = findLatestDmg();
  if (!dmgPath) {
    console.error(`App bundle not found: ${defaultAppPath}`);
    console.error('Build first: bun run tauri:build');
    console.error('Or set MACOS_ADHOC_APP to an existing .app path.');
    process.exit(1);
  }

  console.log(`Extracting ${productName}.app from ${dmgPath}`);
  return extractAppFromDmg(dmgPath);
}

function signApp(appPath: string): void {
  console.log(`Ad-hoc signing ${appPath}`);
  execSync(`codesign --force --deep --sign - ${quote(appPath)}`, {
    stdio: 'inherit',
  });
  execSync(`codesign --verify --deep --strict ${quote(appPath)}`, {
    stdio: 'inherit',
  });
}

function installApp(appPath: string): void {
  console.log(`Installing to ${installPath}`);
  rmSync(installPath, { recursive: true, force: true });
  cpSync(appPath, installPath, { recursive: true });
  signApp(installPath);
}

const shouldBuild = process.argv.includes('--build');
const shouldInstall = process.argv.includes('--install');

if (shouldBuild) {
  execSync('bun run tauri:build', { cwd: root, stdio: 'inherit' });
}

const appPath = resolveAppPath();
signApp(appPath);

if (shouldInstall) {
  installApp(appPath);
}

console.log('Ad-hoc sign complete.');
if (!shouldInstall) {
  console.log(`Signed app: ${appPath}`);
}
console.log(
  'On first keychain access, choose "Always Allow" in the macOS security dialog.',
);
