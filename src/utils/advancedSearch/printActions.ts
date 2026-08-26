/**
 * Bridge: ExportPDFPage registers print toolbar / TOC actions for Advanced Search.
 */

import {
  PRINT_PAGE_SIZES,
  type PrintPageSizeId,
} from '@/utils/print/printPageLayout';
import { scoreFuzzyRelevance } from '@/utils/advancedSearch/fuzzyMatch';

export type PrintToolbarFocusTarget =
  | 'back'
  | 'font'
  | 'toc'
  | 'save'
  | 'export'
  | 'paper'
  | 'image-max'
  | 'view-nav'
  | 'view-pages'
  | 'zoom'
  | 'first-page-single';

export type PrintActionId =
  | 'print-save'
  | 'print-font-settings'
  | 'print-export'
  | 'print-change-paper'
  | 'print-toggle-toc'
  | 'print-view-scroll'
  | 'print-view-flip'
  | 'print-view-pages-1'
  | 'print-view-pages-2'
  | 'print-toggle-first-page-single'
  | 'print-zoom-in'
  | 'print-zoom-out'
  | 'print-zoom-reset'
  | 'print-cover-place-text'
  | 'print-cover-place-rect'
  | 'print-cover-place-ellipse'
  | 'print-cover-font-size-up'
  | 'print-cover-font-size-down'
  | 'print-cover-text-align-left'
  | 'print-cover-text-align-center'
  | 'print-cover-text-align-right'
  | 'print-focus-back'
  | 'print-focus-font'
  | 'print-focus-toc'
  | 'print-focus-save'
  | 'print-focus-export'
  | 'print-focus-paper'
  | 'print-focus-image-max'
  | 'print-focus-view-nav'
  | 'print-focus-view-pages'
  | 'print-focus-zoom'
  | 'print-scroll-heading'
  | `print-paper-${PrintPageSizeId}`;

export type PrintActionHandler = () => void | Promise<void>;

export type PrintTocEntry = {
  id: string;
  text: string;
  level: number;
};

export type PrintPreviewNavigator = (opts: { headingId: string }) => void;

type Listener = () => void;

const handlers = new Map<PrintActionId, PrintActionHandler>();
const listeners = new Set<Listener>();
let tocProvider: (() => PrintTocEntry[]) | null = null;
let previewNavigator: PrintPreviewNavigator | null = null;

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

/** Navigate preview to a heading (flip/2-up aware). */
export function registerPrintPreviewNavigator(
  navigator: PrintPreviewNavigator | null,
): () => void {
  previewNavigator = navigator;
  return () => {
    if (previewNavigator === navigator) previewNavigator = null;
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
  if (previewNavigator) {
    previewNavigator({ headingId });
    return;
  }
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
    id: 'print-view-scroll',
    title: '미리보기: 스크롤',
    description: '미리보기 보기 방식을 스크롤로 설정',
    keywords: ['scroll', 'view', '스크롤', '보기', 'preview'],
  },
  {
    id: 'print-view-flip',
    title: '미리보기: 넘기기',
    description: '미리보기 보기 방식을 페이지 넘기기로 설정',
    keywords: ['flip', 'page', '넘기기', '보기', 'preview', 'spread'],
  },
  {
    id: 'print-view-pages-1',
    title: '미리보기: 1페이지',
    description: '미리보기를 한 페이지씩 표시',
    keywords: ['1 page', 'single', '1페이지', '보기'],
  },
  {
    id: 'print-view-pages-2',
    title: '미리보기: 2페이지',
    description: '미리보기를 두 페이지 펼침으로 표시',
    keywords: ['2 page', 'spread', '2페이지', '펼침', '보기'],
  },
  {
    id: 'print-toggle-first-page-single',
    title: '첫장 단면 토글',
    description: '2페이지 보기에서 첫 장을 단면으로 표시',
    keywords: ['first page', 'single', 'cover', '첫장', '단면'],
  },
  {
    id: 'print-zoom-in',
    title: '미리보기 확대',
    description: '미리보기 확대 비율 +5%',
    keywords: ['zoom in', '확대', 'zoom', '+'],
  },
  {
    id: 'print-zoom-out',
    title: '미리보기 축소',
    description: '미리보기 확대 비율 -5%',
    keywords: ['zoom out', '축소', 'zoom', '-'],
  },
  {
    id: 'print-zoom-reset',
    title: '미리보기 확대 100%',
    description: '미리보기 확대 비율을 100%로 초기화',
    keywords: ['zoom reset', '100%', '확대', '초기화'],
  },
  {
    id: 'print-cover-place-text',
    title: '표지: 텍스트 추가 (T)',
    description: '표지 편집에서 텍스트 상자 배치 모드',
    keywords: ['cover', '표지', 'text', '텍스트', 't', 'place', '추가'],
  },
  {
    id: 'print-cover-place-rect',
    title: '표지: 사각형 추가 (M)',
    description: '표지 편집에서 사각형 도형 배치 모드',
    keywords: ['cover', '표지', 'rect', 'rectangle', '사각형', '네모', 'm', 'shape', '도형'],
  },
  {
    id: 'print-cover-place-ellipse',
    title: '표지: 타원 추가 (O)',
    description: '표지 편집에서 원/타원 도형 배치 모드',
    keywords: ['cover', '표지', 'ellipse', 'circle', '원', '타원', 'o', 'shape', '도형'],
  },
  {
    id: 'print-cover-font-size-up',
    title: '표지: 글자 크기 +1px',
    description: '선택 개체 글자 크기 키우기 (⌘/Ctrl+Shift+>)',
    keywords: ['cover', '표지', 'font', 'size', '글자', '크기', '크게', 'increase'],
  },
  {
    id: 'print-cover-font-size-down',
    title: '표지: 글자 크기 -1px',
    description: '선택 개체 글자 크기 줄이기 (⌘/Ctrl+Shift+<)',
    keywords: ['cover', '표지', 'font', 'size', '글자', '크기', '작게', 'decrease'],
  },
  {
    id: 'print-cover-text-align-left',
    title: '표지: 텍스트 왼쪽 정렬 (Alt+L)',
    description: '선택 텍스트·도형 가로 왼쪽 정렬',
    keywords: ['cover', '표지', 'align', 'left', '정렬', '왼쪽', 'alt+l'],
  },
  {
    id: 'print-cover-text-align-center',
    title: '표지: 텍스트 가운데 정렬 (Alt+M / Alt+E)',
    description: '선택 텍스트·도형 가로 가운데 정렬',
    keywords: ['cover', '표지', 'align', 'center', '정렬', '가운데', '중앙', 'alt+m', 'alt+e'],
  },
  {
    id: 'print-cover-text-align-right',
    title: '표지: 텍스트 오른쪽 정렬 (Alt+R)',
    description: '선택 텍스트·도형 가로 오른쪽 정렬',
    keywords: ['cover', '표지', 'align', 'right', '정렬', '오른쪽', 'alt+r'],
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
  {
    id: 'print-focus-view-nav',
    title: '보기(스크롤/넘기기)로 포커스',
    description: '툴바 · 미리보기 보기 방식',
    keywords: ['focus', 'view', 'scroll', 'flip', '포커스', '보기'],
  },
  {
    id: 'print-focus-view-pages',
    title: '페이지(1/2)로 포커스',
    description: '툴바 · 미리보기 페이지 수',
    keywords: ['focus', 'pages', '포커스', '페이지'],
  },
  {
    id: 'print-focus-zoom',
    title: '확대로 포커스',
    description: '툴바 · 미리보기 확대 비율',
    keywords: ['focus', 'zoom', '포커스', '확대'],
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
