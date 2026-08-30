import type { SubjectiveVerdict } from '@/utils/quiz/quizTypes';

/** Best-effort partial string field read from an in-flight JSON object stream. */
export function extractStreamingJsonStringField(
  accumulated: string,
  field: string,
): string {
  const marker = `"${field}"`;
  const idx = accumulated.indexOf(marker);
  if (idx < 0) return '';

  let i = idx + marker.length;
  while (i < accumulated.length && /[\s:]/.test(accumulated[i]!)) i += 1;
  if (accumulated[i] !== '"') return '';
  i += 1;

  let out = '';
  while (i < accumulated.length) {
    const ch = accumulated[i]!;
    if (ch === '\\') {
      if (i + 1 >= accumulated.length) break;
      const next = accumulated[i + 1]!;
      if (next === 'n') out += '\n';
      else if (next === 't') out += '\t';
      else if (next === 'r') out += '\r';
      else if (next === '"') out += '"';
      else if (next === '\\') out += '\\';
      else out += next;
      i += 2;
      continue;
    }
    if (ch === '"') break;
    out += ch;
    i += 1;
  }
  return out;
}

function extractStreamingJsonNumberField(
  accumulated: string,
  field: string,
): number | undefined {
  const re = new RegExp(`"${field}"\\s*:\\s*(\\d+(?:\\.\\d+)?)`);
  const match = accumulated.match(re);
  if (!match?.[1]) return undefined;
  const n = Number.parseFloat(match[1]);
  return Number.isFinite(n) ? n : undefined;
}

function extractStreamingJsonVerdict(
  accumulated: string,
): SubjectiveVerdict | undefined {
  const raw = extractStreamingJsonStringField(accumulated, 'verdict');
  if (raw === 'correct' || raw === 'partial' || raw === 'wrong') return raw;
  return undefined;
}

export type StreamingSubjectiveGradePreview = {
  feedback: string;
  verdict?: SubjectiveVerdict;
  score?: number;
};

export function parseStreamingSubjectiveGrade(
  accumulated: string,
): StreamingSubjectiveGradePreview {
  const feedback = extractStreamingJsonStringField(accumulated, 'feedback');
  const verdict = extractStreamingJsonVerdict(accumulated);
  const score = extractStreamingJsonNumberField(accumulated, 'score');
  return {
    feedback: feedback || accumulated.trim(),
    ...(verdict ? { verdict } : {}),
    ...(score != null ? { score } : {}),
  };
}

export type StreamingQuestionSectionsPreview = {
  point?: string;
  explanation?: string;
};

export function parseStreamingQuestionSections(
  accumulated: string,
): StreamingQuestionSectionsPreview {
  const point = extractStreamingJsonStringField(accumulated, 'point');
  const explanation = extractStreamingJsonStringField(accumulated, 'explanation');
  return {
    ...(point ? { point } : {}),
    ...(explanation ? { explanation } : {}),
  };
}
