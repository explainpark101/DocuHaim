import { useEffect, useMemo, useRef } from 'react';
import { FileSpreadsheet, Upload, X } from 'lucide-react';
import { RadioGroup } from 'radix-ui';
import {
  EXAONE_TABULAR_CLASSIFICATION_MODEL,
  type ExaoneTabularClassificationOutput,
  type ExaoneTabularRegressionOutput,
  type ExaoneTabularTask,
} from '@/utils/exaoneSettings';
import { settingsSectionCardClass } from '@/utils/settingsSectionCard';

export type ExaoneTabularAssistState = {
  trainFile: File | null;
  testFile: File | null;
  targetColumn: string;
  outputType: ExaoneTabularClassificationOutput | ExaoneTabularRegressionOutput;
};

type ExaoneTabularAssistFieldsProps = {
  modelId: string;
  value: ExaoneTabularAssistState;
  onChange: (next: ExaoneTabularAssistState) => void;
};

const RADIO_ITEM_CLASS =
  'size-3.5 rounded-full border border-gray-400 bg-white data-[state=checked]:border-violet-500 data-[state=checked]:bg-violet-500 dark:border-odp-borderSoft dark:bg-odp-bgSoft';
const RADIO_INDICATOR_CLASS =
  'relative flex size-full items-center justify-center after:block after:size-1.5 after:rounded-full after:bg-white';

function resolveTask(modelId: string): ExaoneTabularTask {
  return modelId === EXAONE_TABULAR_CLASSIFICATION_MODEL ? 'classification' : 'regression';
}

function FilePickRow({
  label,
  file,
  onPick,
  onClear,
}: {
  label: string;
  file: File | null;
  onPick: (file: File | null) => void;
  onClear: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="space-y-1">
      <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
        <span className="shrink-0 text-[11px] font-semibold text-gray-700 dark:text-odp-fgStrong">
          {label}
        </span>
        <div className="flex min-w-0 flex-wrap items-center justify-end gap-1">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="inline-flex items-center gap-1 rounded border border-gray-300 px-2 py-0.5 text-[11px] hover:bg-gray-50 dark:border-odp-borderStrong dark:hover:bg-odp-bgSoft"
          >
            <Upload size={12} aria-hidden />
            CSV 선택
          </button>
          <button
            type="button"
            onClick={onClear}
            disabled={!file}
            className="inline-flex items-center gap-1 rounded border border-gray-300 px-2 py-0.5 text-[11px] hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-odp-borderStrong dark:hover:bg-odp-bgSoft"
          >
            <X size={12} aria-hidden />
            지우기
          </button>
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept=".csv,text/csv"
        className="hidden"
        onChange={(e) => {
          const next = e.target.files?.[0] ?? null;
          onPick(next);
          e.target.value = '';
        }}
      />
      <p className="truncate rounded border border-dashed border-gray-300 bg-white/80 px-2 py-1.5 text-[11px] text-gray-600 dark:border-odp-borderSoft dark:bg-odp-bgSoft/60 dark:text-odp-muted">
        {file ? `${file.name} · ${(file.size / 1024).toFixed(1)} KB` : '선택된 파일 없음'}
      </p>
    </div>
  );
}

export function createDefaultExaoneTabularAssistState(
  task: ExaoneTabularTask = 'classification',
): ExaoneTabularAssistState {
  return {
    trainFile: null,
    testFile: null,
    targetColumn: 'target',
    outputType: task === 'classification' ? 'class' : 'point',
  };
}

export default function ExaoneTabularAssistFields({
  modelId,
  value,
  onChange,
}: ExaoneTabularAssistFieldsProps) {
  const task = useMemo(() => resolveTask(modelId), [modelId]);
  const outputOptions =
    task === 'classification'
      ? ([
          { value: 'class', label: 'class (라벨)' },
          { value: 'probability', label: 'probability (확률)' },
        ] as const)
      : ([
          { value: 'point', label: 'point (점 예측)' },
          { value: 'full', label: 'full (분위수 분포)' },
        ] as const);

  useEffect(() => {
    const allowed =
      task === 'classification'
        ? new Set(['class', 'probability'])
        : new Set(['point', 'full']);
    if (allowed.has(value.outputType)) return;
    onChange({
      ...value,
      outputType: task === 'classification' ? 'class' : 'point',
    });
    // Intentionally sync only when task/outputType pair is invalid.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- avoid re-running on every file pick
  }, [onChange, task, value.outputType]);

  return (
    <div className="space-y-2.5">
      <section
        className={settingsSectionCardClass('sky', { compact: true })}
        aria-label="EXAONE Tabular CSV"
      >
        <div className="flex items-start gap-2">
          <FileSpreadsheet
            size={14}
            className="mt-0.5 shrink-0 text-sky-700 dark:text-sky-300"
            aria-hidden
          />
          <div className="min-w-0 space-y-1">
            <p className="text-[11px] font-semibold text-sky-950 dark:text-sky-100">
              EXAONE Tabular · {task}
            </p>
            <p className="text-[10px] leading-snug text-sky-900/80 dark:text-sky-100/80">
              학습 CSV와 예측 CSV를 업로드합니다. Bearer API 키로{' '}
              <code className="rounded bg-white/70 px-1 dark:bg-odp-bgSoft">
                /v1/tabular/{task}
              </code>{' '}
              을 호출합니다.
            </p>
          </div>
        </div>
        <FilePickRow
          label="학습 CSV (train_file)"
          file={value.trainFile}
          onPick={(trainFile) => onChange({ ...value, trainFile })}
          onClear={() => onChange({ ...value, trainFile: null })}
        />
        <FilePickRow
          label="예측 CSV (test_file)"
          file={value.testFile}
          onPick={(testFile) => onChange({ ...value, testFile })}
          onClear={() => onChange({ ...value, testFile: null })}
        />
      </section>

      <section
        className={settingsSectionCardClass('violet', { compact: true })}
        aria-label="EXAONE Tabular options"
      >
        <label className="block space-y-1">
          <span className="text-[11px] font-semibold text-gray-700 dark:text-odp-fgStrong">
            타깃 컬럼 (target_columns)
          </span>
          <input
            type="text"
            autoComplete="off"
            value={value.targetColumn}
            onChange={(e) => onChange({ ...value, targetColumn: e.target.value })}
            placeholder="예: churn, price"
            className="w-full rounded border border-gray-300 bg-white px-2 py-1.5 text-[11px] dark:border-odp-borderStrong dark:bg-odp-bgSoft"
          />
        </label>
        <div>
          <p className="mb-1.5 text-[11px] font-semibold text-gray-700 dark:text-odp-fgStrong">
            출력 유형 (output_type)
          </p>
          <RadioGroup.Root
            className="flex flex-wrap items-center gap-3"
            value={value.outputType}
            onValueChange={(next) => {
              if (!outputOptions.some((opt) => opt.value === next)) return;
              onChange({
                ...value,
                outputType: next as ExaoneTabularClassificationOutput | ExaoneTabularRegressionOutput,
              });
            }}
            aria-label="EXAONE Tabular output type"
          >
            {outputOptions.map((opt) => (
              <label
                key={opt.value}
                className="flex cursor-pointer items-center gap-1.5 text-[11px] text-gray-700 dark:text-odp-fg"
              >
                <RadioGroup.Item value={opt.value} className={RADIO_ITEM_CLASS}>
                  <RadioGroup.Indicator className={RADIO_INDICATOR_CLASS} />
                </RadioGroup.Item>
                <span>{opt.label}</span>
              </label>
            ))}
          </RadioGroup.Root>
        </div>
        <p className="text-[10px] leading-snug text-gray-500 dark:text-odp-muted">
          참고:{' '}
          <a
            href="https://docs.exaone.ai/ko/docs/exaone-tabular"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            EXAONE Tabular 문서
          </a>
        </p>
      </section>
    </div>
  );
}
