import { useCallback, useEffect, useMemo, useState } from 'react';
import { RadixSelectField } from '@/components/shared/ui/RadixSelectField';
import {
  LLM_LAST_PROFILE_CHANGED_EVENT,
  loadLastLlmProfileId,
  resolveSelectedLlmProfile,
  saveLastLlmProfileId,
  type LlmProviderProfile,
} from '@/utils/llm/llmProviderProfiles';

type LlmProviderSelectProps = {
  profiles: LlmProviderProfile[];
  value: string;
  onChange: (profileId: string) => void;
  className?: string;
};

export function useLlmProfileIdState(
  profiles: LlmProviderProfile[],
): [string, (next: string) => void, () => void] {
  const [profileId, setProfileId] = useState(() => loadLastLlmProfileId());

  const resolvedId = useMemo(() => {
    const selected = resolveSelectedLlmProfile(profiles, profileId);
    return selected?.id ?? '';
  }, [profiles, profileId]);

  const setProfileIdAndSave = useCallback((next: string) => {
    saveLastLlmProfileId(next);
    setProfileId(loadLastLlmProfileId());
  }, []);

  const syncFromStorage = useCallback(() => {
    setProfileId(loadLastLlmProfileId());
  }, []);

  useEffect(() => {
    const onChange = () => setProfileId(loadLastLlmProfileId());
    window.addEventListener(LLM_LAST_PROFILE_CHANGED_EVENT, onChange);
    return () => window.removeEventListener(LLM_LAST_PROFILE_CHANGED_EVENT, onChange);
  }, []);

  useEffect(() => {
    if (resolvedId && resolvedId !== profileId) {
      saveLastLlmProfileId(resolvedId);
      setProfileId(resolvedId);
    }
  }, [profileId, resolvedId]);

  return [resolvedId, setProfileIdAndSave, syncFromStorage];
}

export default function LlmProviderSelect({
  profiles,
  value,
  onChange,
  className = '',
}: LlmProviderSelectProps) {
  const options = useMemo(
    () =>
      profiles.map((p) => ({
        value: p.id,
        label:
          p.kind === 'openai-compatible'
            ? `${p.name} · OpenAI 호환`
            : `${p.name} · Gemini`,
      })),
    [profiles],
  );

  if (!options.length) {
    return (
      <p className={`text-[11px] text-amber-700 dark:text-amber-300 ${className}`.trim()}>
        저장된 제공자가 없습니다. 설정에서 추가하세요.
      // @ts-expect-error TS(2339): Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
      </p>
    );
  }

  const firstOption = options[0];
  const selectValue = options.some((o) => o.value === value)
    ? value
    : (firstOption?.value ?? '');

  return (
    <RadixSelectField
      value={selectValue}
      onValueChange={onChange}
      options={options}
      placeholder="제공자 선택"
      aria-label="AI 제공자"
      className={`w-full ${className}`.trim()}
    />
  );
}
