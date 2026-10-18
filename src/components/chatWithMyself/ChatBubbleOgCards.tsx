import { useEffect, useMemo, useRef, useState } from 'react';
import ChatOgCard from '@/components/chatWithMyself/ChatOgCard';
import type { OgPayload } from '@/utils/chatWithMyself/og';
import {
  cardToPayload,
  collectBubbleOgCards,
  groupsForMessageUrls,
  ogCardsSignature,
  payloadIsUsable,
  savedCardsCoverGroups,
  seedForGroup,
  type ChatBubbleOgCard,
} from '@/utils/chatWithMyself/messageOg';

type ChatBubbleOgCardsProps = {
  urls: string[];
  savedCards?: ChatBubbleOgCard[] | null;
  ogStorage?: object;
  compact?: boolean;
  allowEmbed?: boolean;
  reloadKey?: number;
  /** Persist collapsed previews onto the chat bubble. */
  onCardsResolved?: (cards: ChatBubbleOgCard[]) => void;
};

/**
 * One OG card per distinct preview inside a chat bubble.
 * YouTube links that differ only by `t` share a card. Resolved cards are
 * reported upward so the bubble can store them.
 */
export default function ChatBubbleOgCards({
  urls,
  savedCards = null,
  ogStorage,
  compact = false,
  allowEmbed = true,
  reloadKey = 0,
  onCardsResolved,
}: ChatBubbleOgCardsProps) {
  const groups = useMemo(() => groupsForMessageUrls(urls), [urls]);
  const [byKey, setByKey] = useState<Record<string, OgPayload>>({});
  const [suppressSeed, setSuppressSeed] = useState(false);
  const [seenReload, setSeenReload] = useState(reloadKey);
  const lastSigRef = useRef('');
  const onCardsResolvedRef = useRef(onCardsResolved);
  onCardsResolvedRef.current = onCardsResolved;

  if (seenReload !== reloadKey) {
    setSeenReload(reloadKey);
    setSuppressSeed(true);
    setByKey({});
    lastSigRef.current = '';
  }

  const handleResolved = (groupKey: string, data: OgPayload) => {
    setByKey((prev) => {
      const current = prev[groupKey];
      if (
        current &&
        current.fetchedAt === data.fetchedAt &&
        current.title === data.title &&
        current.image === data.image &&
        current.provider === data.provider &&
        current.url === data.url
      ) {
        return prev;
      }
      return { ...prev, [groupKey]: data };
    });
  };

  useEffect(() => {
    const report = onCardsResolvedRef.current;
    if (!report) return;
    const cards = collectBubbleOgCards(groups, byKey);
    if (!cards) return;
    const sig = ogCardsSignature(cards);
    if (!sig || sig === lastSigRef.current) return;
    if (sig === ogCardsSignature(savedCards)) {
      lastSigRef.current = sig;
      return;
    }
    lastSigRef.current = sig;
    report(cards);
  }, [byKey, groups, savedCards]);

  if (!groups.length) return null;

  const savedReady =
    !suppressSeed && savedCardsCoverGroups(savedCards, groups) && (savedCards?.length ?? 0) > 0;

  const storageProps = ogStorage ? { ogStorage } : {};

  if (savedReady && savedCards) {
    return (
      <>
        {savedCards.map((card) => {
          const seed = cardToPayload(card);
          if (!payloadIsUsable(seed)) return null;
          return (
            <ChatOgCard
              key={card.key}
              url={card.fetchUrl || card.url}
              href={card.url}
              seed={seed}
              {...storageProps}
              compact={compact}
              allowEmbed={allowEmbed}
              reloadKey={reloadKey}
              onResolved={(data) => {
                for (const sourceKey of card.sourceKeys) handleResolved(sourceKey, data);
              }}
            />
          );
        })}
      </>
    );
  }

  const collapsed = collectBubbleOgCards(groups, byKey);
  const showCollapsed =
    collapsed != null &&
    collapsed.length > 0 &&
    collapsed.length < groups.length;

  if (showCollapsed && collapsed) {
    return (
      <>
        {collapsed.map((card) => (
          <ChatOgCard
            key={card.key}
            url={card.fetchUrl || card.url}
            href={card.url}
            seed={cardToPayload(card)}
            {...storageProps}
            compact={compact}
            allowEmbed={allowEmbed}
            reloadKey={reloadKey}
            onResolved={(data) => {
              for (const sourceKey of card.sourceKeys) handleResolved(sourceKey, data);
            }}
          />
        ))}
      </>
    );
  }

  return (
    <>
      {groups.map((group) => (
        <ChatOgCard
          key={group.key}
          url={group.fetchUrl}
          href={group.displayUrl}
          seed={suppressSeed ? null : seedForGroup(savedCards, group)}
          {...storageProps}
          compact={compact}
          allowEmbed={allowEmbed}
          reloadKey={reloadKey}
          onResolved={(data) => handleResolved(group.key, data)}
        />
      ))}
    </>
  );
}
