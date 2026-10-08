import { useEffect, useState, type ComponentType } from 'react';
import Button from '@/components/Button';
import { IconCloud, IconFile } from '@/components/icons';
import Modal from '@/components/modals/Modal';
import type { NoteContentConflictChoice } from '@/utils/noteContentConflict';

export type NoteContentConflictModalProps = {
  isOpen: boolean;
  fileName: string;
  filePath: string;
  localText: string;
  serverText: string;
  localLabel?: string;
  serverLabel?: string;
  message?: string;
  theme?: 'light' | 'dark';
  onResolve: (choice: NoteContentConflictChoice) => void;
};

type DiffViewProps = {
  diffFile: unknown;
  diffViewMode?: number;
  diffViewTheme?: 'light' | 'dark';
  diffViewHighlight?: boolean;
  diffViewWrap?: boolean;
  diffViewFontSize?: number;
  className?: string;
};

type DiffBundle = {
  DiffView: ComponentType<DiffViewProps>;
  DiffModeEnum: { Split: number };
  diffFile: unknown;
};

/**
 * Per-note reload conflict: last-viewed (local) vs server/disk, git-diff Split view.
 */
export default function NoteContentConflictModal({
  isOpen,
  fileName,
  filePath,
  localText,
  serverText,
  localLabel = '마지막에 본 내용',
  serverLabel = '서버/디스크 내용',
  message,
  theme = 'light',
  onResolve,
}: NoteContentConflictModalProps) {
  const [diffBundle, setDiffBundle] = useState<DiffBundle | null>(null);
  const [diffError, setDiffError] = useState('');
  const [diffLoading, setDiffLoading] = useState(false);
  const displayName = fileName || filePath.split('/').filter(Boolean).pop() || filePath;

  useEffect(() => {
    if (!isOpen) {
      setDiffBundle(null);
      setDiffError('');
      setDiffLoading(false);
      return;
    }

    let cancelled = false;
    setDiffLoading(true);
    setDiffError('');
    setDiffBundle(null);

    void (async () => {
      try {
        await import('@git-diff-view/react/styles/diff-view.css');
        const [{ DiffView, DiffModeEnum, getLang }, { generateDiffFile }] =
          await Promise.all([
            import('@git-diff-view/react'),
            import('@git-diff-view/file'),
          ]);
        const lang = getLang(displayName) || 'plaintext';
        const file = generateDiffFile(
          localLabel,
          localText ?? '',
          serverLabel,
          serverText ?? '',
          lang,
          lang,
        );
        const viewTheme = theme === 'dark' ? 'dark' : 'light';
        file.initTheme(viewTheme);
        file.init();
        file.buildSplitDiffLines();
        if (cancelled) return;
        setDiffBundle({
          DiffView: DiffView as ComponentType<DiffViewProps>,
          DiffModeEnum,
          diffFile: file,
        });
      } catch (err) {
        if (!cancelled) {
          setDiffError(
            err instanceof Error ? err.message : 'Failed to build diff view',
          );
        }
      } finally {
        if (!cancelled) setDiffLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isOpen, localText, serverText, localLabel, serverLabel, displayName, theme]);

  const DiffViewComp = diffBundle?.DiffView;

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => onResolve('local')}
      contentClassName="max-w-5xl w-[min(96vw,56rem)] max-h-[min(92vh,720px)]"
      ignoreEnterInFields
      layoutKey="note-content-conflict"
    >
      <div className="flex min-h-0 max-h-[min(88vh,680px)] flex-1 flex-col">
        <header className="shrink-0 border-b border-gray-200 px-5 py-4 dark:border-odp-borderSoft">
          <h3 className="text-base font-bold text-gray-900 dark:text-odp-fgStrong">
            노트 내용이 달라졌습니다
          </h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-odp-muted">
            <span className="font-medium text-gray-800 dark:text-odp-fgStrong">
              {displayName}
            </span>
            {message
              ? ` — ${message}`
              : ' — 마지막으로 본 내용과 서버/디스크 버전이 다릅니다. 사용할 버전을 선택하세요.'}
          </p>
          {filePath && filePath !== displayName ? (
            <p className="mt-0.5 truncate text-xs text-gray-400 dark:text-odp-muted">
              {filePath}
            </p>
          ) : null}
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-3">
          <div className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-odp-borderSoft dark:bg-odp-bgSoft">
            <div className="sticky top-0 z-1 grid grid-cols-2 gap-0 border-b border-gray-200 bg-gray-50 text-[11px] font-semibold text-gray-600 dark:border-odp-borderSoft dark:bg-odp-bg/50 dark:text-odp-muted">
              <div className="truncate border-r border-gray-200 px-2.5 py-1.5 dark:border-odp-borderSoft">
                {localLabel}
              </div>
              <div className="truncate px-2.5 py-1.5">{serverLabel}</div>
            </div>
            {diffLoading ? (
              <p className="px-3 py-6 text-center text-xs text-gray-400">비교 준비 중…</p>
            ) : diffError ? (
              <p className="px-3 py-6 text-center text-xs text-rose-600 dark:text-rose-400">
                {diffError}
              </p>
            ) : DiffViewComp && diffBundle ? (
              <DiffViewComp
                diffFile={diffBundle.diffFile}
                diffViewMode={diffBundle.DiffModeEnum.Split}
                diffViewTheme={theme === 'dark' ? 'dark' : 'light'}
                diffViewHighlight
                diffViewWrap
                diffViewFontSize={12}
                className="min-w-0"
              />
            ) : (
              <p className="px-3 py-6 text-center text-xs text-gray-400">
                비교할 내용이 없습니다.
              </p>
            )}
          </div>
        </div>

        <footer className="flex shrink-0 flex-wrap justify-end gap-2 border-t border-gray-200 px-5 py-4 dark:border-odp-borderSoft">
          <Button type="button" variant="secondary" onClick={() => onResolve('local')}>
            <IconFile size={14} />
            마지막에 본 내용 사용
          </Button>
          <Button type="button" variant="primary" onClick={() => onResolve('server')}>
            <IconCloud size={14} />
            서버/디스크 버전 사용
          </Button>
        </footer>
      </div>
    </Modal>
  );
}
