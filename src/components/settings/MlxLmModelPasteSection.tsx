import { Check, Link2, Loader2 } from 'lucide-react';
import Button from '@/components/Button';
import MlxLmModelResourceMeta from '@/components/settings/MlxLmModelResourceMeta';
import type { HfModelSearchHit } from '@/utils/mlxLmHuggingFace';

type MlxLmModelPasteSectionProps = {
  value: string;
  onChange: (value: string) => void;
  error: string;
  preview: HfModelSearchHit | null;
  previewBusy: boolean;
  disabled?: boolean;
  cliAvailable: boolean;
  downloadBusy: boolean;
  downloadProgressLabel?: string;
  isDownloaded?: boolean;
  onDownload: () => void;
};

export default function MlxLmModelPasteSection({
  value,
  onChange,
  error,
  preview,
  previewBusy,
  disabled = false,
  cliAvailable,
  downloadBusy,
  downloadProgressLabel = '',
  isDownloaded = false,
  onDownload,
}: MlxLmModelPasteSectionProps) {
  const buttonLabel =
    downloadBusy && downloadProgressLabel
      ? downloadProgressLabel
      : isDownloaded
        ? 'Downloaded'
        : 'Download';

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://huggingface.co/mlx-community/… or org/model"
          disabled={disabled}
          className="min-w-0 flex-1 rounded border px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft"
        />
        <Button
          type="button"
          variant={isDownloaded && !downloadBusy ? 'tertiary' : 'secondary'}
          size="sm"
          className={
            downloadBusy
              ? 'min-w-[9.5rem] font-mono tabular-nums'
              : isDownloaded
                ? 'text-emerald-700 dark:text-emerald-300'
                : undefined
          }
          disabled={disabled || !cliAvailable || downloadBusy || !value.trim()}
          onClick={onDownload}
        >
          {downloadBusy ? (
            <Loader2 size={14} className="animate-spin" />
          ) : isDownloaded ? (
            <Check size={14} />
          ) : (
            <Link2 size={14} />
          )}
          {buttonLabel}
        </Button>
      </div>
      {error ? (
        <p className="mt-1 text-[11px] text-red-600 dark:text-red-400">{error}</p>
      ) : null}
      {previewBusy ? (
        <p className="mt-1 text-[11px] text-gray-500 dark:text-odp-muted">모델 정보 불러오는 중…</p>
      ) : preview ? (
        <div className="mt-2 rounded border border-gray-200 bg-white px-2.5 py-2 dark:border-odp-borderStrong dark:bg-odp-bgSoft">
          <MlxLmModelResourceMeta hit={preview} />
        </div>
      ) : null}
    </>
  );
}
