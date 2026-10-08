/**
 * Haim Editor custom-markdown coverage from docs/custom-markdown/*.md.
 *
 * Exercises the TipTap I/O pipeline (meta split + protect + restore), not full
 * TipTap DOM. Spec examples are taken from each feature doc.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import {
  joinMetaPrefix,
  splitLeadingMetaComments,
} from '@/components/haimEditor/metaCommentGuard';
import {
  markdownToEditorContent,
  scrubEmptyParagraphNbsp,
} from '@/components/haimEditor/markdownIo';
import {
  protectCustomMarkdown,
  restoreCustomMarkdown,
} from '@/components/haimEditor/protectCustomMarkdown';
import { WIKI_IMAGE_PLACEHOLDER_SRC } from '@/components/haimEditor/extensions/wikiImageConstants';

const DOCS_DIR = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../../../docs/custom-markdown',
);

/** Feature docs that must have a suite below (excludes index.md). */
const COVERED_FEATURE_DOCS = [
  'wiki-image.md',
  'remote-image.md',
  'markdown-image-attrs.md',
  'page-break.md',
  'heading-levels.md',
  'chat-file.md',
  'chat-note.md',
  'chat-folder.md',
  'chat-day-file-comments.md',
  'enc-md.md',
  'chat-saved-note.md',
  'note-cover.md',
  'print-chrome.md',
  'haim-table.md',
  'plan-frontmatter.md',
  'footnotes.md',
  'document-settings.md',
  'quiz-md.md',
  'preview-hard-break.md',
  'emoji-shortcode.md',
  'mermaid-fence-size.md',
  'mermaid-size.md',
  'docuhaim-link.md',
  'kanban-json.md',
  'task-list.md',
] as const;

/** protect → restore on body only (no leading-meta split). */
function protectRestore(src: string): string {
  return scrubEmptyParagraphNbsp(
    restoreCustomMarkdown(protectCustomMarkdown(src)),
  );
}

/** Full Haim vault round-trip: meta prefix + protect/restore body. */
function haimRoundTrip(markdown: string): string {
  const { prefix, content } = markdownToEditorContent(markdown);
  const restored = scrubEmptyParagraphNbsp(restoreCustomMarkdown(content));
  return joinMetaPrefix(prefix, restored);
}

function expectContainsAll(haystack: string, needles: string[]): void {
  for (const n of needles) {
    expect(haystack, `missing: ${n}`).toContain(n);
  }
}

describe('Haim Editor custom markdown (docs/custom-markdown)', () => {
  it('covers every feature doc file', () => {
    const onDisk = fs
      .readdirSync(DOCS_DIR)
      .filter((f) => f.endsWith('.md') && f !== 'index.md')
      .sort();
    expect([...COVERED_FEATURE_DOCS].sort()).toEqual(onDisk);
  });

  describe('wiki-image.md', () => {
    it('protects path-only wiki image to placeholder img', () => {
      const protectedMd = protectCustomMarkdown('![[path/to/image.png]]\n');
      expect(protectedMd).toContain('data-wiki-path="path/to/image.png"');
      expect(protectedMd).toContain(WIKI_IMAGE_PLACEHOLDER_SRC);
      expect(protectRestore('![[path/to/image.png]]\n')).toContain(
        '![[path/to/image.png]]',
      );
    });

    it('round-trips Spec option forms to canonical w=/h=/bg=', () => {
      const cases: Array<{ src: string; expect: string }> = [
        {
          src: '![[path/to/image.png|320]]',
          expect: '![[path/to/image.png|w=320px]]',
        },
        {
          src: '![[path/to/image.png|320x200]]',
          expect: '![[path/to/image.png|w=320px h=200px]]',
        },
        {
          src: '![[path/to/image.png|w=50% h=240]]',
          expect: '![[path/to/image.png|w=50% h=240px]]',
        },
        {
          src: '![[path/to/image.png|width=480]]',
          expect: '![[path/to/image.png|w=480px]]',
        },
        {
          src: '![[path/to/image.png|bg=#ffffff]]',
          expect: '![[path/to/image.png|bg=#ffffff]]',
        },
        {
          src: '![[path/to/image.png|w=320 bg=#fff]]',
          expect: '![[path/to/image.png|w=320px bg=#ffffff]]',
        },
      ];
      for (const c of cases) {
        expect(protectRestore(`${c.src}\n`).trim()).toContain(c.expect);
      }
    });

    it('folds adjacent caption into figure then restores caption line', () => {
      const src = '![[photos/cover.jpg|w=480]]\n표지 사진 설명\n';
      const protectedMd = protectCustomMarkdown(src);
      expect(protectedMd).toContain('data-haim-wiki-figure');
      expect(protectedMd).toContain('<figcaption>');
      expect(protectedMd).toContain('표지 사진 설명');
      const restored = protectRestore(src);
      expect(restored).toContain('![[photos/cover.jpg|w=480px]]');
      expect(restored).toContain('표지 사진 설명');
    });

    it('folds caption across one blank line (adjacent paragraphs)', () => {
      const src = '![[photos/cover.jpg]]\n\n표지 사진 설명\n';
      const protectedMd = protectCustomMarkdown(src);
      expect(protectedMd).toContain('data-haim-wiki-figure');
      expect(protectRestore(src)).toContain('표지 사진 설명');
    });

    it('does not fold when next line is a new block construct', () => {
      const src = '![[photos/cover.jpg]]\n# Heading\n';
      const protectedMd = protectCustomMarkdown(src);
      expect(protectedMd).not.toContain('data-haim-wiki-figure');
      expect(protectRestore(src)).toContain('# Heading');
    });

    it('treats invalid option suffix as part of path (Spec §2)', () => {
      const src = '![[path/with|not-opts]]\n';
      const restored = protectRestore(src);
      expect(restored).toContain('![[path/with|not-opts]]');
    });

    it('does not treat empty path as an image', () => {
      const src = '![[ ]]\n';
      expect(protectCustomMarkdown(src)).toContain('![[ ]]');
    });
  });

  describe('remote-image.md', () => {
    it('keeps mid-body sidecar comment with wiki image through protect/restore', () => {
      const src = [
        '<!-- remote-image url="https://i.ibb.co/abc.png" hash="a1b2c3d4e5f6789012345678" -->',
        '![[photos/cover.jpg|w=480]]',
        '',
      ].join('\n');
      const restored = protectRestore(src);
      expect(restored).toContain('<!-- remote-image url="https://i.ibb.co/abc.png"');
      expect(restored).toContain('hash="a1b2c3d4e5f6789012345678"');
      expect(restored).toContain('![[photos/cover.jpg|w=480px]]');
    });

    it('keeps sidecar before standard markdown image and mermaid fence', () => {
      const mdImg = [
        '<!-- remote-image url="https://i.ibb.co/x.png" hash="aaaaaaaaaaaaaaaaaaaaaaaa" -->',
        '![alt](data:image/png;base64,aaa)',
        '',
      ].join('\n');
      expect(protectRestore(mdImg)).toContain('remote-image');
      expect(protectRestore(mdImg)).toContain('![alt](data:image/png;base64,aaa)');

      const mermaid = [
        '<!-- remote-image url="https://i.ibb.co/y.png" hash="bbbbbbbbbbbbbbbbbbbbbbbb" -->',
        '```mermaid',
        'flowchart TD',
        '  A --> B',
        '```',
        '',
      ].join('\n');
      expect(protectRestore(mermaid)).toContain('remote-image');
      expect(protectRestore(mermaid)).toContain('```mermaid');
    });

    it('preserves leading remote-image in meta prefix (Haim metaCommentGuard)', () => {
      const md = [
        '<!-- remote-image url="https://i.ibb.co/abc.png" hash="deadbeefdeadbeefdeadbeef" -->',
        '',
        '# Body',
        '',
      ].join('\n');
      const { prefix, body } = splitLeadingMetaComments(md);
      expect(prefix).toContain('remote-image');
      expect(body.trimStart().startsWith('# Body')).toBe(true);
      const round = haimRoundTrip(md);
      expect(round).toContain('remote-image');
      expect(round).toContain('# Body');
    });
  });

  describe('markdown-image-attrs.md', () => {
    it('leaves standard image + {attrs} intact through protect/restore', () => {
      const src = '![alt](photos/a.png){w=320 h=200 bg=#fff}\n';
      const restored = protectRestore(src);
      expect(restored).toContain('![alt](photos/a.png){w=320 h=200 bg=#fff}');
    });

    it('does not convert markdown images into wiki images', () => {
      const src = '![설명](./relative.png){width=480}\n';
      const protectedMd = protectCustomMarkdown(src);
      expect(protectedMd).not.toContain('data-wiki-path');
      expect(protectedMd).toContain('![설명](./relative.png){width=480}');
    });
  });

  describe('page-break.md', () => {
    it('normalizes allowed pgbr forms to <pgbr/>', () => {
      for (const form of ['<pgbr/>', '<pgbr>', '<pgbr />', '<PGBR/>']) {
        const restored = protectRestore(`before\n\n${form}\n\nafter\n`);
        expect(restored).toContain('<pgbr/>');
      }
    });

    it('restores TipTap host div back to <pgbr/>', () => {
      const fromHost =
        'before\n\n<div data-haim-pgbr="1" class="haim-pgbr"></div>\n\nafter\n';
      expect(restoreCustomMarkdown(fromHost)).toContain('<pgbr/>');
    });

    it('does not treat thematic break --- as a page break', () => {
      const src = 'a\n\n---\n\nb\n';
      expect(protectRestore(src)).toContain('---');
      expect(protectRestore(src)).not.toContain('<pgbr/>');
    });
  });

  describe('heading-levels.md', () => {
    it('maps h7–h10 to h6 data-heading-level and restores ATX', () => {
      const levels = [7, 8, 9, 10] as const;
      for (const n of levels) {
        const hashes = '#'.repeat(n);
        const src = `${hashes} Deep ${n}\n`;
        const protectedMd = protectCustomMarkdown(src);
        expect(protectedMd).toContain(`data-heading-level="${n}"`);
        expect(protectedMd).toMatch(/<h6\b/);
        expect(protectRestore(src).trim()).toBe(`${hashes} Deep ${n}`);
      }
    });

    it('leaves h1–h6 ATX unchanged', () => {
      const src = '# h1\n## h2\n###### h6\n';
      expect(protectCustomMarkdown(src)).toBe(src);
    });

    it('does not treat 11 hashes as a deep heading', () => {
      const src = '########### not-heading\n';
      expect(protectCustomMarkdown(src)).not.toContain('data-heading-level');
    });
  });

  describe('chat-file.md / chat-note.md / chat-folder.md', () => {
    it('passes chat attachment tokens through as literal note text', () => {
      const src = [
        '[[file:path/to/doc.pdf|표시이름|12345]]',
        '[[note:notes/hello.md|헬로]]',
        '[[folder:projects/alpha|알파]]',
        '',
      ].join('\n');
      const restored = protectRestore(src);
      expectContainsAll(restored, [
        '[[file:path/to/doc.pdf|표시이름|12345]]',
        '[[note:notes/hello.md|헬로]]',
        '[[folder:projects/alpha|알파]]',
      ]);
    });
  });

  describe('chat-day-file-comments.md', () => {
    it('does not treat chat-day comments as Haim leading meta', () => {
      const md = '<!-- chat-msg id="x" -->\n\nBody\n';
      const { prefix, body } = splitLeadingMetaComments(md);
      expect(prefix).toBe('');
      expect(body).toBe(md);
      expect(protectRestore(md)).toContain('<!-- chat-msg id="x" -->');
    });
  });

  describe('enc-md.md', () => {
    it('is a file-format concern; ciphertext JSON body is left as text', () => {
      const wire = '{"ciphertext":"abc","iv":"def","salt":"ghi"}\n';
      expect(protectRestore(wire).trim()).toBe(wire.trim());
    });
  });

  describe('chat-saved-note.md', () => {
    it('wraps chat-with-myself card block as raw and restores it', () => {
      const src = [
        '<!-- chat-with-myself id="msg1" at="2026-01-01T00:00:00.000Z" group="G" href="/chat#msg-msg1" notePath="notes/a.md" -->',
        '',
        '> G · 2026-01-01',
        '',
        '[채팅에서 저장된 노트](/chat#msg-msg1)',
        '',
        '메시지 본문',
        '',
      ].join('\n');
      const protectedMd = protectCustomMarkdown(src);
      expect(protectedMd).toContain('data-kind="chat-saved-note"');
      const restored = protectRestore(src);
      expectContainsAll(restored, [
        '<!-- chat-with-myself',
        'id="msg1"',
        '[채팅에서 저장된 노트](/chat#msg-msg1)',
        '메시지 본문',
      ]);
    });
  });

  describe('note-cover.md', () => {
    it('splits leading note-cover into meta prefix and injects WYSIWYG host', () => {
      const md = [
        '<!-- note-cover',
        '{"v":2,"enabled":true,"pageSizeId":"a4"}',
        '-->',
        '',
        '# Title',
        '',
      ].join('\n');
      const { prefix, content } = markdownToEditorContent(md);
      expect(prefix).toContain('note-cover');
      expect(content).toContain('data-note-cover-placeholder');
      expect(content).toContain('# Title');
      const round = haimRoundTrip(md);
      expect(round).toContain('<!-- note-cover');
      expect(round).toContain('# Title');
      expect(round).not.toContain('data-note-cover-placeholder');
    });
  });

  describe('print-chrome.md', () => {
    it('keeps leading print-chrome in meta prefix through round-trip', () => {
      const md = [
        '<!-- print-chrome',
        '{"v":1,"showOnCover":false,"numbering":"body","templates":[]}',
        '-->',
        '',
        'Hello',
        '',
      ].join('\n');
      const { prefix, body } = splitLeadingMetaComments(md);
      expect(prefix).toContain('print-chrome');
      expect(body.trimStart().startsWith('Hello')).toBe(true);
      const round = haimRoundTrip(md);
      expect(round).toContain('print-chrome');
      expect(round).toContain('Hello');
    });
  });

  describe('haim-table.md', () => {
    it('wraps haim-table comment + GFM table and restores both', () => {
      const src = [
        '<!-- haim-table',
        '{"v":1,"headerRows":1,"footerRows":0,"width":"fit","align":"right","merges":[],"sections":{},"cells":{}}',
        '-->',
        '| A | B |',
        '| --- | --- |',
        '| 1 | 2 |',
        '',
        'Next',
        '',
      ].join('\n');
      const protectedMd = protectCustomMarkdown(src);
      expect(protectedMd).toContain('data-kind="haim-table"');
      const restored = protectRestore(src);
      expectContainsAll(restored, [
        '<!-- haim-table',
        '"width":"fit"',
        '| A | B |',
        '| 1 | 2 |',
        'Next',
      ]);
    });

    it('round-trips noHeader meta shape', () => {
      const src = [
        '<!-- haim-table',
        '{"v":1,"headerRows":1,"footerRows":0,"noHeader":true,"width":"full","align":"left","merges":[],"sections":{},"cells":{}}',
        '-->',
        '| A | B |',
        '| --- | --- |',
        '| 1 | 2 |',
        '',
      ].join('\n');
      expect(protectRestore(src)).toContain('"noHeader":true');
    });
  });

  describe('plan-frontmatter.md', () => {
    it('wraps leading plan YAML and restores fences + body', () => {
      const src = [
        '---',
        'name: Chat AI Replies',
        'overview: Short summary under the title.',
        'todos:',
        '  - id: step-one',
        '    content: First task',
        '    status: pending',
        'isProject: false',
        '---',
        '',
        '# Body heading',
        '',
        'Regular markdown continues here.',
        '',
      ].join('\n');
      const protectedMd = protectCustomMarkdown(src);
      expect(protectedMd).toContain('data-kind="plan-frontmatter"');
      const restored = protectRestore(src);
      expect(restored.startsWith('---')).toBe(true);
      expectContainsAll(restored, [
        'name: Chat AI Replies',
        'todos:',
        '# Body heading',
        'Regular markdown continues here.',
      ]);
    });
  });

  describe('footnotes.md', () => {
    it('keeps leading footnotes meta in prefix', () => {
      const md = [
        '<!-- footnotes',
        '{"v":1,"enabled":true}',
        '-->',
        '',
        'Claim[^1] text.',
        '',
        '[^1]: docs.example - Title',
        'https://example.com/',
        '',
      ].join('\n');
      const { prefix, body } = splitLeadingMetaComments(md);
      expect(prefix).toContain('footnotes');
      expect(body).toContain('Claim[^1]');
      const round = haimRoundTrip(md);
      expectContainsAll(round, [
        '<!-- footnotes',
        '"enabled":true',
        'Claim[^1]',
        '[^1]: docs.example - Title',
        'https://example.com/',
      ]);
    });

    it('preserves body refs and trailing definitions through protect/restore', () => {
      const src = [
        'Claim[^1]and more[^2]text.',
        '',
        '[^1]: docs.docker.com - Define services',
        'https://docs.docker.com/',
        '',
        '[^2]: github.com - Example',
        'https://github.com/example/repo/issues/1',
        '',
      ].join('\n');
      const restored = protectRestore(src);
      expectContainsAll(restored, [
        'Claim[^1]',
        '[^2]',
        '[^1]: docs.docker.com',
        '[^2]: github.com',
      ]);
    });
  });

  describe('document-settings.md', () => {
    it('keeps leading document-settings after other meta comments', () => {
      const md = [
        '<!-- note-cover',
        '{"v":2,"enabled":false}',
        '-->',
        '<!-- footnotes',
        '{"v":1,"enabled":true}',
        '-->',
        '<!-- document-settings',
        '{"v":1,"sourceList":{"show":true,"title":"Sources"},"fonts":{"body":"Paperozi","heading":"A2z","bold":"Paperozi","code":"D2Coding"},"webfontCss":""}',
        '-->',
        '',
        'Body text',
        '',
      ].join('\n');
      const { prefix, body } = splitLeadingMetaComments(md);
      expectContainsAll(prefix, [
        'note-cover',
        'footnotes',
        'document-settings',
      ]);
      expect(body.trimStart().startsWith('Body text')).toBe(true);
      const round = haimRoundTrip(md);
      expectContainsAll(round, [
        'document-settings',
        '"title":"Sources"',
        'Body text',
      ]);
    });
  });

  describe('quiz-md.md', () => {
    it('leaves quiz-config comment as opaque body text in protect/restore', () => {
      const src = [
        '<!-- quiz-config {"choiceCount":4,"sourcePaths":["notes/ch1.md"]} -->',
        '',
        '## Q1',
        '',
      ].join('\n');
      const restored = protectRestore(src);
      expect(restored).toContain('<!-- quiz-config');
      expect(restored).toContain('"choiceCount":4');
      expect(restored).toContain('## Q1');
    });
  });

  describe('preview-hard-break.md', () => {
    it('preserves <br/> hard breaks through protect/restore', () => {
      const src = '첫 줄<br/>\n둘째 줄\n';
      const restored = protectRestore(src);
      expect(restored).toMatch(/첫 줄<br\s*\/?>/);
      expect(restored).toContain('둘째 줄');
    });

    it('accepts <br> and <br /> variants in source', () => {
      expect(protectRestore('a<br>b\n')).toMatch(/a<br\s*\/?>b/);
      expect(protectRestore('a<br />b\n')).toMatch(/a<br\s*\/?>b/);
    });
  });

  describe('mermaid-fence-size.md', () => {
    it('leaves legacy sized mermaid fences for TipTap codeBlock (not raw wrap)', () => {
      const src = [
        '```mermaid width=420px height=280px',
        'flowchart TD',
        '  A --> B',
        '```',
        '',
      ].join('\n');
      const protectedMd = protectCustomMarkdown(src);
      expect(protectedMd).toContain('```mermaid width=420px height=280px');
      expect(protectedMd).not.toContain('data-kind="mermaid"');
      expect(protectRestore(src)).toContain('width=420px');
      expect(protectRestore(src)).toContain('A --> B');
    });
  });

  describe('mermaid-size.md', () => {
    it('wraps mermaid-size comment + fence as one raw block and restores both', () => {
      const src = [
        '<!-- mermaid-size width="420px" height="280px" -->',
        '```mermaid',
        'flowchart TD',
        '  A --> B',
        '```',
        '',
      ].join('\n');
      const protectedMd = protectCustomMarkdown(src);
      expect(protectedMd).toContain('data-kind="mermaid"');
      const restored = protectRestore(src);
      expectContainsAll(restored, [
        '<!-- mermaid-size width="420px" height="280px" -->',
        '```mermaid',
        'A --> B',
      ]);
    });

    it('does not wrap plain mermaid fence without size comment', () => {
      const src = '```mermaid\ngraph TD\nA-->B\n```\n';
      const protectedMd = protectCustomMarkdown(src);
      expect(protectedMd).toContain('```mermaid');
      expect(protectedMd).not.toContain('data-kind="mermaid"');
    });
  });

  describe('emoji-shortcode.md', () => {
    it('leaves vault :shortcode: text intact through protect/restore', () => {
      const src = [
        'Done :cross_mark: :white_check_mark: :smile:',
        '',
        'Literal `:cross_mark:` in code',
        '',
        '```text',
        ':cross_mark:',
        '```',
        '',
      ].join('\n');
      const restored = protectRestore(src);
      expectContainsAll(restored, [
        ':cross_mark:',
        ':white_check_mark:',
        ':smile:',
        '`:cross_mark:`',
      ]);
      // protect must not turn shortcodes into TipTap emoji HTML
      expect(protectCustomMarkdown(src)).not.toContain('data-type="emoji"');
    });
  });

  describe('docuhaim-link.md', () => {
    it('leaves docuhaim:// markdown links intact through protect/restore', () => {
      const src = [
        '[회의록](docuhaim://notes/meeting.md)',
        '[표지](docuhaim://folder/file%20name.md)',
        '',
      ].join('\n');
      const restored = protectRestore(src);
      expectContainsAll(restored, [
        '[회의록](docuhaim://notes/meeting.md)',
        '[표지](docuhaim://folder/file%20name.md)',
      ]);
    });
  });

  describe('kanban-json.md', () => {
    it('is a file-format concern; board JSON body is left as text', () => {
      const wire = [
        '{',
        '  "version": 2,',
        '  "settings": { "swimlanesEnabled": false },',
        '  "lanes": [{ "id": "lane_default", "title": "Default" }],',
        '  "columns": [],',
        '  "cards": {}',
        '}',
        '',
      ].join('\n');
      const restored = protectRestore(wire);
      expect(restored).toContain('"version": 2');
      expect(restored).toContain('lane_default');
    });
  });

  describe('task-list.md', () => {
    it('preserves check and status task markers through protect/restore', () => {
      const src = [
        '- [ ] 일반 할 일',
        '- [x] 일반 완료',
        '- [~] 상태 할 일',
        '* [X] 완료 대문자',
        '',
      ].join('\n');
      const restored = protectRestore(src);
      expectContainsAll(restored, [
        '[ ] 일반 할 일',
        '[x] 일반 완료',
        '[~] 상태 할 일',
      ]);
      // Uppercase X may normalize to lowercase on restore; either is acceptable.
      expect(restored).toMatch(/\[[xX]\] 완료 대문자/);
    });
  });

  describe('combined document (meta + body features)', () => {
    it('round-trips a note using several editor-scoped custom syntaxes', () => {
      const md = [
        '<!-- note-cover',
        '{"v":2,"enabled":true}',
        '-->',
        '<!-- print-chrome',
        '{"v":1,"showOnCover":false,"numbering":"body","templates":[]}',
        '-->',
        '<!-- footnotes',
        '{"v":1,"enabled":true}',
        '-->',
        '<!-- document-settings',
        '{"v":1,"sourceList":{"show":true,"title":"Sources"},"fonts":{"body":"","heading":"","bold":"","code":""},"webfontCss":""}',
        '-->',
        '',
        '# Intro',
        '',
        'See[^1] and image:',
        '',
        '![[img/a.png|w=50%]]',
        '캡션',
        '',
        '<pgbr/>',
        '',
        '####### Deep',
        '',
        '<!-- mermaid-size width="200px" -->',
        '```mermaid',
        'graph TD',
        'A-->B',
        '```',
        '',
        '<!-- haim-table',
        '{"v":1,"headerRows":1,"footerRows":0,"width":"full","align":"left","merges":[],"sections":{},"cells":{}}',
        '-->',
        '| a | b |',
        '|---|---|',
        '| 1 | 2 |',
        '',
        '[^1]: Source title',
        'https://example.com/',
        '',
      ].join('\n');

      const round = haimRoundTrip(md);
      expectContainsAll(round, [
        'note-cover',
        'print-chrome',
        'footnotes',
        'document-settings',
        '# Intro',
        'See[^1]',
        '![[img/a.png|w=50%]]',
        '캡션',
        '<pgbr/>',
        '####### Deep',
        '<!-- mermaid-size width="200px" -->',
        '```mermaid',
        'haim-table',
        '| a | b |',
        '[^1]: Source title',
      ]);
      expect(round).not.toContain('data-note-cover-placeholder');
      expect(round).not.toContain('data-haim-raw-md');
    });
  });
});
