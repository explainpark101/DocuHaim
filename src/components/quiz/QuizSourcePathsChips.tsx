import Button from '@/components/Button';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router';

export type QuizSourcePathsChipsLayout = 'chips' | 'dock';

type QuizSourcePathsChipsProps = {
  paths: string[];
  onRemove?: ((path: string) => void) | undefined;
  onOpenPicker?: (() => void) | undefined;
  label?: string;
  emptyHint?: string;
  layout?: QuizSourcePathsChipsLayout;
};

const DOCK_ROW_CLASS =
  'flex w-full items-center gap-2 rounded-lg border border-violet-200 bg-violet-50 px-2 py-1.5 text-[11px] text-violet-900 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-100';

const CHIP_CLASS =
  'inline-flex max-w-full items-center gap-1 rounded-full border border-violet-200 bg-violet-50 px-2 py-0.5 text-[11px] text-violet-900 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-100';

export default function QuizSourcePathsChips({
  paths,
  onRemove,
  onOpenPicker,
  label = '근거 문서',
  emptyHint = '선택된 근거 문서 없음',
  layout = 'chips',
}: QuizSourcePathsChipsProps) {
  const navigate = useNavigate();
  const isDock = layout === 'dock';

  return (
    <div className="space-y-1.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-semibold text-gray-700 dark:text-odp-fgStrong">
          {label}
        </span>
        {onOpenPicker ? (
          <Button type="button" variant="secondary" size="sm" onClick={onOpenPicker}>
            선택
          </Button>
        ) : null}
      </div>
      {paths.length === 0 ? (
        <p className="text-[11px] text-gray-500 dark:text-odp-muted">{emptyHint}</p>
      ) : (
        <ul className={isDock ? 'flex flex-col gap-1.5' : 'flex flex-wrap gap-1.5'}>
          {paths.map((p) => (
            <li key={p} className={isDock ? DOCK_ROW_CLASS : CHIP_CLASS}>
              <button
                type="button"
                className={
                  isDock
                    ? 'min-w-0 flex-1 truncate text-left hover:underline'
                    : 'min-w-0 truncate hover:underline'
                }
                onClick={() => navigate(`/view/${p}`)}
              >
                {p}
              </button>
              {onRemove ? (
                <button
                  type="button"
                  aria-label={`${p} 제거`}
                  className={
                    isDock
                      ? 'ml-auto shrink-0 rounded-md p-1.5 hover:bg-violet-200/80 dark:hover:bg-violet-900'
                      : 'shrink-0 rounded p-0.5 hover:bg-violet-200/80 dark:hover:bg-violet-900'
                  }
                  onClick={() => onRemove(p)}
                >
                  <X size={isDock ? 14 : 12} />
                </button>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
