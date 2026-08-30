import { withLlmProfileApiKey } from '@/utils/llmApiKeySession';
import { generateGeminiTransform } from '@/utils/geminiClient';
import { generateOpenAiCompatibleTransform } from '@/utils/openaiCompatibleClient';
import {
  LLM_PROVIDER_GEMINI,
  LLM_PROVIDER_LLAMA_CPP,
  LLM_PROVIDER_MLX_VLM,
  LLM_PROVIDER_OPENAI_COMPATIBLE,
  loadLastLlmProfileId,
  loadLastUsedModelForProfile,
  resolveSelectedLlmProfile,
  saveLastUsedModelForProfile,
  type LlmProviderProfile,
} from '@/utils/llmProviderProfiles';
import { saveLastUsedGeminiModel } from '@/utils/geminiModelSettings';
import { saveLastUsedOpenAiCompatibleModel } from '@/utils/openaiCompatibleSettings';
import { loadLlamaCppSettings } from '@/utils/llamaCppSettingsStore';
import { loadMlxVlmSettings } from '@/utils/mlxVlmSettingsStore';
import {
  ensureLlamaCppServerReadyForAssist,
  getLlamaCppServerStatus,
} from '@/utils/llamaCppShell';
import { getMlxVlmServerStatus } from '@/utils/mlxVlmShell';
import { generateMlxVlmTransform } from '@/utils/llm/mlxVlmGenerateClient';
import { isLikelyLlamaCppMultimodalModel } from '@/utils/llm/llamaCppVisionModel';
import { isFreeTierBlockedModel } from '@/utils/geminiError';
import {
  DEFAULT_QUIZ_SYSTEM_PROMPT,
  loadQuizSettings,
} from '@/utils/quiz/quizSettingsStore';
import {
  formatRagChunksForPrompt,
  loadQuizSourceBodies,
  retrieveQuizContext,
} from '@/utils/quiz/quizRagService';
import type { QuizVaultTextReader } from '@/utils/quiz/quizVaultSourceLoader';
import {
  buildDerivedGenerationInstruction,
  buildDerivedQuestionGenerationSystemPrompt,
  type QuizDerivedQuestionTarget,
} from '@/utils/quiz/derivedQuestionAnalysis';
import {
  buildSimilarAnalysisInstruction,
  buildSimilarGenerationInstruction,
  buildSimilarQuestionGenerationSystemPrompt,
  buildSimilarSectionsRepairInstruction,
  buildQuestionSectionsInstruction,
  formatAnalysisForPrompt,
  formatSampledVariablesForPrompt,
  hasCompleteSimilarQuestionSections,
  isWeakSimilarQuestionExplanation,
  isWeakSimilarQuestionPoint,
  parseSimilarQuestionAnalysis,
  randomizeSimilarVariables,
  SIMILAR_QUESTION_ANALYSIS_SYSTEM_PROMPT,
} from '@/utils/quiz/similarQuestionAnalysis';
import type {
  QuizAddQuestionForm,
  QuizFileConfig,
  QuizQuestion,
  SubjectiveGradeResult,
  SubjectiveVerdict,
} from '@/utils/quiz/quizTypes';
import type { QuizGenStepId, QuizGenStepUpdate } from '@/utils/quiz/quizGenerationQueueTypes';
import { resolveQuestionChoiceCount, resizeChoiceOptions } from '@/utils/quiz/quizQuestionStyle';
import { clampChoiceCount } from '@/utils/quiz/quizFileConfig';
import { truncateForGenerationLog } from '@/utils/quiz/quizGenerationLog';
import { normalizeGeneratedChoiceOption } from '@/utils/quiz/normalizeGeneratedChoiceOption';
import {
  applyAnswerKeyToForms,
  parseAnswerKeyEntriesFromLlmJson,
  parseAnswerKeyTableText,
  type AnswerKeyEntry,
} from '@/utils/quiz/quizAnswerKey';

const SOURCE_SUMMARY_SYSTEM_PROMPT = `당신은 시험 출제용 근거 문서 요약가입니다.
주어진 원문에서 출제에 필요한 개념·정의·공식·절차·사례만 주제별로 정리하세요.
- 원문에 없는 사실을 만들지 마세요.
- 수식은 원문 표기를 유지하세요 ($...$ / $$...$$).
- 응답은 마크다운 요약문만 작성하세요. JSON·코드펜스·서두는 금지합니다.`;

function buildSourceGenerationSystemPrompt(
  kind: 'choice' | 'subjective',
  choiceCount: number,
  count: number,
): string {
  if (kind === 'subjective') {
    return `당신은 시험 출제위원입니다. 제공된 근거 요약본만 사용해 문항을 만드니다.
요약본 밖의 사실은 사용하지 마세요.
응답은 JSON 배열만 반환하세요. 다른 텍스트·마크다운·코드펜스는 금지합니다.
스키마:
[{"kind":"subjective","answerStyle":"short"|"essay","question":"...","modelAnswer":"...","point":"...","explanation":"..."}]
정확히 ${count}개 문항을 반환하세요.`;
  }
  return `당신은 시험 출제위원입니다. 제공된 근거 요약본만 사용해 객관식 문항을 만듭니다.
요약본 밖의 사실은 사용하지 마세요.
선택지(options) 안에서는 인라인 수식($...$)만 사용하세요.
options 각 항목에는 보기 번호 접두사(1., 2., a., 가. 등)를 넣지 마세요. 선택지 본문만 작성합니다.
응답은 JSON 배열만 반환하세요. 다른 텍스트·마크다운·코드펜스는 금지합니다.
스키마:
[{"question":"...","options":[${Array.from({ length: choiceCount }, () => '"..."').join(',')}],"answer":1,"point":"...","explanation":"..."}]
- options 길이는 정확히 ${choiceCount}
- answer는 1~${choiceCount} 정수
정확히 ${count}개 문항을 반환하세요.`;
}

function formatExampleQuestionsForPrompt(examples: QuizQuestion[]): string {
  if (!examples.length) return '(제시 문항 없음 — 문서의 핵심 개념 중심으로 요약)';
  return examples
    .slice(0, 8)
    .map((q, i) => {
      const head = `${i + 1}. [${q.kind}${q.answerStyle ? `/${q.answerStyle}` : ''}] ${q.question}`;
      if (q.kind === 'choice') {
        const opts = (q.options || [])
          .map((o, j) => `   ${j + 1}. ${o}${q.answer === j + 1 ? ' (정답)' : ''}`)
          .join('\n');
        return `${head}\n${opts}\n   Point: ${q.point || ''}`;
      }
      return `${head}\n   모범답안: ${q.modelAnswer || ''}\n   Point: ${q.point || ''}`;
    })
    .join('\n\n');
}

export type SourceDocSummary = {
  path: string;
  summary: string;
};

export type QuizLlmReadyResult =
  | { ready: true; profile: LlmProviderProfile; model: string }
  | { ready: false; message: string };

/**
 * Lightweight readiness check before quiz AI actions.
 * When not ready, UI should open LlmAssist (panel/dock) so the user can load/select a model.
 */
export async function checkQuizLlmReady(
  profiles: LlmProviderProfile[],
  overrides?: { profileId?: string | null; model?: string | null },
): Promise<QuizLlmReadyResult> {
  const settings = loadQuizSettings();
  const list = Array.isArray(profiles) ? profiles : [];
  const profile = resolveSelectedLlmProfile(
    list,
    overrides?.profileId?.trim() || settings.profileId || loadLastLlmProfileId(),
  );
  if (!profile) {
    return {
      ready: false,
      message:
        'AI 제공자가 없습니다. AI 도우미에서 제공자·모델을 선택한 뒤 다시 시도하세요.',
    };
  }

  const model = (
    overrides?.model?.trim() ||
    settings.modelId?.trim() ||
    loadLastUsedModelForProfile(profile.id, profile.kind)
  ).trim();

  if (profile.kind === LLM_PROVIDER_MLX_VLM) {
    const mlxSettings = loadMlxVlmSettings();
    const status = await getMlxVlmServerStatus(mlxSettings);
    if (!status.running) {
      return {
        ready: false,
        message:
          'MLX-VLM 모델이 로드되어 있지 않습니다. AI 도우미에서 모델을 로드한 뒤 다시 시도하세요.',
      };
    }
    const resolved =
      model || mlxSettings.selectedModelId || status.models[0] || '';
    if (!resolved) {
      return {
        ready: false,
        message: '사용할 MLX 모델을 선택하세요. AI 도우미에서 선택해 주세요.',
      };
    }
    return { ready: true, profile, model: resolved };
  }

  if (profile.kind === LLM_PROVIDER_LLAMA_CPP) {
    const llamaSettings = loadLlamaCppSettings();
    let statusModels: string[] = [];
    try {
      const status = await getLlamaCppServerStatus(llamaSettings);
      statusModels = Array.isArray(status.models) ? status.models : [];
      if (!status.running && !llamaSettings.selectedModelId && !model) {
        return {
          ready: false,
          message:
            'llama.cpp 모델이 준비되지 않았습니다. AI 도우미에서 모델을 로드·선택한 뒤 다시 시도하세요.',
        };
      }
    } catch {
      if (!llamaSettings.selectedModelId && !model) {
        return {
          ready: false,
          message:
            'llama.cpp 모델을 확인할 수 없습니다. AI 도우미에서 모델을 선택해 주세요.',
        };
      }
    }
    const resolved =
      model || llamaSettings.selectedModelId || statusModels[0] || '';
    if (!resolved) {
      return {
        ready: false,
        message: '사용할 모델을 선택하세요. AI 도우미에서 선택해 주세요.',
      };
    }
    return { ready: true, profile, model: resolved };
  }

  if (profile.kind === LLM_PROVIDER_OPENAI_COMPATIBLE) {
    if (!(profile.baseUrl || '').trim()) {
      return {
        ready: false,
        message:
          'OpenAI 호환 Endpoint URL이 없습니다. 설정 또는 AI 도우미에서 제공자를 확인하세요.',
      };
    }
    if (!model) {
      return {
        ready: false,
        message: '모델을 선택하세요. AI 도우미에서 모델을 고른 뒤 다시 시도하세요.',
      };
    }
    return { ready: true, profile, model };
  }

  // Gemini
  void LLM_PROVIDER_GEMINI;
  if (!model) {
    return {
      ready: false,
      message: 'Gemini 모델을 선택하세요. AI 도우미에서 모델을 고른 뒤 다시 시도하세요.',
    };
  }
  if (!(profile.apiKey || '').trim()) {
    // Key may still live in session unlock — allow attempt; Assist helps pick model/provider.
    // Only block when clearly no key stored on profile and no model path — keep soft.
  }
  return { ready: true, profile, model };
}

/** Profiles that can accept image inputs for quiz vision tasks. */
export function isQuizVisionCapableProfile(profile: LlmProviderProfile): boolean {
  return (
    profile.kind === LLM_PROVIDER_GEMINI ||
    profile.kind === LLM_PROVIDER_MLX_VLM ||
    profile.kind === LLM_PROVIDER_OPENAI_COMPATIBLE ||
    profile.kind === LLM_PROVIDER_LLAMA_CPP
  );
}

/**
 * Readiness check for image-based quiz generation (vision model required).
 */
export async function checkQuizVisionLlmReady(
  profiles: LlmProviderProfile[],
  overrides?: { profileId?: string | null; model?: string | null },
): Promise<QuizLlmReadyResult> {
  const result = await checkQuizLlmReady(profiles, overrides);
  if (!result.ready) return result;
  if (!isQuizVisionCapableProfile(result.profile)) {
    return {
      ready: false,
      message:
        '이미지 분석에는 비전 모델이 필요합니다. AI 도우미에서 Gemini, MLX-VLM, OpenAI 호환, 또는 llama.cpp 멀티모달 모델을 선택하세요.',
    };
  }
  if (
    result.profile.kind === LLM_PROVIDER_LLAMA_CPP &&
    !isLikelyLlamaCppMultimodalModel(result.model)
  ) {
    return {
      ready: false,
      message:
        '이미지 분석에는 llama.cpp 멀티모달(VL) 모델이 필요합니다. AI 도우미 또는 설정 > llama.cpp에서 LLaVA 등 비전 GGUF를 선택한 뒤 다시 시도하세요.',
    };
  }
  return result;
}

/** True when an error message indicates missing LLM setup / model load. */
export function isQuizLlmSetupIssue(message: string): boolean {
  const m = String(message || '');
  return (
    /제공자|프로필|모델을 선택|모델이 로드|모델이 준비|API 키|Endpoint URL|AI 도우미에서/i.test(
      m,
    )
  );
}


export function extractJsonObject(text: string): unknown {
  const raw = String(text || '').trim();
  if (!raw) throw new Error('빈 LLM 응답');
  try {
    return JSON.parse(raw);
  } catch {
    const start = raw.indexOf('{');
    const end = raw.lastIndexOf('}');
    if (start >= 0 && end > start) {
      return JSON.parse(raw.slice(start, end + 1));
    }
    const aStart = raw.indexOf('[');
    const aEnd = raw.lastIndexOf(']');
    if (aStart >= 0 && aEnd > aStart) {
      return JSON.parse(raw.slice(aStart, aEnd + 1));
    }
    throw new Error('JSON 파싱 실패');
  }
}

export const QUIZ_LLM_JSON_PARSE_MAX_ATTEMPTS = 3;

/** OpenAI-compatible strict JSON response (quiz JSON-generation steps). */
export const QUIZ_LLM_JSON_RESPONSE_FORMAT = {
  type: 'json_object',
  json_schema: {},
} as const;

export function buildQuizLlmRequestOptions(params: {
  temperature: number;
  expectJson?: boolean;
}): Record<string, unknown> {
  const requestOptions: Record<string, unknown> = {
    temperature: params.temperature,
  };
  if (params.expectJson) {
    requestOptions.response_format = { ...QUIZ_LLM_JSON_RESPONSE_FORMAT };
  }
  return requestOptions;
}

export function isQuizLlmJsonParseError(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err || '');
  return /JSON 파싱 실패|빈 LLM 응답/i.test(msg);
}

export type QuizLlmJsonParseFailureDetail = {
  attempt: number;
  maxAttempts: number;
  error: Error;
  rawResponse: string;
  willRetry: boolean;
};

export function buildQuizGenJsonParseStepFields(
  detail: QuizLlmJsonParseFailureDetail,
): {
  status: QuizGenStepUpdate['status'];
  detail: string;
  error: string;
  llmResponse: string;
} {
  return {
    status: detail.willRetry ? 'running' : 'error',
    detail: detail.willRetry
      ? `JSON 파싱 실패 (${detail.attempt}/${detail.maxAttempts})`
      : `JSON 파싱 실패 — 최종 실패 (${detail.attempt}/${detail.maxAttempts})`,
    error: detail.error.message,
    llmResponse: truncateForGenerationLog(detail.rawResponse),
  };
}

function buildQuizGenJsonRetryHandlers(
  emit: (update: QuizGenStepUpdate) => void,
  step: QuizGenStepId,
  ctx: {
    runningDetail: string;
    llmInstruction?: string;
    systemPrompt?: string;
  },
): {
  onParseFailure: (detail: QuizLlmJsonParseFailureDetail) => void;
  onRetryAttempt: (detail: { attempt: number; maxAttempts: number }) => void;
} {
  const failureBlocks: string[] = [];
  const sharedFields = {
    ...(ctx.llmInstruction !== undefined ? { llmInstruction: ctx.llmInstruction } : {}),
    ...(ctx.systemPrompt !== undefined ? { systemPrompt: ctx.systemPrompt } : {}),
  };
  return {
    onParseFailure: (detail) => {
      failureBlocks.push(
        `### JSON parse failure (${detail.attempt}/${detail.maxAttempts})\n${truncateForGenerationLog(detail.rawResponse)}`,
      );
      const fields = buildQuizGenJsonParseStepFields(detail);
      const stepDetail = detail.willRetry
        ? `${ctx.runningDetail} (재시도 ${detail.attempt + 1}/${detail.maxAttempts})`
        : (fields.detail ?? `JSON 파싱 실패 (${detail.attempt}/${detail.maxAttempts})`);
      emit({
        step,
        status: fields.status,
        detail: stepDetail,
        error: fields.error,
        failureLog: failureBlocks.join('\n\n---\n\n'),
        llmResponse: truncateForGenerationLog(detail.rawResponse),
        ...sharedFields,
      });
    },
    onRetryAttempt: ({ attempt, maxAttempts }) => {
      emit({
        step,
        status: 'running',
        detail: `${ctx.runningDetail} (재시도 ${attempt}/${maxAttempts})`,
        error: '',
        llmResponse: '',
        ...sharedFields,
      });
    },
  };
}

/** Run an LLM prompt and parse JSON; retry the prompt on JSON parse failure. */
export async function runWithQuizLlmJsonParseRetry(
  runPrompt: () => Promise<string>,
  options?: {
    maxAttempts?: number;
    signal?: AbortSignal | undefined;
    onParseFailure?: (detail: QuizLlmJsonParseFailureDetail) => void;
    onRetryAttempt?: (detail: { attempt: number; maxAttempts: number }) => void;
  },
): Promise<{ text: string; parsed: unknown }> {
  const maxAttempts = Math.max(
    1,
    options?.maxAttempts ?? QUIZ_LLM_JSON_PARSE_MAX_ATTEMPTS,
  );
  let lastError: Error | null = null;
  let lastRawResponse = '';
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    if (options?.signal?.aborted) {
      throw new DOMException('Aborted', 'AbortError');
    }
    if (attempt > 1) {
      options?.onRetryAttempt?.({ attempt, maxAttempts });
    }
    const text = await runPrompt();
    lastRawResponse = text;
    try {
      return { text, parsed: extractJsonObject(text) };
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      const willRetry = isQuizLlmJsonParseError(lastError) && attempt < maxAttempts;
      if (isQuizLlmJsonParseError(lastError)) {
        options?.onParseFailure?.({
          attempt,
          maxAttempts,
          error: lastError,
          rawResponse: text,
          willRetry,
        });
      }
      if (!willRetry) {
        throw lastError;
      }
    }
  }
  if (lastError && isQuizLlmJsonParseError(lastError)) {
    options?.onParseFailure?.({
      attempt: maxAttempts,
      maxAttempts,
      error: lastError,
      rawResponse: lastRawResponse,
      willRetry: false,
    });
  }
  throw lastError ?? new Error('JSON 파싱 실패');
}

/** Quiz LLM call that forces JSON output and parses the response (with retry). */
export async function runQuizLlmPromptForJson(
  options: QuizLlmRunOptions,
  retryOptions?: {
    maxAttempts?: number;
    signal?: AbortSignal | undefined;
    onParseFailure?: (detail: QuizLlmJsonParseFailureDetail) => void;
    onRetryAttempt?: (detail: { attempt: number; maxAttempts: number }) => void;
  },
): Promise<{ text: string; parsed: unknown }> {
  const { onChunk: _omitChunk, ...jsonOptions } = options;
  return runWithQuizLlmJsonParseRetry(
    () =>
      runQuizLlmPrompt({
        ...jsonOptions,
        expectJson: true,
        stream: false,
      }),
    retryOptions,
  );
}

/** Parse LLM JSON into a SubjectiveGradeResult (exported for tests). */
export function parseSubjectiveGradeResult(raw: unknown): SubjectiveGradeResult {
  const parsed =
    raw && typeof raw === 'object' ? (raw as Record<string, unknown>) : {};
  const verdictRaw = String(parsed.verdict || 'wrong');
  const verdict: SubjectiveVerdict =
    verdictRaw === 'correct' || verdictRaw === 'partial' ? verdictRaw : 'wrong';
  const score = Math.min(
    100,
    Math.max(
      0,
      Number(parsed.score) ||
        (verdict === 'correct' ? 100 : verdict === 'partial' ? 50 : 0),
    ),
  );
  const feedback =
    String(parsed.feedback || '').trim() || '채점 피드백이 없습니다.';
  const rationale = String(parsed.rationale || '').trim();
  if (rationale) {
    return { verdict, score, feedback, rationale };
  }
  return { verdict, score, feedback };
}

export type QuizLlmImageInput = {
  mimeType: string;
  dataBase64: string;
};

export type QuizLlmRunOptions = {
  profiles: LlmProviderProfile[];
  instruction: string;
  systemPrompt?: string;
  temperature?: number;
  signal?: AbortSignal;
  /** Streaming callback with accumulated text (wrong-answer analysis, etc.). */
  onChunk?: (accumulated: string) => void;
  /** Override quiz default profile for this request. */
  profileId?: string;
  /** Override last-used model for this request. */
  model?: string;
  /** Vision inputs (Gemini, MLX-VLM, OpenAI-compatible / llama.cpp multimodal). */
  images?: QuizLlmImageInput[];
  /** Request OpenAI-compatible `response_format` JSON object output. */
  expectJson?: boolean;
  /**
   * When false, use a single completed response instead of SSE streaming.
   * Defaults to false for JSON calls and when `onChunk` is omitted.
   */
  stream?: boolean;
};

function withStreamOpts<T extends Record<string, unknown>>(
  base: T,
  opts: { signal?: AbortSignal; onChunk?: (accumulated: string) => void },
): T & { signal?: AbortSignal; onChunk?: (accumulated: string) => void } {
  const out: T & { signal?: AbortSignal; onChunk?: (accumulated: string) => void } = {
    ...base,
  };
  if (opts.signal) out.signal = opts.signal;
  if (opts.onChunk) out.onChunk = opts.onChunk;
  return out;
}

export async function runQuizLlmPrompt(options: QuizLlmRunOptions): Promise<string> {
  const settings = loadQuizSettings();
  const profiles = Array.isArray(options.profiles) ? options.profiles : [];
  const selectedProfile = resolveSelectedLlmProfile(
    profiles,
    options.profileId?.trim() || settings.profileId || loadLastLlmProfileId(),
  );
  if (!selectedProfile) {
    throw new Error(
      'AI 제공자가 없습니다. AI 도우미에서 제공자·모델을 선택한 뒤 다시 시도하세요.',
    );
  }

  const model = (
    options.model?.trim() ||
    settings.modelId?.trim() ||
    loadLastUsedModelForProfile(selectedProfile.id, selectedProfile.kind)
  ).trim();
  const systemPrompt = (options.systemPrompt || settings.systemPrompt || '').trim();
  const instruction = options.instruction.trim();
  const requestOptions = buildQuizLlmRequestOptions({
    temperature:
      typeof options.temperature === 'number'
        ? options.temperature
        : settings.temperature,
    expectJson: options.expectJson === true,
  });
  const streamOpts: {
    signal?: AbortSignal;
    onChunk?: (accumulated: string) => void;
  } = {};
  if (options.signal) streamOpts.signal = options.signal;
  const useStreaming =
    options.stream !== false && options.onChunk != null && options.expectJson !== true;
  if (useStreaming && options.onChunk) streamOpts.onChunk = options.onChunk;
  const imageList = Array.isArray(options.images)
    ? options.images.filter((img) => img?.mimeType && img?.dataBase64)
    : [];
  const visionPayload = imageList.length > 0 ? { images: imageList } : {};

  if (selectedProfile.kind === LLM_PROVIDER_OPENAI_COMPATIBLE) {
    const baseUrl = (selectedProfile.baseUrl || '').trim();
    if (!baseUrl) throw new Error('선택한 제공자의 Endpoint URL이 없습니다.');
    saveLastUsedModelForProfile(selectedProfile.id, model);
    saveLastUsedOpenAiCompatibleModel(model);
    return withLlmProfileApiKey(
      selectedProfile.id,
      () => selectedProfile.apiKey || '',
      (apiKey) =>
        generateOpenAiCompatibleTransform(
          withStreamOpts(
            {
              baseUrl,
              apiKey,
              model,
              instruction,
              systemPrompt,
              selectedText: '',
              requestOptions,
              ...visionPayload,
            },
            streamOpts,
          ),
        ),
      {
        allowEmpty: true,
        missingKeyMessage: 'OpenAI 호환 API 키가 없습니다. 설정에서 입력하세요.',
      },
    );
  }

  if (selectedProfile.kind === LLM_PROVIDER_LLAMA_CPP) {
    const llamaSettings = loadLlamaCppSettings();
    const status = await ensureLlamaCppServerReadyForAssist(
      llamaSettings,
      options.signal ? { signal: options.signal } : {},
    );
    const baseUrl = (selectedProfile.baseUrl || status.baseUrl || '').trim();
    if (!baseUrl) throw new Error('llama.cpp 서버 URL을 확인할 수 없습니다.');
    const resolvedModel =
      model.trim() || llamaSettings.selectedModelId || status.models[0] || '';
    if (!resolvedModel) throw new Error('사용할 모델을 선택하세요.');
    saveLastUsedModelForProfile(selectedProfile.id, resolvedModel);
    return withLlmProfileApiKey(
      selectedProfile.id,
      () => selectedProfile.apiKey || llamaSettings.apiKey || 'no-key-required',
      (apiKey) =>
        generateOpenAiCompatibleTransform(
          withStreamOpts(
            {
              baseUrl,
              apiKey,
              model: resolvedModel,
              instruction,
              systemPrompt,
              selectedText: '',
              requestOptions,
              ...visionPayload,
            },
            streamOpts,
          ),
        ),
      { allowEmpty: true, missingKeyMessage: 'llama.cpp API 키가 없습니다.' },
    );
  }

  if (selectedProfile.kind === LLM_PROVIDER_MLX_VLM) {
    const mlxSettings = loadMlxVlmSettings();
    const status = await getMlxVlmServerStatus(mlxSettings);
    if (!status.running) {
      throw new Error(
        'MLX-VLM 모델이 로드되어 있지 않습니다. AI 도우미에서 모델을 로드한 뒤 다시 시도하세요.',
      );
    }
    const resolvedModel =
      model.trim() || mlxSettings.selectedModelId || status.models[0] || '';
    if (!resolvedModel) throw new Error('사용할 MLX 모델을 선택하세요.');
    saveLastUsedModelForProfile(selectedProfile.id, resolvedModel);
    return generateMlxVlmTransform(
      withStreamOpts(
        {
          instruction,
          systemPrompt,
          selectedText: '',
          requestOptions,
          ...visionPayload,
        },
        streamOpts,
      ),
    );
  }

  if (isFreeTierBlockedModel(model)) {
    throw new Error('선택한 모델은 무료 플랜에서 사용할 수 없습니다.');
  }
  saveLastUsedModelForProfile(selectedProfile.id, model);
  saveLastUsedGeminiModel(model);
  return withLlmProfileApiKey(
    selectedProfile.id,
    () => selectedProfile.apiKey || '',
    (apiKey) =>
      generateGeminiTransform(
        withStreamOpts(
          {
            apiKey,
            model,
            instruction,
            systemPrompt,
            selectedText: '',
            requestOptions,
            ...visionPayload,
          },
          streamOpts,
        ),
      ),
    {
      missingKeyMessage:
        'Google AI Studio API 키가 설정되지 않았습니다. 설정 페이지에서 입력하세요.',
    },
  );
}

function parseGeneratedQuestion(
  raw: unknown,
  choiceCount: number,
  fallbackAnswer: number,
): Omit<QuizQuestion, 'id' | 'displayLabel'> {
  const obj = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
  const kind =
    obj.kind === 'subjective'
      ? 'subjective'
      : Array.isArray(obj.options)
        ? 'choice'
        : 'choice';
  if (kind === 'subjective') {
    return {
      kind: 'subjective',
      answerStyle: obj.answerStyle === 'essay' ? 'essay' : 'short',
      question: String(obj.question || '').trim(),
      modelAnswer: String(obj.modelAnswer || obj.answer || '').trim(),
      point: String(obj.point || '핵심 개념을 파악하세요.'),
      explanation: String(obj.explanation || '해설이 제공되지 않았습니다.'),
    };
  }
  const options = Array.isArray(obj.options)
    ? obj.options
        .map((o) => normalizeGeneratedChoiceOption(String(o || '')))
        .slice(0, choiceCount)
    : [];
  while (options.length < Math.min(2, choiceCount)) options.push('');
  const answer =
    Number.parseInt(String(obj.answer ?? fallbackAnswer), 10) || fallbackAnswer;
  return {
    kind: 'choice',
    question: String(obj.question || '').trim(),
    options,
    answer: Math.min(choiceCount, Math.max(1, answer)),
    point: String(obj.point || '핵심 개념을 파악하세요.'),
    explanation: String(obj.explanation || '해설이 제공되지 않았습니다.'),
    isGenerated: true,
  };
}

function runOpts(
  profiles: LlmProviderProfile[],
  instruction: string,
  systemPrompt: string,
  temperature: number,
  extras?: {
    signal?: AbortSignal;
    onChunk?: (accumulated: string) => void;
    profileId?: string;
    model?: string;
  },
): QuizLlmRunOptions {
  const base: QuizLlmRunOptions = {
    profiles,
    instruction,
    systemPrompt,
    temperature,
  };
  if (extras?.signal) base.signal = extras.signal;
  if (extras?.onChunk) base.onChunk = extras.onChunk;
  if (extras?.profileId?.trim()) base.profileId = extras.profileId.trim();
  if (extras?.model?.trim()) base.model = extras.model.trim();
  return base;
}

function signalExtra(signal?: AbortSignal): { signal?: AbortSignal } | undefined {
  return signal ? { signal } : undefined;
}

function streamExtra(opts: {
  signal?: AbortSignal | undefined;
  onChunk?: ((accumulated: string) => void) | undefined;
  profileId?: string | undefined;
  model?: string | undefined;
}): { signal?: AbortSignal; onChunk?: (accumulated: string) => void; profileId?: string; model?: string } | undefined {
  const out: {
    signal?: AbortSignal;
    onChunk?: (accumulated: string) => void;
    profileId?: string;
    model?: string;
  } = {};
  if (opts.signal) out.signal = opts.signal;
  if (opts.onChunk) out.onChunk = opts.onChunk;
  if (opts.profileId?.trim()) out.profileId = opts.profileId.trim();
  if (opts.model?.trim()) out.model = opts.model.trim();
  return out.signal || out.onChunk || out.profileId || out.model ? out : undefined;
}

export async function gradeSubjectiveAnswer(params: {
  profiles: LlmProviderProfile[];
  question: QuizQuestion;
  userAnswer: string;
  signal?: AbortSignal;
  onChunk?: (accumulated: string) => void;
}): Promise<SubjectiveGradeResult> {
  const settings = loadQuizSettings();
  const q = params.question;
  const style = q.answerStyle === 'essay' ? '서술형' : '단답형';
  const instruction = `다음 ${style} 주관식 문항의 수험자 답안을 채점하세요.

[문제]
${q.question}

[모범 답안 / 정답]
${q.modelAnswer || ''}

[접근 Point]
${q.point || ''}

[해설]
${q.explanation || ''}

[수험자 답안]
${params.userAnswer}

채점 규칙:
- 단답형: 동의어·표기 차이(대소문자, 공백, 단위)를 인정하세요.
- 서술형: 모범 답안과 접근 Point의 핵심이 포함되면 partial 이상을 주세요.
- score는 0~100 (correct≥90, partial 40~89, wrong<40).

JSON만 반환:
{"verdict":"correct"|"partial"|"wrong","score":0,"feedback":"...","rationale":"..."}`;

  const { parsed } = await runQuizLlmPromptForJson(
    runOpts(
      params.profiles,
      instruction,
      '당신은 공정한 시험 채점위원입니다. JSON만 반환하세요.',
      settings.gradeTemperature,
      streamExtra({
        signal: params.signal,
        onChunk: params.onChunk,
      }),
    ),
    { signal: params.signal },
  );
  return parseSubjectiveGradeResult(parsed);
}

export async function generateWrongChoiceExplanation(params: {
  profiles: LlmProviderProfile[];
  question: QuizQuestion;
  selectedOption: number;
  userInstructions?: string;
  profileId?: string;
  model?: string;
  signal?: AbortSignal;
  onChunk?: (accumulated: string) => void;
}): Promise<string> {
  const q = params.question;
  const opts = q.options || [];
  const selected = params.selectedOption;
  const isCorrectPick = selected === q.answer;
  const userBlock = params.userInstructions?.trim()
    ? `\n[수험자 추가 질문]\n${params.userInstructions.trim()}\n위 질문에도 답변하세요.`
    : '';
  const taskLine = isCorrectPick
    ? `수험자가 ${selected}번(정답)을 골랐습니다. 왜 정답인지, 다른 보기가 왜 틀렸는지 설명하세요. 중요한 단어는 반드시 **로 볼드 처리하세요.`
    : `수험자가 ${selected}번을 골랐습니다. 왜 오답인지 설명하세요. 중요한 단어는 반드시 **로 볼드 처리하세요.`;
  const instruction = `${taskLine}

[문제] ${q.question}
[보기]
${opts.map((o, i) => `${i + 1}. ${o}`).join('\n')}
[정답] ${q.answer}번
[선택한 보기] ${selected}번 (${opts[selected - 1] || ''})
[기존 해설] ${q.explanation || ''}
${userBlock}

설명 텍스트만 반환하세요.`;

  return runQuizLlmPrompt(
    runOpts(
      params.profiles,
      instruction,
      '당신은 시험 해설 작성자입니다.',
      0.5,
      streamExtra({
        signal: params.signal,
        onChunk: params.onChunk,
        profileId: params.profileId,
        model: params.model,
      }),
    ),
  );
}

export async function generateChoiceAnalysisFollowUp(params: {
  profiles: LlmProviderProfile[];
  question: QuizQuestion;
  selectedOption: number;
  existingAnalysis: string;
  userQuestion: string;
  profileId?: string;
  model?: string;
  signal?: AbortSignal;
  onChunk?: (accumulated: string) => void;
}): Promise<string> {
  const q = params.question;
  const opts = q.options || [];
  const selected = params.selectedOption;
  const instruction = `수험자가 객관식 문제 풀이 후 아래 분석 내용을 읽고 추가 질문을 했습니다. 문제, 보기, 기존 분석만 근거로 추가 질문에 답하세요.

[문제]
${q.question}

[보기]
${opts.map((o, i) => `${i + 1}. ${o}`).join('\n')}

[정답] ${q.answer}번
[수험자가 선택한 보기] ${selected}번 (${opts[selected - 1] || ''})
[기존 해설] ${q.explanation || ''}

[기존 오답/정답 분석]
${params.existingAnalysis.trim()}

[수험자 추가 질문]
${params.userQuestion.trim()}

응답 형식 (반드시 준수):
- 첫 줄은 반드시 **[추가 질문 답변: {질문 요약}]** 형식 (마크다운 볼드, 한 줄)
- 질문 요약은 수험자 질문의 핵심을 짧게 요약 (예: 지니 지수와 엔트로피의 수식적 차이)
- 그 다음 줄부터 답변 본문 (마크다운 가능)
- 서두 설명이나 JSON은 넣지 마세요.`;

  return runQuizLlmPrompt(
    runOpts(
      params.profiles,
      instruction,
      '당신은 시험 해설 튜터입니다. 문제와 기존 분석 내용만 근거로 답하세요.',
      0.5,
      streamExtra({
        signal: params.signal,
        onChunk: params.onChunk,
        profileId: params.profileId,
        model: params.model,
      }),
    ),
  );
}

export async function generateSimilarChoiceQuestion(params: {
  profiles: LlmProviderProfile[];
  question: QuizQuestion;
  config: QuizFileConfig;
  sourcePaths?: string[];
  readText?: QuizVaultTextReader;
  signal?: AbortSignal;
  onStep?: (update: QuizGenStepUpdate) => void;
}): Promise<Omit<QuizQuestion, 'id' | 'displayLabel'>> {
  const settings = loadQuizSettings();
  const q = params.question;
  const choiceCount = resolveQuestionChoiceCount(q, params.config.choiceCount || 4);
  const targetAnswer = Math.floor(Math.random() * choiceCount) + 1;
  const options = (q.options || []).map((o) => String(o || ''));
  const stemAnswer = q.answer && q.answer >= 1 ? q.answer : 1;
  const emit = (update: QuizGenStepUpdate) => params.onStep?.(update);

  let ragBlock = '';
  const sources = params.sourcePaths || [];
  if (sources.length > 0 && params.readText) {
    emit({ step: 'rag', status: 'running', detail: '근거 문서 검색 중…' });
    const { chunks } = await retrieveQuizContext({
      sourcePaths: sources,
      query: `${q.question}\n${q.point || ''}`,
      readText: params.readText,
    });
    ragBlock = formatRagChunksForPrompt(chunks);
    emit({
      step: 'rag',
      status: 'done',
      detail: chunks.length > 0 ? `${chunks.length}개 발췌` : '발췌 없음',
      llmInstruction: `query: ${q.question}`,
      llmResponse: truncateForGenerationLog(ragBlock || '(no excerpts)'),
    });
  }

  const complexity =
    settings.calcComplexity === 'hand'
      ? '[계산 난이도: 손으로 계산 가능]'
      : '[계산 난이도: 계산기 필수]';

  const analysisInstruction = buildSimilarAnalysisInstruction({
    question: q.question,
    options,
    answer: stemAnswer,
    point: q.point || '',
    explanation: q.explanation || '',
    ...(ragBlock ? { ragBlock } : {}),
  });

  const analysisTemp = Math.min(settings.temperature, 0.6);
  emit({
    step: 'analysis',
    status: 'running',
    detail: 'LLM 문항 분석 중…',
    llmInstruction: analysisInstruction,
    systemPrompt: SIMILAR_QUESTION_ANALYSIS_SYSTEM_PROMPT,
  });
  const { text: analysisText, parsed: analysisParsed } = await runQuizLlmPromptForJson(
    runOpts(
      params.profiles,
      analysisInstruction,
      SIMILAR_QUESTION_ANALYSIS_SYSTEM_PROMPT,
      analysisTemp,
      signalExtra(params.signal),
    ),
    {
      signal: params.signal,
      ...buildQuizGenJsonRetryHandlers(emit, 'analysis', {
        runningDetail: 'LLM 문항 분석 중…',
        llmInstruction: analysisInstruction,
        systemPrompt: SIMILAR_QUESTION_ANALYSIS_SYSTEM_PROMPT,
      }),
    },
  );
  const analysis = parseSimilarQuestionAnalysis(analysisParsed);
  emit({
    step: 'analysis',
    status: 'done',
    detail: `${analysis.coreCategory}${analysis.isCalculation ? ' · 계산문제' : ''}`,
    llmInstruction: analysisInstruction,
    llmResponse: truncateForGenerationLog(analysisText),
    systemPrompt: SIMILAR_QUESTION_ANALYSIS_SYSTEM_PROMPT,
  });

  const analysisBlock = formatAnalysisForPrompt(analysis);
  let sampledBlock = '';
  if (analysis.isCalculation && analysis.variables.length > 0) {
    emit({ step: 'randomize', status: 'running', detail: '수치 변수 샘플링…' });
    const samples = randomizeSimilarVariables(analysis.variables);
    sampledBlock = formatSampledVariablesForPrompt(samples);
    const sampleDetail = samples
      .map((s) => `${s.id}=${s.value}${s.unit ? s.unit : ''}`)
      .join(', ');
    emit({
      step: 'randomize',
      status: 'done',
      detail: sampleDetail,
      llmInstruction: formatAnalysisForPrompt(analysis),
      llmResponse: truncateForGenerationLog(
        JSON.stringify({ samples, variables: analysis.variables }, null, 2),
      ),
    });
  } else {
    emit({
      step: 'randomize',
      status: 'skipped',
      detail: '비계산 문항',
      llmResponse: truncateForGenerationLog(formatAnalysisForPrompt(analysis)),
    });
  }

  const generationInstruction = buildSimilarGenerationInstruction({
    question: q.question,
    options,
    answer: stemAnswer,
    point: q.point || '',
    explanation: q.explanation || '',
    choiceCount,
    targetAnswer,
    complexity,
    analysisBlock,
    sampledBlock,
    ...(ragBlock ? { ragBlock } : {}),
  });

  const genSystemPrompt = buildSimilarQuestionGenerationSystemPrompt(
    settings.systemPrompt || DEFAULT_QUIZ_SYSTEM_PROMPT,
  );
  emit({
    step: 'generate',
    status: 'running',
    detail: 'LLM 문항 작성 중…',
    llmInstruction: generationInstruction,
    systemPrompt: genSystemPrompt,
  });
  const { text, parsed } = await runQuizLlmPromptForJson(
    runOpts(
      params.profiles,
      generationInstruction,
      genSystemPrompt,
      settings.temperature,
      signalExtra(params.signal),
    ),
    {
      signal: params.signal,
      ...buildQuizGenJsonRetryHandlers(emit, 'generate', {
        runningDetail: 'LLM 문항 작성 중…',
        llmInstruction: generationInstruction,
        systemPrompt: genSystemPrompt,
      }),
    },
  );
  emit({
    step: 'generate',
    status: 'done',
    detail: `정답 ${targetAnswer}번`,
    llmInstruction: generationInstruction,
    llmResponse: truncateForGenerationLog(text),
    systemPrompt: genSystemPrompt,
  });

  let generated = parseGeneratedQuestion(parsed, choiceCount, targetAnswer);
  if (!hasCompleteSimilarQuestionSections(generated)) {
    const missingPoint = isWeakSimilarQuestionPoint(generated.point);
    const missingExplanation = isWeakSimilarQuestionExplanation(generated.explanation);
    const repairInstruction = buildSimilarSectionsRepairInstruction({
      question: generated.question,
      options: generated.options || [],
      answer: generated.answer || targetAnswer,
      analysisBlock,
      missingPoint,
      missingExplanation,
    });
    emit({
      step: 'generate',
      status: 'running',
      detail: '해설·접근 Point 보완 중…',
      llmInstruction: repairInstruction,
      systemPrompt: genSystemPrompt,
    });
    const { text: repairText, parsed: repairParsed } = await runQuizLlmPromptForJson(
      runOpts(
        params.profiles,
        repairInstruction,
        genSystemPrompt,
        Math.min(settings.temperature, 0.8),
        signalExtra(params.signal),
      ),
      {
        signal: params.signal,
        ...buildQuizGenJsonRetryHandlers(emit, 'generate', {
          runningDetail: '해설·접근 Point 보완 중…',
          llmInstruction: repairInstruction,
          systemPrompt: genSystemPrompt,
        }),
      },
    );
    const repairObj =
      repairParsed && typeof repairParsed === 'object'
        ? (repairParsed as Record<string, unknown>)
        : {};
    if (missingPoint && typeof repairObj.point === 'string' && repairObj.point.trim()) {
      generated = { ...generated, point: String(repairObj.point).trim() };
    }
    if (
      missingExplanation &&
      typeof repairObj.explanation === 'string' &&
      repairObj.explanation.trim()
    ) {
      generated = { ...generated, explanation: String(repairObj.explanation).trim() };
    }
    emit({
      step: 'generate',
      status: 'done',
      detail: hasCompleteSimilarQuestionSections(generated)
        ? '해설·접근 Point 보완 완료'
        : '해설·접근 Point 일부 보완',
      llmInstruction: repairInstruction,
      llmResponse: truncateForGenerationLog(repairText),
      systemPrompt: genSystemPrompt,
    });
  }

  return {
    ...generated,
    isGenerated: true,
  };
}

export async function generateDerivedQuestion(params: {
  profiles: LlmProviderProfile[];
  question: QuizQuestion;
  config: QuizFileConfig;
  target: QuizDerivedQuestionTarget;
  sourcePaths?: string[];
  readText?: QuizVaultTextReader;
  signal?: AbortSignal;
  onStep?: (update: QuizGenStepUpdate) => void;
}): Promise<Omit<QuizQuestion, 'id' | 'displayLabel'>> {
  const settings = loadQuizSettings();
  const q = params.question;
  const sourceChoiceCount = resolveQuestionChoiceCount(q, params.config.choiceCount || 4);
  const targetChoiceCount =
    params.target.kind === 'choice'
      ? clampChoiceCount(params.target.choiceCount)
      : sourceChoiceCount;
  const targetAnswer =
    params.target.kind === 'choice'
      ? Math.floor(Math.random() * targetChoiceCount) + 1
      : 1;
  const options = (q.options || []).map((o) => String(o || ''));
  const stemAnswer = q.answer && q.answer >= 1 ? q.answer : 1;
  const emit = (update: QuizGenStepUpdate) => params.onStep?.(update);

  let ragBlock = '';
  const sources = params.sourcePaths || [];
  if (sources.length > 0 && params.readText) {
    emit({ step: 'rag', status: 'running', detail: '근거 문서 검색 중…' });
    const query = [q.question, q.point || '', params.target.userPrompt || '']
      .filter(Boolean)
      .join('\n');
    const { chunks } = await retrieveQuizContext({
      sourcePaths: sources,
      query,
      readText: params.readText,
    });
    ragBlock = formatRagChunksForPrompt(chunks);
    emit({
      step: 'rag',
      status: 'done',
      detail: chunks.length > 0 ? `${chunks.length}개 발췌` : '발췌 없음',
      llmInstruction: `query: ${query}`,
      llmResponse: truncateForGenerationLog(ragBlock || '(no excerpts)'),
    });
  }

  const complexity =
    settings.calcComplexity === 'hand'
      ? '[계산 난이도: 손으로 계산 가능]'
      : '[계산 난이도: 계산기 필수]';

  const analysisInstruction = buildSimilarAnalysisInstruction({
    question: q.question,
    options,
    answer: q.kind === 'choice' ? stemAnswer : 1,
    point: q.point || '',
    explanation: q.explanation || '',
    ...(ragBlock ? { ragBlock } : {}),
  });

  const analysisTemp = Math.min(settings.temperature, 0.6);
  emit({
    step: 'analysis',
    status: 'running',
    detail: 'LLM 문항 분석 중…',
    llmInstruction: analysisInstruction,
    systemPrompt: SIMILAR_QUESTION_ANALYSIS_SYSTEM_PROMPT,
  });
  const { text: analysisText, parsed: analysisParsed } = await runQuizLlmPromptForJson(
    runOpts(
      params.profiles,
      analysisInstruction,
      SIMILAR_QUESTION_ANALYSIS_SYSTEM_PROMPT,
      analysisTemp,
      signalExtra(params.signal),
    ),
    {
      signal: params.signal,
      ...buildQuizGenJsonRetryHandlers(emit, 'analysis', {
        runningDetail: 'LLM 문항 분석 중…',
        llmInstruction: analysisInstruction,
        systemPrompt: SIMILAR_QUESTION_ANALYSIS_SYSTEM_PROMPT,
      }),
    },
  );
  const analysis = parseSimilarQuestionAnalysis(analysisParsed);
  emit({
    step: 'analysis',
    status: 'done',
    detail: `${analysis.coreCategory}${analysis.isCalculation ? ' · 계산문제' : ''}`,
    llmInstruction: analysisInstruction,
    llmResponse: truncateForGenerationLog(analysisText),
    systemPrompt: SIMILAR_QUESTION_ANALYSIS_SYSTEM_PROMPT,
  });

  const analysisBlock = formatAnalysisForPrompt(analysis);
  let sampledBlock = '';
  if (analysis.isCalculation && analysis.variables.length > 0) {
    emit({ step: 'randomize', status: 'running', detail: '수치 변수 샘플링…' });
    const samples = randomizeSimilarVariables(analysis.variables);
    sampledBlock = formatSampledVariablesForPrompt(samples);
    const sampleDetail = samples
      .map((s) => `${s.id}=${s.value}${s.unit ? s.unit : ''}`)
      .join(', ');
    emit({
      step: 'randomize',
      status: 'done',
      detail: sampleDetail,
      llmInstruction: formatAnalysisForPrompt(analysis),
      llmResponse: truncateForGenerationLog(
        JSON.stringify({ samples, variables: analysis.variables }, null, 2),
      ),
    });
  } else {
    emit({
      step: 'randomize',
      status: 'skipped',
      detail: '비계산 문항',
      llmResponse: truncateForGenerationLog(formatAnalysisForPrompt(analysis)),
    });
  }

  const generationInstruction = buildDerivedGenerationInstruction({
    question: q.question,
    options,
    answer: q.kind === 'choice' ? stemAnswer : 1,
    point: q.point || '',
    explanation: q.explanation || '',
    sourceKind: q.kind,
    ...(q.answerStyle ? { sourceAnswerStyle: q.answerStyle } : {}),
    target: params.target,
    complexity,
    analysisBlock,
    sampledBlock,
    ...(params.target.kind === 'choice' ? { targetAnswer } : {}),
    ...(ragBlock ? { ragBlock } : {}),
  });

  const genSystemPrompt = buildDerivedQuestionGenerationSystemPrompt(
    settings.systemPrompt || DEFAULT_QUIZ_SYSTEM_PROMPT,
  );
  emit({
    step: 'generate',
    status: 'running',
    detail: '파생 문항 작성 중…',
    llmInstruction: generationInstruction,
    systemPrompt: genSystemPrompt,
  });
  const { text, parsed } = await runQuizLlmPromptForJson(
    runOpts(
      params.profiles,
      generationInstruction,
      genSystemPrompt,
      settings.temperature,
      signalExtra(params.signal),
    ),
    {
      signal: params.signal,
      ...buildQuizGenJsonRetryHandlers(emit, 'generate', {
        runningDetail: '파생 문항 작성 중…',
        llmInstruction: generationInstruction,
        systemPrompt: genSystemPrompt,
      }),
    },
  );
  emit({
    step: 'generate',
    status: 'done',
    detail:
      params.target.kind === 'choice'
        ? `정답 ${targetAnswer}번 · ${targetChoiceCount}지선다`
        : params.target.answerStyle === 'essay'
          ? '서술형'
          : '단답형',
    llmInstruction: generationInstruction,
    llmResponse: truncateForGenerationLog(text),
    systemPrompt: genSystemPrompt,
  });

  let generated = parseGeneratedQuestion(parsed, targetChoiceCount, targetAnswer);
  if (params.target.kind === 'subjective') {
    generated = {
      kind: 'subjective',
      answerStyle: params.target.answerStyle === 'essay' ? 'essay' : 'short',
      question: generated.question,
      modelAnswer: generated.modelAnswer || '',
      point: generated.point,
      explanation: generated.explanation,
      isGenerated: true,
    };
  } else {
    generated = {
      kind: 'choice',
      question: generated.question,
      options: resizeChoiceOptions(generated.options || [], targetChoiceCount),
      answer: Math.min(targetChoiceCount, Math.max(1, generated.answer || targetAnswer)),
      point: generated.point,
      explanation: generated.explanation,
      isGenerated: true,
    };
  }

  if (!hasCompleteSimilarQuestionSections(generated)) {
    const missingPoint = isWeakSimilarQuestionPoint(generated.point);
    const missingExplanation = isWeakSimilarQuestionExplanation(generated.explanation);
    const repairInstruction = buildSimilarSectionsRepairInstruction({
      question: generated.question,
      options: generated.kind === 'choice' ? generated.options || [] : [],
      answer:
        generated.kind === 'choice' && generated.answer ? generated.answer : targetAnswer,
      analysisBlock,
      missingPoint,
      missingExplanation,
    });
    emit({
      step: 'generate',
      status: 'running',
      detail: '해설·접근 Point 보완 중…',
      llmInstruction: repairInstruction,
      systemPrompt: genSystemPrompt,
    });
    const { text: repairText, parsed: repairParsed } = await runQuizLlmPromptForJson(
      runOpts(
        params.profiles,
        repairInstruction,
        genSystemPrompt,
        Math.min(settings.temperature, 0.8),
        signalExtra(params.signal),
      ),
      {
        signal: params.signal,
        ...buildQuizGenJsonRetryHandlers(emit, 'generate', {
          runningDetail: '해설·접근 Point 보완 중…',
          llmInstruction: repairInstruction,
          systemPrompt: genSystemPrompt,
        }),
      },
    );
    const repairObj =
      repairParsed && typeof repairParsed === 'object'
        ? (repairParsed as Record<string, unknown>)
        : {};
    if (missingPoint && typeof repairObj.point === 'string' && repairObj.point.trim()) {
      generated = { ...generated, point: String(repairObj.point).trim() };
    }
    if (
      missingExplanation &&
      typeof repairObj.explanation === 'string' &&
      repairObj.explanation.trim()
    ) {
      generated = { ...generated, explanation: String(repairObj.explanation).trim() };
    }
    emit({
      step: 'generate',
      status: 'done',
      detail: hasCompleteSimilarQuestionSections(generated)
        ? '해설·접근 Point 보완 완료'
        : '해설·접근 Point 일부 보완',
      llmInstruction: repairInstruction,
      llmResponse: truncateForGenerationLog(repairText),
      systemPrompt: genSystemPrompt,
    });
  }

  return {
    ...generated,
    isGenerated: true,
  };
}

const QUESTION_SECTIONS_SYSTEM_PROMPT = `당신은 시험 해설·접근 Point 작성자입니다.
주어진 문항만 근거로 접근 Point와 해설을 작성합니다.
- 접근 Point: 출제 의도를 매우 간결하게. 핵심 사고 포인트만.
- 해설: 정답 근거·함정·풀이 흐름이 드러나는 완결된 해설. 마크다운 사용 가능.
- placeholder 문구나 빈 문자열로 채우지 마세요.
응답은 요청된 JSON만 반환하세요.`;

export type QuestionSectionsResult = {
  point?: string;
  explanation?: string;
};

/**
 * Generate missing 접근 Point and/or 해설 for an existing quiz item.
 */
export async function generateQuestionSections(params: {
  profiles: LlmProviderProfile[];
  question: QuizQuestion;
  missingPoint: boolean;
  missingExplanation: boolean;
  sourcePaths?: string[];
  readText?: QuizVaultTextReader;
  profileId?: string;
  model?: string;
  signal?: AbortSignal;
  onChunk?: (accumulated: string) => void;
}): Promise<QuestionSectionsResult> {
  const settings = loadQuizSettings();
  const q = params.question;
  if (!params.missingPoint && !params.missingExplanation) {
    return {};
  }

  let ragBlock = '';
  const sources = params.sourcePaths || [];
  if (sources.length > 0 && params.readText) {
    const query = [q.question, q.point || '', q.explanation || ''].filter(Boolean).join('\n');
    const { chunks } = await retrieveQuizContext({
      sourcePaths: sources,
      query,
      readText: params.readText,
    });
    ragBlock = formatRagChunksForPrompt(chunks);
  }

  const instruction = buildQuestionSectionsInstruction({
    question: q,
    missingPoint: params.missingPoint,
    missingExplanation: params.missingExplanation,
    ...(ragBlock ? { ragBlock } : {}),
  });

  const { parsed } = await runQuizLlmPromptForJson(
    runOpts(
      params.profiles,
      instruction,
      settings.systemPrompt?.trim() || QUESTION_SECTIONS_SYSTEM_PROMPT,
      Math.min(settings.temperature, 0.8),
      streamExtra({
        signal: params.signal,
        onChunk: params.onChunk,
        profileId: params.profileId,
        model: params.model,
      }),
    ),
    { signal: params.signal },
  );
  const obj =
    parsed && typeof parsed === 'object' && !Array.isArray(parsed)
      ? (parsed as Record<string, unknown>)
      : {};

  const result: QuestionSectionsResult = {};
  if (
    params.missingPoint &&
    typeof obj.point === 'string' &&
    obj.point.trim() &&
    !isWeakSimilarQuestionPoint(obj.point)
  ) {
    result.point = String(obj.point).trim();
  }
  if (
    params.missingExplanation &&
    typeof obj.explanation === 'string' &&
    obj.explanation.trim() &&
    !isWeakSimilarQuestionExplanation(obj.explanation)
  ) {
    result.explanation = String(obj.explanation).trim();
  }
  return result;
}

export async function generateQuestionsFromSources(params: {
  profiles: LlmProviderProfile[];
  config: QuizFileConfig;
  sourcePaths: string[];
  topic?: string;
  kind?: 'choice' | 'subjective';
  count?: number;
  /** Existing quiz items used as examples for what to extract in summaries. */
  exampleQuestions?: QuizQuestion[];
  readText: QuizVaultTextReader;
  signal?: AbortSignal;
  onProgress?: (message: string) => void;
  onStep?: (update: QuizGenStepUpdate) => void;
  onChunk?: (update: QuizGenStepUpdate) => void;
}): Promise<Array<Omit<QuizQuestion, 'id' | 'displayLabel'>>> {
  const settings = loadQuizSettings();
  const examples = Array.isArray(params.exampleQuestions)
    ? params.exampleQuestions
    : [];
  const lastChoice = [...examples].reverse().find((q) => q.kind === 'choice');
  const choiceCount = lastChoice
    ? resolveQuestionChoiceCount(lastChoice, params.config.choiceCount || 4)
    : params.config.choiceCount || 4;
  const count = Math.min(5, Math.max(1, params.count || 1));
  const kind = params.kind || 'choice';
  const topic = (params.topic || '').trim();
  const emit = (update: QuizGenStepUpdate) => params.onStep?.(update);
  const emitStream = (update: QuizGenStepUpdate) => {
    params.onStep?.(update);
    params.onChunk?.(update);
  };

  emit({ step: 'load_sources', status: 'running', detail: '문서 읽기 중…' });
  params.onProgress?.('근거 문서 로드 중…');
  const bodies = await loadQuizSourceBodies(
    params.sourcePaths,
    params.readText,
    settings.ragMaxChars,
  );
  if (!bodies.length) {
    emit({
      step: 'load_sources',
      status: 'error',
      error: '근거 문서에서 내용을 읽지 못했습니다.',
    });
    throw new Error('근거 문서에서 내용을 읽지 못했습니다.');
  }
  emit({
    step: 'load_sources',
    status: 'done',
    detail: `${bodies.length}개 문서`,
    llmResponse: truncateForGenerationLog(
      bodies
        .map((b) => `- ${b.path} (${b.text.length.toLocaleString()} chars)`)
        .join('\n'),
    ),
  });

  const exampleBlock = formatExampleQuestionsForPrompt(examples);
  const summaries: SourceDocSummary[] = [];
  let summarizeLog = '';

  for (let i = 0; i < bodies.length; i += 1) {
    const body = bodies[i];
    if (!body) continue;
    if (params.signal?.aborted) {
      throw new DOMException('Aborted', 'AbortError');
    }
    const progressLabel = `문서 요약 ${i + 1}/${bodies.length}: ${body.path}`;
    const summaryInstruction = `[출제 참고 문항 예시]
제시된 문항 스타일·개념 범위를 참고해, 아래 원문에서 출제에 필요한 정보만 주제별로 상세 요약하세요.

${exampleBlock}

[사용자 주제]
${topic || '(예시 문항·문서 핵심 개념)'}

[근거 문서 경로]
${body.path}

[근거 문서 본문]
${body.text}

위 본문을 주제별 마크다운 요약으로만 작성하세요.`;

    emit({
      step: 'summarize',
      status: 'running',
      detail: progressLabel,
      llmInstruction: summaryInstruction,
      systemPrompt: SOURCE_SUMMARY_SYSTEM_PROMPT,
      ...(summarizeLog ? { llmResponse: summarizeLog } : {}),
    });
    params.onProgress?.(progressLabel);

    const summary = await runQuizLlmPrompt(
      runOpts(
        params.profiles,
        summaryInstruction,
        SOURCE_SUMMARY_SYSTEM_PROMPT,
        Math.min(settings.temperature, 0.7),
        streamExtra({
          signal: params.signal,
          onChunk: (accumulated) => {
            emitStream({
              step: 'summarize',
              status: 'running',
              detail: progressLabel,
              llmInstruction: summaryInstruction,
              systemPrompt: SOURCE_SUMMARY_SYSTEM_PROMPT,
              llmResponse: accumulated,
            });
          },
        }),
      ),
    );
    const cleaned = String(summary || '').trim();
    if (cleaned) {
      summaries.push({ path: body.path, summary: cleaned });
      summarizeLog += `### ${body.path}\n\n${truncateForGenerationLog(cleaned, 24_000)}\n\n---\n\n`;
      emit({
        step: 'summarize',
        status: 'running',
        detail: progressLabel,
        llmInstruction: summaryInstruction,
        systemPrompt: SOURCE_SUMMARY_SYSTEM_PROMPT,
        llmResponse: summarizeLog,
      });
    }
  }

  if (!summaries.length) {
    emit({
      step: 'summarize',
      status: 'error',
      error: '근거 문서 요약에 실패했습니다.',
    });
    throw new Error('근거 문서 요약에 실패했습니다.');
  }

  emit({
    step: 'summarize',
    status: 'done',
    detail: `${summaries.length}개 요약 완료`,
    llmResponse: truncateForGenerationLog(summarizeLog),
    systemPrompt: SOURCE_SUMMARY_SYSTEM_PROMPT,
  });

  params.onProgress?.('요약본으로 문항 생성 중…');
  const summariesBlock = summaries
    .map(
      (s, i) =>
        `### 요약본 ${i + 1}\n경로: ${s.path}\n\n${s.summary}`,
    )
    .join('\n\n---\n\n');

  const genInstruction = `[근거 문서 요약본 (${summaries.length}개)]
아래 요약본만 사실 근거로 사용하세요. 요약에 없는 내용은 쓰지 마세요.

${summariesBlock}

[출제 지시]
주제: ${topic || '(요약본의 핵심 개념)'}
문항 유형: ${kind === 'subjective' ? '주관식' : `객관식 ${choiceCount}지선다`}
생성 개수: ${count}

기존 문항 스타일 참고:
${exampleBlock}

JSON 배열만 반환하세요.`;

  const genSystemPrompt = buildSourceGenerationSystemPrompt(kind, choiceCount, count);
  emit({
    step: 'generate',
    status: 'running',
    detail: 'LLM 문항 작성 중…',
    llmInstruction: genInstruction,
    systemPrompt: genSystemPrompt,
  });

  const { text, parsed } = await runQuizLlmPromptForJson(
    runOpts(
      params.profiles,
      genInstruction,
      genSystemPrompt,
      settings.temperature,
      streamExtra({
        signal: params.signal,
        onChunk: (accumulated) => {
          emitStream({
            step: 'generate',
            status: 'running',
            detail: 'LLM 문항 작성 중…',
            llmInstruction: genInstruction,
            systemPrompt: genSystemPrompt,
            llmResponse: accumulated,
          });
        },
      }),
    ),
    {
      signal: params.signal,
      ...buildQuizGenJsonRetryHandlers(emit, 'generate', {
        runningDetail: 'LLM 문항 작성 중…',
        llmInstruction: genInstruction,
        systemPrompt: genSystemPrompt,
      }),
    },
  );
  const list = Array.isArray(parsed) ? parsed : [parsed];
  emit({
    step: 'generate',
    status: 'done',
    detail: `${Math.min(list.length, count)}개 문항`,
    llmInstruction: genInstruction,
    llmResponse: truncateForGenerationLog(text),
    systemPrompt: genSystemPrompt,
  });
  return list.slice(0, count).map((item, i) => {
    if (kind === 'subjective') {
      const forced =
        item && typeof item === 'object'
          ? { ...(item as object), kind: 'subjective' }
          : { kind: 'subjective' };
      return {
        ...parseGeneratedQuestion(forced, choiceCount, (i % choiceCount) + 1),
        isGenerated: true,
      };
    }
    return {
      ...parseGeneratedQuestion(item, choiceCount, (i % choiceCount) + 1),
      isGenerated: true,
    };
  });
}

const FIX_QUESTION_SYSTEM_PROMPT = `당신은 시험 문항 편집자입니다. 불완전하거나 오류가 있는 문항을 교정·재작성합니다.
- 사실 관계를 바로잡고, 지문·선택지·정답·해설이 시험에 쓸 수 있을 만큼 완결되게 만드세요.
- 사용자가 방향을 제시하면 그에 맞게 주제·난이도·형식을 조정할 수 있습니다.
- 근거 발췌가 있으면 그 범위 안에서만 사실을 사용하세요. 없는 내용을 지어내지 마세요.
- 객관식 선택지 안에서는 인라인 수식($...$)만 사용하세요.
- 응답은 JSON 객체 하나만 반환하세요. 다른 텍스트·마크다운·코드펜스는 금지합니다.`;

function formatQuestionSnapshotForFix(q: QuizQuestion, choiceCount: number): string {
  const lines: string[] = [
    `[유형] ${q.kind}${q.kind === 'subjective' ? ` / ${q.answerStyle || 'short'}` : ''}`,
    `[질문]\n${q.question || '(비어 있음)'}`,
  ];
  if (q.kind === 'choice') {
    const opts = q.options || [];
    lines.push('[선택지]');
    for (let i = 0; i < choiceCount; i += 1) {
      const text = opts[i] || '(비어 있음)';
      const mark = q.answer === i + 1 ? ' ← 현재 정답' : '';
      lines.push(`${i + 1}. ${text}${mark}`);
    }
  } else {
    lines.push(`[모범 답안 / 정답]\n${q.modelAnswer || '(비어 있음)'}`);
  }
  lines.push(`[접근 Point]\n${q.point || '(없음)'}`);
  lines.push(`[해설]\n${q.explanation || '(없음)'}`);
  return lines.join('\n\n');
}

function buildFixQuestionInstruction(params: {
  question: QuizQuestion;
  config: QuizFileConfig;
  userInstructions?: string;
  ragBlock?: string;
}): string {
  const choiceCount = params.config.choiceCount || 4;
  const q = params.question;
  const userBlock = String(params.userInstructions || '').trim();
  const kindHint =
    q.kind === 'subjective'
      ? `주관식(${q.answerStyle === 'essay' ? '서술형' : '단답형'})을 유지하세요. 사용자가 유형 변경을 명시하지 않았다면 객관식으로 바꾸지 마세요.`
      : `객관식 ${choiceCount}지선다를 유지하세요. options 길이는 정확히 ${choiceCount}, answer는 1~${choiceCount} 정수입니다.`;

  const schema =
    q.kind === 'subjective'
      ? `{"kind":"subjective","answerStyle":"short"|"essay","question":"...","modelAnswer":"...","point":"...","explanation":"..."}`
      : `{"kind":"choice","question":"...","options":[${Array.from({ length: choiceCount }, () => '"..."').join(',')}],"answer":1,"point":"...","explanation":"..."}`;

  return `다음 문항은 불완전하거나 오류가 있다고 간주됩니다. 교정된 완성 문항을 JSON으로 반환하세요.

${formatQuestionSnapshotForFix(q, choiceCount)}

${userBlock ? `[사용자 요구사항]\n${userBlock}\n` : ''}${params.ragBlock ? `\n[근거 발췌]\n${params.ragBlock}\n` : ''}
규칙:
- ${kindHint}
- 질문·해설·Point는 마크다운을 사용할 수 있습니다.
- 사용자 요구사항이 있으면 문항 방향·주제·난이도에 반영하세요.
- 스키마: ${schema}`;
}

/**
 * Rewrite a defective quiz item using LLM (optional user steering + RAG).
 */
export async function generateFixedQuizQuestion(params: {
  profiles: LlmProviderProfile[];
  question: QuizQuestion;
  config: QuizFileConfig;
  userInstructions?: string;
  sourcePaths?: string[];
  readText?: QuizVaultTextReader;
  signal?: AbortSignal;
  onStep?: (update: QuizGenStepUpdate) => void;
  onChunk?: (accumulated: string) => void;
}): Promise<Omit<QuizQuestion, 'id' | 'displayLabel'>> {
  const settings = loadQuizSettings();
  const q = params.question;
  const choiceCount = resolveQuestionChoiceCount(q, params.config.choiceCount || 4);
  const emit = (update: QuizGenStepUpdate) => params.onStep?.(update);
  const fallbackAnswer =
    q.kind === 'choice' && q.answer && q.answer >= 1
      ? Math.min(choiceCount, q.answer)
      : 1;

  let ragBlock = '';
  const sources = params.sourcePaths || [];
  if (sources.length > 0 && params.readText) {
    emit({ step: 'rag', status: 'running', detail: '근거 문서 검색 중…' });
    const query = [
      q.question,
      q.point || '',
      String(params.userInstructions || '').trim(),
    ]
      .filter(Boolean)
      .join('\n');
    const { chunks } = await retrieveQuizContext({
      sourcePaths: sources,
      query,
      readText: params.readText,
    });
    ragBlock = formatRagChunksForPrompt(chunks);
    emit({
      step: 'rag',
      status: 'done',
      detail: chunks.length > 0 ? `${chunks.length}개 발췌` : '발췌 없음',
    });
  } else {
    emit({ step: 'rag', status: 'skipped', detail: '근거 없음' });
  }

  const instruction = buildFixQuestionInstruction({
    question: q,
    config: params.config,
    ...(String(params.userInstructions || '').trim()
      ? { userInstructions: String(params.userInstructions).trim() }
      : {}),
    ...(ragBlock ? { ragBlock } : {}),
  });

  emit({ step: 'generate', status: 'running', detail: '문항 교정 중…', llmInstruction: instruction, systemPrompt: FIX_QUESTION_SYSTEM_PROMPT });
  const { text, parsed } = await runQuizLlmPromptForJson(
    runOpts(
      params.profiles,
      instruction,
      FIX_QUESTION_SYSTEM_PROMPT,
      settings.temperature,
      streamExtra({
        signal: params.signal,
        onChunk: params.onChunk,
      }),
    ),
    {
      signal: params.signal,
      ...buildQuizGenJsonRetryHandlers(emit, 'generate', {
        runningDetail: '문항 교정 중…',
        llmInstruction: instruction,
        systemPrompt: FIX_QUESTION_SYSTEM_PROMPT,
      }),
    },
  );
  const obj =
    parsed && typeof parsed === 'object' && !Array.isArray(parsed)
      ? parsed
      : Array.isArray(parsed) && parsed[0]
        ? parsed[0]
        : parsed;
  emit({
    step: 'generate',
    status: 'done',
    detail: '교정 완료',
    llmInstruction: instruction,
    llmResponse: truncateForGenerationLog(text),
    systemPrompt: FIX_QUESTION_SYSTEM_PROMPT,
  });
  return parseGeneratedQuestion(obj, choiceCount, fallbackAnswer);
}

function buildImageQuestionsSystemPrompt(
  kind: 'choice' | 'subjective',
  choiceCount: number,
  answerStyle: 'short' | 'essay',
): string {
  if (kind === 'subjective') {
    return `당신은 시험 출제위원입니다. 첨부 이미지(시험지, 교재, 도표, 그림 등)를 분석해 학습·평가용 문항을 만듭니다.
- 이미지에 보이는 모든 문항을 빠짐없이 추출하세요. 문항이 1개면 배열 길이 1입니다.
- 이미지에 보이는 내용만 사용하고, 보이지 않는 사실을 만들지 마세요.
- OCR 텍스트·도표·그림의 의미를 정확히 반영하세요.
- 질문·해설·Point는 마크다운을 사용할 수 있습니다.
- 문항 번호가 보이면 각 객체에 questionNumber(정수)를 포함하세요.
- 응답은 JSON 배열만 반환하세요. 다른 텍스트·마크다운·코드펜스는 금지합니다.
스키마:
[{"questionNumber":1,"kind":"subjective","answerStyle":"${answerStyle}","question":"...","modelAnswer":"...","point":"...","explanation":"..."}]`;
  }
  return `당신은 시험 출제위원입니다. 첨부 이미지(시험지, 교재, 도표, 그림 등)를 분석해 객관식 문항을 만듭니다.
- 이미지에 보이는 모든 문항을 빠짐없이 추출하세요. 문항이 1개면 배열 길이 1입니다.
- 이미지에 보이는 내용만 사용하고, 보이지 않는 사실을 만들지 마세요.
- OCR 텍스트·도표·그림의 의미를 정확히 반영하세요.
- 질문·해설·Point는 마크다운을 사용할 수 있습니다.
- 선택지(options) 안에서는 인라인 수식($...$)만 사용하세요.
- options 각 항목에는 보기 번호 접두사(1., 2., a., 가. 등)를 넣지 마세요.
- 문항 번호가 보이면 각 객체에 questionNumber(정수)를 포함하세요.
- 정답이 이미지에 없으면 answer는 1로 두세요(별도 정답표로 덮어쓸 수 있음).
- 응답은 JSON 배열만 반환하세요. 다른 텍스트·마크다운·코드펜스는 금지합니다.
스키마:
[{"questionNumber":1,"question":"...","options":[${Array.from({ length: choiceCount }, () => '"..."').join(',')}],"answer":1,"point":"...","explanation":"..."}]
- options 길이는 정확히 ${choiceCount}
- answer는 1~${choiceCount} 정수`;
}

function buildImageQuestionsInstruction(params: {
  kind: 'choice' | 'subjective';
  answerStyle: 'short' | 'essay';
  choiceCount: number;
  userInstructions?: string;
}): string {
  const kindLabel =
    params.kind === 'choice'
      ? `객관식 ${params.choiceCount}지선다`
      : params.answerStyle === 'essay'
        ? '서술형'
        : '단답형';
  const userBlock = String(params.userInstructions || '').trim();
  return `[요청]
첨부 이미지를 분석해 보이는 ${kindLabel} 문항을 모두 작성하세요.
${userBlock ? `\n[추가 지시]\n${userBlock}\n` : ''}
이미지에 문제·지문·도표가 있으면 그 내용을 바탕으로, 없으면 이미지가 다루는 핵심 개념을 평가하는 문항을 만드세요.
시험지에 여러 문항이 있으면 각 문항을 배열 원소로 분리하세요.`;
}

const ANSWER_KEY_IMAGE_SYSTEM_PROMPT = `당신은 시험 정답표 OCR 전문가입니다. 첨부 이미지의 정답표를 읽어 문항 번호와 정답 보기 번호를 추출합니다.
- 표·목록·두 줄 그리드 등 어떤 형식이든 문항 번호와 정답만 정확히 읽으세요.
- 정답은 1~10 정수(①→1, ②→2, a→1, 가→1 등으로 변환).
- 응답은 JSON 객체 하나만 반환하세요. 다른 텍스트·마크다운·코드펜스는 금지합니다.
스키마:
{"entries":[{"questionNumber":1,"answer":3},{"questionNumber":2,"answer":1}]}`;

function buildAnswerKeyImageInstruction(): string {
  return `[요청]
첨부 정답표 이미지에서 문항 번호와 정답 보기 번호를 모두 추출하세요.
문항 번호 순으로 entries 배열에 넣으세요.`;
}

function normalizeParsedQuestionItems(parsed: unknown): unknown[] {
  if (Array.isArray(parsed)) return parsed;
  if (parsed && typeof parsed === 'object') {
    const obj = parsed as Record<string, unknown>;
    if (Array.isArray(obj.questions)) return obj.questions;
    if (Array.isArray(obj.items)) return obj.items;
    return [parsed];
  }
  return [];
}

function parseGeneratedQuestionsArray(
  parsed: unknown,
  choiceCount: number,
): Omit<QuizQuestion, 'id' | 'displayLabel'>[] {
  return normalizeParsedQuestionItems(parsed)
    .filter((item) => item && typeof item === 'object')
    .map((item) => parseGeneratedQuestion(item, choiceCount, 1));
}

function generatedQuestionToAddForm(
  generated: Omit<QuizQuestion, 'id' | 'displayLabel'>,
  choiceCount: number,
): Omit<QuizAddQuestionForm, 'displayLabel'> {
  const base = {
    question: generated.question,
    point: generated.point,
    explanation: generated.explanation,
  };
  if (generated.kind === 'subjective') {
    return {
      ...base,
      kind: 'subjective',
      answerStyle: generated.answerStyle === 'essay' ? 'essay' : 'short',
      modelAnswer: generated.modelAnswer || '',
    };
  }
  return {
    ...base,
    kind: 'choice',
    options: resizeChoiceOptions(generated.options || [], choiceCount),
    answer: generated.answer || 1,
  };
}

async function resolveAnswerKeyEntries(params: {
  profiles: LlmProviderProfile[];
  answerKeyText?: string;
  answerKeyImage?: QuizLlmImageInput;
  signal?: AbortSignal;
  onChunk?: (accumulated: string) => void;
}): Promise<AnswerKeyEntry[]> {
  const textEntries = parseAnswerKeyTableText(String(params.answerKeyText || ''));
  if (textEntries.length) return textEntries;
  if (!params.answerKeyImage) return [];
  return extractAnswerKeyFromImage({
    profiles: params.profiles,
    image: params.answerKeyImage,
    ...(params.signal ? { signal: params.signal } : {}),
    ...(params.onChunk ? { onChunk: params.onChunk } : {}),
  });
}

/**
 * Read an answer-key image with a vision LLM.
 */
export async function extractAnswerKeyFromImage(params: {
  profiles: LlmProviderProfile[];
  image: QuizLlmImageInput;
  signal?: AbortSignal;
  onChunk?: (accumulated: string) => void;
}): Promise<AnswerKeyEntry[]> {
  const settings = loadQuizSettings();
  const { parsed } = await runQuizLlmPromptForJson(
    {
      ...runOpts(
        params.profiles,
        buildAnswerKeyImageInstruction(),
        ANSWER_KEY_IMAGE_SYSTEM_PROMPT,
        settings.temperature,
        streamExtra({
          signal: params.signal,
          onChunk: params.onChunk,
        }),
      ),
      images: [params.image],
    },
    { signal: params.signal },
  );
  return parseAnswerKeyEntriesFromLlmJson(parsed);
}

/**
 * Analyze an attached image with a vision LLM and draft quiz question(s).
 */
export async function generateQuestionsFromImage(params: {
  profiles: LlmProviderProfile[];
  image: QuizLlmImageInput;
  kind: 'choice' | 'subjective';
  answerStyle?: 'short' | 'essay';
  choiceCount: number;
  userInstructions?: string;
  answerKeyText?: string;
  answerKeyImage?: QuizLlmImageInput;
  signal?: AbortSignal;
  onChunk?: (accumulated: string) => void;
}): Promise<Omit<QuizAddQuestionForm, 'displayLabel'>[]> {
  const settings = loadQuizSettings();
  const choiceCount = clampChoiceCount(params.choiceCount);
  const kind = params.kind;
  const answerStyle = params.answerStyle === 'essay' ? 'essay' : 'short';
  const systemPrompt = buildImageQuestionsSystemPrompt(kind, choiceCount, answerStyle);
  const instruction = buildImageQuestionsInstruction({
    kind,
    answerStyle,
    choiceCount,
    ...(String(params.userInstructions || '').trim()
      ? { userInstructions: String(params.userInstructions).trim() }
      : {}),
  });

  const { parsed } = await runQuizLlmPromptForJson(
    {
      ...runOpts(
        params.profiles,
        instruction,
        systemPrompt,
        settings.temperature,
        streamExtra({
          signal: params.signal,
          onChunk: params.onChunk,
        }),
      ),
      images: [params.image],
    },
    { signal: params.signal },
  );

  let forms = parseGeneratedQuestionsArray(parsed, choiceCount).map((generated) =>
    generatedQuestionToAddForm(generated, choiceCount),
  );
  if (!forms.length) {
    throw new Error('이미지에서 문항을 인식하지 못했습니다.');
  }

  const answerKeyEntries = await resolveAnswerKeyEntries({
    profiles: params.profiles,
    ...(String(params.answerKeyText || '').trim()
      ? { answerKeyText: String(params.answerKeyText).trim() }
      : {}),
    ...(params.answerKeyImage ? { answerKeyImage: params.answerKeyImage } : {}),
    ...(params.signal ? { signal: params.signal } : {}),
    ...(params.onChunk ? { onChunk: params.onChunk } : {}),
  });
  if (answerKeyEntries.length && kind === 'choice') {
    forms = applyAnswerKeyToForms(forms, answerKeyEntries, choiceCount);
  }

  return forms;
}

/**
 * Analyze an attached image with a vision LLM and draft one quiz question.
 */
export async function generateQuestionFromImage(params: {
  profiles: LlmProviderProfile[];
  image: QuizLlmImageInput;
  kind: 'choice' | 'subjective';
  answerStyle?: 'short' | 'essay';
  choiceCount: number;
  userInstructions?: string;
  answerKeyText?: string;
  answerKeyImage?: QuizLlmImageInput;
  signal?: AbortSignal;
  onChunk?: (accumulated: string) => void;
}): Promise<Omit<QuizAddQuestionForm, 'displayLabel'>> {
  const [first] = await generateQuestionsFromImage(params);
  if (!first) throw new Error('이미지에서 문항을 인식하지 못했습니다.');
  return first;
}

const QUIZ_MARKDOWN_IMAGE_EXAMPLE = `### 1. 맵리듀스에 대한 설명으로 가장 적절한 것은?

1. Map 단계에서 키-값 변환 후 Reduce에서 집계한다. *(정답)*
2. 실시간 스트리밍 전용이다.
3. Reduce가 Map보다 먼저 수행된다.
4. 단일 서버에서만 실행된다.

> **💡 접근 Point!**
> Map → Shuffle → Reduce
>
> **📖 해설:**
> 맵리듀스는 분산 처리 프로그래밍 모델이다.

---

### 2. [단답형] HDFS의 기본 블록 크기 단위는?

**정답:** 128MB

> **💡 접근 Point!**
> Hadoop 2.x 기본값을 기억하세요.
>
> **📖 해설:**
> 블록 크기는 설정으로 변경할 수 있습니다.`;

function buildQuizMarkdownFromImageSystemPrompt(choiceCount: number): string {
  return `당신은 시험지 OCR·퀴즈 마크다운 변환 전문가입니다. 첨부 이미지(시험지, 문제집, 스크린샷 등)의 내용을 s3haim .quiz.md 본문 형식의 마크다운으로 변환합니다.

규칙:
- 이미지에 보이는 문항만 변환하고, 보이지 않는 내용을 만들지 마세요.
- 응답은 마크다운 본문만 출력하세요. JSON·코드펜스·서두 설명은 금지합니다.
- quiz-config / quiz-session HTML 주석은 넣지 마세요.
- 객관식: ### N. 질문 제목 (본문이 있으면 빈 줄 후 이어서)
- 객관식 보기: 1. … 형식, 정답 보기 끝에 *(정답)* 표시
- 객관식 보기 개수: 이미지에 맞추되 최대 ${choiceCount}개 (부족하면 빈 보기 없이 실제 개수만)
- 단답형: ### N. [단답형] 질문 … 다음 줄 **정답:** …
- 서술형: ### N. [주관식] 질문 … > **📖 모범 답안:** 블록인용
- 각 문항 끝에 접근 Point·해설 블록인용(내용이 없으면 짧게 작성):
  > **💡 접근 Point!**
  > …
  >
  > **📖 해설:**
  > …
- 문항 사이는 --- 로 구분
- 수식은 $...$ / $$...$$ 유지

예시:
${QUIZ_MARKDOWN_IMAGE_EXAMPLE}`;
}

function buildQuizMarkdownFromImageInstruction(params: {
  choiceCount: number;
  imageCount: number;
  userInstructions?: string;
}): string {
  const userBlock = String(params.userInstructions || '').trim();
  return `[요청]
첨부 이미지 ${params.imageCount}장을 분석해 퀴즈 마크다운 본문으로 변환하세요.
${userBlock ? `\n[추가 지시]\n${userBlock}\n` : ''}
여러 문항이 있으면 모두 포함하고, 문항 번호는 1부터 순서대로 매기세요.`;
}

function stripMarkdownCodeFence(text: string): string {
  const trimmed = String(text || '').trim();
  const fenced = trimmed.match(/^```(?:markdown|md)?\s*\n([\s\S]*?)\n```\s*$/u);
  if (fenced?.[1]) return fenced[1].trim();
  return trimmed;
}

/**
 * Convert exam image(s) into `.quiz.md` body markdown via vision LLM.
 */
export async function generateQuizMarkdownFromImages(params: {
  profiles: LlmProviderProfile[];
  images: QuizLlmImageInput[];
  choiceCount: number;
  userInstructions?: string;
  signal?: AbortSignal;
  onChunk?: (accumulated: string) => void;
}): Promise<string> {
  if (!params.images.length) {
    throw new Error('변환할 이미지가 없습니다.');
  }
  const settings = loadQuizSettings();
  const choiceCount = clampChoiceCount(params.choiceCount);
  const systemPrompt = buildQuizMarkdownFromImageSystemPrompt(choiceCount);
  const instruction = buildQuizMarkdownFromImageInstruction({
    choiceCount,
    imageCount: params.images.length,
    ...(String(params.userInstructions || '').trim()
      ? { userInstructions: String(params.userInstructions).trim() }
      : {}),
  });

  const text = await runQuizLlmPrompt({
    ...runOpts(
      params.profiles,
      instruction,
      systemPrompt,
      settings.temperature,
      streamExtra({
        signal: params.signal,
        onChunk: params.onChunk,
      }),
    ),
    images: params.images,
    stream: Boolean(params.onChunk),
  });
  return stripMarkdownCodeFence(text);
}
