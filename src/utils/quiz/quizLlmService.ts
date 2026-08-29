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
  QuizFileConfig,
  QuizQuestion,
  SubjectiveGradeResult,
  SubjectiveVerdict,
} from '@/utils/quiz/quizTypes';
import type { QuizGenStepUpdate } from '@/utils/quiz/quizGenerationQueueTypes';
import { resolveQuestionChoiceCount, resizeChoiceOptions } from '@/utils/quiz/quizQuestionStyle';
import { clampChoiceCount } from '@/utils/quiz/quizFileConfig';
import { truncateForGenerationLog } from '@/utils/quiz/quizGenerationLog';

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
): Promise<QuizLlmReadyResult> {
  const settings = loadQuizSettings();
  const list = Array.isArray(profiles) ? profiles : [];
  const profile = resolveSelectedLlmProfile(
    list,
    settings.profileId || loadLastLlmProfileId(),
  );
  if (!profile) {
    return {
      ready: false,
      message:
        'AI 제공자가 없습니다. AI 도우미에서 제공자·모델을 선택한 뒤 다시 시도하세요.',
    };
  }

  const model = loadLastUsedModelForProfile(profile.id, profile.kind).trim();

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

export type QuizLlmRunOptions = {
  profiles: LlmProviderProfile[];
  instruction: string;
  systemPrompt?: string;
  temperature?: number;
  signal?: AbortSignal;
  /** Streaming callback with accumulated text (wrong-answer analysis, etc.). */
  onChunk?: (accumulated: string) => void;
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
    settings.profileId || loadLastLlmProfileId(),
  );
  if (!selectedProfile) {
    throw new Error(
      'AI 제공자가 없습니다. AI 도우미에서 제공자·모델을 선택한 뒤 다시 시도하세요.',
    );
  }

  const model = loadLastUsedModelForProfile(
    selectedProfile.id,
    selectedProfile.kind,
  );
  const systemPrompt = (options.systemPrompt || settings.systemPrompt || '').trim();
  const instruction = options.instruction.trim();
  const requestOptions = {
    temperature:
      typeof options.temperature === 'number'
        ? options.temperature
        : settings.temperature,
  };
  const streamOpts: {
    signal?: AbortSignal;
    onChunk?: (accumulated: string) => void;
  } = {};
  if (options.signal) streamOpts.signal = options.signal;
  if (options.onChunk) streamOpts.onChunk = options.onChunk;

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
    ? obj.options.map((o) => String(o || '')).slice(0, choiceCount)
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
  return base;
}

function signalExtra(signal?: AbortSignal): { signal?: AbortSignal } | undefined {
  return signal ? { signal } : undefined;
}

function streamExtra(opts: {
  signal?: AbortSignal | undefined;
  onChunk?: ((accumulated: string) => void) | undefined;
}): { signal?: AbortSignal; onChunk?: (accumulated: string) => void } | undefined {
  const out: { signal?: AbortSignal; onChunk?: (accumulated: string) => void } = {};
  if (opts.signal) out.signal = opts.signal;
  if (opts.onChunk) out.onChunk = opts.onChunk;
  return out.signal || out.onChunk ? out : undefined;
}

export async function gradeSubjectiveAnswer(params: {
  profiles: LlmProviderProfile[];
  question: QuizQuestion;
  userAnswer: string;
  signal?: AbortSignal;
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

  const text = await runQuizLlmPrompt(
    runOpts(
      params.profiles,
      instruction,
      '당신은 공정한 시험 채점위원입니다. JSON만 반환하세요.',
      settings.gradeTemperature,
      signalExtra(params.signal),
    ),
  );
  return parseSubjectiveGradeResult(extractJsonObject(text));
}

export async function generateWrongChoiceExplanation(params: {
  profiles: LlmProviderProfile[];
  question: QuizQuestion;
  selectedOption: number;
  userInstructions?: string;
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
    ? `수험자가 ${selected}번(정답)을 골랐습니다. 왜 정답인지, 다른 보기가 왜 틀렸는지 설명하세요.`
    : `수험자가 ${selected}번을 골랐습니다. 왜 오답인지 설명하세요.`;
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
      streamExtra({ signal: params.signal, onChunk: params.onChunk }),
    ),
  );
}

export async function generateChoiceAnalysisFollowUp(params: {
  profiles: LlmProviderProfile[];
  question: QuizQuestion;
  selectedOption: number;
  existingAnalysis: string;
  userQuestion: string;
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
      streamExtra({ signal: params.signal, onChunk: params.onChunk }),
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
  const analysisText = await runQuizLlmPrompt(
    runOpts(
      params.profiles,
      analysisInstruction,
      SIMILAR_QUESTION_ANALYSIS_SYSTEM_PROMPT,
      analysisTemp,
      signalExtra(params.signal),
    ),
  );
  const analysis = parseSimilarQuestionAnalysis(extractJsonObject(analysisText));
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
  const text = await runQuizLlmPrompt(
    runOpts(
      params.profiles,
      generationInstruction,
      genSystemPrompt,
      settings.temperature,
      signalExtra(params.signal),
    ),
  );
  const parsed = extractJsonObject(text);
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
    const repairText = await runQuizLlmPrompt(
      runOpts(
        params.profiles,
        repairInstruction,
        genSystemPrompt,
        Math.min(settings.temperature, 0.8),
        signalExtra(params.signal),
      ),
    );
    const repairParsed = extractJsonObject(repairText);
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
  const analysisText = await runQuizLlmPrompt(
    runOpts(
      params.profiles,
      analysisInstruction,
      SIMILAR_QUESTION_ANALYSIS_SYSTEM_PROMPT,
      analysisTemp,
      signalExtra(params.signal),
    ),
  );
  const analysis = parseSimilarQuestionAnalysis(extractJsonObject(analysisText));
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
  const text = await runQuizLlmPrompt(
    runOpts(
      params.profiles,
      generationInstruction,
      genSystemPrompt,
      settings.temperature,
      signalExtra(params.signal),
    ),
  );
  const parsed = extractJsonObject(text);
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
    const repairText = await runQuizLlmPrompt(
      runOpts(
        params.profiles,
        repairInstruction,
        genSystemPrompt,
        Math.min(settings.temperature, 0.8),
        signalExtra(params.signal),
      ),
    );
    const repairParsed = extractJsonObject(repairText);
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
        signalExtra(params.signal),
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

  const text = await runQuizLlmPrompt(
    runOpts(
      params.profiles,
      genInstruction,
      genSystemPrompt,
      settings.temperature,
      signalExtra(params.signal),
    ),
  );
  const parsed = extractJsonObject(text);
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

  emit({ step: 'generate', status: 'running', detail: '문항 교정 중…' });
  const text = await runQuizLlmPrompt(
    runOpts(
      params.profiles,
      instruction,
      FIX_QUESTION_SYSTEM_PROMPT,
      settings.temperature,
      signalExtra(params.signal),
    ),
  );
  const parsed = extractJsonObject(text);
  const obj =
    parsed && typeof parsed === 'object' && !Array.isArray(parsed)
      ? parsed
      : Array.isArray(parsed) && parsed[0]
        ? parsed[0]
        : parsed;
  emit({ step: 'generate', status: 'done', detail: '교정 완료' });
  return parseGeneratedQuestion(obj, choiceCount, fallbackAnswer);
}
