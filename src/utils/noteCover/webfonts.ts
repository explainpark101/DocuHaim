/**
 * Collect and embed webfont CSS used by note-cover text/shape elements.
 * Built-in faces come from `src/styles/builtin-webfonts.css` (same as app load).
 * User faces come from vault webfont settings cache.
 */
import builtinWebfontCss from '@/styles/builtin-webfonts.css?raw';
import { APP_BUILTIN_FONT_FAMILY_OPTIONS } from '@/utils/fontOptions';
import {
  extractFontFamilyNamesFromCss,
  getCachedWebfontSettings,
} from '@/utils/webfontSettingsStore';
import type { NoteCover, NoteCoverWebfont } from '@/utils/noteCover/types';
import { isCoverShapeElement } from '@/utils/noteCover/types';

const FONT_FACE_RE = /@font-face\s*\{[\s\S]*?\}/gi;

/** First family token from a CSS font-family value (`"Paperozi", sans-serif` → Paperozi). */
export function primaryFontFamilyName(value: string | null | undefined): string {
  const raw = String(value || '').trim();
  if (!raw) return '';
  let name = raw.split(',')[0]?.trim() ?? '';
  name = name.replace(/^['"]+|['"]+$/g, '').trim();
  return name;
}

/** Unique primary font-family names referenced by cover text/shape elements. */
export function collectCoverFontFamilies(cover: NoteCover): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const el of cover.elements) {
    if (el.type !== 'text' && !isCoverShapeElement(el)) continue;
    const family = primaryFontFamilyName(el.fontFamily);
    if (!family) continue;
    const key = family.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(family);
  }
  return out;
}

function normalizeFamilyKey(name: string): string {
  return name.trim().toLowerCase();
}

function extractFontFaceBlocksForFamily(css: string, family: string): string {
  const key = normalizeFamilyKey(family);
  if (!key || !css) return '';
  const blocks: string[] = [];
  const re = new RegExp(FONT_FACE_RE.source, 'gi');
  let match: RegExpExecArray | null;
  while ((match = re.exec(css)) !== null) {
    const block = match[0] ?? '';
    const fam = /font-family\s*:\s*([^;]+)/i.exec(block);
    if (!fam?.[1]) continue;
    const declared = primaryFontFamilyName(fam[1]);
    if (normalizeFamilyKey(declared) === key) {
      blocks.push(block.trim());
    }
  }
  return blocks.join('\n\n');
}

function isBuiltinFamily(family: string): boolean {
  const key = normalizeFamilyKey(family);
  return APP_BUILTIN_FONT_FAMILY_OPTIONS.some((name) => normalizeFamilyKey(name) === key);
}

function resolveBuiltinCss(family: string): string {
  return extractFontFaceBlocksForFamily(builtinWebfontCss, family);
}

function resolveUserCss(family: string): string {
  const settings = getCachedWebfontSettings();
  for (const file of settings.files) {
    const names = extractFontFamilyNamesFromCss(file.css || '');
    if (names.some((n) => normalizeFamilyKey(n) === normalizeFamilyKey(family))) {
      return String(file.css || '').trim();
    }
  }
  return extractFontFaceBlocksForFamily(settings.css || '', family);
}

/** Build portable webfont entries for the given family names. */
export function buildCoverWebfontEntries(families: readonly string[]): NoteCoverWebfont[] {
  const out: NoteCoverWebfont[] = [];
  const seen = new Set<string>();
  for (const raw of families) {
    const family = primaryFontFamilyName(raw);
    if (!family) continue;
    const key = normalizeFamilyKey(family);
    if (seen.has(key)) continue;
    seen.add(key);

    if (isBuiltinFamily(family)) {
      const css = resolveBuiltinCss(family);
      if (css) out.push({ family, css, source: 'builtin' });
      continue;
    }

    const userCss = resolveUserCss(family);
    if (userCss) {
      out.push({ family, css: userCss, source: 'user' });
    }
  }
  return out;
}

/**
 * Refresh `cover.webfonts` from element font-family usage.
 * Omits the field when nothing is resolved (keeps JSON smaller).
 */
export function syncNoteCoverWebfonts(cover: NoteCover): NoteCover {
  const families = collectCoverFontFamilies(cover);
  const webfonts = buildCoverWebfontEntries(families);
  if (!webfonts.length) {
    if (!cover.webfonts?.length) return cover;
    const { webfonts: _drop, ...rest } = cover;
    return rest;
  }
  return { ...cover, webfonts };
}

/** Join webfont CSS for `<style>` injection while rendering a cover. */
export function joinNoteCoverWebfontCss(webfonts: readonly NoteCoverWebfont[] | null | undefined): string {
  if (!webfonts?.length) return '';
  return webfonts
    .map((entry) => String(entry.css || '').trim())
    .filter(Boolean)
    .join('\n\n');
}
