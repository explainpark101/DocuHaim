/**
 * Stage Tauri installers and upload every one of them onto a single GitHub Release.
 *
 *   bun scripts/publishReleaseAssets.ts stage --from src-tauri/target --to dist-desktop
 *   bun scripts/publishReleaseAssets.ts upload --dir release-assets --release-id 1 --version 2.4.0 --notes docs/desktop/github-release-body.md
 *   bun scripts/publishReleaseAssets.ts json-only --release-id 1 --version 2.4.0 --notes docs/desktop/github-release-body.md
 */
import { execFileSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, join } from 'node:path';
import {
  buildUpdaterManifest,
  isReleaseInstallerName,
  missingInstallers,
  type ReleaseAsset,
} from '../src/utils/releaseUpdaterManifest.ts';

type Args = Record<string, string>;

function parseArgs(argv: readonly string[]): { command: string; args: Args } {
  const command = argv[0] ?? '';
  const args: Args = {};
  for (let i = 1; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token?.startsWith('--')) continue;
    const key = token.slice(2);
    const value = argv[i + 1];
    if (!value || value.startsWith('--')) {
      throw new Error(`Missing value for --${key}`);
    }
    args[key] = value;
    i += 1;
  }
  return { command, args };
}

function requireArg(args: Args, key: string): string {
  const value = args[key];
  if (!value) throw new Error(`--${key} is required`);
  return value;
}

function repository(): string {
  const repo = process.env.GITHUB_REPOSITORY;
  if (!repo) throw new Error('GITHUB_REPOSITORY is required');
  return repo;
}

function apiBase(): string {
  return (process.env.GITHUB_API_URL || 'https://api.github.com').replace(/\/$/, '');
}

function gh(args: readonly string[], maxBuffer = 16 * 1024 * 1024): string {
  return execFileSync('gh', [...args], {
    encoding: 'utf8',
    maxBuffer,
    env: process.env,
  });
}

function walkFiles(dir: string, out: string[] = []): string[] {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walkFiles(full, out);
    else if (entry.isFile()) out.push(full);
  }
  return out;
}

function contentType(name: string): string {
  const lower = name.toLowerCase();
  if (lower.endsWith('.apk')) return 'application/vnd.android.package-archive';
  if (lower.endsWith('.dmg')) return 'application/x-apple-diskimage';
  if (lower.endsWith('.sig')) return 'text/plain';
  if (lower.endsWith('.json')) return 'application/json';
  if (lower.endsWith('.tar.gz')) return 'application/gzip';
  if (lower.endsWith('.zip')) return 'application/zip';
  return 'application/octet-stream';
}

function listReleaseAssets(releaseId: string): ReleaseAsset[] {
  const repo = repository();
  const raw = gh([
    'api',
    '--paginate',
    `repos/${repo}/releases/${releaseId}/assets?per_page=100`,
    '--jq',
    '.[] | [.id, .name] | @tsv',
  ]);
  const assets: ReleaseAsset[] = [];
  for (const line of raw.split('\n')) {
    if (!line.trim()) continue;
    const [idText, name] = line.split('\t');
    const id = Number(idText);
    if (!name || !Number.isFinite(id)) continue;
    assets.push({ id, name });
  }
  return assets;
}

function uploadUrl(releaseId: string): string {
  const repo = repository();
  return gh([
    'api',
    `repos/${repo}/releases/${releaseId}`,
    '--jq',
    '.upload_url | sub("[{].*$"; "")',
  ]).trim();
}

function deleteAsset(assetId: number): void {
  const repo = repository();
  gh(['api', '--method', 'DELETE', `repos/${repo}/releases/assets/${assetId}`]);
}

function uploadFile(releaseId: string, filePath: string, name: string): number {
  const existing = listReleaseAssets(releaseId).find((asset) => asset.name === name);
  if (existing) {
    console.log(`Replacing ${name} (${existing.id})`);
    deleteAsset(existing.id);
  } else {
    console.log(`Uploading ${name}`);
  }
  const created = gh([
    'api',
    '--method',
    'POST',
    '-H',
    'Accept: application/vnd.github+json',
    '-H',
    `Content-Type: ${contentType(name)}`,
    `${uploadUrl(releaseId)}?name=${encodeURIComponent(name)}`,
    '--input',
    filePath,
  ]);
  const id = Number(JSON.parse(created).id);
  if (!Number.isFinite(id)) throw new Error(`Upload of ${name} did not return an asset id`);
  return id;
}

function stage(from: string, to: string): void {
  mkdirSync(to, { recursive: true });
  const copied: string[] = [];
  for (const filePath of walkFiles(from)) {
    const normalized = filePath.replace(/\\/g, '/');
    if (!normalized.includes('/bundle/') && !normalized.includes('/dist-android/')) continue;
    const name = basename(filePath);
    if (!isReleaseInstallerName(name)) continue;
    const dest = join(to, name);
    if (existsSync(dest)) {
      throw new Error(`Installer name collision: ${name}`);
    }
    copyFileSync(filePath, dest);
    copied.push(name);
    console.log(`Staged ${name}`);
  }
  if (copied.length === 0) {
    throw new Error(`No installer files found under ${from}`);
  }
  console.log(`Staged ${copied.length} file(s) into ${to}`);
}

function readSignatures(dir: string, names: readonly string[]): Record<string, string> {
  const signatures: Record<string, string> = {};
  for (const name of names) {
    if (!name.endsWith('.sig')) continue;
    signatures[name] = readFileSync(join(dir, name), 'utf8');
  }
  return signatures;
}

function writeAndUploadManifest(
  releaseId: string,
  version: string,
  notes: string,
  assets: readonly ReleaseAsset[],
  signatures: Readonly<Record<string, string>>,
  requireDesktopPlatforms: boolean,
): void {
  const manifest = buildUpdaterManifest({
    version,
    notes,
    pubDate: new Date().toISOString(),
    assets,
    signatures,
    apiBase: apiBase(),
    repository: repository(),
  });
  const keys = Object.keys(manifest.platforms);
  if (keys.length === 0) {
    throw new Error('latest.json has no platforms. Updater signatures were not found.');
  }
  if (requireDesktopPlatforms) {
    const required = ['windows-x86_64', 'darwin-aarch64', 'darwin-x86_64'];
    const missing = required.filter((key) => !(key in manifest.platforms));
    if (missing.length > 0) {
      throw new Error(`latest.json is missing platform keys: ${missing.join(', ')}`);
    }
  }
  const path = join(tmpdir(), `docuhaim-latest-${releaseId}.json`);
  writeFileSync(path, `${JSON.stringify(manifest, null, 2)}\n`);
  uploadFile(releaseId, path, 'latest.json');
  console.log(`latest.json platforms: ${keys.sort().join(', ')}`);
}

function uploadAll(dir: string, releaseId: string, version: string, notesPath: string): void {
  const files = walkFiles(dir).filter((filePath) => isReleaseInstallerName(basename(filePath)));
  const names = files.map((filePath) => basename(filePath));
  const missing = missingInstallers(names);
  if (missing.length > 0) {
    throw new Error(`Refusing to upload a partial release. Missing:\n- ${missing.join('\n- ')}`);
  }
  for (const filePath of files) {
    uploadFile(releaseId, filePath, basename(filePath));
  }
  const assets = listReleaseAssets(releaseId);
  writeAndUploadManifest(
    releaseId,
    version,
    readFileSync(notesPath, 'utf8'),
    assets,
    readSignatures(dir, names),
    true,
  );
  console.log(`Uploaded ${names.length} installer file(s) plus latest.json`);
}

function downloadSignature(assetId: number): string {
  const repo = repository();
  return gh([
    'api',
    '-H',
    'Accept: application/octet-stream',
    `repos/${repo}/releases/assets/${assetId}`,
  ]);
}

function jsonOnly(releaseId: string, version: string, notesPath: string): void {
  const assets = listReleaseAssets(releaseId);
  const signatures: Record<string, string> = {};
  for (const asset of assets) {
    if (!asset.name.endsWith('.sig')) continue;
    const text = downloadSignature(asset.id);
    if (!text.includes('untrusted comment:')) {
      throw new Error(`Asset ${asset.name} is not a Tauri updater signature`);
    }
    signatures[asset.name] = text;
  }
  writeAndUploadManifest(releaseId, version, readFileSync(notesPath, 'utf8'), assets, signatures, false);
  console.log('Replaced latest.json without rebuilding installers');
}

function main(): void {
  const { command, args } = parseArgs(process.argv.slice(2));
  if (command === 'stage') {
    stage(requireArg(args, 'from'), requireArg(args, 'to'));
    return;
  }
  if (command === 'upload') {
    uploadAll(
      requireArg(args, 'dir'),
      requireArg(args, 'release-id'),
      requireArg(args, 'version'),
      requireArg(args, 'notes'),
    );
    return;
  }
  if (command === 'json-only') {
    jsonOnly(requireArg(args, 'release-id'), requireArg(args, 'version'), requireArg(args, 'notes'));
    return;
  }
  throw new Error('Usage: publishReleaseAssets.ts <stage|upload|json-only> [options]');
}

main();
