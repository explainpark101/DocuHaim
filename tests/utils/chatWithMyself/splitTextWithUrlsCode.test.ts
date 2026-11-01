import { describe, expect, it } from 'vitest';
import { extractUrls, splitTextWithUrls } from '@/utils/chatWithMyself/og';

describe('splitTextWithUrls code literals', () => {
  it('does not turn URLs inside inline code into link parts', () => {
    const parts = splitTextWithUrls('use `https://example.com/path` please');
    expect(parts.some((p) => p.type === 'link')).toBe(false);
    expect(parts.map((p) => (p.type === 'text' ? p.value : '')).join('')).toBe(
      'use `https://example.com/path` please',
    );
  });

  it('still links bare URLs outside code', () => {
    const parts = splitTextWithUrls(
      'see `https://coded.example` and https://live.example/x',
    );
    const links = parts.filter((p) => p.type === 'link');
    expect(links).toHaveLength(1);
    expect(links[0]).toMatchObject({
      type: 'link',
      value: 'https://live.example/x',
    });
  });

  it('does not link markdown links inside inline code', () => {
    const parts = splitTextWithUrls('x `[label](https://example.com)` y');
    expect(parts.some((p) => p.type === 'link')).toBe(false);
  });

  it('skips fenced code URLs', () => {
    const parts = splitTextWithUrls(
      'intro\n```\nhttps://fence.example\n```\nhttps://after.example',
    );
    const links = parts.filter((p) => p.type === 'link');
    expect(links).toHaveLength(1);
    expect(links[0]).toMatchObject({ value: 'https://after.example' });
  });
});

describe('extractUrls code literals', () => {
  it('ignores URLs inside backticks', () => {
    expect(
      extractUrls('`https://hidden.example` https://shown.example'),
    ).toEqual(['https://shown.example']);
  });
});
