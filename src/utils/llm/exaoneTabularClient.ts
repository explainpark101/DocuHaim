import {
  EXAONE_API_BASE_URL,
  EXAONE_TABULAR_CLASSIFICATION_MODEL,
  EXAONE_TABULAR_REGRESSION_MODEL,
  isExaoneTabularModelId,
  resolveExaoneTabularTask,
  type ExaoneTabularClassificationOutput,
  type ExaoneTabularRegressionOutput,
  type ExaoneTabularTask,
} from '@/utils/llm/exaoneSettings';

export type ExaoneTabularRequest = {
  apiKey: string;
  task: ExaoneTabularTask;
  trainFile: File | Blob;
  testFile: File | Blob;
  trainFileName?: string;
  testFileName?: string;
  targetColumn: string;
  outputType: ExaoneTabularClassificationOutput | ExaoneTabularRegressionOutput;
  signal?: AbortSignal;
};

export type ExaoneTabularClassificationData = {
  target_columns?: string[] | null;
  classes?: string[][] | null;
  labels?: Array<Array<string | number>> | null;
  probabilities?: Array<Array<Array<number>>> | null;
};

export type ExaoneTabularRegressionData = {
  target_columns?: string[] | null;
  predictions?: Array<Array<number>> | null;
  quantiles?: Array<Array<Array<number>>> | null;
  quantile_levels?: Array<Array<number>> | null;
};

export type ExaoneTabularResponse = {
  result_code?: number;
  description?: string | null;
  data?: ExaoneTabularClassificationData & ExaoneTabularRegressionData;
};

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function fileNameOr(fallback: string, name?: string): string {
  const trimmed = String(name || '').trim();
  return trimmed || fallback;
}

function formatNetworkError(err: unknown): string {
  const message = err instanceof Error ? err.message : String(err || '');
  if (err instanceof TypeError || /failed to fetch|networkerror|load failed/i.test(message)) {
    return [
      'EXAONE Tabular 서버에 연결할 수 없습니다.',
      '브라우저 CORS 허용 여부와 API 키를 확인하세요.',
      '문서: https://docs.exaone.ai/ko/docs/exaone-tabular',
    ].join('\n');
  }
  return message || 'EXAONE Tabular 요청에 실패했습니다.';
}

async function readErrorDetail(res: Response): Promise<string> {
  try {
    const body: unknown = await res.json();
    const rec = asRecord(body);
    if (!rec) return res.statusText;
    if (typeof rec.description === 'string' && rec.description.trim()) {
      return rec.description.trim();
    }
    if (typeof rec.message === 'string' && rec.message.trim()) return rec.message.trim();
    const err = rec.error;
    if (typeof err === 'string' && err.trim()) return err.trim();
    if (err && typeof err === 'object') {
      const msg = (err as Record<string, unknown>).message;
      if (typeof msg === 'string' && msg.trim()) return msg.trim();
    }
  } catch {
    // ignore
  }
  return res.statusText || `HTTP ${res.status}`;
}

function escapeMarkdownCell(value: unknown): string {
  return String(value ?? '')
    .replace(/\|/g, '\\|')
    .replace(/\r?\n/g, ' ')
    .trim();
}

function findQuantileIndex(levels: number[], targetLevel: number): number {
  if (!levels.length) return -1;
  let best = 0;
  let bestDiff = Math.abs((levels[0] ?? 0) - targetLevel);
  for (let i = 1; i < levels.length; i += 1) {
    const diff = Math.abs((levels[i] ?? 0) - targetLevel);
    if (diff < bestDiff) {
      best = i;
      bestDiff = diff;
    }
  }
  return best;
}

function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return '';
  if (Math.abs(value) >= 1000 || Number.isInteger(value)) return String(value);
  return value.toFixed(6).replace(/\.?0+$/, '');
}

/** Build a markdown table (and optional notes) from an EXAONE Tabular response. */
export function formatExaoneTabularMarkdown(
  task: ExaoneTabularTask,
  outputType: string,
  response: ExaoneTabularResponse,
): string {
  const data = response.data ?? {};
  const target =
    Array.isArray(data.target_columns) && data.target_columns[0]
      ? String(data.target_columns[0])
      : 'target';
  const lines: string[] = [
    `### EXAONE Tabular · ${task} (${outputType})`,
    '',
  ];

  if (task === 'classification' && outputType === 'class' && Array.isArray(data.labels)) {
    lines.push(`| row | ${escapeMarkdownCell(target)} |`);
    lines.push('| --- | --- |');
    data.labels.forEach((row, index) => {
      const label = Array.isArray(row) ? row[0] : row;
      lines.push(`| ${index + 1} | ${escapeMarkdownCell(label)} |`);
    });
    return `${lines.join('\n')}\n`;
  }

  if (
    task === 'classification' &&
    outputType === 'probability' &&
    Array.isArray(data.probabilities)
  ) {
    const classes = Array.isArray(data.classes?.[0]) ? data.classes![0]! : [];
    const header = ['row', ...classes.map((c) => escapeMarkdownCell(c))];
    lines.push(`| ${header.join(' | ')} |`);
    lines.push(`| ${header.map(() => '---').join(' | ')} |`);
    data.probabilities.forEach((row, index) => {
      const probs = Array.isArray(row?.[0]) ? row[0]! : [];
      const cells = [
        String(index + 1),
        ...probs.map((p) => escapeMarkdownCell(formatNumber(Number(p)))),
      ];
      lines.push(`| ${cells.join(' | ')} |`);
    });
    return `${lines.join('\n')}\n`;
  }

  if (task === 'regression' && outputType === 'point' && Array.isArray(data.predictions)) {
    lines.push(`| row | ${escapeMarkdownCell(target)} |`);
    lines.push('| --- | --- |');
    data.predictions.forEach((row, index) => {
      const value = Array.isArray(row) ? row[0] : row;
      lines.push(`| ${index + 1} | ${escapeMarkdownCell(formatNumber(Number(value)))} |`);
    });
    return `${lines.join('\n')}\n`;
  }

  if (
    task === 'regression' &&
    outputType === 'full' &&
    Array.isArray(data.quantiles) &&
    Array.isArray(data.quantile_levels?.[0])
  ) {
    const levels = data.quantile_levels![0]!;
    const i05 = findQuantileIndex(levels, 0.05);
    const i50 = findQuantileIndex(levels, 0.5);
    const i95 = findQuantileIndex(levels, 0.95);
    lines.push(`| row | p05 | p50 | p95 |`);
    lines.push('| --- | --- | --- | --- |');
    data.quantiles.forEach((row, index) => {
      const dist = Array.isArray(row?.[0]) ? row[0]! : [];
      lines.push(
        `| ${index + 1} | ${escapeMarkdownCell(formatNumber(Number(dist[i05] ?? '')))} | ${escapeMarkdownCell(formatNumber(Number(dist[i50] ?? '')))} | ${escapeMarkdownCell(formatNumber(Number(dist[i95] ?? '')))} |`,
      );
    });
    lines.push('');
    lines.push(
      '_Full quantile distribution truncated to p05 / p50 / p95 for readability._',
    );
    return `${lines.join('\n')}\n`;
  }

  lines.push('```json');
  lines.push(JSON.stringify(response, null, 2));
  lines.push('```');
  return `${lines.join('\n')}\n`;
}

export function resolveExaoneTabularRequestFromModel(modelId: string): {
  task: ExaoneTabularTask;
  defaultOutputType: ExaoneTabularClassificationOutput | ExaoneTabularRegressionOutput;
} | null {
  if (!isExaoneTabularModelId(modelId)) return null;
  const task = resolveExaoneTabularTask(modelId);
  if (!task) return null;
  return {
    task,
    defaultOutputType: task === 'classification' ? 'class' : 'point',
  };
}

/**
 * POST multipart CSV prediction to EXAONE Tabular.
 * @see https://docs.exaone.ai/ko/docs/exaone-tabular
 */
export async function runExaoneTabularPredict(
  request: ExaoneTabularRequest,
): Promise<{ response: ExaoneTabularResponse; markdown: string }> {
  const apiKey = String(request.apiKey || '').trim();
  if (!apiKey) throw new Error('EXAONE API 키를 입력하세요.');

  const targetColumn = String(request.targetColumn || '').trim();
  if (!targetColumn) throw new Error('타깃 컬럼명을 입력하세요.');
  if (!request.trainFile) throw new Error('학습용 CSV(train_file)를 선택하세요.');
  if (!request.testFile) throw new Error('예측용 CSV(test_file)를 선택하세요.');

  const url = `${EXAONE_API_BASE_URL}/tabular/${request.task}`;
  const form = new FormData();
  form.append(
    'train_file',
    request.trainFile,
    fileNameOr('train.csv', request.trainFileName),
  );
  form.append(
    'test_file',
    request.testFile,
    fileNameOr('test.csv', request.testFileName),
  );
  form.append('mode', 'default');
  form.append('output_type', request.outputType);
  form.append('target_columns', targetColumn);

  let res: Response;
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: form,
      ...(request.signal ? { signal: request.signal } : {}),
    });
  } catch (err) {
    throw new Error(formatNetworkError(err));
  }

  if (!res.ok) {
    const detail = await readErrorDetail(res);
    if (res.status === 401 || res.status === 403) {
      throw new Error(`EXAONE API 키 권한이 없습니다.\n\n${detail}`);
    }
    throw new Error(`EXAONE Tabular 오류 (${res.status}): ${detail}`);
  }

  let body: unknown;
  try {
    body = await res.json();
  } catch {
    throw new Error('EXAONE Tabular 응답을 JSON으로 파싱하지 못했습니다.');
  }

  const response = (asRecord(body) ?? {}) as ExaoneTabularResponse;
  const code = typeof response.result_code === 'number' ? response.result_code : res.status;
  if (code !== 200) {
    const detail =
      (typeof response.description === 'string' && response.description.trim()) ||
      `result_code=${code}`;
    throw new Error(`EXAONE Tabular 오류 (${code}): ${detail}`);
  }

  const markdown = formatExaoneTabularMarkdown(request.task, request.outputType, response);
  if (!markdown.trim()) {
    throw new Error('EXAONE Tabular가 빈 예측 결과를 반환했습니다.');
  }
  return { response, markdown };
}

export function isExaoneTabularClassificationModel(modelId: string): boolean {
  return String(modelId || '').trim() === EXAONE_TABULAR_CLASSIFICATION_MODEL;
}

export function isExaoneTabularRegressionModel(modelId: string): boolean {
  return String(modelId || '').trim() === EXAONE_TABULAR_REGRESSION_MODEL;
}
