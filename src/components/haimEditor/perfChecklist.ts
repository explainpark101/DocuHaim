/**
 * Perf / architecture checklist for Haim Editor (manual + CI smoke).
 *
 * --- Dual-pane stutter inventory (known causes → mitigations) ---
 *
 * 1. Markdown serialize on every React render / sync tick
 *    Cause: getCachedMarkdown used getJSON + JSON.stringify equality.
 *    Fix: cache by immutable `editor.state.doc` identity (markdownCache).
 *
 * 2. Scroll sync ResizeObserver storms while typing
 *    Cause: RO on .ProseMirror fired every keystroke → remasure all
 *    [data-line] + follower scrollTop writes.
 *    Fix: while focused or content-sync suppress, only invalidate cache;
 *    remasure/resync on scrollend (scrollend + debounce fallback).
 *    Guidance: modern-web-guidance `defer-work-until-scroll-ends`.
 *
 * 3. Double-rAF sync lock on every scroll frame
 *    Cause: releaseSyncLock nested two rAFs + timeout per sync.
 *    Fix: single rAF + short timeout.
 *
 * 4. HaimSourceLine full-doc serialize on every TipTap doc change
 *    Cause: decorations remapped (N+1 serialize) even while typing; also
 *    ran in WYSIWYG-only mode.
 *    Fix: gate with isSourceLineEnabled (dual + scroll sync only);
 *    shouldUpdate=false while WYSIWYG focused (map decorations only) +
 *    120ms debounce force-remap; incremental remap via PM child identity;
 *    line-index binary search on full rebuild.
 *
 * 5. Dual content sync TipTap ↔ CM full replace
 *    Cause: necessary for markdown fidelity; mitigated by 150ms debounce,
 *    author focus, lastPushed skip, scroll suppress around replaces.
 *    Setting: HaimDualSyncDebounceSettings (0 = immediate).
 *
 * 6. Parent `value` echo rewriting live doc mid-keystroke
 *    Fix: lastEmitted echo skip + isLocalInputDebounceActive window.
 *
 * 7. Line-number gutters / drag-handle / find-replace
 *    Fix: lazy Suspense; gutters skip caret-only updates; prose gutter
 *    debounces remasure while WYSIWYG focused.
 *
 * --- Architecture checklist ---
 *
 * - NoteEditorSurface must lazy-import only the selected engine.
 * - Dual mode mounts HaimSourcePane only when viewMode === dual.
 * - useHaimDualSync: keyboard-focus author drives TipTap↔CM (default 150ms debounce, 0 = immediate); origin tags + lastPushed skip feedback.
 * - HaimEditor skips parent `value` echo (lastEmitted) + local-input debounce window.
 * - Follower rewrite skipped while focused; focus handoff flushes previous author once.
 * - getCachedMarkdown skips serialize when PM doc identity unchanged.
 * - Scroll sync: warm marker cache on scroll; layout work deferred to scrollend when typing.
 * - HaimSourceLine only when dual + scroll sync enabled; typing maps decorations, idle remaps.
 * - vite manualChunks: vendor-tiptap separate from vendor-md-editor.
 * - Frozen panes use MarkdownPreviewSurface with engineHint="legacy" (no TipTap)
 *   when demoted, even if the note editor type is Haim.
 *
 * --- Manual review (double pane) ---
 *
 * 1. Open a large note in double mode with scroll sync on.
 * 2. Type rapidly in WYSIWYG — follower CM should update after debounce;
 *    typing pane must not jump; no sustained main-thread stutter.
 * 3. Type in source — same for TipTap follower.
 * 4. Scroll either pane — follower tracks smoothly; Performance panel:
 *    scroll handlers stay light (no full marker remasure every frame).
 * 5. Toggle scroll sync off — [data-line] mapping stops (source-line gate).
 * 6. Toggle view to WYSIWYG-only — dual sync / scroll hooks idle.
 * 7. Run unit tests: haimDoubleScrollSyncCore, markdownCache, haimDualSyncApply,
 *    haimSourceLineMap.
 */

export const HAIM_PERF_CHECKLIST = [
  'lazy-engine-isolation',
  'dual-lazy-cm',
  'dual-debounce-origin',
  'markdown-serialize-cache',
  'markdown-cache-doc-identity',
  'scroll-sync-defer-layout-while-typing',
  'scroll-sync-scrollend-flush',
  'scroll-sync-single-raf-lock',
  'source-line-dual-only',
  'source-line-defer-while-focused',
  'source-line-incremental-remap',
  'prose-gutter-debounce-while-focused',
  'vendor-tiptap-chunk',
  'freeze-demote-preview-surface',
  'composer-lean-extensions',
  'lazy-drag-handle',
  'lazy-find-replace',
  'note-only-lowlight',
] as const;

/** Manual dual-pane review steps (also listed in file header). */
export const HAIM_DUAL_PERF_MANUAL_REVIEW = [
  'type-wysiwyg-no-jump',
  'type-source-no-jump',
  'scroll-either-pane-smooth',
  'scroll-sync-off-skips-source-line',
  'wysiwyg-only-idle-dual-hooks',
  'unit-tests-core-cache-dual',
] as const;
