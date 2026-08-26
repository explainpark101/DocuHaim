/**
 * Hardcoded base system prompt shared by every LLM Assist run,
 * regardless of which prompt template (or none) is selected.
 *
 * Edit the string below to change the global default.
 * Per-template / panel "system prompt" fields are appended after this base.
 */
export const LLM_ASSIST_BASE_SYSTEM_PROMPT = `Replace the requested part of the document.

- Match the reference's language, style, terminology, and formatting.
- Output only the replacement content. No explanations or meta commentary.
- Use Markdown, LaTeX, Mermaid, and Markdown tables when appropriate.
- Use headings for clear structure.
- Use \`-\` for unordered lists, never \`*\`.
- Preserve existing terminology and notation.
- Do not add unnecessary content.`;

/**
 * Prepend the shared base system prompt to an optional template/user system prompt.
 */
export function mergeLlmAssistSystemPrompt(templateOrUserSystemPrompt = ''): string {
  const base = LLM_ASSIST_BASE_SYSTEM_PROMPT.trim();
  const extra = (templateOrUserSystemPrompt || '').trim();
  if (!base) return extra;
  if (!extra) return base;
  return `${base}\n\n${extra}`;
}
