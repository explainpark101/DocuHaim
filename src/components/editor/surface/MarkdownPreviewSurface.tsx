/**
 * Preview translation layer. Phase 1 wraps md-editor-rt MdPreview so quiz /
 * chat / PDF / freeze keep working; later Haim can swap engine behind this.
 */

import { lazy, Suspense, type ComponentType } from 'react';

const LegacyMdPreview = lazy(async () => {
  const mod = await import('md-editor-rt');
  return { default: mod.MdPreview as ComponentType<Record<string, unknown>> };
});

export type MarkdownPreviewSurfaceProps = Record<string, unknown> & {
  /** Reserved for future TipTap read-only path. */
  engineHint?: 'legacy' | 'haim' | 'auto';
};

function PreviewFallback() {
  return (
    <div className="min-h-[2rem] text-sm text-gray-400 dark:text-odp-muted">미리보기 로딩…</div>
  );
}

export default function MarkdownPreviewSurface({
  engineHint: _engineHint = 'auto',
  ...props
}: MarkdownPreviewSurfaceProps) {
  return (
    <Suspense fallback={<PreviewFallback />}>
      <LegacyMdPreview {...props} />
    </Suspense>
  );
}
