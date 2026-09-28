import { BarChart3 } from 'lucide-react';

/** md-editor-rt defToolbars: opens checklist progress right sidebar */
export default function ChecklistProgressToolbar({ onOpen }) {
  return (
    <button
      type="button"
      className="md-editor-toolbar-item"
      onClick={() => {
        onOpen?.();
      }}
      title="체크리스트 진행률"
      aria-label="체크리스트 진행률"
    >
      <BarChart3 className="md-editor-icon" size={16} />
    </button>
  );
}
