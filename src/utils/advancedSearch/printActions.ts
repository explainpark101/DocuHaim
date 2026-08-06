/**
 * Bridge: ExportPDFPage registers print toolbar / TOC actions for Advanced Search.
 */

import {
  PRINT_PAGE_SIZES,
  type PrintPageSizeId,
} from '@/utils/printPageLayout';
import { scoreFuzzyRelevance } from './fuzzyMatch';

export type PrintToolbarFocusTarget =
  | 'back'
  | 'font'
  | 'toc'
  | 'save'
  | 'export'
  | 'paper'
  | 'image-max';

export type PrintActionId =
  | 'print-save'
  | 'print-font-settings'
  | 'print-export'
  | 'print-change-paper'
  | 'print-toggle-toc'
  | 'print-focus-back'
  | 'print-focus-font'
  | 'print-focus-toc'
  | 'print-focus-save'
  | 'print-focus-export'
  | 'print-focus-paper'
  | 'print-focus-image-max'
  | 'print-scroll-heading'
  | `print-paper-${PrintPageSizeId}`;

export type PrintActionHandler = () => void | Promise<void>;

export type PrintTocEntry = {
  id: string;
  text: string;
  level: number;
};

type Listener = () => void;

const handlers = new Map<PrintActionId, PrintActionHandler>();
const listeners = new Set<Listener>();
let tocProvider: (() => PrintTocEntry[]) | null = null;

function notify(): void {
  for (const l of listeners) {
    try {
      l();
    } catch {
      // ignore
    }
  }
}

export function registerPrintActions(
  next: Partial<Record<PrintActionId, PrintActionHandler>>,
): () => void {
  const keys = Object.keys(next) as PrintActionId[];
  for (const key of keys) {
    const fn = next[key];
    if (typeof fn === 'function') handlers.set(key, fn);
  }
  notify();
  return () => {
    for (const key of keys) handlers.delete(key);
    notify();
  };
}

/** Provide live TOC headings for Advanced Search (print page). */
export function registerPrintTocProvider(
  provider: (() => PrintTocEntry[]) | null,
): () => void {
  tocProvider = provider;
  notify();
  return () => {
    if (tocProvider === provider) tocProvider = null;
    notify();
  };
}

export function hasPrintActions(): boolean {
  return handlers.size > 0;
}

export function isPrintActionId(id: string | undefined | null): id is PrintActionId {
  return Boolean(id && (handlers.has(id as PrintActionId) || id.startsWith('print-paper-')));
}

export function runPrintAction(id: string): boolean {
  const fn = handlers.get(id as PrintActionId);
  if (!fn) return false;
  try {
    void fn();
    return true;
  } catch (err) {
    console.warn('[advancedSearch] print action failed', id, err);
    return false;
  }
}

export function subscribePrintActions(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Focus a print-page toolbar control marked with data-print-toolbar. */
export function focusPrintToolbar(target: PrintToolbarFocusTarget): void {
  const el = document.querySelector<HTMLElement>(
    `[data-print-toolbar="${target}"]`,
  );
  if (!el) return;
  el.focus();
  el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}

export function scrollPrintHeading(headingId: string): void {
  if (!headingId) return;
  const el = document.getElementById(headingId);
  if (!el) return;
  el.scrollIntoView({ block: 'start', behavior: 'smooth' });
}

export type PrintActionCommandDef = {
  id: PrintActionId;
  title: string;
  description: string;
  keywords: string[];
};

/** Top-level print commands (not individual paper sizes). */
export const PRINT_ACTION_COMMANDS: readonly PrintActionCommandDef[] = [
  {
    id: 'print-save',
    title: '저장',
    description: '인쇄 미리보기 변경사항을 노트에 저장',
    keywords: ['save', '저장', 'ctrl+s', 'cmd+s'],
  },
  {
    id: 'print-font-settings',
    title: '폰트 설정',
    description: '인쇄용 폰트 옵션 열기',
    keywords: ['font', 'fonts', '폰트', '글꼴', 'typography'],
  },
  {
    id: 'print-export',
    title: '내보내기 (인쇄)',
    description: '브라우저 인쇄 / PDF 내보내기 대화상자',
    keywords: ['export', 'print', '내보내기', '인쇄', 'pdf'],
  },
  {
    id: 'print-change-paper',
    title: '용지 종류 변경…',
    description: '용지 크기를 Advanced Search에서 선택',
    keywords: ['paper', 'page size', '용지', '용지 크기', 'a4', 'letter'],
  },
  {
    id: 'print-toggle-toc',
    title: '목차 패널 토글',
    description: '목차 사이드바 보이기/숨기기',
    keywords: ['toc', '목차', 'outline', 'sidebar'],
  },
  {
    id: 'print-focus-back',
    title: '뒤로 가기 버튼으로 포커스',
    description: '툴바 · 뒤로 가기',
    keywords: ['focus', 'back', '포커스', '뒤로'],
  },
  {
    id: 'print-focus-font',
    title: '폰트 설정 버튼으로 포커스',
    description: '툴바 · 폰트 설정',
    keywords: ['focus', 'font', '포커스', '폰트'],
  },
  {
    id: 'print-focus-toc',
    title: '목차 버튼으로 포커스',
    description: '툴바 · 목차',
    keywords: ['focus', 'toc', '포커스', '목차'],
  },
  {
    id: 'print-focus-save',
    title: '저장 버튼으로 포커스',
    description: '툴바 · 저장',
    keywords: ['focus', 'save', '포커스', '저장'],
  },
  {
    id: 'print-focus-export',
    title: '내보내기 버튼으로 포커스',
    description: '툴바 · 내보내기',
    keywords: ['focus', 'export', '포커스', '내보내기'],
  },
  {
    id: 'print-focus-paper',
    title: '용지 선택으로 포커스',
    description: '툴바 · 용지 크기',
    keywords: ['focus', 'paper', '포커스', '용지'],
  },
  {
    id: 'print-focus-image-max',
    title: '이미지 최대 크기로 포커스',
    description: '툴바 · 이미지 최대 너비/높이',
    keywords: ['focus', 'image', '포커스', '이미지'],
  },
] as const;

export function paperActionId(sizeId: PrintPageSizeId): PrintActionId {
  return `print-paper-${sizeId}`;
}

export function parsePaperActionId(id: string): PrintPageSizeId | null {
  if (!id.startsWith('print-paper-')) return null;
  const sizeId = id.slice('print-paper-'.length);
  return PRINT_PAGE_SIZES.some((s) => s.id === sizeId)
    ? (sizeId as PrintPageSizeId)
    : null;
}

/** Paper size choices for nested Advanced Search picker. */
export const PRINT_PAPER_SIZE_COMMANDS: readonly PrintActionCommandDef[] =
  PRINT_PAGE_SIZES.map((size) => ({
    id: paperActionId(size.id),
    title: size.label,
    description: `용지 ${size.label} (${size.widthMm}×${size.heightMm} mm)`,
    keywords: [
      size.id,
      size.label,
      'paper',
      'page',
      '용지',
      String(size.widthMm),
      String(size.heightMm),
    ],
  }));

/** Match TOC headings registered by the print page. */
export function matchPrintTocEntries(
  query: string,
  limit = 50,
): PrintTocEntry[] {
  const entries = tocProvider?.() ?? [];
  if (entries.length === 0) return [];
  const q = String(query || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
  if (!q) return entries.slice(0, limit);
  return entries
    .map((e) => ({
      entry: e,
      score: scoreFuzzyRelevance(`${e.text} h${e.level} ${e.id}`, q),
    }))
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((row) => row.entry)
    .slice(0, limit);
}
