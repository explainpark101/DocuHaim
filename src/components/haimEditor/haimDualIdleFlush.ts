/**
 * One idle flush: read vault markdown once, patch the follower, then
 * refresh source-line decorations. Callers must not serialize again
 * inside `readVaultMarkdown`'s caller.
 */
export function runDualIdleFlush(options: {
  readVaultMarkdown: () => string;
  applyFollower: (markdown: string) => void;
  updateSourceLines: (markdown: string) => void;
}): string {
  const markdown = options.readVaultMarkdown();
  options.applyFollower(markdown);
  options.updateSourceLines(markdown);
  return markdown;
}
