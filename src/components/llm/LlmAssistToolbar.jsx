import { Sparkles } from 'lucide-react';

/**
 * md-editor-rt defToolbars: toggles AI assist (active look while open).
 *
 * @param {{ onToggle?: () => void, active?: boolean }} props
 */
export default function LlmAssistToolbar({ onToggle, active = false }) {
  return (
    <button
      type="button"
      className={[
        'md-editor-toolbar-item',
        active
          ? 'md-editor-toolbar-active !bg-violet-200 hover:!bg-violet-300 dark:!bg-violet-800/85 dark:hover:!bg-violet-700/90'
          : '',
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={() => onToggle?.()}
      title={active ? 'AI 도우미 닫기' : 'AI 도우미'}
      aria-label={active ? 'AI 도우미 닫기' : 'AI 도우미'}
      aria-pressed={active}
    >
      <Sparkles className="md-editor-icon" size={16} />
    </button>
  );
}
