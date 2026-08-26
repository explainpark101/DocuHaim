#!/usr/bin/env bun
/**
 * Run Tauri Android CLI with JAVA_HOME / ANDROID_HOME / NDK_HOME set.
 * macOS often has /usr/bin/java stub without a JDK; Homebrew OpenJDK is keg-only.
 */

import { spawnSync } from 'node:child_process';
import { existsSync, readdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

function firstExisting(...paths: (string | undefined)[]): string {
  for (const p of paths) {
    if (p && existsSync(p)) return p;
  }
  return '';
}

const home = homedir();
const brewJavaHome = firstExisting(
  '/opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk/Contents/Home',
  '/opt/homebrew/opt/openjdk/libexec/openjdk.jdk/Contents/Home',
  '/usr/local/opt/openjdk@17/libexec/openjdk.jdk/Contents/Home',
);

const javaHome =
  (process.env.JAVA_HOME && existsSync(join(process.env.JAVA_HOME, 'bin', 'java'))
    ? process.env.JAVA_HOME
    : '') || brewJavaHome;

if (!javaHome) {
  console.error(
    'No JDK found. Install OpenJDK 17 (e.g. brew install openjdk@17) and re-run.',
  );
  process.exit(1);
}

const androidHome =
  process.env.ANDROID_HOME ||
  process.env.ANDROID_SDK_ROOT ||
  firstExisting(join(home, 'Library/Android/sdk'));

function resolveNdkHome(sdkRoot: string): string {
  if (process.env.NDK_HOME && existsSync(process.env.NDK_HOME)) {
    return process.env.NDK_HOME;
  }
  if (process.env.ANDROID_NDK_HOME && existsSync(process.env.ANDROID_NDK_HOME)) {
    return process.env.ANDROID_NDK_HOME;
  }
  if (!sdkRoot) return '';
  const preferred = join(sdkRoot, 'ndk/27.0.12077973');
  if (existsSync(preferred)) return preferred;
  const ndkRoot = join(sdkRoot, 'ndk');
  if (!existsSync(ndkRoot)) return '';
  try {
    const versions = readdirSync(ndkRoot)
      .map((name) => join(ndkRoot, name))
      .filter((p) => existsSync(join(p, 'source.properties')))
      .sort();
    return versions.at(-1) ?? '';
  } catch {
    return '';
  }
}

const ndkHome = resolveNdkHome(androidHome);

const env: NodeJS.ProcessEnv = {
  ...process.env,
  JAVA_HOME: javaHome,
  PATH: `${join(javaHome, 'bin')}:${process.env.PATH || ''}`,
};

if (androidHome) {
  env.ANDROID_HOME = androidHome;
  env.ANDROID_SDK_ROOT = androidHome;
}
if (ndkHome) {
  env.NDK_HOME = ndkHome;
  env.ANDROID_NDK_HOME = ndkHome;
}

const args = process.argv.slice(2);
if (!args.length) {
  console.error('Usage: bun scripts/tauri-android.ts <tauri android args...>');
  process.exit(1);
}

console.log(`JAVA_HOME=${javaHome}`);
if (androidHome) console.log(`ANDROID_HOME=${androidHome}`);
if (ndkHome) console.log(`NDK_HOME=${ndkHome}`);

const result = spawnSync('tauri', ['android', ...args], {
  env,
  stdio: 'inherit',
  shell: false,
});

process.exit(result.status ?? 1);
