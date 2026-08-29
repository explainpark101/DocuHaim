import { useMemo } from 'react';
import QuizMdPreview from '@/components/quiz/QuizMdPreview';
import type { VaultDocumentPreviewPayload } from '@/utils/vault/loadVaultDocumentPreview';

const EDITABLE_VIEWERS = new Set(['markdown', 'json', 'html', 'svg', 'raw']);

const EDIT_TEXTAREA_CLASS =
  'h-full min-h-[240px] w-full resize-none border-0 bg-transparent p-3 font-mono text-xs text-slate-800 outline-none dark:text-odp-fgStrong';

type VaultDocumentPreviewBodyProps = {
  payload: VaultDocumentPreviewPayload;
  editMode: boolean;
  editContent: string;
  onEditContentChange: (next: string) => void;
};

export function isVaultDocumentPreviewEditable(viewer: string | undefined): boolean {
  return EDITABLE_VIEWERS.has(String(viewer || ''));
}

export default function VaultDocumentPreviewBody({
  payload,
  editMode,
  editContent,
  onEditContentChange,
}: VaultDocumentPreviewBodyProps) {
  const viewer = payload.currentFile.viewer;
  const previewId = useMemo(
    () => `vault-preview-${payload.currentFile.id.replace(/[^\w-]+/g, '-')}`,
    [payload.currentFile.id],
  );

  if (payload.needsEncMdPassword) {
    return (
      <div className="p-4 text-sm text-slate-600 dark:text-odp-muted">
        암호화된 노트입니다. 미리보기를 보려면 「이 문서 열기」로 편집기에서 암호를 입력하세요.
      </div>
    );
  }

  if (viewer === 'image' && payload.currentFile.objectUrl) {
    return (
      <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto p-3">
        <img
          src={payload.currentFile.objectUrl}
          alt={payload.currentFile.name}
          className="max-h-full max-w-full object-contain"
        />
      </div>
    );
  }

  if (viewer === 'pdf' && payload.currentFile.objectUrl) {
    return (
      <iframe
        title={payload.currentFile.name}
        src={payload.currentFile.objectUrl}
        className="h-full min-h-[240px] w-full border-0"
      />
    );
  }

  if (viewer === 'audio' && payload.currentFile.objectUrl) {
    return (
      <div className="p-4">
        <audio controls className="w-full" src={payload.currentFile.objectUrl}>
          오디오를 재생할 수 없습니다.
        </audio>
      </div>
    );
  }

  if (viewer === 'video' && payload.currentFile.objectUrl) {
    return (
      <div className="p-2">
        <video controls className="max-h-full w-full" src={payload.currentFile.objectUrl}>
          동영상을 재생할 수 없습니다.
        </video>
      </div>
    );
  }

  if (viewer === 'markdown') {
    if (editMode) {
      return (
        <textarea
          className={EDIT_TEXTAREA_CLASS}
          value={editContent}
          onChange={(e) => onEditContentChange(e.target.value)}
          spellCheck={false}
        />
      );
    }
    return (
      <div className="markdown-content p-3">
        <QuizMdPreview text={editContent} previewId={previewId} />
      </div>
    );
  }

  if (viewer === 'html' || viewer === 'svg') {
    if (editMode) {
      return (
        <textarea
          className={EDIT_TEXTAREA_CLASS}
          value={editContent}
          onChange={(e) => onEditContentChange(e.target.value)}
          spellCheck={false}
        />
      );
    }
    return (
      <iframe
        title={payload.currentFile.name}
        srcDoc={editContent}
        sandbox=""
        className="h-full min-h-[240px] w-full border-0 bg-white"
      />
    );
  }

  if (editMode) {
    return (
      <textarea
        className={EDIT_TEXTAREA_CLASS}
        value={editContent}
        onChange={(e) => onEditContentChange(e.target.value)}
        spellCheck={false}
      />
    );
  }

  return (
    <pre className="overflow-auto whitespace-pre-wrap break-words p-3 font-mono text-xs text-slate-800 dark:text-odp-fgStrong">
      {editContent}
    </pre>
  );
}
