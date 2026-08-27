import { buildLlmTransformPrompt } from '@/utils/llmTransformPrompt';
import { throwIfLlmAssistAborted } from '@/utils/llm/llmAssistAbort';
import { toMlxVlmGenerateKwargs } from '@/utils/llm/llmAssistRequestOptions';
import { normalizeMlxVlmImages } from '@/utils/llm/mlxVlmImagePayload';
import { generateMlxVlmCompletion } from '@/utils/llm/mlxVlmRuntime';

export async function generateMlxVlmTransform({
  instruction,
  systemPrompt,
  selectedText,
  images,
  requestOptions,
  onChunk,
  signal,
}: {
  instruction: string;
  systemPrompt?: string;
  selectedText?: string;
  images?: { mimeType: string; dataBase64: string }[];
  requestOptions?: Record<string, unknown>;
  onChunk?: (accumulated: string) => void;
  signal?: AbortSignal;
}): Promise<string> {
  const trimmedInstruction = String(instruction || '').trim();
  const trimmedSelection = String(selectedText || '').trim();
  const imageList = normalizeMlxVlmImages(images);

  if (!trimmedInstruction) throw new Error('지시사항을 입력하세요.');
  throwIfLlmAssistAborted(signal);

  const prompt = buildLlmTransformPrompt({
    instruction: trimmedInstruction,
    selectedText: trimmedSelection,
    hasImages: imageList.length > 0,
  });

  return generateMlxVlmCompletion({
    prompt,
    systemPrompt: (systemPrompt ?? '').trim(),
    images: imageList,
    generateOptions: toMlxVlmGenerateKwargs(requestOptions ?? {}),
    resetCache: true,
    ...(onChunk ? { onChunk } : {}),
    ...(signal ? { signal } : {}),
  });
}
