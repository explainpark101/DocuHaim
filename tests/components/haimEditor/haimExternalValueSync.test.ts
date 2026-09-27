import { describe, expect, it } from 'vitest';
import { isVaultValueEcho } from '@/components/haimEditor/haimExternalValueSync';

describe('isVaultValueEcho', () => {
  it('treats identical parent value as echo of last emit', () => {
    expect(isVaultValueEcho('- a\n- b\n', '- a\n- b\n')).toBe(true);
  });

  it('allows true external updates (file switch / LLM)', () => {
    expect(isVaultValueEcho('# rewritten\n', '- a\n- b\n')).toBe(false);
  });

  it('does not treat newer in-flight editor content as echo via this helper', () => {
    // Caller skips apply when value === lastEmitted even if editor already has more.
    const lastEmitted: string = '- a\n';
    const parentEcho: string = '- a\n';
    const editorAhead: string = '- a\n- b\n';
    expect(isVaultValueEcho(parentEcho, lastEmitted)).toBe(true);
    expect(editorAhead).not.toBe(parentEcho);
  });
});
