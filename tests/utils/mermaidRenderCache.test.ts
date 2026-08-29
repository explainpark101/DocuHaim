import { describe, expect, it } from 'vitest';
import {
  getCachedMermaidSvg,
  mermaidRenderCacheKey,
  mermaidSourceFingerprint,
  setCachedMermaidSvg,
} from '@/utils/mermaidRenderCache';

describe('mermaidRenderCache', () => {
  it('stores and retrieves svg by theme + source', () => {
    const source = 'graph TD\nA --> B';
    expect(getCachedMermaidSvg('default', source)).toBeNull();
    setCachedMermaidSvg('default', source, '<svg id="m"></svg>');
    expect(getCachedMermaidSvg('default', source)).toBe('<svg id="m"></svg>');
    expect(getCachedMermaidSvg('dark', source)).toBeNull();
  });

  it('uses different keys for different sources', () => {
    const a = 'graph TD\nA --> B';
    const b = 'graph TD\nA --> C';
    expect(mermaidRenderCacheKey('default', a)).not.toBe(
      mermaidRenderCacheKey('default', b),
    );
    expect(mermaidSourceFingerprint(a)).not.toBe(mermaidSourceFingerprint(b));
  });
});
