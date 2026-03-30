/**
 * electron-builder는 SVG 앱 아이콘을 쓰지 않음. public/vite.svg를 단일 소스로
 * build/icon.png(1024)를 생성해 buildResources에 둔다.
 */
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = fileURLToPath(new URL('..', import.meta.url));
const svgPath = path.join(root, 'public', 'vite.svg');
const outDir = path.join(root, 'build');
const outPath = path.join(outDir, 'icon.png');

await mkdir(outDir, { recursive: true });
await sharp(svgPath)
  .resize(1024, 1024, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile(outPath);
