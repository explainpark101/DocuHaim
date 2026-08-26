import { FlipHorizontal2 } from 'lucide-react';
import MdEditorToolbarToggle from '@/components/MdEditorToolbarToggle';

type Props = {
  checked?: boolean;
  onChange?: (next: boolean) => void;
  theme?: string;
};

/** md-editor-rt defToolbars: preview double-click Mirror Edit. */
export default function MirrorEditToolbar({
  checked = false,
  onChange,
  theme = 'light',
}: Props) {
  return (
    <MdEditorToolbarToggle
      checked={checked}
      onChange={onChange}
      theme={theme}
      icon={FlipHorizontal2}
      title={
        checked
          ? 'Mirror Edit on — dual caret + instant preview sync'
          : 'Mirror Edit off'
      }
      ariaLabel="Mirror Edit"
    />
  );
}
