import { useEffect, useMemo, useState } from 'react';
import { Columns2, Eye, FileCode } from 'lucide-react';
import MonacoTextEditor from '@/components/editor/MonacoTextEditor';
import TocResizeHandle from '@/components/print/TocResizeHandle';
import Button from '@/components/Button';
import { useResizablePanelWidth } from '@/hooks/useResizablePanelWidth';

const VIEW_MODES = ['dual', 'editor', 'preview'] as const;
type ViewMode = (typeof VIEW_MODES)[number];
const PREVIEW_WIDTH_KEY = 's3haim_html_svg_preview_width';
const PREVIEW_DEBOUNCE_MS = 280;

function wrapSvgForPreview(svgSource: any, theme: any) {
  const bg = theme === 'dark' ? '#0f1419' : '#ffffff';
  const fg = theme === 'dark' ? '#e7e9ea' : '#111827';
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<style>
  html, body {
    margin: 0;
    width: 100%;
    height: 100%;
    background: ${bg};
    color: ${fg};
  }
  body {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: auto;
    box-sizing: border-box;
    padding: 1rem;
  }
  body > svg {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
  }
</style>
</head>
<body>${svgSource ?? ''}</body>
</html>`;
}

function buildSrcDoc(value: any, mode: any, theme: any) {
  if (mode === 'svg') return wrapSvgForPreview(value, theme);
  return value ?? '';
}

const VIEW_MODE_META: Record<ViewMode, { label: string; icon: typeof Columns2; title: string }> = {
  dual: { label: '양면보기', icon: Columns2, title: '양면보기 (다음: 텍스트에디터)' },
  editor: { label: '텍스트에디터', icon: FileCode, title: '텍스트에디터 (다음: 미리보기)' },
  preview: { label: '미리보기', icon: Eye, title: '미리보기 (다음: 양면보기)' },
};

/**
 * HTML / SVG editor with live iframe preview.
 * View mode cycles: dual -> editor -> preview.
 */
export default function HtmlSvgPreviewEditor({
  value = '',
  mode = 'html',
  theme = 'light',
  readOnly = false,
  onChange,
  onSave
}: any) {
  const [viewMode, setViewMode] = useState<ViewMode>('dual');
  const [srcDoc, setSrcDoc] = useState(() => buildSrcDoc(value, mode, theme));
  const {
    width: previewWidth,
    isResizing,
    handleProps,
  } = useResizablePanelWidth({
    storageKey: PREVIEW_WIDTH_KEY,
    defaultWidth: 480,
    minWidth: 200,
    maxWidth: 960,
    edge: 'right',
  });

  const language = mode === 'svg' ? 'xml' : 'html';
  const showEditor = viewMode === 'dual' || viewMode === 'editor';
  const showPreview = viewMode === 'dual' || viewMode === 'preview';

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSrcDoc(buildSrcDoc(value, mode, theme));
    }, PREVIEW_DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [value, mode, theme]);

  const cycleViewMode = () => {
    setViewMode((prev) => {
      const idx = VIEW_MODES.indexOf(prev);
      return VIEW_MODES[(idx + 1) % VIEW_MODES.length] ?? 'dual';
    });
  };

  const meta = VIEW_MODE_META[viewMode] ?? VIEW_MODE_META.dual;
  const ModeIcon = meta.icon;

  const iframeTitle = useMemo(
    () => (mode === 'svg' ? 'SVG preview' : 'HTML preview'),
    [mode],
  );

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden">
      <div
        className="flex shrink-0 items-center justify-between gap-2 border-b border-gray-200 bg-gray-50/90 px-3 py-1.5 dark:border-odp-borderSoft dark:bg-odp-bgSoft/90"
        role="toolbar"
        aria-label={mode === 'svg' ? 'SVG editor' : 'HTML editor'}
      >
        <span className="text-xs font-medium text-gray-600 dark:text-odp-muted">
          {mode === 'svg' ? 'SVG' : 'HTML'}
        </span>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={cycleViewMode}
          title={meta.title}
          aria-label={meta.title}
        >
          <ModeIcon size={14} aria-hidden />
          <span className="hidden sm:inline"> {meta.label}</span>
        </Button>
      </div>

      <div className="flex min-h-0 flex-1 overflow-hidden">
        {showEditor && (
          <div className="flex min-h-0 min-w-0 flex-1 flex-col p-2">
            <MonacoTextEditor
              value={value}
              language={language}
              theme={theme}
              readOnly={readOnly}
              onChange={onChange}
              onSave={onSave}
            />
          </div>
        )}

        {showEditor && showPreview && (
          <div
            className="relative shrink-0 border-l border-gray-200 dark:border-odp-borderSoft"
            style={{ width: previewWidth }}
          >
            <TocResizeHandle
              handleProps={handleProps}
              isResizing={isResizing}
              label="Resize preview panel"
            />
            <iframe
              title={iframeTitle}
              srcDoc={srcDoc}
              sandbox="allow-scripts allow-forms allow-modals"
              className="h-full w-full border-0 bg-white dark:bg-odp-bg"
            />
          </div>
        )}

        {!showEditor && showPreview && (
          <div className="min-h-0 min-w-0 flex-1 overflow-hidden">
            <iframe
              title={iframeTitle}
              srcDoc={srcDoc}
              sandbox="allow-scripts allow-forms allow-modals"
              className="h-full w-full border-0 bg-white dark:bg-odp-bg"
            />
          </div>
        )}
      </div>
    </div>
  );
}
