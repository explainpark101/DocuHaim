import { Sparkles } from 'lucide-react';

/** md-editor-rt defToolbars: opens AI assist modal */
export default function LlmAssistToolbar({
  onOpen
}: any) {
  return (
    <button
      type="button"
      className="md-editor-toolbar-item"
      onClick={() => onOpen?.()}
      title="AI 도우미"
      aria-label="AI 도우미"
    >
      <Sparkles className="md-editor-icon" size={16} />
    // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
    </button>
  );
}
