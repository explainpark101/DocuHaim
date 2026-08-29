/** Step 1 / 1.5 helpers for similar-choice question generation. */

export type SimilarQuestionVariable = {
  id: string;
  description: string;
  originalValue: number | string;
  min: number;
  max: number;
  step?: number;
  unit?: string;
};

export type SimilarQuestionAnalysis = {
  coreCategory: string;
  isCalculation: boolean;
  variables: SimilarQuestionVariable[];
};

export type SimilarVariableSample = {
  id: string;
  description: string;
  value: number | string;
  originalValue: number | string;
  unit?: string;
};

export const SIMILAR_QUESTION_ANALYSIS_SYSTEM_PROMPT = `You analyze exam multiple-choice items for similar-question generation.
Return JSON only. No markdown fences or extra text.

Schema:
{
  "coreCategory": "one-line core concept / topic category",
  "isCalculation": boolean,
  "variables": [
    {
      "id": "short id",
      "description": "what the parameter represents",
      "originalValue": number or string,
      "min": number,
      "max": number,
      "step": number (optional, default 1 for numeric),
      "unit": "optional unit label"
    }
  ]
}

Rules:
- coreCategory: the essential knowledge domain (not the full question text).
- isCalculation: true when solving requires numeric computation or formula application.
- When isCalculation is false, variables should be [].
- When isCalculation is true, list every key numeric/parameter value in the stem and options that should vary.
- min/max must be a plausible variation range that still keeps the item solvable; include originalValue within [min,max].
- Use numeric min/max/step for quantities; originalValue may be string only for non-numeric labels (then min/max may be ignored).`;

function asRecord(raw: unknown): Record<string, unknown> {
  return raw && typeof raw === 'object' ? (raw as Record<string, unknown>) : {};
}

function parseNumericOrString(raw: unknown): number | string {
  if (typeof raw === 'number' && Number.isFinite(raw)) return raw;
  if (typeof raw === 'string' && raw.trim()) return raw.trim();
  const n = Number(raw);
  if (Number.isFinite(n)) return n;
  return String(raw ?? '').trim();
}

function parseVariable(raw: unknown, index: number): SimilarQuestionVariable | null {
  const obj = asRecord(raw);
  const id = String(obj.id || obj.name || `var${index + 1}`).trim();
  if (!id) return null;
  const description = String(obj.description || obj.label || id).trim() || id;
  const originalValue = parseNumericOrString(obj.originalValue ?? obj.value);
  const minRaw = Number(obj.min);
  const maxRaw = Number(obj.max);
  const min = Number.isFinite(minRaw) ? minRaw : 0;
  const max = Number.isFinite(maxRaw) ? maxRaw : min;
  const stepRaw = Number(obj.step);
  const step = Number.isFinite(stepRaw) && stepRaw > 0 ? stepRaw : 1;
  const unit =
    typeof obj.unit === 'string' && obj.unit.trim() ? obj.unit.trim() : undefined;
  return {
    id,
    description,
    originalValue,
    min,
    max,
    step,
    ...(unit ? { unit } : {}),
  };
}

/** Parse step-1 LLM JSON into a normalized analysis object. */
export function parseSimilarQuestionAnalysis(raw: unknown): SimilarQuestionAnalysis {
  const obj = asRecord(raw);
  const coreCategory =
    String(obj.coreCategory || obj.category || obj.topic || '').trim() ||
    'general concept';
  const isCalculation = Boolean(obj.isCalculation ?? obj.isCalc ?? obj.calculation);
  const variablesRaw = Array.isArray(obj.variables) ? obj.variables : [];
  const variables = variablesRaw
    .map((item, i) => parseVariable(item, i))
    .filter((v): v is SimilarQuestionVariable => v != null);
  return {
    coreCategory,
    isCalculation,
    variables: isCalculation ? variables : [],
  };
}

function randomNumericInRange(
  min: number,
  max: number,
  step: number,
  avoid?: number,
): number {
  const lo = Math.min(min, max);
  const hi = Math.max(min, max);
  const stride = step > 0 ? step : 1;
  const spanSteps = Math.floor((hi - lo) / stride);
  if (spanSteps < 0) return lo;
  if (spanSteps === 0) return lo;

  let picked = lo;
  let attempts = 0;
  do {
    const idx = Math.floor(Math.random() * (spanSteps + 1));
    picked = lo + idx * stride;
    attempts += 1;
  } while (
    attempts < 24 &&
    typeof avoid === 'number' &&
    Number.isFinite(avoid) &&
    picked === avoid &&
    spanSteps > 0
  );
  return picked;
}

/** Step 1.5 — sample new values for calculation variables (client-side). */
export function randomizeSimilarVariables(
  variables: SimilarQuestionVariable[],
): SimilarVariableSample[] {
  return variables.map((v) => {
    if (typeof v.originalValue === 'number' && Number.isFinite(v.originalValue)) {
      const value = randomNumericInRange(v.min, v.max, v.step ?? 1, v.originalValue);
      return {
        id: v.id,
        description: v.description,
        value,
        originalValue: v.originalValue,
        ...(v.unit ? { unit: v.unit } : {}),
      };
    }
    return {
      id: v.id,
      description: v.description,
      value: v.originalValue,
      originalValue: v.originalValue,
      ...(v.unit ? { unit: v.unit } : {}),
    };
  });
}

export function formatAnalysisForPrompt(analysis: SimilarQuestionAnalysis): string {
  const lines = [
    `[문항 분석 결과]`,
    `핵심 범주: ${analysis.coreCategory}`,
    `계산 문제: ${analysis.isCalculation ? '예' : '아니오'}`,
  ];
  if (analysis.isCalculation && analysis.variables.length > 0) {
    lines.push('핵심 변수:');
    for (const v of analysis.variables) {
      const unit = v.unit ? ` ${v.unit}` : '';
      lines.push(
        `- ${v.id} (${v.description}): 원본=${String(v.originalValue)}${unit}, 범위=${v.min}~${v.max}, step=${v.step ?? 1}`,
      );
    }
  }
  return lines.join('\n');
}

export function formatSampledVariablesForPrompt(samples: SimilarVariableSample[]): string {
  if (!samples.length) return '';
  const lines = ['[무작위 샘플링 변수 — 신규 문항에 반드시 반영]',];
  for (const s of samples) {
    const unit = s.unit ? ` ${s.unit}` : '';
    lines.push(
      `- ${s.id} (${s.description}): ${String(s.value)}${unit} (원본: ${String(s.originalValue)}${unit})`,
    );
  }
  return lines.join('\n');
}

export function buildSimilarAnalysisInstruction(params: {
  question: string;
  options: string[];
  answer: number;
  point: string;
  ragBlock?: string;
}): string {
  const rag = params.ragBlock?.trim();
  return `${rag ? `[근거 발췌]\n${rag}\n\n발췌 밖의 사실은 사용하지 마세요.\n\n` : ''}[원본 문제]
질문: ${params.question}
보기: ${params.options.map((o, i) => `${i + 1}. ${o}`).join(' | ')}
정답: ${params.answer}번
접근 Point: ${params.point || ''}

위 문항을 분석하여 JSON 스키마에 맞게만 반환하세요.`;
}

export function buildSimilarGenerationInstruction(params: {
  question: string;
  options: string[];
  answer: number;
  point: string;
  choiceCount: number;
  targetAnswer: number;
  complexity: string;
  analysisBlock: string;
  sampledBlock: string;
  ragBlock?: string;
}): string {
  const rag = params.ragBlock?.trim();
  return `${rag ? `[근거 발췌]\n${rag}\n\n발췌 밖의 사실은 사용하지 마세요.\n\n` : ''}[원본 문제]
질문: ${params.question}
보기: ${params.options.map((o, i) => `${i + 1}. ${o}`).join(' | ')}
정답: ${params.answer}번
접근 Point: ${params.point || ''}

${params.analysisBlock}

${params.sampledBlock}

${params.complexity}
보기 개수: ${params.choiceCount}
이번 신규 문제의 정답 번호는 반드시 ${params.targetAnswer}번이어야 합니다.

동일한 핵심 범주 내에서 원본과 다른 수치/사례/표현의 유사 문항을 작성하세요.
JSON만 반환:
{"question":"...","options":[${Array.from({ length: params.choiceCount }, () => '"..."').join(',')}],"answer":${params.targetAnswer},"point":"...","explanation":"..."}`;
}
