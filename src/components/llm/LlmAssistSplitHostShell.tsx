import { useLayoutEffect, useRef } from 'react';
import { setLlmAssistSplitHost } from '@/utils/llm/llmAssistSplitHost';

/** Empty shell that registers as the portal target for LLM Assist split presentation. */
export default function LlmAssistSplitHostShell() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    setLlmAssistSplitHost(ref.current);
    return () => {
      setLlmAssistSplitHost(null);
    };
  }, []);

  return (
    <div
      ref={ref}
      data-llm-assist-split-host=""
      className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden"
      role="complementary"
      aria-label="AI 도우미"
    />
  );
}
