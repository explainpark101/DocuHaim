import { RefreshCw, Trash2 } from 'lucide-react';
import { RadioGroup } from 'radix-ui';
import Button from '@/components/Button';
import { formatByteSize } from '@/utils/llm/mlxVlmModelSizing';
import type { MlxVlmInstalledModel } from '@/utils/mlxVlmSettingsStore';

type MlxVlmInstalledModelsSectionProps = {
  models: MlxVlmInstalledModel[];
  selectedId: string;
  cacheBytesByModelId?: Record<string, number>;
  disabled?: boolean;
  deleteBusy?: boolean;
  scanBusy: boolean;
  isModelInUse: (modelId: string) => boolean;
  onRefresh: () => void;
  onSelect: (modelId: string) => void;
  onRequestDelete: (model: MlxVlmInstalledModel) => void;
};

export default function MlxVlmInstalledModelsSection({
  models,
  selectedId,
  cacheBytesByModelId = {},
  disabled = false,
  deleteBusy = false,
  scanBusy,
  isModelInUse,
  onRefresh,
  onSelect,
  onRequestDelete,
}: MlxVlmInstalledModelsSectionProps) {
  return (
    <>
      <div className="mb-2 flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5">
        <p className="text-[11px] text-gray-500 dark:text-odp-muted">
          서버 시작 시 사용할 모델을 선택하세요. 선택 해제하면 모델 없이 둘 수 있습니다.
        </p>
        <div className="flex flex-wrap items-center gap-1.5">
          {selectedId ? (
            <Button
              type="button"
              variant="tertiary"
              size="sm"
              disabled={disabled || deleteBusy}
              onClick={() => onSelect('')}
            >
              선택 해제
            </Button>
          ) : null}
          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={disabled || scanBusy || deleteBusy}
            onClick={onRefresh}
          >
            <RefreshCw size={14} className={scanBusy ? 'animate-spin' : ''} />
            Refresh
          </Button>
        </div>
      </div>

      {models.length === 0 ? (
        <p className="text-[11px] text-gray-500 dark:text-odp-muted">
          설치된 모델이 없습니다. 아래에서 Hugging Face 검색 또는 URL 붙여넣기로 추가하세요.
        </p>
      ) : (
        <RadioGroup.Root
          value={selectedId}
          onValueChange={onSelect}
          className="max-h-48 space-y-1.5 overflow-y-auto"
          disabled={disabled || deleteBusy}
        >
          {models.map((model) => {
            const inUse = isModelInUse(model.id);
            const cacheBytes =
              cacheBytesByModelId[model.id] ?? cacheBytesByModelId[model.repoId || ''] ?? 0;
            const sizeLabel =
              cacheBytes > 0
                ? formatByteSize(cacheBytes)
                : model.source === 'local'
                  ? null
                  : '—';
            return (
              <div
                key={model.id}
                className="flex items-start gap-2 rounded border border-gray-200 bg-white px-2.5 py-2 dark:border-odp-borderStrong dark:bg-odp-bgSoft"
              >
                <label className="flex min-w-0 flex-1 cursor-pointer items-start gap-2">
                  <RadioGroup.Item
                    value={model.id}
                    className="mt-0.5 size-3.5 shrink-0 rounded-full border border-gray-400 bg-white data-[state=checked]:border-emerald-500 data-[state=checked]:bg-emerald-500 dark:border-odp-borderSoft dark:bg-odp-bgSoft"
                    aria-label={model.id}
                  >
                    <RadioGroup.Indicator className="relative flex size-full items-center justify-center after:block after:size-1.5 after:rounded-full after:bg-white" />
                  </RadioGroup.Item>
                  <span className="min-w-0 text-[11px] leading-snug text-gray-700 dark:text-odp-fg">
                    <span className="block truncate font-medium">{model.id}</span>
                    <span className="text-gray-500 dark:text-odp-muted">
                      {model.source === 'local' ? 'local path' : 'Hugging Face cache'}
                      {sizeLabel ? ` · ${sizeLabel}` : ''}
                      {inUse ? ' · 서버 사용 중' : ''}
                    </span>
                  </span>
                </label>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  disabled={disabled || deleteBusy || inUse}
                  onClick={() => onRequestDelete(model)}
                  aria-label={`${model.id} 삭제`}
                  title={inUse ? '서버를 중지한 뒤 삭제할 수 있습니다.' : '모델 삭제'}
                  className="shrink-0 text-red-700 hover:text-red-800 dark:text-red-300 dark:hover:text-red-200"
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            );
          })}
        </RadioGroup.Root>
      )}
    </>
  );
}
