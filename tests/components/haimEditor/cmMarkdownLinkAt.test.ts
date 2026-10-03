import { describe, expect, it } from 'vitest';
import { EditorState } from '@codemirror/state';
import { markdown } from '@codemirror/lang-markdown';
import {
  findMarkdownLinkHrefAt,
  normalizeMarkdownLinkHref,
} from '@/components/haimEditor/cmMarkdownLinkAt';

function stateWith(doc: string): EditorState {
  return EditorState.create({
    doc,
    extensions: [markdown()],
  });
}

describe('normalizeMarkdownLinkHref', () => {
  it('strips angle brackets and trims', () => {
    expect(normalizeMarkdownLinkHref('  <https://a.test>  ')).toBe(
      'https://a.test',
    );
  });
});

describe('findMarkdownLinkHrefAt', () => {
  it('finds href in [label](url) from label or url', () => {
    const doc = 'see [docs](https://example.com/path) here';
    const state = stateWith(doc);
    const labelPos = doc.indexOf('docs') + 1;
    const urlPos = doc.indexOf('example.com') + 1;
    expect(findMarkdownLinkHrefAt(state, labelPos)).toBe(
      'https://example.com/path',
    );
    expect(findMarkdownLinkHrefAt(state, urlPos)).toBe(
      'https://example.com/path',
    );
  });

  it('finds docuhaim destinations', () => {
    const doc = '[note](docuhaim://folder/a.md)';
    const state = stateWith(doc);
    expect(findMarkdownLinkHrefAt(state, doc.indexOf('note') + 1)).toBe(
      'docuhaim://folder/a.md',
    );
  });

  it('finds angle-bracket autolinks', () => {
    const doc = 'go <https://example.com/auto> now';
    const state = stateWith(doc);
    expect(findMarkdownLinkHrefAt(state, doc.indexOf('example') + 1)).toBe(
      'https://example.com/auto',
    );
  });

  it('returns null for images and plain text', () => {
    const doc = '![alt](https://example.com/img.png) plain';
    const state = stateWith(doc);
    expect(findMarkdownLinkHrefAt(state, doc.indexOf('alt') + 1)).toBeNull();
    expect(findMarkdownLinkHrefAt(state, doc.indexOf('plain') + 1)).toBeNull();
  });
});
