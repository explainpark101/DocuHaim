import type { QuizAnswerStyle, QuizQuestionKind } from '@/utils/quiz/quizTypes';
import { buildSimilarQuestionGenerationSystemPrompt } from '@/utils/quiz/similarQuestionAnalysis';

export type QuizDerivedQuestionTarget = {
  kind: QuizQuestionKind;
  choiceCount: number;
  answerStyle?: QuizAnswerStyle;
  userPrompt?: string;
};

export function describeDerivedQuestionTarget(target: QuizDerivedQuestionTarget): string {
  if (target.kind === 'subjective') {
    return target.answerStyle === 'essay' ? '서술형 주관식' : '단답형 주관식';
  }
  return `${target.choiceCount}지선다 객관식`;
}

export function buildDerivedQuestionGenerationSystemPrompt(userSystemPrompt: string): string {
  const base = buildSimilarQuestionGenerationSystemPrompt(userSystemPrompt);
  return `${base}

[파생문항 생성 — 추가 규칙]
- 원본 문항의 학습 목표·핵심 개념을 유지하되, 지정된 **출제 유형**에 맞는 새 문항을 작성합니다.
- 객관식 ↔ 주관식 변환이 요청되면, 동일 개념을 해당 유형에 맞게 재구성하세요.
- 사용자 추가 요구사항이 있으면 반드시 반영하세요.`;
}

export function buildDerivedGenerationInstruction(params: {
  question: string;
  options: string[];
  answer: number;
  point: string;
  explanation?: string;
  sourceKind: QuizQuestionKind;
  sourceAnswerStyle?: QuizAnswerStyle;
  target: QuizDerivedQuestionTarget;
  complexity: string;
  analysisBlock: string;
  sampledBlock: string;
  targetAnswer?: number;
  ragBlock?: string;
}): string {
  const rag = params.ragBlock?.trim();
  const explanation = String(params.explanation || '').trim();
  const userBlock = String(params.target.userPrompt || '').trim();
  const targetDesc = describeDerivedQuestionTarget(params.target);

  const sourceType =
    params.sourceKind === 'subjective'
      ? params.sourceAnswerStyle === 'essay'
        ? '서술형 주관식'
        : '단답형 주관식'
      : `${params.options.length || params.target.choiceCount}지선다 객관식`;

  const sourceOptionsBlock =
    params.sourceKind === 'choice' && params.options.length > 0
      ? `보기: ${params.options.map((o, i) => `${i + 1}. ${o}`).join(' | ')}\n정답: ${params.answer}번\n`
      : '';

  let jsonSchema: string;
  if (params.target.kind === 'subjective') {
    const style = params.target.answerStyle === 'essay' ? 'essay' : 'short';
    jsonSchema = `{"kind":"subjective","answerStyle":"${style}","question":"...","modelAnswer":"...","point":"...","explanation":"..."}`;
  } else {
    const n = params.target.choiceCount;
    const ans = params.targetAnswer ?? 1;
    jsonSchema = `{"kind":"choice","question":"...","options":[${Array.from({ length: n }, () => '"..."').join(',')}],"answer":${ans},"point":"...","explanation":"..."}`;
  }

  const answerLine =
    params.target.kind === 'choice' && params.targetAnswer != null
      ? `이번 신규 문제의 정답 번호는 반드시 ${params.targetAnswer}번이어야 합니다.\n`
      : '';

  return `${rag ? `[근거 발췌]\n${rag}\n\n발췌 밖의 사실은 사용하지 마세요.\n\n` : ''}[원본 문제 — ${sourceType}]
질문: ${params.question}
${sourceOptionsBlock}접근 Point: ${params.point || ''}
${explanation ? `해설: ${explanation}\n` : ''}
${params.analysisBlock}

${params.sampledBlock}

${params.complexity}

[파생 문항 요구사항]
- 출제 유형: ${targetDesc}
${userBlock ? `- 사용자 요구사항:\n${userBlock}\n` : ''}
원본과 다른 수치·사례·표현을 사용하되, 동일한 핵심 학습 목표를 검증하는 파생 문항을 작성하세요.
${answerLine}
[필수 — point / explanation]
- JSON의 point와 explanation을 반드시 함께 채우세요.
- point: 신규 문항의 출제 의도를 매우 간결하게(1~3개 불릿 또는 1~2문장).
- explanation: 정답 근거와 풀이 흐름이 드러나는 완결된 해설.

JSON만 반환:
${jsonSchema}`;
}

export function nextDerivedDisplayLabel(
  questions: readonly { displayLabel: string }[],
  parentLabel: string,
): string {
  const labelBase =
    String(parentLabel || '')
      .trim()
      .replace(/-(?:유사|파생)\d+$/u, '') || '1';
  const escaped = labelBase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`^${escaped}-파생(\\d+)$`);
  let max = 0;
  for (const item of questions) {
    const m = String(item.displayLabel || '').match(re);
    if (m?.[1]) max = Math.max(max, Number.parseInt(m[1], 10));
  }
  return `${labelBase}-파생${max + 1}`;
}
