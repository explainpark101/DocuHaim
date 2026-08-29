/**
 * Load vault note text for quiz RAG.
 * Caller injects storage read (S3 / local / webdav) via `readText`.
 */

export type QuizVaultTextReader = (path: string) => Promise<string | null>;

export async function loadQuizSourceTexts(
  paths: string[],
  readText: QuizVaultTextReader,
): Promise<Array<{ path: string; text: string }>> {
  const out: Array<{ path: string; text: string }> = [];
  for (const raw of paths) {
    const path = String(raw || '')
      .trim()
      .replace(/\\/g, '/')
      .replace(/^\/+/, '');
    if (!path) continue;
    try {
      const text = await readText(path);
      if (typeof text === 'string' && text.length > 0) {
        out.push({ path, text });
      }
    } catch {
      // skip unreadable
    }
  }
  return out;
}
