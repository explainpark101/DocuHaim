/** Substrings common in llama.cpp multimodal / VL GGUF ids and paths. */
const LLAMA_CPP_MULTIMODAL_HINTS = [
  'llava',
  'bakllava',
  'moondream',
  'cogvlm',
  'minicpm-v',
  'minicpmv',
  'phi-3-vision',
  'phi3-v',
  'phi-3.5-vision',
  'qwen2-vl',
  'qwen-vl',
  'qvq',
  'internvl',
  'smolvlm',
  'granite-vision',
  'llama-3.2-vision',
  'mllama',
  'pixtral',
  'mmproj',
  '-vl',
  '_vl',
  'vision',
] as const;

/**
 * Heuristic: true when the selected llama.cpp model id/path looks like a VL / multimodal build.
 * Text-only GGUF models return false so quiz image flows can prompt before calling the server.
 */
export function isLikelyLlamaCppMultimodalModel(modelId: string | null | undefined): boolean {
  const lower = String(modelId || '')
    .trim()
    .toLowerCase()
    .replace(/\\/g, '/');
  if (!lower) return false;
  return LLAMA_CPP_MULTIMODAL_HINTS.some((hint) => lower.includes(hint));
}
