export type ExportPdfToolPresentation = 'modal' | 'dock';

export type ExportPdfToolId = 'font' | 'chrome';

type Prefs = Record<ExportPdfToolId, ExportPdfToolPresentation>;

const STORAGE_KEY = 's3haim_export_pdf_tool_presentation';

const DEFAULT_PREFS: Prefs = {
  font: 'modal',
  chrome: 'modal',
};

function readPrefs(): Prefs {
  if (typeof window === 'undefined') return { ...DEFAULT_PREFS };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PREFS };
    const parsed = JSON.parse(raw) as Partial<Prefs>;
    return {
      font: parsed.font === 'dock' ? 'dock' : 'modal',
      chrome: parsed.chrome === 'dock' ? 'dock' : 'modal',
    };
  } catch {
    return { ...DEFAULT_PREFS };
  }
}

export function getExportPdfToolPresentation(tool: ExportPdfToolId): ExportPdfToolPresentation {
  return readPrefs()[tool];
}

export function setExportPdfToolPresentation(
  tool: ExportPdfToolId,
  presentation: ExportPdfToolPresentation,
): void {
  if (typeof window === 'undefined') return;
  try {
    const next = { ...readPrefs(), [tool]: presentation };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
}
