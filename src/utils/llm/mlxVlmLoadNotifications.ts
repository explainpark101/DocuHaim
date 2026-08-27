export const MLX_VLM_MODEL_LOADED_EVENT = 's3haim-mlx-vlm-model-loaded';

export type MlxVlmModelLoadedDetail = {
  modelId: string;
};

export function notifyMlxVlmModelLoaded(modelId: string): void {
  const id = String(modelId || '').trim();
  if (!id || typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent<MlxVlmModelLoadedDetail>(MLX_VLM_MODEL_LOADED_EVENT, {
      detail: { modelId: id },
    }),
  );
}
