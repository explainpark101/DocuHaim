/** Per-app quiz settings (LLM / RAG defaults). File-level config lives in quiz-config comment. */

const STORAGE_KEY = 's3haim_quiz_settings';

export type QuizCalcComplexity = 'hand' | 'calculator';

export type QuizSettings = {
  temperature: number;
  gradeTemperature: number;
  calcComplexity: QuizCalcComplexity;
  systemPrompt: string;
  profileId: string | null;
  ragTopK: number;
  ragMaxChars: number;
};

export const DEFAULT_QUIZ_SYSTEM_PROMPT = `당신은 대한민국 자격증 및 학술 시험 문제 출제위원입니다.
제공되는 문제의 범주 및 분석 결과와 [계산 난이도 설정]을 바탕으로, 동일한 개념 영역 내에서 새로운 객관식 문항을 만들어주세요.

[출제 요구사항]
1. 기존 문제의 개념 범주 내에서, 새로운 개념/사례/개념어를 2개 이상 새로 추론하여 선택지 목록에 구성하세요.
2. 계산문제인 경우 제공된 무작위 샘플링 변수를 반드시 반영하세요.
3. 미리 지정된 [목표 정답 번호]가 정답이 되도록 선택지를 배치하세요.
4. '접근 Point!'는 신규 문제 문맥에 맞게 새로 작성하세요.
5. 선택지(options) 안에서는 인라인 수식($...$)만 사용하세요.
6. 반환은 반드시 지정된 JSON 형식으로만 작성하세요.`;

export const DEFAULT_QUIZ_SETTINGS: QuizSettings = {
  temperature: 1.7,
  gradeTemperature: 0.25,
  calcComplexity: 'hand',
  systemPrompt: DEFAULT_QUIZ_SYSTEM_PROMPT,
  profileId: null,
  ragTopK: 24,
  ragMaxChars: 120_000,
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
  };
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
