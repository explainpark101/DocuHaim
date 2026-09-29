#!/usr/bin/env bun
/**
 * Collect Tauri Android debug APKs (per-ABI + universal) into dist-android/
 * with stable GitHub Release asset names.
 *
 * Usage: bun scripts/collect-android-release-apks.mjs <semver>
 *
 * Expected Gradle outputs (Tauri / cargo-mobile2):
 *   app/build/outputs/apk/{flavor}/debug/app-{flavor}-debug.apk
 *   flavor: universal | arm64 | arm | x86 | x86_64
 */

import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { basename, join, relative } from 'node:path';

/** Map cargo-mobile2 `arch` flavor → Android ABI label used in asset names. */
const FLAVOR_TO_ABI = {
  universal: 'universal',
  arm64: 'arm64-v8a',
  arm: 'armeabi-v7a',
  x86: 'x86',
  x86_64: 'x86_64',
};

const EXPECTED_FLAVORS = ['universal', 'arm64', 'arm', 'x86', 'x86_64'];

function walkFiles(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walkFiles(p, out);
    else out.push(p);
  }
  return out;
}

function parseFlavor(fileName) {
  // app-universal-debug.apk | app-arm64-debug.apk | app-x86_64-debug.apk
  const m = /^app-(.+)-debug\.apk$/i.exec(fileName);
  return m ? m[1].toLowerCase() : null;
}

const version = (process.argv[2] || '').replace(/^v/, '').replace(/^android-v/, '');
if (!/^\d+\.\d+\.\d+([.-].*)?$/.test(version)) {
  console.error(`Usage: bun scripts/collect-android-release-apks.mjs <semver>`);
  console.error(`Invalid or missing version: ${process.argv[2] ?? '(none)'}`);
  process.exit(1);
}

const repoRoot = join(import.meta.dirname, '..');
const androidRoot = join(repoRoot, 'src-tauri', 'gen', 'android');
const outDir = join(repoRoot, 'dist-android');

mkdirSync(outDir, { recursive: true });

const apkFiles = walkFiles(androidRoot).filter((p) => p.toLowerCase().endsWith('.apk'));
if (apkFiles.length === 0) {
  console.error(`No APK found under ${relative(repoRoot, androidRoot)}`);
  process.exit(1);
}

/** @type {Map<string, { path: string, mtime: number }>} */
const byFlavor = new Map();
for (const path of apkFiles) {
  const flavor = parseFlavor(basename(path));
  if (!flavor || !(flavor in FLAVOR_TO_ABI)) {
    console.warn(`Skipping unrecognized APK name: ${basename(path)}`);
    continue;
  }
  const mtime = statSync(path).mtimeMs;
  const prev = byFlavor.get(flavor);
  if (!prev || mtime >= prev.mtime) {
    byFlavor.set(flavor, { path, mtime });
  }
}

if (!byFlavor.has('universal')) {
  console.error(
    'Missing universal APK (app-universal-debug.apk). Build without --split-per-abi as well.',
  );
  process.exit(1);
}

const missing = EXPECTED_FLAVORS.filter((f) => !byFlavor.has(f));
if (missing.length > 0) {
  console.error(`Missing ABI APK(s): ${missing.join(', ')}`);
  console.error(
    'Build both `tauri android build --debug --apk --split-per-abi` and `tauri android build --debug --apk`.',
  );
  process.exit(1);
}

const copied = [];
for (const flavor of EXPECTED_FLAVORS) {
  const entry = byFlavor.get(flavor);
  if (!entry) continue;
  const abi = FLAVOR_TO_ABI[flavor];
  const destName = `DocuHaim_${version}_${abi}-debug.apk`;
  const dest = join(outDir, destName);
  copyFileSync(entry.path, dest);
  const sizeMb = (statSync(dest).size / (1024 * 1024)).toFixed(1);
  console.log(`Copied ${relative(repoRoot, entry.path)} → ${destName} (${sizeMb} MB)`);
  copied.push(destName);
}

if (copied.length === 0) {
  console.error('No APKs copied');
  process.exit(1);
}

console.log(`Collected ${copied.length} APK(s) into dist-android/`);
