#!/usr/bin/env bun
/**
 * Wrapper around `tauri build`.
 *
 * Linux notes:
 * - NO_STRIP=true: linuxdeploy's bundled strip fails on modern ELF (.relr.dyn) on Arch.
 * - Seed patched linuxdeploy-plugin-gtk.sh: Arch gdk-pixbuf2 has no
 *   /usr/lib/gdk-pixbuf-2.0/2.10.0 loaders dir (built-in loaders).
 */
import { copyFileSync, mkdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const env = { ...process.env };
if (process.platform === 'linux' && env.NO_STRIP == null) {
  env.NO_STRIP = 'true';
}

if (process.platform === 'linux') {
  const here = dirname(fileURLToPath(import.meta.url));
  const patchedGtkPlugin = join(
    here,
    '..',
    'src-tauri',
    'linux',
    'linuxdeploy-plugin-gtk.sh',
  );
  const cacheDir = join(homedir(), '.cache', 'tauri');
  const dest = join(cacheDir, 'linuxdeploy-plugin-gtk.sh');
  try {
    mkdirSync(cacheDir, { recursive: true });
    copyFileSync(patchedGtkPlugin, dest);
  } catch (err) {
    console.error(
      `[tauri-build] Failed to seed patched linuxdeploy-plugin-gtk.sh into ${dest}.\n` +
        `If the cache is root-owned (from a prior sudo build), run:\n` +
        `  sudo chown -R "$USER:$USER" ~/.cache/tauri\n` +
        `Then retry. Original error: ${err instanceof Error ? err.message : err}`,
    );
    process.exit(1);
  }
}

const args = process.argv.slice(2);
const result = spawnSync('tauri', ['build', ...args], {
  stdio: 'inherit',
  env,
  shell: process.platform === 'win32',
});

process.exit(result.status ?? 1);
