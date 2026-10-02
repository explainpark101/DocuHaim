#!/usr/bin/env bun
/**
 * Regenerate Android adaptive + legacy launcher icons with a proper safe zone.
 *
 * Adaptive icons crop aggressively; content must sit in ~66% of the 108dp canvas.
 * Default `tauri icon` output fills ~90% and looks oversized / clipped on launchers.
 *
 * Writes:
 *   src-tauri/icons/android/**
 *   src-tauri/gen/android/app/src/main/res/** (when present)
 */

import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, '..');
const sourceIcon = join(repoRoot, 'src-tauri', 'icons', 'icon.png');
const iconsAndroid = join(repoRoot, 'src-tauri', 'icons', 'android');
const genRes = join(repoRoot, 'src-tauri', 'gen', 'android', 'app', 'src', 'main', 'res');

/** Fraction of canvas used by foreground artwork (centered). */
const ADAPTIVE_CONTENT_SCALE = 0.62;
const BACKGROUND_HEX = '#FFFFFF';

/** density → { launcher, foreground } px */
const DENSITIES = {
  mdpi: { launcher: 48, foreground: 108 },
  hdpi: { launcher: 72, foreground: 162 },
  xhdpi: { launcher: 96, foreground: 216 },
  xxhdpi: { launcher: 144, foreground: 324 },
  xxxhdpi: { launcher: 192, foreground: 432 },
};

function ensureDir(path) {
  mkdirSync(path, { recursive: true });
}

async function makePaddedForeground(size) {
  const content = Math.max(1, Math.round(size * ADAPTIVE_CONTENT_SCALE));
  const offset = Math.round((size - content) / 2);
  const resized = await sharp(sourceIcon)
    .resize(content, content, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: resized, left: offset, top: offset }])
    .png()
    .toBuffer();
}

async function makeLegacyLauncher(size) {
  // Quiet margin so round masks do not crop the glyph.
  const content = Math.max(1, Math.round(size * 0.78));
  const offset = Math.round((size - content) / 2);
  const resized = await sharp(sourceIcon)
    .resize(content, content, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 255 },
    },
  })
    .composite([{ input: resized, left: offset, top: offset }])
    .png()
    .toBuffer();
}

async function writeDensity(baseResDir, density, sizes) {
  const dir = join(baseResDir, `mipmap-${density}`);
  ensureDir(dir);
  const fg = await makePaddedForeground(sizes.foreground);
  const launcher = await makeLegacyLauncher(sizes.launcher);
  await sharp(fg).toFile(join(dir, 'ic_launcher_foreground.png'));
  await sharp(launcher).toFile(join(dir, 'ic_launcher.png'));
  await sharp(launcher).toFile(join(dir, 'ic_launcher_round.png'));
}

function writeAdaptiveXml(baseResDir) {
  const anyDpi = join(baseResDir, 'mipmap-anydpi-v26');
  ensureDir(anyDpi);
  const xml = `<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
  <background android:drawable="@color/ic_launcher_background"/>
  <foreground android:drawable="@mipmap/ic_launcher_foreground"/>
</adaptive-icon>
`;
  writeFileSync(join(anyDpi, 'ic_launcher.xml'), xml);
  writeFileSync(join(anyDpi, 'ic_launcher_round.xml'), xml);
}

function writeBackgroundColorFile(baseResDir) {
  const valuesDir = join(baseResDir, 'values');
  ensureDir(valuesDir);
  writeFileSync(
    join(valuesDir, 'ic_launcher_background.xml'),
    `<?xml version="1.0" encoding="utf-8"?>
<resources>
  <color name="ic_launcher_background">${BACKGROUND_HEX}</color>
</resources>
`,
  );
}

function ensureGenColorsHaveBackground() {
  const colorsPath = join(genRes, 'values', 'colors.xml');
  if (!existsSync(colorsPath)) return;
  let xml = readFileSync(colorsPath, 'utf8');
  if (xml.includes('ic_launcher_background')) return;
  xml = xml.replace(
    '</resources>',
    `    <color name="ic_launcher_background">${BACKGROUND_HEX}</color>\n</resources>`,
  );
  writeFileSync(colorsPath, xml);
}

async function writeAllDensities(baseResDir) {
  for (const [density, sizes] of Object.entries(DENSITIES)) {
    await writeDensity(baseResDir, density, sizes);
  }
  writeAdaptiveXml(baseResDir);
  writeBackgroundColorFile(baseResDir);
}

if (!existsSync(sourceIcon)) {
  console.error(`Missing source icon: ${sourceIcon}`);
  process.exit(1);
}

await writeAllDensities(iconsAndroid);
console.log(`Wrote adaptive Android icons → ${iconsAndroid}`);

if (existsSync(dirname(genRes))) {
  await writeAllDensities(genRes);
  ensureGenColorsHaveBackground();
  // Drop default Android Studio vector placeholders that fight adaptive icons.
  for (const rel of [
    'drawable/ic_launcher_background.xml',
    'drawable-v24/ic_launcher_foreground.xml',
  ]) {
    const p = join(genRes, rel);
    if (existsSync(p)) {
      // Keep file but replace with empty transparent vector? Safer to leave;
      // adaptive mipmap-anydpi takes precedence for API 26+.
    }
  }
  console.log(`Synced icons → ${genRes}`);
} else {
  console.warn('gen/android res missing — skipped gen sync (run tauri android init first)');
}
