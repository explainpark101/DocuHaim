import type { LlmAssistEditorBounds } from '@/utils/llmAssistEditorBounds';

const POSITION_KEY = 's3haim-llm-modal-position';
const VISIBILITY_KEY = 's3haim-llm-modal-hidden';

export const LLM_MODAL_DEFAULT_WIDTH = 420;
export const LLM_MODAL_MIN_WIDTH = 280;
export const LLM_MODAL_MIN_HEIGHT = 240;
export const LLM_MODAL_DEFAULT_CONTENT_MAX = 560;
export const LLM_MODAL_HEADER_ESTIMATE = 44;

export type LlmModalLayout = {
  leftPx: number;
  topPx: number;
  widthPx: number;
  heightPx: number;
};

const DEFAULT_VW_VH = { leftVw: 55, topVh: 12 };

function readLegacyVwVh(): { leftVw: number; topVh: number } {
  try {
    const raw = localStorage.getItem(POSITION_KEY);
    if (!raw) return { ...DEFAULT_VW_VH };
    const parsed = JSON.parse(raw) as { leftVw?: unknown; topVh?: unknown };
    const leftVw = Number(parsed?.leftVw);
    const topVh = Number(parsed?.topVh);
    if (!Number.isFinite(leftVw) || !Number.isFinite(topVh)) return { ...DEFAULT_VW_VH };
    return {
      leftVw: Math.min(95, Math.max(0, leftVw)),
      topVh: Math.min(95, Math.max(0, topVh)),
    };
  } catch {
    return { ...DEFAULT_VW_VH };
  }
}

export function defaultLlmModalLayout(bounds: LlmAssistEditorBounds): LlmModalLayout {
  const vw = window.innerWidth || 1;
  const vh = window.innerHeight || 1;
  const legacy = readLegacyVwVh();
  const widthPx = Math.min(LLM_MODAL_DEFAULT_WIDTH, Math.max(LLM_MODAL_MIN_WIDTH, bounds.width - 16));
  const heightPx = Math.min(
    LLM_MODAL_HEADER_ESTIMATE + LLM_MODAL_DEFAULT_CONTENT_MAX,
    Math.max(LLM_MODAL_MIN_HEIGHT, bounds.height - 16),
  );
  const unclamped = {
    leftPx: (legacy.leftVw / 100) * vw,
    topPx: (legacy.topVh / 100) * vh,
    widthPx,
    heightPx,
  };
  return clampLlmModalLayout(unclamped, bounds);
}

export function clampLlmModalLayout(
  layout: LlmModalLayout,
  bounds: LlmAssistEditorBounds,
): LlmModalLayout {
  const maxWidth = Math.max(LLM_MODAL_MIN_WIDTH, bounds.width);
  const maxHeight = Math.max(LLM_MODAL_MIN_HEIGHT, bounds.height);
  const widthPx = Math.min(maxWidth, Math.max(LLM_MODAL_MIN_WIDTH, layout.widthPx));
  const heightPx = Math.min(maxHeight, Math.max(LLM_MODAL_MIN_HEIGHT, layout.heightPx));

  const maxLeft = bounds.right - widthPx;
  const maxTop = bounds.bottom - heightPx;
  const leftPx = Math.min(Math.max(bounds.left, layout.leftPx), Math.max(bounds.left, maxLeft));
  const topPx = Math.min(Math.max(bounds.top, layout.topPx), Math.max(bounds.top, maxTop));

  return {
    leftPx: Math.round(leftPx),
    topPx: Math.round(topPx),
    widthPx: Math.round(widthPx),
    heightPx: Math.round(heightPx),
  };
}

export function loadLlmModalLayout(bounds?: LlmAssistEditorBounds): LlmModalLayout {
  const resolvedBounds = bounds ?? {
    left: 8,
    top: 8,
    right: window.innerWidth - 8,
    bottom: window.innerHeight - 8,
    width: window.innerWidth - 16,
    height: window.innerHeight - 16,
  };

  try {
    const raw = localStorage.getItem(POSITION_KEY);
    if (!raw) return defaultLlmModalLayout(resolvedBounds);
    const parsed = JSON.parse(raw) as {
      leftPx?: unknown;
      topPx?: unknown;
      widthPx?: unknown;
      heightPx?: unknown;
      leftVw?: unknown;
      topVh?: unknown;
    };

    const hasPx =
      Number.isFinite(Number(parsed?.leftPx)) &&
      Number.isFinite(Number(parsed?.topPx)) &&
      Number.isFinite(Number(parsed?.widthPx)) &&
      Number.isFinite(Number(parsed?.heightPx));

    if (hasPx) {
      return clampLlmModalLayout(
        {
          leftPx: Number(parsed.leftPx),
          topPx: Number(parsed.topPx),
          widthPx: Number(parsed.widthPx),
          heightPx: Number(parsed.heightPx),
        },
        resolvedBounds,
      );
    }

    return defaultLlmModalLayout(resolvedBounds);
  } catch {
    return defaultLlmModalLayout(resolvedBounds);
  }
}

export function saveLlmModalLayout(layout: LlmModalLayout, bounds?: LlmAssistEditorBounds) {
  const resolvedBounds = bounds ?? {
    left: 8,
    top: 8,
    right: window.innerWidth - 8,
    bottom: window.innerHeight - 8,
    width: window.innerWidth - 16,
    height: window.innerHeight - 16,
  };
  const clamped = clampLlmModalLayout(layout, resolvedBounds);
  try {
    localStorage.setItem(POSITION_KEY, JSON.stringify(clamped));
  } catch {
    // ignore
  }
}

export function loadLlmModalHidden(): boolean {
  try {
    return localStorage.getItem(VISIBILITY_KEY) === '1';
  } catch {
    return false;
  }
}

export function saveLlmModalHidden(hidden: boolean) {
  try {
    localStorage.setItem(VISIBILITY_KEY, hidden ? '1' : '0');
  } catch {
    // ignore
  }
}

// Backward-compatible chip position (vw/vh).
export function loadLlmModalChipPosition(): { leftVw: number; topVh: number } {
  const layout = loadLlmModalLayout();
  const vw = window.innerWidth || 1;
  const vh = window.innerHeight || 1;
  return {
    leftVw: Math.min(95, Math.max(0, (layout.leftPx / vw) * 100)),
    topVh: Math.min(95, Math.max(0, (layout.topPx / vh) * 100)),
  };
}

export function saveLlmModalChipPosition({ leftVw, topVh }: { leftVw: number; topVh: number }) {
  const vw = window.innerWidth || 1;
  const vh = window.innerHeight || 1;
  const current = loadLlmModalLayout();
  saveLlmModalLayout({
    ...current,
    leftPx: (leftVw / 100) * vw,
    topPx: (topVh / 100) * vh,
  });
}
