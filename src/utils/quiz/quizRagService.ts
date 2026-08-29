import { splitTextIntoIndexChunks } from '@/utils/advancedSearch/fileIndexChunking';
import { loadQuizSettings } from '@/utils/quiz/quizSettingsStore';
import type { RagChunk } from '@/utils/quiz/quizTypes';
import {
  loadQuizSourceTexts,
  type QuizVaultTextReader,
} from '@/utils/quiz/quizVaultSourceLoader';

export type RetrieveQuizContextOptions = {
  sourcePaths: string[];
  query: string;
  topK?: number;
  maxChars?: number;
  readText: QuizVaultTextReader;
};

function normalizePaths(paths: string[]): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const p of paths) {
    const n = String(p || '')
      .trim()
      .replace(/\\/g, '/')
      .replace(/^\/+/, '');
    if (!n || seen.has(n)) continue;
    seen.add(n);
    out.push(n);
  }
  return out;
}

function queryTerms(query: string): string[] {
  return String(query || '')
    .toLowerCase()
    .split(/[^\p{L}\p{N}]+/u)
    .map((t) => t.trim())
    .filter((t) => t.length >= 2)
    .slice(0, 16);
}

function scoreExcerpt(excerpt: string, terms: string[]): number {
  if (terms.length === 0) return 1;
  const lower = excerpt.toLowerCase();
  let score = 0;
  for (const t of terms) {
    if (lower.includes(t)) score += 1;
  }
  return score;
}

/**
 * Retrieve RAG excerpts for quiz generation from selected vault `.md` paths.
 * Loads file bodies via `readText`, chunks them, and ranks by query term overlap.
 */
export async function retrieveQuizContext(
  options: RetrieveQuizContextOptions,
): Promise<{ chunks: RagChunk[]; usedFallback: boolean }> {
  const settings = loadQuizSettings();
  const topK = options.topK ?? settings.ragTopK;
  const maxChars = options.maxChars ?? settings.ragMaxChars;
  const paths = normalizePaths(options.sourcePaths);
  if (paths.length === 0) return { chunks: [], usedFallback: false };

  const files = await loadQuizSourceTexts(paths, options.readText);
  if (files.length === 0) return { chunks: [], usedFallback: true };

  const terms = queryTerms(options.query);
  const scored: RagChunk[] = [];
  for (const file of files) {
    const parts = splitTextIntoIndexChunks(file.text, 12_000);
    parts.forEach((excerpt, chunkIndex) => {
      if (!excerpt.trim()) return;
      scored.push({
        path: file.path,
        excerpt,
        chunkIndex,
        score: scoreExcerpt(excerpt, terms),
      });
    });
  }

  scored.sort((a, b) => (b.score || 0) - (a.score || 0));

  const chunks: RagChunk[] = [];
  let used = 0;
  for (const c of scored) {
    if (chunks.length >= topK) break;
    if (used + c.excerpt.length > maxChars) {
      const room = maxChars - used;
      if (room < 200) break;
      chunks.push({ ...c, excerpt: c.excerpt.slice(0, room) });
      break;
    }
    chunks.push(c);
    used += c.excerpt.length;
  }

  return { chunks, usedFallback: true };
}

export function formatRagChunksForPrompt(chunks: RagChunk[]): string {
  if (!chunks.length) return '';
  return chunks.map((c) => `---\n[${c.path}]\n${c.excerpt}\n`).join('\n');
}

/**
 * Load each source file body (truncated) for per-document summarization.
 */
export async function loadQuizSourceBodies(
  sourcePaths: string[],
  readText: QuizVaultTextReader,
  maxCharsPerFile?: number,
): Promise<Array<{ path: string; text: string }>> {
  const settings = loadQuizSettings();
  const cap = Math.max(
    4000,
    maxCharsPerFile ?? Math.min(settings.ragMaxChars, 200_000),
  );
  const paths = normalizePaths(sourcePaths);
  if (!paths.length) return [];
  const files = await loadQuizSourceTexts(paths, readText);
  return files.map((f) => ({
    path: f.path,
    text: f.text.length > cap ? `${f.text.slice(0, cap)}\n\n…(truncated)` : f.text,
  }));
}
