import { RefreshCw } from 'lucide-react';
import { RadioGroup } from 'radix-ui';
import Button from '@/components/Button';
import type { MlxLmInstalledModel } from '@/utils/mlxLmSettingsStore';

type MlxLmInstalledModelsSectionProps = {
  models: MlxLmInstalledModel[];
  selectedId: string;
  disabled?: boolean;
  scanBusy: boolean;
  onRefresh: () => void;
  onSelect: (modelId: string) => void;
};

export default function MlxLmInstalledModelsSection({
  models,
  selectedId,
  disabled = false,
  scanBusy,
  onRefresh,
  onSelect,
}: MlxLmInstalledModelsSectionProps) {
  return (
    <>
      <div className="mb-2 flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5">
        <p className="text-[11px] text-gray-500 dark:text-odp-muted">
          서버 시작 시 사용할 모델을 선택하세요.
        </p>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={disabled || scanBusy}
          onClick={onRefresh}
        >
          <RefreshCw size={14} className={scanBusy ? 'animate-spin' : ''} />
          Refresh
        </Button>
      </div>

      {models.length === 0 ? (
        <p className="text-[11px] text-gray-500 dark:text-odp-muted">
          설치된 모델이 없습니다. 아래에서 Hugging Face 검색 또는 URL 붙여넣기로 추가하세요.
        </p>
      ) : (
        <RadioGroup.Root
          value={selectedId}
          onValueChange={onSelect}
          className="max-h-40 space-y-1.5 overflow-y-auto"
          disabled={disabled}
        >
          {models.map((model) => (
            <label
              key={model.id}
              className="flex cursor-pointer items-start gap-2 rounded border border-gray-200 bg-white px-2.5 py-2 dark:border-odp-borderStrong dark:bg-odp-bgSoft"
            >
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
                </span>
              </span>
            </label>
          ))}
        </RadioGroup.Root>
      )}
    </>
  );
}
