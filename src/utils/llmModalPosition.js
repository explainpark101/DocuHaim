const POSITION_KEY = 's3haim-llm-modal-position';
const VISIBILITY_KEY = 's3haim-llm-modal-hidden';

const DEFAULT_POSITION = { leftVw: 55, topVh: 12 };

export function loadLlmModalPosition() {
  try {
    const raw = localStorage.getItem(POSITION_KEY);
    if (!raw) return { ...DEFAULT_POSITION };
    const parsed = JSON.parse(raw);
    const leftVw = Number(parsed?.leftVw);
    const topVh = Number(parsed?.topVh);
    if (!Number.isFinite(leftVw) || !Number.isFinite(topVh)) return { ...DEFAULT_POSITION };
    return {
      leftVw: Math.min(95, Math.max(0, leftVw)),
      topVh: Math.min(95, Math.max(0, topVh)),
    };
  } catch {
    return { ...DEFAULT_POSITION };
  }
}

export function saveLlmModalPosition({ leftVw, topVh }) {
  try {
    localStorage.setItem(
      POSITION_KEY,
      JSON.stringify({
        leftVw: Math.min(95, Math.max(0, leftVw)),
        topVh: Math.min(95, Math.max(0, topVh)),
      }),
    );
  } catch {
    // ignore
  }
}

export function loadLlmModalHidden() {
  try {
    return localStorage.getItem(VISIBILITY_KEY) === '1';
  } catch {
    return false;
  }
}

export function saveLlmModalHidden(hidden) {
  try {
    localStorage.setItem(VISIBILITY_KEY, hidden ? '1' : '0');
  } catch {
    // ignore
  }
}
