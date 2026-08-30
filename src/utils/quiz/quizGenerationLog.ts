import type { QuizGenJob, QuizGenStep } from '@/utils/quiz/quizGenerationQueueTypes';

/** Vault-side folder for quiz generation provenance logs (mirrors quiz file paths). */
export const QUIZ_GENERATION_LOG_ROOT = '.quiz';

const LOG_BODY_MAX = 96_000;

export function normalizeVaultPosixPath(path: string): string {
  return String(path || '').trim().replace(/\\/g, '/').replace(/^\/+/, '');
}

/** `.quiz/<same path as quiz file without .quiz.md>` */
export function quizLogDirForQuizFile(quizFilePath: string): string {
  const normalized = normalizeVaultPosixPath(quizFilePath);
  const withoutExt = normalized.replace(/\.quiz\.md$/i, '');
  if (!withoutExt) return QUIZ_GENERATION_LOG_ROOT;
  return `${QUIZ_GENERATION_LOG_ROOT}/${withoutExt}`;
}

export function sanitizeQuizLogFileKey(key: string): string {
  const safe = String(key || '')
    .trim()
    .replace(/[^a-zA-Z0-9._-]+/g, '_');
  return safe || 'log';
}

/** One markdown log per generated question id (or job id while in progress). */
export function quizLogFilePath(quizFilePath: string, logKey: string): string {
  const dir = quizLogDirForQuizFile(quizFilePath);
  return `${dir}/${sanitizeQuizLogFileKey(logKey)}.md`;
}

export function truncateForGenerationLog(text: string, max = LOG_BODY_MAX): string {
  const raw = String(text || '');
  if (raw.length <= max) return raw;
  return `${raw.slice(0, max)}\n\n… (${raw.length - max} characters truncated)`;
}

function fenceBlock(label: string, body: string): string {
  const content = truncateForGenerationLog(body);
  if (!content.trim()) return '';
  return `### ${label}\n\n\`\`\`text\n${content.replace(/```/g, '`\u200b``')}\n\`\`\`\n`;
}

function formatStepSection(step: QuizGenStep, index: number): string {
  const statusLine = `- status: ${step.status}`;
  const detailLine = step.detail ? `- detail: ${step.detail}` : '';
  const errorLine = step.error ? `- error: ${step.error}` : '';
  const parts = [
    `## Step ${index + 1}: ${step.label} (${step.id})`,
    '',
    statusLine,
    detailLine,
    errorLine,
    '',
  ];
  if (step.systemPrompt) {
    parts.push(fenceBlock('System prompt', step.systemPrompt));
  }
  if (step.llmInstruction) {
    parts.push(fenceBlock('Instruction / input', step.llmInstruction));
  }
  if (step.failureLog) {
    parts.push(fenceBlock('Parse failure log', step.failureLog));
  }
  if (step.llmResponse) {
    parts.push(fenceBlock('Model response / artifact', step.llmResponse));
  }
  return parts.filter(Boolean).join('\n');
}

export function serializeQuizGenerationLogMarkdown(
  job: QuizGenJob,
  quizFilePath: string,
): string {
  const lines = [
    '# Quiz generation log',
    '',
    `- quiz file: ${normalizeVaultPosixPath(quizFilePath)}`,
    `- job id: ${job.id}`,
    `- kind: ${job.kind}`,
    ...(job.questionLabel ? [`- source label: ${job.questionLabel}`] : []),
    ...(job.resultLabel ? [`- result label: ${job.resultLabel}`] : []),
    ...(job.resultQuestionId ? [`- result question id: ${job.resultQuestionId}`] : []),
    `- job status: ${job.status}`,
    `- created at: ${new Date(job.createdAt).toISOString()}`,
    ...(job.error ? [`- job error: ${job.error}`] : []),
    '',
    '## Question preview',
    '',
    truncateForGenerationLog(job.questionPreview, 4000),
    '',
    '---',
    '',
  ];

  job.steps.forEach((step, i) => {
    lines.push(formatStepSection(step, i));
    lines.push('---', '');
  });

  return `${lines.join('\n').trimEnd()}\n`;
}

export async function writeQuizGenerationLog(params: {
  quizFilePath: string;
  logKey: string;
  job: QuizGenJob;
  writeText: (path: string, text: string) => Promise<void>;
}): Promise<string> {
  const path = quizLogFilePath(params.quizFilePath, params.logKey);
  const markdown = serializeQuizGenerationLogMarkdown(params.job, params.quizFilePath);
  await params.writeText(path, markdown);
  return path;
}
