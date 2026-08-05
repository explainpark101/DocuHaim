import { spawn } from 'node:child_process';
import { access, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const HTML_PATH = path.join(ROOT, 'scripts', 'og-image.html');
const OUT_PATH = path.join(ROOT, 'public', 'og-image.png');
const WIDTH = 1200;
const HEIGHT = 630;
const SCALE = 2;

const CHROME_CANDIDATES = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
];

async function resolveChrome(): Promise<string> {
  for (const candidate of CHROME_CANDIDATES) {
    try {
      await access(candidate);
      return candidate;
    } catch {
      /* try next */
    }
  }
  throw new Error('Chrome or Edge not found for OG screenshot');
}

function run(command: string, args: string[], cwd: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd, stdio: 'inherit', windowsHide: true });
    child.on('error', reject);
    child.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${path.basename(command)} exited with ${code}`));
    });
  });
}

const chrome = await resolveChrome();
const fileUrl = pathToFileURL(HTML_PATH).href;

await run(
  chrome,
  [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--no-first-run',
    '--no-default-browser-check',
    `--force-device-scale-factor=${SCALE}`,
    `--window-size=${WIDTH},${HEIGHT}`,
    '--virtual-time-budget=8000',
    `--screenshot=${OUT_PATH}`,
    fileUrl,
  ],
  ROOT,
);

const targetW = WIDTH * SCALE;
const targetH = HEIGHT * SCALE;
const meta = await sharp(OUT_PATH).metadata();
const pipeline =
  meta.width !== targetW || meta.height !== targetH
    ? sharp(OUT_PATH).resize(targetW, targetH, { fit: 'cover', position: 'left top' })
    : sharp(OUT_PATH);

await writeFile(OUT_PATH, await pipeline.png({ compressionLevel: 9 }).toBuffer());

const finalMeta = await sharp(OUT_PATH).metadata();
console.log(`Wrote ${OUT_PATH} (${finalMeta.width}x${finalMeta.height})`);
