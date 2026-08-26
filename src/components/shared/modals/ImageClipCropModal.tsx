import { useEffect, useState } from 'react';
import Modal from '@/components/shared/modals/Modal';
import NoteImageCropPanel from '@/components/shared/modals/NoteImageCropPanel';
import type { Area } from 'react-easy-crop';

type Props = {
  isOpen: boolean;
  file: File | null;
  onClose: () => void;
  onConfirm: (file: File, area: Area) => void | Promise<void>;
};

/**
 * Crop-then-upload modal for the custom image toolbar clip action.
 */
export default function ImageClipCropModal({
  isOpen,
  file,
  onClose,
  onConfirm,
}: Props) {
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    if (!isOpen || !file) {
      setImageSrc('');
      return undefined;
    }
    const url = URL.createObjectURL(file);
    setImageSrc(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [isOpen, file]);

  return (
    <Modal
      isOpen={isOpen && Boolean(file)}
      onClose={onClose}
      contentClassName="max-w-2xl w-[min(96vw,42rem)] max-h-[90vh] h-[min(90vh,720px)]"
      resizeHeight
    >
      {imageSrc ? (
        <NoteImageCropPanel
          imageSrc={imageSrc}
          {...(file?.name ? { fileName: file.name } : {})}
          onCancel={onClose}
          onConfirm={onConfirm}
        />
      ) : null}
    </Modal>
  );
}
