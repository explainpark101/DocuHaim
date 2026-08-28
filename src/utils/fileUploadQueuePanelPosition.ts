export type FileUploadQueuePanelPosition = {
  leftVw: number;
  topVh: number;
};

const STORAGE_KEY = 's3haim_file_upload_queue_panel_pos';

const DEFAULT_POSITION: FileUploadQueuePanelPosition = {
  leftVw: 58,
  topVh: 52,
};

export function hasStoredFileUploadQueuePanelPosition(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(STORAGE_KEY) != null;
  } catch {
    return false;
  }
}

export function loadFileUploadQueuePanelPosition(): FileUploadQueuePanelPosition {
  if (typeof window === 'undefined') return DEFAULT_POSITION;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_POSITION;
    const parsed = JSON.parse(raw) as Partial<FileUploadQueuePanelPosition>;
    const leftVw = Number(parsed.leftVw);
    const topVh = Number(parsed.topVh);
    if (!Number.isFinite(leftVw) || !Number.isFinite(topVh)) return DEFAULT_POSITION;
    return {
      leftVw: Math.min(92, Math.max(0, leftVw)),
      topVh: Math.min(90, Math.max(0, topVh)),
    };
  } catch {
    return DEFAULT_POSITION;
  }
}

/** Place the panel just above the status-bar upload trigger (first open). */
export function resolveAnchoredFileUploadQueuePanelPosition(
  anchor: DOMRect,
  panelHeightPx = 320,
): FileUploadQueuePanelPosition {
  const vw = window.innerWidth || 1;
  const vh = window.innerHeight || 1;
  const panelWidth = Math.min(vw * 0.92, 420);
  const gap = 8;
  const leftPx = Math.min(Math.max(8, anchor.left), Math.max(8, vw - panelWidth - 8));
  const topPx = Math.max(8, anchor.top - panelHeightPx - gap);
  return {
    leftVw: (leftPx / vw) * 100,
    topVh: (topPx / vh) * 100,
  };
}

export function saveFileUploadQueuePanelPosition(position: FileUploadQueuePanelPosition): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(position));
  } catch {
    // ignore quota / private mode
  }
}
