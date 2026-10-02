import { describe, expect, it } from 'vitest';
import {
  HAIM_DUAL_PERF_MANUAL_REVIEW,
  HAIM_PERF_CHECKLIST,
} from '@/components/haimEditor/perfChecklist';

describe('HAIM_PERF_CHECKLIST', () => {
  it('includes dual-pane stutter mitigations', () => {
    expect(HAIM_PERF_CHECKLIST).toContain('markdown-cache-doc-identity');
    expect(HAIM_PERF_CHECKLIST).toContain(
      'scroll-sync-defer-layout-while-typing',
    );
    expect(HAIM_PERF_CHECKLIST).toContain('scroll-sync-scrollend-flush');
    expect(HAIM_PERF_CHECKLIST).toContain('source-line-dual-only');
    expect(HAIM_PERF_CHECKLIST).toContain('source-line-defer-while-focused');
    expect(HAIM_PERF_CHECKLIST).toContain('source-line-incremental-remap');
    expect(HAIM_PERF_CHECKLIST).toContain('prose-gutter-debounce-while-focused');
  });

  it('lists manual dual-pane review steps for QA', () => {
    expect(HAIM_DUAL_PERF_MANUAL_REVIEW.length).toBeGreaterThanOrEqual(5);
    expect(HAIM_DUAL_PERF_MANUAL_REVIEW).toContain('type-wysiwyg-no-jump');
    expect(HAIM_DUAL_PERF_MANUAL_REVIEW).toContain('unit-tests-core-cache-dual');
  });
});
