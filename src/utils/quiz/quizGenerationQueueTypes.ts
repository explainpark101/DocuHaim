/** Quiz AI question-generation queue (similar / source-based). */

export type QuizGenJobKind = 'similar' | 'source';

export type QuizGenStepId =
  | 'rag'
  | 'analysis'
  | 'randomize'
  | 'load_sources'
  | 'summarize'
  | 'generate'
  | 'finalize';

export type QuizGenStepStatus = 'pending' | 'running' | 'done' | 'error' | 'skipped';

export type QuizGenStep = {
  id: QuizGenStepId;
  label: string;
  status: QuizGenStepStatus;
  detail?: string;
  error?: string;
  /** User / instruction prompt sent to the model (when applicable). */
  llmInstruction?: string;
  /** Model output or step artifact (RAG excerpts, sampled vars, JSON, …). */
  llmResponse?: string;
  systemPrompt?: string;
};

export type QuizGenJobStatus = 'running' | 'done' | 'error';

export type QuizGenJob = {
  id: string;
  kind: QuizGenJobKind;
  questionLabel?: string;
  questionPreview: string;
  status: QuizGenJobStatus;
  steps: QuizGenStep[];
  resultLabel?: string;
  resultQuestionId?: string;
  logPath?: string;
  error?: string;
  createdAt: number;
};

export type QuizGenStepUpdate = {
  step: QuizGenStepId;
  status: QuizGenStepStatus;
  detail?: string;
  error?: string;
  llmInstruction?: string;
  llmResponse?: string;
  systemPrompt?: string;
};

export function buildSimilarJobSteps(hasRag: boolean): QuizGenStep[] {
  const steps: QuizGenStep[] = [];
  if (hasRag) {
    steps.push({ id: 'rag', label: '근거 발췌', status: 'pending' });
  }
  steps.push(
    { id: 'analysis', label: '문항 구조 분석', status: 'pending' },
    { id: 'randomize', label: '변수 샘플링', status: 'pending' },
    { id: 'generate', label: '유사 문항 생성', status: 'pending' },
    { id: 'finalize', label: '문항 추가', status: 'pending' },
  );
  return steps;
}

export function buildSourceJobSteps(): QuizGenStep[] {
  return [
    { id: 'load_sources', label: '근거 문서 로드', status: 'pending' },
    { id: 'summarize', label: '문서 요약', status: 'pending' },
    { id: 'generate', label: '문항 생성', status: 'pending' },
    { id: 'finalize', label: '문항 추가', status: 'pending' },
  ];
}

export function truncateQuizPreview(text: string, max = 72): string {
  const t = String(text || '').replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1)}…`;
}
