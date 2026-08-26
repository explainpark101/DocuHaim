const POSITION_KEY = 's3haim-checklist-progress-modal-position';

const DEFAULT_POSITION = { leftVw: 58, topVh: 14 };

export function loadChecklistProgressModalPosition() {
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

export function saveChecklistProgressModalPosition({
  leftVw,
  topVh
}: any) {
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
