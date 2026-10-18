/**
 * Build a Tauri updater latest.json from GitHub Release asset names.
 * Higher-priority signatures fill a platform key first and are not replaced,
 * so a later bundle cannot drop an earlier installer.
 */

export type ReleaseAsset = {
  id: number;
  name: string;
};

export type UpdaterPlatform = {
  signature: string;
  url: string;
};

export type UpdaterManifest = {
  version: string;
  notes: string;
  pub_date: string;
  platforms: Record<string, UpdaterPlatform>;
};

function hasSuffix(name: string, suffix: string): boolean {
  const lower = name.toLowerCase();
  return lower.endsWith(suffix) && !lower.endsWith(`${suffix}.sig`);
}

const REQUIRED_INSTALLERS: { label: string; test: (name: string) => boolean }[] = [
  { label: 'macOS DMG (*.dmg)', test: (name) => hasSuffix(name, '.dmg') },
  {
    label: 'macOS updater archive (*.app.tar.gz)',
    test: (name) => hasSuffix(name, '.app.tar.gz'),
  },
  {
    label: 'macOS updater signature (*.app.tar.gz.sig)',
    test: (name) => name.toLowerCase().endsWith('.app.tar.gz.sig'),
  },
  {
    label: 'Windows NSIS installer (*-setup.exe)',
    test: (name) => hasSuffix(name, '-setup.exe'),
  },
  {
    label: 'Windows NSIS signature (*-setup.exe.sig)',
    test: (name) => name.toLowerCase().endsWith('-setup.exe.sig'),
  },
  ...['arm64-v8a', 'armeabi-v7a', 'x86_64', 'x86', 'universal'].map((abi) => ({
    label: `Android ${abi} APK`,
    test: (name: string) => name.toLowerCase().endsWith(`_${abi}-debug.apk`),
  })),
];

export function missingInstallers(names: readonly string[]): string[] {
  return REQUIRED_INSTALLERS.filter((rule) => !names.some((name) => rule.test(name))).map(
    (rule) => rule.label,
  );
}

export function isReleaseInstallerName(name: string): boolean {
  const lower = name.toLowerCase();
  if (lower === 'latest.json') return false;
  return (
    lower.endsWith('.app.tar.gz') ||
    lower.endsWith('.app.tar.gz.sig') ||
    lower.endsWith('.dmg') ||
    lower.endsWith('-setup.exe') ||
    lower.endsWith('-setup.exe.sig') ||
    lower.endsWith('.nsis.zip') ||
    lower.endsWith('.nsis.zip.sig') ||
    lower.endsWith('.msi') ||
    lower.endsWith('.msi.sig') ||
    lower.endsWith('.msi.zip') ||
    lower.endsWith('.msi.zip.sig') ||
    lower.endsWith('.apk')
  );
}

type OsName = 'darwin' | 'windows';

type SignatureKind = {
  os: OsName;
  bundle: 'app' | 'nsis' | 'msi';
  priority: number;
};

function signatureKind(sigName: string): SignatureKind | null {
  const lower = sigName.toLowerCase();
  if (lower.endsWith('.app.tar.gz.sig')) return { os: 'darwin', bundle: 'app', priority: 100 };
  if (lower.endsWith('-setup.exe.sig')) return { os: 'windows', bundle: 'nsis', priority: 90 };
  if (lower.endsWith('.nsis.zip.sig')) return { os: 'windows', bundle: 'nsis', priority: 70 };
  if (lower.endsWith('.msi.sig')) return { os: 'windows', bundle: 'msi', priority: 50 };
  if (lower.endsWith('.msi.zip.sig')) return { os: 'windows', bundle: 'msi', priority: 40 };
  return null;
}

function archesFor(sigName: string, os: OsName): string[] {
  const lower = sigName.toLowerCase();
  if (os === 'darwin') {
    if (lower.includes('aarch64') || lower.includes('arm64')) return ['aarch64'];
    if (lower.includes('x86_64') || lower.includes('amd64') || lower.includes('x64')) return ['x86_64'];
    return ['aarch64', 'x86_64'];
  }
  if (lower.includes('aarch64') || lower.includes('arm64')) return ['aarch64'];
  if (lower.includes('x86_64') || lower.includes('amd64') || lower.includes('_x64')) return ['x86_64'];
  if (lower.includes('i686') || /(?:^|[_-])x86(?:[._-]|$)/.test(lower)) return ['i686'];
  return ['x86_64'];
}

function installerNameForSig(sigName: string): string {
  return sigName.slice(0, -'.sig'.length);
}

function assetUrl(apiBase: string, repository: string, assetId: number): string {
  const base = apiBase.replace(/\/$/, '');
  return `${base}/repos/${repository}/releases/assets/${assetId}`;
}

export function buildUpdaterManifest(options: {
  version: string;
  notes: string;
  pubDate: string;
  assets: readonly ReleaseAsset[];
  signatures: Readonly<Record<string, string>>;
  apiBase: string;
  repository: string;
}): UpdaterManifest {
  const byName = new Map(options.assets.map((asset) => [asset.name, asset]));
  const platforms: Record<string, UpdaterPlatform> = {};

  const ranked = Object.keys(options.signatures)
    .map((name) => ({ name, kind: signatureKind(name) }))
    .filter((entry): entry is { name: string; kind: SignatureKind } => entry.kind !== null)
    .sort((a, b) => b.kind.priority - a.kind.priority || a.name.localeCompare(b.name));

  for (const entry of ranked) {
    const signature = options.signatures[entry.name]?.trim();
    if (!signature) continue;
    const installer = byName.get(installerNameForSig(entry.name));
    if (!installer) continue;
    const url = assetUrl(options.apiBase, options.repository, installer.id);
    const platform: UpdaterPlatform = { signature, url };
    for (const arch of archesFor(entry.name, entry.kind.os)) {
      const primary = `${entry.kind.os}-${arch}`;
      const bundled = `${entry.kind.os}-${arch}-${entry.kind.bundle}`;
      if (!(primary in platforms)) platforms[primary] = platform;
      if (!(bundled in platforms)) platforms[bundled] = platform;
    }
  }

  return {
    version: options.version,
    notes: options.notes,
    pub_date: options.pubDate,
    platforms,
  };
}
