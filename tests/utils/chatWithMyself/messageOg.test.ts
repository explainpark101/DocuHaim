import { describe, expect, it } from 'vitest';
import { parseDayFile, serializeMessage } from '@/utils/chatWithMyself/format.js';
import {
  canonicalOgFetchUrl,
  groupUrlsByOgIdentity,
  ogPayloadIdentity,
  youtubePlaylistId,
  youtubeVideoId,
} from '@/utils/chatWithMyself/ogIdentity';
import {
  collectBubbleOgCards,
  parseOgCardsAttr,
  serializeOgCardsAttr,
} from '@/utils/chatWithMyself/messageOg';
import type { OgPayload } from '@/utils/chatWithMyself/og';

describe('og identity', () => {
  it('treats youtube timestamp variants as one video', () => {
    const a = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=42s';
    const b = 'https://youtu.be/dQw4w9WgXcQ?t=120';
    const c = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&start=15';
    expect(youtubeVideoId(a)).toBe('dQw4w9WgXcQ');
    expect(canonicalOgFetchUrl(a)).toBe(
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    );
    expect(canonicalOgFetchUrl(b)).toBe(canonicalOgFetchUrl(a));
    expect(canonicalOgFetchUrl(c)).toBe(canonicalOgFetchUrl(a));
    const groups = groupUrlsByOgIdentity([a, b, c, 'https://example.com/a']);
    expect(groups).toHaveLength(2);
    expect(groups[0]?.urls).toEqual([a, b, c]);
    expect(groups[0]?.fetchUrl).toBe(
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    );
    expect(groups[0]?.displayUrl).toBe(a);
    expect(groups[0]?.key).toBe('yt:v:dQw4w9WgXcQ');
  });

  it('treats the same playlist list id as one link and keeps a different video separate', () => {
    const playlistA = 'https://www.youtube.com/playlist?list=PLabcdefghij&index=2';
    const playlistB = 'https://www.youtube.com/watch?list=PLabcdefghij&t=30';
    const videoInList =
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=PLabcdefghij&t=15';
    expect(youtubePlaylistId(playlistA)).toBe('PLabcdefghij');
    expect(youtubePlaylistId(videoInList)).toBeNull();
    const groups = groupUrlsByOgIdentity([playlistA, playlistB, videoInList]);
    expect(groups).toHaveLength(2);
    expect(groups[0]?.key).toBe('yt:list:PLabcdefghij');
    expect(groups[0]?.urls).toEqual([playlistA, playlistB]);
    expect(groups[0]?.fetchUrl).toBe(
      'https://www.youtube.com/playlist?list=PLabcdefghij',
    );
    expect(groups[1]?.key).toBe('yt:v:dQw4w9WgXcQ');
  });

  it('collapses fetched previews only when title and image match exactly', () => {
    const left = 'https://example.com/post?utm_source=a';
    const right = 'https://example.com/post?utm_source=b';
    const groups = groupUrlsByOgIdentity([left, right]);
    expect(groups).toHaveLength(2);
    const payload = (url: string, image: string, title = 'Same Post'): OgPayload => ({
      url,
      fetchedAt: '2026-01-01T00:00:00.000Z',
      title,
      description: 'hello',
      image,
      siteName: 'Example',
      type: 'article',
      provider: 'microlink',
      embedHtml: '',
    });
    const sameImage = 'https://cdn.example/og.png?w=1200';
    expect(ogPayloadIdentity(payload(left, sameImage))).toBe(
      ogPayloadIdentity(payload(right, sameImage)),
    );
    expect(
      ogPayloadIdentity(payload(left, sameImage), groups[0]?.key),
    ).not.toBe(
      ogPayloadIdentity(payload(right, 'https://cdn.example/og.png?w=800'), groups[1]?.key),
    );
    expect(
      ogPayloadIdentity(payload(left, sameImage, 'Same Post'), groups[0]?.key),
    ).not.toBe(
      ogPayloadIdentity(payload(right, sameImage, 'same post'), groups[1]?.key),
    );

    const exact = collectBubbleOgCards(groups, {
      [groups[0]!.key]: payload(left, sameImage),
      [groups[1]!.key]: payload(right, sameImage),
    });
    expect(exact).toHaveLength(1);
    expect(exact?.[0]?.urls).toEqual([left, right]);

    const differentImage = collectBubbleOgCards(groups, {
      [groups[0]!.key]: payload(left, sameImage),
      [groups[1]!.key]: payload(right, 'https://cdn.example/og.png?w=800'),
    });
    expect(differentImage).toHaveLength(2);
  });
});

describe('bubble og persistence', () => {
  it('round-trips collapsed cards on the chat-msg attribute', () => {
    const cards = collectBubbleOgCards(
      groupUrlsByOgIdentity([
        'https://youtu.be/dQw4w9WgXcQ?t=10',
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=80s',
      ]),
      {
        'yt:v:dQw4w9WgXcQ': {
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          fetchedAt: '2026-01-02T00:00:00.000Z',
          title: 'Video',
          description: 'desc',
          image: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
          siteName: 'YouTube',
          type: 'video.other',
          provider: 'youtube-oembed',
          embedHtml: '<iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ"></iframe>',
        },
      },
    );
    expect(cards).toHaveLength(1);
    if (!cards) throw new Error('expected og cards');
    const raw = serializeOgCardsAttr(cards);
    expect(parseOgCardsAttr(raw)[0]?.fetchUrl).toBe(
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    );
    expect(parseOgCardsAttr(raw)[0]?.urls).toHaveLength(2);

    const file = serializeMessage({
      id: 'm1',
      at: '2026-01-02T00:00:00.000Z',
      group: '나',
      body: 'https://youtu.be/dQw4w9WgXcQ?t=10',
      ogCards: cards ?? [],
    });
    expect(file).toContain(' og="');
    const parsed = parseDayFile(file);
    expect(parsed.messages[0]?.ogCards).toHaveLength(1);
    expect(parsed.messages[0]?.ogCards?.[0]?.title).toBe('Video');
    expect(parsed.messages[0]?.body).toBe('https://youtu.be/dQw4w9WgXcQ?t=10');
  });
});
