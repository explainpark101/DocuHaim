import { describe, expect, it } from 'vitest';
import { formatRouteError } from '@/utils/routeErrorMessage';

describe('formatRouteError', () => {
  it('formats Error instances with message and stack in copy text', () => {
    const err = new Error('boom');
    err.stack = 'Error: boom\n    at test';
    const formatted = formatRouteError(err);
    expect(formatted.title).toContain('오류');
    expect(formatted.summary).toBe('boom');
    expect(formatted.details).toContain('Error: boom');
    expect(formatted.copyText).toContain('Message: boom');
    expect(formatted.copyText).toContain('Stack:');
  });

  it('formats unknown values', () => {
    const formatted = formatRouteError({ reason: 'nope' });
    expect(formatted.details).toContain('nope');
    expect(formatted.copyText).toContain('unknown error');
  });
});
