import { FileImage } from 'lucide-react';
import MdEditorToolbarToggle from '@/components/editor/MdEditorToolbarToggle';

type Props = {
  checked?: boolean;
  onChange?: (next: boolean) => void;
  theme?: string;
};

/** md-editor-rt defToolbars: default-collapse base64 image payloads in the source editor. */
export default function Base64ImageFoldToolbar({
  checked = false,
  onChange,
  theme = 'light',
}: Props) {
  return (
    <MdEditorToolbarToggle
      checked={checked}
      onChange={onChange}
      theme={theme}
      icon={FileImage}
      title={checked ? 'base64 이미지 접힘' : 'base64 이미지 펼침'}
      ariaLabel="base64 이미지 접기"
    />
  );
}
