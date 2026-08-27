export const LLAMA_CPP_SERVER_STARTED_EVENT = 's3haim-llama-cpp-server-started';
export const LLAMA_CPP_RUNTIME_CHANGED_EVENT = 's3haim-llama-cpp-runtime-changed';

export type LlamaCppServerStartedDetail = {
  modelPath: string;
  baseUrl: string;
};

export type LlamaCppRuntimeChangedDetail = {
  modelPath: string | null;
  baseUrl: string | null;
};

export function notifyLlamaCppRuntimeChanged(
  modelPath: string | null,
  baseUrl: string | null = null,
): void {
  if (typeof window === 'undefined') return;
  const path = modelPath == null ? null : String(modelPath).trim() || null;
  const url = baseUrl == null ? null : String(baseUrl).trim() || null;
  window.dispatchEvent(
    new CustomEvent<LlamaCppRuntimeChangedDetail>(LLAMA_CPP_RUNTIME_CHANGED_EVENT, {
      detail: { modelPath: path, baseUrl: url },
    }),
  );
}

export function notifyLlamaCppServerStarted(modelPath: string, baseUrl: string): void {
  const path = String(modelPath || '').trim();
  const url = String(baseUrl || '').trim();
  if (!path || !url || typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent<LlamaCppServerStartedDetail>(LLAMA_CPP_SERVER_STARTED_EVENT, {
      detail: { modelPath: path, baseUrl: url },
    }),
  );
  notifyLlamaCppRuntimeChanged(path, url);
}
