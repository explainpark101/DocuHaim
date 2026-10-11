import { useEffect, useState, type ComponentType } from 'react';
import Button from '@/components/Button';
import { IconBack, IconCheck, IconHistory } from '@/components/icons';
import Modal from '@/components/modals/Modal';

export type VersionRestoreDiffModalProps = {
  isOpen: boolean;
  title?: string;
  fileLabel?: string;
  currentText: string;
  versionText: string;
  currentLabel?: string;
  versionLabel?: string;
  theme?: 'light' | 'dark';
  confirming?: boolean;
  /** preview: view-only chrome with optional restore; restore: confirm gate */
  mode?: 'restore' | 'preview';
  onCancel: () => void;
  onConfirm?: (() => void) | undefined;
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
  DiffView?: ComponentType<DiffViewProps>;
  DiffModeEnum?: { Split: number };
  diffFile: unknown;
  hasChanges: boolean;
};

function diffFileHasChanges(file: {
  additionLength?: number;
  deletionLength?: number;
}): boolean {
  return (
    (Number(file.additionLength) || 0) > 0 ||
    (Number(file.deletionLength) || 0) > 0
  );
}

function resolveDiffLang(fileLabel: string): string {
  const raw = String(fileLabel || '').trim();
  const withExt = raw.includes('.') ? raw : `${raw || 'document'}.md`;
  return withExt;
}

/**
 * Required gate before restoreVersion: show Split diff (current vs selected version).
 * Also used as version preview (mode="preview").
 */
export default function VersionRestoreDiffModal({
  isOpen,
  title,
  fileLabel = '',
  currentText,
  versionText,
  currentLabel = '현재',
  versionLabel = '선택한 버전',
  theme = 'light',
  confirming = false,
  mode = 'restore',
  onCancel,
  onConfirm,
}: VersionRestoreDiffModalProps) {
  const [diffBundle, setDiffBundle] = useState<DiffBundle | null>(null);
  const [diffError, setDiffError] = useState('');
  const [diffLoading, setDiffLoading] = useState(false);
  const displayName = fileLabel || 'document.md';
  const resolvedTitle =
    title || (mode === 'preview' ? '버전 미리보기' : '버전 복원 확인');
  const canRestore = typeof onConfirm === 'function';

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

    const left = String(currentText ?? '');
    const right = String(versionText ?? '');

    void (async () => {
      try {
        // Fast path: identical strings → skip heavy DiffView build.
        if (left === right) {
          if (!cancelled) {
            setDiffBundle({ diffFile: null, hasChanges: false });
          }
          return;
        }

        await import('@git-diff-view/react/styles/diff-view.css');
        const [{ DiffView, DiffModeEnum, getLang }, { generateDiffFile }] =
          await Promise.all([
            import('@git-diff-view/react'),
            import('@git-diff-view/file'),
          ]);
        const langName = resolveDiffLang(displayName);
        const lang = getLang(langName) || 'md';
        // Use real-ish filenames for language/heuristics; UI labels stay in sticky header.
        const file = generateDiffFile(
          langName,
          left,
          langName,
          right,
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
          hasChanges: diffFileHasChanges(file),
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
  }, [
    isOpen,
    currentText,
    versionText,
    displayName,
    theme,
  ]);

  const DiffViewComp = diffBundle?.DiffView;
  const diffModeSplit = diffBundle?.DiffModeEnum?.Split;

  return (
    <Modal
      isOpen={isOpen}
      onClose={confirming ? undefined : onCancel}
      contentClassName="max-w-5xl h-[80vh] max-h-[80vh] w-[min(96vw,56rem)]"
      overlayClassName="z-100010"
      ignoreEnterInFields
      resizeHeight
      layoutKey="version-restore-diff"
    >
      <div className="flex min-h-0 flex-1 flex-col">
        <header className="shrink-0 border-b border-gray-200 px-5 py-4 dark:border-odp-borderSoft">
          <h3 className="flex items-center gap-2 text-base font-bold text-gray-900 dark:text-odp-fgStrong">
            <IconHistory size={16} />
            {resolvedTitle}
          </h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-odp-muted">
            {mode === 'preview'
              ? '현재 내용과 선택한 버전의 차이를 확인합니다.'
              : '차이를 확인한 뒤 선택한 버전으로 복원합니다.'}
            {fileLabel ? (
              <>
                {' '}
                <span className="font-medium text-gray-800 dark:text-odp-fgStrong">
                  {fileLabel}
                </span>
              </>
            ) : null}
          </p>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-3">
          <div className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-odp-borderSoft dark:bg-odp-bgSoft">
            <div className="sticky top-0 z-1 grid grid-cols-2 gap-0 border-b border-gray-200 bg-gray-50 text-[11px] font-semibold text-gray-600 dark:border-odp-borderSoft dark:bg-odp-bg/50 dark:text-odp-muted">
              <div className="truncate border-r border-gray-200 px-2.5 py-1.5 dark:border-odp-borderSoft">
                {currentLabel}
              </div>
              <div className="truncate px-2.5 py-1.5">{versionLabel}</div>
            </div>
            {diffLoading ? (
              <p className="px-3 py-6 text-center text-xs text-gray-400">
                비교 준비 중…
              </p>
            ) : diffError ? (
              <p className="px-3 py-6 text-center text-xs text-rose-600 dark:text-rose-400">
                {diffError}
              </p>
            ) : diffBundle && !diffBundle.hasChanges ? (
              <div className="flex flex-col items-center justify-center gap-1 px-3 py-10 text-center">
                <p className="text-sm font-semibold text-gray-700 dark:text-odp-fgStrong">
                  변경사항 없음
                </p>
                <p className="text-xs text-gray-500 dark:text-odp-muted">
                  현재 내용과 선택한 버전이 같습니다.
                </p>
              </div>
            ) : DiffViewComp &&
              diffBundle?.diffFile &&
              typeof diffModeSplit === 'number' ? (
              <div className="min-w-0 overflow-x-auto">
                <DiffViewComp
                  diffFile={diffBundle.diffFile}
                  diffViewMode={diffModeSplit}
                  diffViewTheme={theme === 'dark' ? 'dark' : 'light'}
                  diffViewHighlight
                  diffViewWrap
                  diffViewFontSize={12}
                  className="min-w-0"
                />
              </div>
            ) : (
              <p className="px-3 py-6 text-center text-xs text-gray-400">
                비교할 내용이 없습니다.
              </p>
            )}
          </div>
        </div>

        <footer className="flex shrink-0 flex-wrap justify-end gap-2 border-t border-gray-200 px-5 py-4 dark:border-odp-borderSoft">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={confirming}
          >
            <IconBack size={14} />
            {mode === 'preview' ? '닫기' : '취소'}
          </Button>
          {canRestore && onConfirm ? (
            <Button
              type="button"
              variant="primary"
              onClick={onConfirm}
              disabled={confirming || diffLoading || Boolean(diffError)}
            >
              <IconCheck size={14} />
              {confirming ? '복원 중…' : '이 버전으로 복원'}
            </Button>
          ) : null}
        </footer>
      </div>
    </Modal>
  );
}
