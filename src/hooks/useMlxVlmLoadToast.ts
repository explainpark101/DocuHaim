import { useEffect } from 'react';
import { useToast } from '@/contexts/ToastContext';
import {
  MLX_VLM_MODEL_LOADED_EVENT,
  type MlxVlmModelLoadedDetail,
} from '@/utils/llm/mlxVlmLoadNotifications';

/** Shows a toast when an MLX-VLM model finishes loading. */
export function useMlxVlmLoadToast(): void {
  const { showToast } = useToast();

  useEffect(() => {
    const onLoaded = (event: Event) => {
      const modelId = (event as CustomEvent<MlxVlmModelLoadedDetail>).detail?.modelId?.trim();
      if (!modelId) return;
      showToast({
        message: `MLX-VLM 모델 로드됨 · ${modelId}`,
        durationMs: 2400,
      });
    };

    window.addEventListener(MLX_VLM_MODEL_LOADED_EVENT, onLoaded);
    return () => window.removeEventListener(MLX_VLM_MODEL_LOADED_EVENT, onLoaded);
  }, [showToast]);
}
