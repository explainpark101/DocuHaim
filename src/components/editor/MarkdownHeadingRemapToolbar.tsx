import { Heading } from 'lucide-react';

type Props = {
  onOpen: () => void;
};

export default function MarkdownHeadingRemapToolbar({ onOpen }: Props) {
  return (
    <button
      type="button"
      className="md-editor-toolbar-item"
      title="최대 heading 변경"
      aria-label="최대 heading 변경"
      onClick={() => onOpen()}
    >
      <Heading className="md-editor-icon" size={16} />
    // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
    </button>
  );
}
