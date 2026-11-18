import { useEffect, useState } from 'react';
import { MessageSquarePlus } from 'lucide-react';
import {
  readLlmAssistDomSelectionAnchor,
  type LlmAssistSelectionAnchor,
} from '@/utils/llm/llmAssistLiveSelection';

type LlmAssistAddSelectionToChatProps = {
  enabled: boolean;
  onAdd: (text: string) => void;
};

/**
 * Floating action above the current DOM selection while LLM Assist is open.
 */
export default function LlmAssistAddSelectionToChat({
  enabled,
  onAdd,
}: LlmAssistAddSelectionToChatProps) {
  const [anchor, setAnchor] = useState<LlmAssistSelectionAnchor | null>(null);

  useEffect(() => {
    if (!enabled) {
      setAnchor(null);
      return undefined;
    }

    let raf = 0;
    const refresh = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setAnchor(readLlmAssistDomSelectionAnchor());
      });
    };

    refresh();
    document.addEventListener('selectionchange', refresh);
    window.addEventListener('scroll', refresh, true);
    window.addEventListener('resize', refresh);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('selectionchange', refresh);
      window.removeEventListener('scroll', refresh, true);
      window.removeEventListener('resize', refresh);
    };
  }, [enabled]);

  if (!enabled || !anchor) return null;

  const top = Math.max(8, anchor.top - 36);
  const left = Math.min(
    window.innerWidth - 120,
    Math.max(8, anchor.left + anchor.width / 2 - 56),
  );

  return (
    <button
      type="button"
      className="fixed z-100060 inline-flex items-center gap-1 rounded-full border border-violet-400 bg-violet-600 px-2.5 py-1 text-[11px] font-medium text-white shadow-lg hover:bg-violet-700"
      style={{ top, left }}
      onMouseDown={(e) => {
        // Keep selection while clicking the floating action.
        e.preventDefault();
        e.stopPropagation();
      }}
      onClick={() => onAdd(anchor.text)}
    >
      <MessageSquarePlus size={12} aria-hidden />
      채팅에 추가
    </button>
  );
}
