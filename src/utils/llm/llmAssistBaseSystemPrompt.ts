/**
 * Default system prompt for LLM Assist (shown in the panel field).
 *
 * This is a starting template only — not force-prepended at request time.
 * Users can edit it freely; each prompt template stores its own `systemPrompt`.
 *
 * Edit the string below to change the app default for new sessions / new templates.
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

/** Trimmed default used to seed the system-prompt field. */
export function getDefaultLlmAssistSystemPrompt(): string {
  return LLM_ASSIST_BASE_SYSTEM_PROMPT.trim();
}
