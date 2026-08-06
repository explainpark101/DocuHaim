import { WrapText } from 'lucide-react';
import MdEditorToolbarToggle from '@/components/MdEditorToolbarToggle';

/** md-editor-rt defToolbars: TOC title wrap switch (place after catalog). */
export default function TocTitleWrapToolbar({
  checked = false,
  onChange,
  theme = 'light',
}) {
  return (
    <MdEditorToolbarToggle
      checked={checked}
      onChange={onChange}
      theme={theme}
      icon={WrapText}
      title={checked ? '목차 제목 줄바꿈 켜짐' : '목차 제목 말줄임(...)'}
      ariaLabel="목차 제목 줄바꿈"
    />
  );
}
