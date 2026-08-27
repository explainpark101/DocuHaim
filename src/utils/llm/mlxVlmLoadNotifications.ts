export const MLX_VLM_MODEL_LOADED_EVENT = 's3haim-mlx-vlm-model-loaded';
export const MLX_VLM_RUNTIME_CHANGED_EVENT = 's3haim-mlx-vlm-runtime-changed';

export type MlxVlmModelLoadedDetail = {
  modelId: string;
};

export type MlxVlmRuntimeChangedDetail = {
  modelId: string | null;
};

export function notifyMlxVlmRuntimeChanged(modelId: string | null): void {
  if (typeof window === 'undefined') return;
  const id = modelId == null ? null : String(modelId).trim() || null;
  window.dispatchEvent(
    new CustomEvent<MlxVlmRuntimeChangedDetail>(MLX_VLM_RUNTIME_CHANGED_EVENT, {
      detail: { modelId: id },
    }),
  );
}

export function notifyMlxVlmModelLoaded(modelId: string): void {
  const id = String(modelId || '').trim();
  if (!id || typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent<MlxVlmModelLoadedDetail>(MLX_VLM_MODEL_LOADED_EVENT, {
      detail: { modelId: id },
    }),
  );
  notifyMlxVlmRuntimeChanged(id);
}
