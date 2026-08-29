import { useCallback, useEffect, useState, type ComponentType } from 'react';
import { Eye, FileText, Loader2, PenLine, SquareArrowOutUpRight, X } from 'lucide-react';
import { Tooltip } from 'radix-ui';
import TocResizeHandleJs from '@/components/TocResizeHandle';
import { useResizablePanelWidth } from '@/hooks/useResizablePanelWidth';
import VaultDocumentPreviewBody, {
  isVaultDocumentPreviewEditable,
} from '@/components/shared/panels/VaultDocumentPreviewBody';
import type { VaultDocumentPreviewPayload } from '@/utils/vault/loadVaultDocumentPreview';
import { vaultPathBasename } from '@/utils/vault/vaultPathBasename';

const TocResizeHandle = TocResizeHandleJs as unknown as ComponentType<{
  edge?: 'left' | 'right';
  handleProps?: Record<string, unknown>;
  isResizing?: boolean;
  visibleOnHover?: boolean;
  label?: string;
}>;

const TOOLTIP_CONTENT_CLASS =
  'z-100001 max-w-[min(92vw,420px)] rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong';

export type VaultDocumentPreviewPanelProps = {
  path: string;
  onClose: () => void;
  loadDocument: (path: string) => Promise<VaultDocumentPreviewPayload | null>;
  onOpenDocument?: ((path: string) => void) | undefined;
  onOpenInNewTab?: ((path: string) => void) | undefined;
  /** When true, fills parent dock shell (width controlled externally). */
  embedded?: boolean;
  /** Parent-controlled width; skips internal resize state when provided with resizeHandleProps. */
  width?: number;
  resizeHandleProps?: Record<string, unknown>;
  isResizing?: boolean;
  /** Which edge shows the resize handle (default `right`). */
  resizeEdge?: 'left' | 'right';
};

export default function VaultDocumentPreviewPanel({
  path,
  onClose,
  loadDocument,
  onOpenDocument,
  onOpenInNewTab,
  embedded = false,
  width: controlledWidth,
  resizeHandleProps: controlledResizeHandleProps,
  isResizing: controlledIsResizing,
  resizeEdge = 'right',
}: VaultDocumentPreviewPanelProps) {
  const [payload, setPayload] = useState<VaultDocumentPreviewPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editContent, setEditContent] = useState('');

  const internalResize = useResizablePanelWidth({
    storageKey: embedded ? undefined : 'vault-document-preview-panel-width',
    defaultWidth: 400,
    minWidth: 280,
    maxWidth: 640,
    edge: resizeEdge === 'left' ? 'left' : 'right',
  });

  const width = controlledWidth ?? internalResize.width;
  const handleProps = controlledResizeHandleProps ?? internalResize.handleProps;
  const isResizing = controlledIsResizing ?? internalResize.isResizing;

  useEffect(() => {
    let cancelled = false;
    let revoke: (() => void) | undefined;

    setLoading(true);
    setError('');
    setEditMode(false);

    void (async () => {
      try {
        const result = await loadDocument(path);
        if (cancelled) {
          result?.revoke?.();
          return;
        }
        revoke = result?.revoke;
        setPayload(result);
        setEditContent(result?.content ?? '');
        if (!result) {
          setError('문서를 불러오지 못했습니다.');
        }
      } catch (err) {
        if (!cancelled) {
          setPayload(null);
          setEditContent('');
          setError(err instanceof Error ? err.message : '문서를 불러오지 못했습니다.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
      revoke?.();
    };
  }, [path, loadDocument]);

  const handleToggleEdit = useCallback(() => {
    setEditMode((prev) => !prev);
  }, []);

  const displayName = vaultPathBasename(path);
  const editable = payload ? isVaultDocumentPreviewEditable(payload.currentFile.viewer) : false;

  return (
    <aside
      className={`relative flex h-full flex-col overflow-hidden bg-white dark:bg-odp-surface ${
        embedded
          ? 'min-w-0'
          : 'shrink-0 border-r border-slate-200 dark:border-odp-borderSoft'
      }`}
      style={embedded ? undefined : { width }}
      aria-label="문서 미리보기"
    >
      <TocResizeHandle
        edge={resizeEdge}
        handleProps={handleProps}
        isResizing={isResizing}
        visibleOnHover
        label="미리보기 패널 너비 조절"
      />
      <div className="flex items-center gap-1 border-b border-slate-200 px-2 py-2 dark:border-odp-borderSoft">
        <Tooltip.Provider delayDuration={250} skipDelayDuration={0}>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <div className="min-w-0 flex-1 truncate px-1 text-xs font-semibold text-slate-800 dark:text-odp-fgStrong">
                {displayName}
              </div>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content side="bottom" sideOffset={6} className={TOOLTIP_CONTENT_CLASS}>
                {path}
                <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>

          {editable ? (
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button
                  type="button"
                  className="shrink-0 rounded p-1.5 text-slate-600 hover:bg-slate-100 dark:text-odp-muted dark:hover:bg-odp-focusBg"
                  aria-label={editMode ? '미리보기 모드' : '편집 모드'}
                  onClick={handleToggleEdit}
                >
                  {editMode ? <Eye size={15} /> : <PenLine size={15} />}
                </button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content side="bottom" sideOffset={6} className={TOOLTIP_CONTENT_CLASS}>
                  {editMode ? '미리보기 모드' : '편집 모드'}
                  <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          ) : null}

          {onOpenInNewTab ? (
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button
                  type="button"
                  className="shrink-0 rounded p-1.5 text-slate-600 hover:bg-slate-100 dark:text-odp-muted dark:hover:bg-odp-focusBg"
                  aria-label="새 탭으로 열기"
                  onClick={() => onOpenInNewTab(path)}
                >
                  <SquareArrowOutUpRight size={15} />
                </button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content side="bottom" sideOffset={6} className={TOOLTIP_CONTENT_CLASS}>
                  새 탭으로 열기
                  <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          ) : null}

          {onOpenDocument ? (
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button
                  type="button"
                  className="shrink-0 rounded p-1.5 text-slate-600 hover:bg-slate-100 dark:text-odp-muted dark:hover:bg-odp-focusBg"
                  aria-label="이 문서 열기"
                  onClick={() => onOpenDocument(path)}
                >
                  <FileText size={15} />
                </button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content side="bottom" sideOffset={6} className={TOOLTIP_CONTENT_CLASS}>
                  이 문서 열기
                  <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          ) : null}

          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button
                type="button"
                className="shrink-0 rounded p-1.5 text-slate-600 hover:bg-slate-100 dark:text-odp-muted dark:hover:bg-odp-focusBg"
                aria-label="미리보기 닫기"
                onClick={onClose}
              >
                <X size={15} />
              </button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content side="bottom" sideOffset={6} className={TOOLTIP_CONTENT_CLASS}>
                닫기
                <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex h-full items-center justify-center gap-2 p-6 text-xs text-slate-500 dark:text-odp-muted">
            <Loader2 size={16} className="animate-spin" aria-hidden />
            불러오는 중…
          </div>
        ) : error ? (
          <div className="p-4 text-sm text-rose-600 dark:text-rose-400">{error}</div>
        ) : payload ? (
          <VaultDocumentPreviewBody
            payload={payload}
            editMode={editMode}
            editContent={editContent}
            onEditContentChange={setEditContent}
          />
        ) : null}
      </div>
    </aside>
  );
}
