import { normalizeSourcePaths } from '@/utils/quiz/quizFileConfig';
import type { QuizFileConfig } from '@/utils/quiz/quizTypes';

export type QuizSourcePathConfig = Pick<QuizFileConfig, 'sourcePaths'> & {
  disabledSourcePaths?: string[];
};

export type QuizSourcePathUsage = {
  active: number;
  total: number;
};

export function normalizeDisabledSourcePaths(
  raw: unknown,
  sourcePaths: string[],
): string[] {
  const allowed = new Set(sourcePaths);
  return normalizeSourcePaths(raw).filter((p) => allowed.has(p));
}

export function getActiveSourcePaths(
  config: QuizSourcePathConfig | null | undefined,
): string[] {
  const paths = config?.sourcePaths ?? [];
  const disabled = new Set(normalizeDisabledSourcePaths(config?.disabledSourcePaths, paths));
  return paths.filter((p) => !disabled.has(p));
}

export function countQuizSourcePathUsage(
  config: QuizSourcePathConfig | null | undefined,
): QuizSourcePathUsage {
  const total = config?.sourcePaths?.length ?? 0;
  const active = getActiveSourcePaths(config).length;
  return { active, total };
}

export function isQuizSourcePathEnabled(
  config: QuizSourcePathConfig,
  path: string,
): boolean {
  const disabled = new Set(
    normalizeDisabledSourcePaths(config.disabledSourcePaths, config.sourcePaths),
  );
  return config.sourcePaths.includes(path) && !disabled.has(path);
}

export function setQuizSourcePathEnabled(
  config: QuizFileConfig,
  path: string,
  enabled: boolean,
): QuizFileConfig {
  if (!config.sourcePaths.includes(path)) return config;

  const disabled = new Set(
    normalizeDisabledSourcePaths(config.disabledSourcePaths, config.sourcePaths),
  );
  if (enabled) disabled.delete(path);
  else disabled.add(path);

  const disabledSourcePaths = config.sourcePaths.filter((p) => disabled.has(p));
  const { disabledSourcePaths: _prev, ...rest } = config;
  return {
    ...rest,
    ...(disabledSourcePaths.length ? { disabledSourcePaths } : {}),
  };
}

export function removeQuizSourcePathFromConfig(
  config: QuizFileConfig,
  path: string,
): QuizFileConfig {
  const sourcePaths = config.sourcePaths.filter((p) => p !== path);
  const disabledSourcePaths = normalizeDisabledSourcePaths(
    config.disabledSourcePaths,
    sourcePaths,
  ).filter((p) => p !== path);
  const { disabledSourcePaths: _prev, ...rest } = config;
  return {
    ...rest,
    sourcePaths,
    ...(disabledSourcePaths.length ? { disabledSourcePaths } : {}),
  };
}
