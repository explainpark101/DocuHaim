/** Per-app quiz settings (LLM / RAG defaults). File-level config lives in quiz-config comment. */

const STORAGE_KEY = 's3haim_quiz_settings';

export type QuizCalcComplexity = 'hand' | 'calculator';

export type QuizSettings = {
  temperature: number;
  gradeTemperature: number;
  calcComplexity: QuizCalcComplexity;
  systemPrompt: string;
  profileId: string | null;
  /** Last model selected in quiz mode (for the active profile). */
  modelId: string | null;
  ragTopK: number;
  ragMaxChars: number;
  /** When true, flush quiz markdown and vault-save after AI generation completes. */
  autoSaveOnAiGenerate: boolean;
  /**
   * When true, quiz side docks animate layout width with a spring (heavier on Safari/WebView).
   * Default false: fixed width + translateX slide (same as Tauri default).
   */
  dockWidthSpringAnim: boolean;
};

export const DEFAULT_QUIZ_SYSTEM_PROMPT = `당신은 대한민국 자격증 및 학술 시험 문제 출제위원입니다.
제공되는 문제의 범주 및 분석 결과와 [계산 난이도 설정]을 바탕으로, 동일한 개념 영역 내에서 새로운 객관식 문항을 만들어주세요.

[출제 요구사항]
1. 기존 문제의 개념 범주 내에서, 새로운 개념/사례/개념어를 2개 이상 새로 추론하여 선택지 목록에 구성하세요.
2. 계산문제인 경우 제공된 무작위 샘플링 변수를 반드시 반영하세요.
3. 미리 지정된 [목표 정답 번호]가 정답이 되도록 선택지를 배치하세요.
4. '접근 Point!'는 신규 문제 문맥에 맞게 새로 작성하세요. 출제 의도를 매우 간결하게, 유사 유형에서 무엇을 먼저 생각해야 하는지 핵심 사고 포인트만 짚으세요.
5. '해설'은 정답 근거·함정·풀이 흐름이 드러나는 완결된 해설을 반드시 함께 작성하세요.
6. 선택지(options) 안에서는 인라인 수식($...$)만 사용하세요.
7. 반환은 반드시 지정된 JSON 형식으로만 작성하세요.`;

export const DEFAULT_QUIZ_SETTINGS: QuizSettings = {
  temperature: 1.7,
  gradeTemperature: 0.25,
  calcComplexity: 'hand',
  systemPrompt: DEFAULT_QUIZ_SYSTEM_PROMPT,
  profileId: null,
  modelId: null,
  ragTopK: 24,
  ragMaxChars: 120_000,
  autoSaveOnAiGenerate: true,
  dockWidthSpringAnim: false,
};

export const QUIZ_SETTINGS_CHANGED_EVENT = 's3haim:quiz-settings-changed';

function clampTemp(n: number, fallback: number): number {
  if (!Number.isFinite(n)) return fallback;
  return Math.min(2, Math.max(0, n));
}

export function normalizeQuizSettings(
  raw: Partial<QuizSettings> | null | undefined,
): QuizSettings {
  return {
    temperature: clampTemp(
      typeof raw?.temperature === 'number' ? raw.temperature : DEFAULT_QUIZ_SETTINGS.temperature,
      DEFAULT_QUIZ_SETTINGS.temperature,
    ),
    gradeTemperature: clampTemp(
      typeof raw?.gradeTemperature === 'number'
        ? raw.gradeTemperature
        : DEFAULT_QUIZ_SETTINGS.gradeTemperature,
      DEFAULT_QUIZ_SETTINGS.gradeTemperature,
    ),
    calcComplexity: raw?.calcComplexity === 'calculator' ? 'calculator' : 'hand',
    systemPrompt:
      typeof raw?.systemPrompt === 'string' && raw.systemPrompt.trim()
        ? raw.systemPrompt
        : DEFAULT_QUIZ_SYSTEM_PROMPT,
    profileId:
      typeof raw?.profileId === 'string' && raw.profileId.trim()
        ? raw.profileId.trim()
        : null,
    modelId:
      typeof raw?.modelId === 'string' && raw.modelId.trim()
        ? raw.modelId.trim()
        : null,
    ragTopK: Math.min(
      64,
      Math.max(
        1,
        Math.round(
          typeof raw?.ragTopK === 'number' ? raw.ragTopK : DEFAULT_QUIZ_SETTINGS.ragTopK,
        ),
      ),
    ),
    ragMaxChars: Math.min(
      500_000,
      Math.max(
        2000,
        Math.round(
          typeof raw?.ragMaxChars === 'number'
            ? raw.ragMaxChars
            : DEFAULT_QUIZ_SETTINGS.ragMaxChars,
        ),
      ),
    ),
    autoSaveOnAiGenerate: raw?.autoSaveOnAiGenerate !== false,
    dockWidthSpringAnim: raw?.dockWidthSpringAnim === true,
  };
}

/** Side dock width spring (off = translateX slide, on = layout width spring). */
export function quizDockUsesLayoutWidthAnim(): boolean {
  return loadQuizSettings().dockWidthSpringAnim;
}

export function loadQuizSettings(): QuizSettings {
  try {
    const raw =
      typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null;
    if (!raw) return { ...DEFAULT_QUIZ_SETTINGS };
    return normalizeQuizSettings(JSON.parse(raw) as Partial<QuizSettings>);
  } catch {
    return { ...DEFAULT_QUIZ_SETTINGS };
  }
}

export function saveQuizSettings(next: Partial<QuizSettings>): QuizSettings {
  const merged = normalizeQuizSettings({ ...loadQuizSettings(), ...next });
  try {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      window.dispatchEvent(
        new CustomEvent(QUIZ_SETTINGS_CHANGED_EVENT, { detail: merged }),
      );
    }
  } catch {
    // ignore
  }
  return merged;
}
