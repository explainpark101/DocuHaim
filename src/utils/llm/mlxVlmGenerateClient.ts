import { buildLlmTransformPrompt } from '@/utils/llmTransformPrompt';
import {
  throwIfLlmAssistAborted,
} from '@/utils/llm/llmAssistAbort';
import { toOpenAiCompatibleRequestExtras } from '@/utils/llm/llmAssistRequestOptions';
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

  const extras = toOpenAiCompatibleRequestExtras(requestOptions ?? {});
  const maxTokensRaw = extras.max_tokens ?? extras.max_completion_tokens;
  const maxTokens =
    typeof maxTokensRaw === 'number' && Number.isFinite(maxTokensRaw)
      ? Math.floor(maxTokensRaw)
      : 512;
  const temperature =
    typeof extras.temperature === 'number' && Number.isFinite(extras.temperature)
      ? extras.temperature
      : 0.4;
  const topP =
    typeof extras.top_p === 'number' && Number.isFinite(extras.top_p) ? extras.top_p : 1.0;
  const minP =
    typeof extras.min_p === 'number' && Number.isFinite(extras.min_p) ? extras.min_p : 0.0;

  return generateMlxVlmCompletion({
    prompt,
    systemPrompt: (systemPrompt ?? '').trim(),
    images: imageList,
    maxTokens,
    temperature,
    topP,
    minP,
    resetCache: true,
    ...(onChunk ? { onChunk } : {}),
    ...(signal ? { signal } : {}),
  });
}
