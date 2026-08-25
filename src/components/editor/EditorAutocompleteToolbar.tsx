import { TextCursorInput } from 'lucide-react';
import MdEditorToolbarToggle from '@/components/MdEditorToolbarToggle';

type Props = {
  checked?: boolean;
  onChange?: (next: boolean) => void;
  theme?: string;
};

/** md-editor-rt defToolbars: toggle built-in autocomplete suggestions. */
export default function EditorAutocompleteToolbar({
  checked = true,
  onChange,
  theme = 'light',
}: Props) {
  return (
    <MdEditorToolbarToggle
      checked={checked}
      onChange={onChange}
      theme={theme}
      icon={TextCursorInput}
      title={checked ? '자동완성 추천 켜짐' : '자동완성 추천 꺼짐'}
      ariaLabel="자동완성 추천"
    />
  );
}
