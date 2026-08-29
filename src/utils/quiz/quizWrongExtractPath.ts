import { QUIZ_MD_EXTENSION, quizBasename } from '@/utils/quiz/quizPath';

function stripQuizStem(name: string): string {
  const lower = name.toLowerCase();
  if (lower.endsWith(QUIZ_MD_EXTENSION)) {
    return name.slice(0, -QUIZ_MD_EXTENSION.length);
  }
  return name.replace(/\.md$/i, '');
}

export function proposeWrongQuizExtractPath(
  sourceQuizPath: string,
  suffix?: number,
): string {
  const normalized = String(sourceQuizPath || '').trim().replace(/\\/g, '/');
  const slash = normalized.lastIndexOf('/');
  const dir = slash >= 0 ? normalized.slice(0, slash + 1) : '';
  const stem = stripQuizStem(quizBasename(normalized));
  const tag = suffix != null && suffix > 1 ? `-틀린문제-${suffix}` : '-틀린문제';
  return `${dir}${stem}${tag}${QUIZ_MD_EXTENSION}`;
}

export async function resolveWrongQuizExtractPath(
  sourceQuizPath: string,
  pathExists: (path: string) => Promise<boolean>,
): Promise<string> {
  const first = proposeWrongQuizExtractPath(sourceQuizPath);
  if (!(await pathExists(first))) return first;
  for (let i = 2; i < 100; i += 1) {
    const candidate = proposeWrongQuizExtractPath(sourceQuizPath, i);
    if (!(await pathExists(candidate))) return candidate;
  }
  throw new Error('사용 가능한 퀴즈 파일 이름을 찾지 못했습니다.');
}
