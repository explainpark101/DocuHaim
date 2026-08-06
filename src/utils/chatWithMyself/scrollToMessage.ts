/** Top margin when aligning a jumped-to message inside the chat scroller. */
export const CHAT_MESSAGE_SCROLL_MARGIN = 8;

/**
 * Scroll a chat message row to the top of its overflow scroller.
 * Uses scrollTop math instead of scrollIntoView so layout above the target
 * (e.g. sticky date headers) does not skew the final position.
 *
 * Prefer VList scrollToIndex when the list is virtualized; this remains for
 * cases where the DOM node is mounted.
 */
export function scrollChatMessageToStart(
  messageId: string,
  scroller: HTMLElement | null,
  margin = CHAT_MESSAGE_SCROLL_MARGIN,
): boolean {
  if (!scroller || !messageId) return false;
  const node = document.getElementById(`chat-msg-${messageId}`);
  if (!node) return false;

  const scrollerRect = scroller.getBoundingClientRect();
  const nodeRect = node.getBoundingClientRect();
  const targetTop =
    scroller.scrollTop + (nodeRect.top - scrollerRect.top) - margin;
  scroller.scrollTop = Math.max(0, targetTop);
  return true;
}

export type ChatListScrollAlign = 'start' | 'center' | 'end' | 'nearest';

export type ChatMessageListHandle = {
  scrollToMessageId: (
    messageId: string,
    opts?: { align?: ChatListScrollAlign },
  ) => boolean;
  scrollToDateStr: (dateStr: string) => boolean;
};
