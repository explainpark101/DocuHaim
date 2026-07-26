import { BarChart3 } from 'lucide-react';

const MOBILE_MQ = '(max-width: 768px)';

function isMobileViewport() {
  return typeof window !== 'undefined' && window.matchMedia(MOBILE_MQ).matches;
}

/** md-editor-rt defToolbars: opens checklist progress floating panel (desktop only) */
export default function ChecklistProgressToolbar({ onOpen }) {
  return (
    <button
      type="button"
      className="md-editor-toolbar-item max-md:hidden"
      onClick={() => {
        if (isMobileViewport()) return;
        onOpen?.();
      }}
      title="체크리스트 진행률"
      aria-label="체크리스트 진행률"
    >
      <BarChart3 className="md-editor-icon" size={16} />
    </button>
  );
}
