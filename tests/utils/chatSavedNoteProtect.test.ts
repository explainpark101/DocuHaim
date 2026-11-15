import { describe, expect, it } from 'vitest';
import {
  findChatSavedNoteCardSpan,
  replaceChatSavedNoteCardSpans,
} from '@/utils/chatSavedNoteProtect';

describe('chatSavedNoteProtect', () => {
  const full = [
    '<!-- chat-with-myself id="msg1" at="2026-01-01T00:00:00.000Z" group="G" href="/chat#msg-msg1" notePath="notes/a.md" -->',
    '',
    '> G · 2026-01-01',
    '',
    '[채팅에서 저장된 노트](/chat#msg-msg1)',
    '',
    '메시지 본문',
    '',
  ].join('\n');

  it('folds comment + quote + link only', () => {
    const span = findChatSavedNoteCardSpan(full);
    expect(span).not.toBeNull();
    const card = full.slice(span!.start, span!.end);
    expect(card).toContain('<!-- chat-with-myself');
    expect(card).toContain('> G · 2026-01-01');
    expect(card).toContain('[채팅에서 저장된 노트](/chat#msg-msg1)');
    expect(card).not.toContain('메시지 본문');
    expect(full.slice(span!.end)).toContain('메시지 본문');
  });

  it('folds comment-only when quote/link are missing', () => {
    const src = '<!-- chat-with-myself id="x" href="/chat#msg-x" -->\n\nHello\n';
    const span = findChatSavedNoteCardSpan(src);
    expect(span).not.toBeNull();
    expect(src.slice(span!.start, span!.end)).toContain('chat-with-myself');
    expect(src.slice(span!.end)).toContain('Hello');
  });

  it('replaceChatSavedNoteCardSpans wraps only the card', () => {
    const out = replaceChatSavedNoteCardSpans(
      full,
      (body) => `<CARD>${body}</CARD>`,
    );
    expect(out).toContain('<CARD>');
    expect(out).toContain('</CARD>');
    expect(out).toContain('메시지 본문');
    const inner = out.match(/<CARD>([\s\S]*?)<\/CARD>/)?.[1] ?? '';
    expect(inner).not.toContain('메시지 본문');
  });
});
