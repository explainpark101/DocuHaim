import { useEffect, useState } from 'react';
import {
  getLocalLlmModelAlias,
  LOCAL_LLM_MODEL_ALIASES_CHANGED_EVENT,
  setLocalLlmModelAlias,
  type LocalLlmModelAliasScope,
} from '@/utils/llm/localLlmModelAliases';

type LocalLlmModelAliasFieldProps = {
  scope: LocalLlmModelAliasScope;
  modelId: string;
  disabled?: boolean;
  className?: string;
};

/** Local-only display alias for long HF / GGUF model ids. */
export default function LocalLlmModelAliasField({
  scope,
  modelId,
  disabled = false,
  className = '',
}: LocalLlmModelAliasFieldProps) {
  const id = modelId.trim();
  const [alias, setAlias] = useState(() => getLocalLlmModelAlias(scope, id));

  useEffect(() => {
    setAlias(getLocalLlmModelAlias(scope, id));
  }, [scope, id]);

  useEffect(() => {
    const onChanged = () => setAlias(getLocalLlmModelAlias(scope, id));
    window.addEventListener(LOCAL_LLM_MODEL_ALIASES_CHANGED_EVENT, onChanged);
    return () => window.removeEventListener(LOCAL_LLM_MODEL_ALIASES_CHANGED_EVENT, onChanged);
  }, [scope, id]);

  if (!id) return null;

  return (
    <input
      type="text"
      value={alias}
      disabled={disabled}
      placeholder="별칭 (로컬)"
      aria-label={`모델 별칭: ${id}`}
      onClick={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
      onChange={(e) => {
        const next = e.target.value;
        setAlias(next);
        setLocalLlmModelAlias(scope, id, next);
      }}
      className={[
        'mt-1 w-full rounded border border-gray-200 bg-white px-1.5 py-1 text-[11px] text-gray-700',
        'placeholder:text-gray-400 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-fg dark:placeholder:text-odp-muted',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    />
  );
}
