/**
 * Perf / architecture checklist for Haim Editor (manual + CI smoke).
 *
 * - NoteEditorSurface must lazy-import only the selected engine.
 * - Dual mode mounts HaimSourcePane only when viewMode === dual.
 * - useHaimDualSync debounces TipTap↔CM (300ms); origin tags + lastPushed skip feedback.
 * - HaimEditor skips parent `value` echo (lastEmitted) + local-input debounce window.
 * - Follower rewrite skipped while focused; CM/TipTap replace preserves caret/scroll.
 * - getCachedMarkdown skips serialize when JSON identity unchanged.
 * - vite manualChunks: vendor-tiptap separate from vendor-md-editor.
 * - Frozen panes use MarkdownPreviewSurface with engineHint="legacy" (no TipTap)
 *   when demoted, even if the note editor type is Haim.
 */

export const HAIM_PERF_CHECKLIST = [
  'lazy-engine-isolation',
  'dual-lazy-cm',
  'dual-debounce-origin',
  'markdown-serialize-cache',
  'vendor-tiptap-chunk',
  'freeze-demote-preview-surface',
  'composer-lean-extensions',
  'lazy-drag-handle',
  'lazy-find-replace',
  'note-only-lowlight',
] as const;
