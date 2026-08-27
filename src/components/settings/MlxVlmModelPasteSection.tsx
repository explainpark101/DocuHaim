import Button from '@/components/Button';
import MlxVlmDownloadButtonContent from '@/components/settings/MlxVlmDownloadButtonContent';
import MlxVlmModelResourceMeta from '@/components/settings/MlxVlmModelResourceMeta';
import type { HfModelSearchHit } from '@/utils/mlxVlmHuggingFace';

type MlxVlmModelPasteSectionProps = {
  value: string;
  onChange: (value: string) => void;
  error: string;
  preview: HfModelSearchHit | null;
  previewBusy: boolean;
  disabled?: boolean;
  cliAvailable: boolean;
  downloadBusy: boolean;
  isActiveDownload?: boolean;
  isAborting?: boolean;
  downloadProgressLabel?: string;
  isDownloaded?: boolean;
  onDownload: () => void;
};

export default function MlxVlmModelPasteSection({
  value,
  onChange,
  error,
  preview,
  previewBusy,
  disabled = false,
  cliAvailable,
  downloadBusy,
  isActiveDownload = false,
  isAborting = false,
  downloadProgressLabel = '',
  isDownloaded = false,
  onDownload,
}: MlxVlmModelPasteSectionProps) {
  const isDownloading = isActiveDownload && !isAborting;
  const buttonMode = isAborting
    ? 'aborting'
    : isDownloading
      ? 'downloading'
      : isDownloaded
        ? 'downloaded'
        : 'download';

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
              ? 'min-w-[9.5rem] font-mono tabular-nums transition-none'
              : isDownloaded
                ? 'text-emerald-700 transition-none dark:text-emerald-300'
                : 'transition-none'
          }
          disabled={
            disabled ||
            !cliAvailable ||
            isAborting ||
            (downloadBusy && !isActiveDownload) ||
            !value.trim()
          }
          onClick={onDownload}
        >
          <MlxVlmDownloadButtonContent
            mode={buttonMode}
            progressLabel={isDownloading ? downloadProgressLabel : ''}
            paste
          />
        </Button>
      </div>
      {error ? (
        <p className="mt-1 text-[11px] text-red-600 dark:text-red-400">{error}</p>
      ) : null}
      {previewBusy ? (
        <p className="mt-1 text-[11px] text-gray-500 dark:text-odp-muted">모델 정보 불러오는 중…</p>
      ) : preview ? (
        <div className="mt-2 rounded border border-gray-200 bg-white px-2.5 py-2 dark:border-odp-borderStrong dark:bg-odp-bgSoft">
          <MlxVlmModelResourceMeta hit={preview} />
        </div>
      ) : null}
    </>
  );
}
