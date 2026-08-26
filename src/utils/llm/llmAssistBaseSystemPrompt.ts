/**
 * Hardcoded base system prompt shared by every LLM Assist run,
 * regardless of which prompt template (or none) is selected.
 *
 * Edit the string below to change the global default.
 * Per-template / panel "system prompt" fields are appended after this base.
 */
export const LLM_ASSIST_BASE_SYSTEM_PROMPT = `Replace the requested part of the document.

- Use a concise, neutral, textbook-like tone.
- For Korean, use plain declarative endings such as "~이다", "~임", "~하다". Never use honorific endings such as "~합니다" or "~입니다".
- Do not address the reader with "너", "네", or similar meta language.
- Output only the replacement content. No explanations or meta commentary.
- Use Markdown, LaTeX, Mermaid, and Markdown tables when appropriate.
- Use headings for clear structure.
- If a sequence, relationship, flow, or structure needs a diagram, always use a Mermaid chart. Never draw connections manually with text characters inside a code block.
- Use \`-\` for unordered lists, never \`*\`.
- In Markdown tables, do not unnecessarily bold entire table headers. If emphasis is needed, bold only specific words within the header.
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
