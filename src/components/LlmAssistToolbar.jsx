import { Sparkles } from 'lucide-react';

/** md-editor-rt defToolbars: opens Gemini AI assist modal */
export default function LlmAssistToolbar({ onOpen }) {
  return (
    <button
      type="button"
      className="md-editor-toolbar-item"
      onClick={() => onOpen?.()}
      title="Gemini AI 도우미"
      aria-label="Gemini AI 도우미"
    >
      <Sparkles className="md-editor-icon" size={16} />
    </button>
  );
}
