import { DynamicIcon, type IconName } from 'lucide-react/dynamic';
import type { ChatReaction } from '@/utils/chatWithMyself/reactions';

type ChatReactionGlyphProps = {
  reaction: ChatReaction;
  size?: number;
  className?: string;
};

/** Renders a native emoji or Lucide DynamicIcon for a reaction. */
export default function ChatReactionGlyph({
  reaction,
  size = 14,
  className = '',
}: ChatReactionGlyphProps) {
  if (reaction.kind === 'emoji') {
    return (
      <span
        className={`inline-flex leading-none ${className}`.trim()}
        style={{ fontSize: size }}
        aria-hidden
      >
        {reaction.value}
      </span>
    );
  }

  return (
    <DynamicIcon
      name={reaction.value as IconName}
      size={size}
      className={`shrink-0 ${className}`.trim()}
      aria-hidden
    />
  );
}
