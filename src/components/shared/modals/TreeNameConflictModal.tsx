import { useEffect, useState, type ComponentType } from 'react';
import Modal from '@/components/shared/modals/Modal';
import type {
  TreeNameConflictAction,
  TreeNameConflictChoice,
  TreeNameConflictKind,
} from '@/utils/vault/treeNameConflict';

export type TreeNameConflictModalProps = {
  isOpen: boolean;
  name: string;
  renameAs: string;
  kind: TreeNameConflictKind;
  action: TreeNameConflictAction;
  existingText?: string | null;
  incomingText?: string | null;
  existingLabel?: string;
  incomingLabel?: string;
  binary?: boolean;
  truncated?: boolean;
  /** App light/dark theme for DiffView. */
  theme?: 'light' | 'dark';
  onResolve: (choice: TreeNameConflictChoice) => void;
};

function actionVerb(action: TreeNameConflictAction): string {
  if (action === 'copy') return '복제';
  if (action === 'upload') return '업로드';
  return '이동';
}

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
 * Same-name conflict: replace / rename / cancel.
 * Files: side-by-side compare via @git-diff-view/react Split DiffView.
 */
export default function TreeNameConflictModal({
  isOpen,
  name,
  renameAs,
  kind,
  action,
  existingText = null,
  incomingText = null,
  existingLabel = '대상에 있는 파일',
  incomingLabel = '가져올 파일',
  binary = false,
  truncated = false,
  theme = 'light',
  onResolve,
}: TreeNameConflictModalProps) {
  const [diffBundle, setDiffBundle] = useState<DiffBundle | null>(null);
  const [diffError, setDiffError] = useState('');
  const [diffLoading, setDiffLoading] = useState(false);
  const showCompare = kind === 'file';
  const existing = existingText ?? '';
  const incoming = incomingText ?? '';
  const canDiff =
    showCompare &&
    !binary &&
    !truncated &&
    existingText != null &&
    incomingText != null;

  useEffect(() => {
    if (!isOpen || !canDiff) {
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
        const lang = getLang(name) || 'plaintext';
        const oldName = existingLabel || name || 'existing';
        const newName = incomingLabel || name || 'incoming';
        const file = generateDiffFile(
          oldName,
          existing,
          newName,
          incoming,
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
            err instanceof Error ? err.message : '비교 뷰를 불러오지 못했습니다',
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
    canDiff,
    existing,
    incoming,
    existingLabel,
    incomingLabel,
    name,
    theme,
  ]);

  const verb = actionVerb(action);
  const kindLabel = kind === 'folder' ? '폴더' : '파일';
  const DiffViewComp = diffBundle?.DiffView;

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => onResolve('cancel')}
      contentClassName={
        showCompare
          ? 'max-w-5xl w-[min(96vw,56rem)] max-h-[min(92vh,720px)]'
          : 'max-w-md max-h-[90vh]'
      }
      ignoreEnterInFields
      layoutKey={showCompare ? 'compare' : 'simple'}
    >
      <div className="flex max-h-[min(88vh,680px)] flex-col gap-3 p-4">
        <div className="min-w-0">
          <h3 className="text-base font-bold text-gray-900 dark:text-odp-fgStrong">
            같은 이름의 {kindLabel}
          </h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-odp-muted">
            <span className="font-medium text-gray-800 dark:text-odp-fgStrong">
              &quot;{name}&quot;
            </span>
            이(가) 이미 있습니다. 덮어쓰거나 &quot;{renameAs}&quot;(으)로 이름을 바꿔{' '}
            {verb}할 수 있습니다.
          </p>
        </div>

        {showCompare ? (
          <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-2 overflow-hidden">
            {binary || truncated ? (
              <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900 dark:border-amber-800/60 dark:bg-amber-950/30 dark:text-amber-200">
                {truncated
                  ? '파일이 커서 텍스트 비교를 건너뜁니다.'
                  : '바이너리(또는 비교할 수 없는) 파일이라 텍스트 비교를 건너뜁니다.'}
              </div>
            ) : (
              <div className="min-h-0 min-w-0 flex-1 overflow-auto rounded-xl border border-gray-200 bg-white dark:border-odp-borderSoft dark:bg-odp-bgSoft">
                <div className="sticky top-0 z-1 grid grid-cols-2 gap-0 border-b border-gray-200 bg-gray-50 text-[11px] font-semibold text-gray-600 dark:border-odp-borderSoft dark:bg-odp-bg/50 dark:text-odp-muted">
                  <div className="truncate border-r border-gray-200 px-2.5 py-1.5 dark:border-odp-borderSoft">
                    {existingLabel}
                  </div>
                  <div className="truncate px-2.5 py-1.5">{incomingLabel}</div>
                </div>
                {diffLoading ? (
                  <p className="px-3 py-6 text-center text-xs text-gray-400">
                    비교 준비 중…
                  </p>
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
            )}
          </div>
        ) : null}

        <div className="flex flex-wrap justify-end gap-2 pt-1">
          <button
            type="button"
            onClick={() => onResolve('cancel')}
            className="rounded bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200 dark:bg-odp-bgSoft dark:text-odp-fgStrong dark:hover:bg-odp-focusBg"
          >
            취소
          </button>
          <button
            type="button"
            onClick={() => onResolve('rename')}
            className="rounded bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100 dark:bg-blue-950/40 dark:text-blue-300 dark:hover:bg-blue-900/40"
          >
            이름 바꿔 {verb}
          </button>
          <button
            type="button"
            onClick={() => onResolve('replace')}
            className="rounded bg-rose-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-500"
          >
            덮어쓰기
          </button>
        </div>
      </div>
    </Modal>
  );
}
