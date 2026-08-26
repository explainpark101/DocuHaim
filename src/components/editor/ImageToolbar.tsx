import { useCallback, useRef, useState } from 'react';
import { DropdownToolbar } from 'md-editor-rt';
import { Image as ImageIcon } from 'lucide-react';

type Props = {
  /** Open markdown image-link form (desc + url). */
  onRequestLink: () => void;
  /** Pick files and upload without cropping. */
  onRequestUpload: (files: File[]) => void;
  /** Pick one image then open crop → upload flow. */
  onRequestClip: (file: File) => void;
  disabled?: boolean;
};

/**
 * Replaces md-editor-rt built-in `image` toolbar (which embeds Cropper.js 1 clip).
 * Menu: link / upload / crop-and-upload (project Cropper.js 2 + react-easy-crop modal).
 */
export default function ImageToolbar({
  onRequestLink,
  onRequestUpload,
  onRequestClip,
  disabled = false,
}: Props) {
  const [visible, setVisible] = useState(false);
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const clipInputRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => setVisible(false), []);

  return <>
    <DropdownToolbar
      title="이미지"
      visible={visible}
      onChange={setVisible}
      disabled={disabled}
      overlay={(
        <ul
          className="md-editor-menu"
          role="menu"
          onClick={close}
        >
          // @ts-expect-error TS(2339): Property 'li' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
          <li
            className="md-editor-menu-item md-editor-menu-item-image"
            role="menuitem"
            tabIndex={0}
            onClick={() => onRequestLink()}
            onKeyDown={(event: any) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onRequestLink();
              }
            }}
          >
            링크 추가
          // @ts-expect-error TS(2339): Property 'li' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
          </li>
          // @ts-expect-error TS(2339): Property 'li' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
          <li
            className="md-editor-menu-item md-editor-menu-item-image"
            role="menuitem"
            tabIndex={0}
            onClick={() => uploadInputRef.current?.click()}
            onKeyDown={(event: any) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                uploadInputRef.current?.click();
              }
            }}
          >
            이미지 업로드
          // @ts-expect-error TS(2339): Property 'li' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
          </li>
          // @ts-expect-error TS(2339): Property 'li' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
          <li
            className="md-editor-menu-item md-editor-menu-item-image"
            role="menuitem"
            tabIndex={0}
            onClick={() => clipInputRef.current?.click()}
            onKeyDown={(event: any) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                clipInputRef.current?.click();
              }
            }}
          >
            잘라서 업로드
          // @ts-expect-error TS(2339): Property 'li' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
          </li>
        // @ts-expect-error TS(2339): Property 'ul' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
        </ul>
      )}
    >
      <ImageIcon className="md-editor-icon" size={16} aria-hidden />
    </DropdownToolbar>
    // @ts-expect-error TS(2339): Property 'input' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
    <input
      ref={uploadInputRef}
      type="file"
      accept="image/*"
      multiple
      className="hidden"
      tabIndex={-1}
      aria-hidden
      onChange={(event: any) => {
        const files = Array.from(event.target.files || []);
        event.target.value = '';
        // @ts-expect-error TS(2345): Argument of type 'unknown[]' is not assignable to ... Remove this comment to see the full error message
        if (files.length) onRequestUpload(files);
      }}
    />
    // @ts-expect-error TS(2339): Property 'input' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
    <input
      ref={clipInputRef}
      type="file"
      accept="image/*"
      className="hidden"
      tabIndex={-1}
      aria-hidden
      onChange={(event: any) => {
        const file = event.target.files?.[0];
        event.target.value = '';
        if (file) onRequestClip(file);
      }}
    />
  </>;
}
