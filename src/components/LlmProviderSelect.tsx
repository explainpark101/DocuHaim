import { useCallback, useEffect, useState } from 'react';
import { RadioGroup } from 'radix-ui';
import {
  LLM_PROVIDER_CHANGED_EVENT,
  LLM_PROVIDER_GEMINI,
  LLM_PROVIDER_OPENAI_COMPATIBLE,
  loadLlmProvider,
  saveLlmProvider,
  type LlmProviderId,
} from '@/utils/llmProviderSettings';

const ITEM_CLASS =
  'size-3.5 rounded-full border border-gray-400 bg-white data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500 dark:border-odp-borderSoft dark:bg-odp-bgSoft';

const INDICATOR_CLASS =
  'relative flex size-full items-center justify-center after:block after:size-1.5 after:rounded-full after:bg-white';

type LlmProviderSelectProps = {
  value: LlmProviderId;
  onChange: (next: LlmProviderId) => void;
  className?: string;
};

export function useLlmProviderState(): [
  LlmProviderId,
  (next: LlmProviderId) => void,
  () => void,
] {
  const [provider, setProvider] = useState(() => loadLlmProvider());

  const setProviderAndSave = useCallback((next: LlmProviderId) => {
    saveLlmProvider(next);
    setProvider(loadLlmProvider());
  }, []);

  const syncFromStorage = useCallback(() => {
    setProvider(loadLlmProvider());
  }, []);

  useEffect(() => {
    const onChange = () => setProvider(loadLlmProvider());
    window.addEventListener(LLM_PROVIDER_CHANGED_EVENT, onChange);
    return () => window.removeEventListener(LLM_PROVIDER_CHANGED_EVENT, onChange);
  }, []);

  return [provider, setProviderAndSave, syncFromStorage];
}

export default function LlmProviderSelect({
  value,
  onChange,
  className = '',
}: LlmProviderSelectProps) {
  return (
    <RadioGroup.Root
      className={`flex flex-wrap items-center gap-4 ${className}`.trim()}
      value={value}
      onValueChange={(next) => {
        if (next === LLM_PROVIDER_GEMINI || next === LLM_PROVIDER_OPENAI_COMPATIBLE) {
          onChange(next);
        }
      }}
      aria-label="AI 제공자"
    >
      <label className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-700 dark:text-odp-fg">
        <RadioGroup.Item value={LLM_PROVIDER_GEMINI} className={ITEM_CLASS}>
          <RadioGroup.Indicator className={INDICATOR_CLASS} />
        </RadioGroup.Item>
        <span>Google Gemini</span>
      </label>
      <label className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-700 dark:text-odp-fg">
        <RadioGroup.Item value={LLM_PROVIDER_OPENAI_COMPATIBLE} className={ITEM_CLASS}>
          <RadioGroup.Indicator className={INDICATOR_CLASS} />
        </RadioGroup.Item>
        <span>OpenAI 호환</span>
      </label>
    </RadioGroup.Root>
  );
}
