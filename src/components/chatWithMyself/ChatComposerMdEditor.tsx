/**
 * Chat composer editor surface — respects Settings editor type
 * (기존 에디터 / Haim Editor). Only the selected engine chunk loads.
 */

import { lazy, Suspense, useEffect, useState } from 'react';
import {
  EDITOR_TYPE_CHANGED_EVENT,
  EDITOR_TYPE_HAIM,
  loadEditorType,
  type EditorTypeId,
} from '@/utils/editorTypeSettings';
import type { ChatComposerEditorProps } from '@/components/chatWithMyself/ChatComposerLegacyMdEditor';

const ChatComposerLegacyMdEditor = lazy(
  () => import('@/components/chatWithMyself/ChatComposerLegacyMdEditor'),
);
const ChatComposerHaimEditor = lazy(
  () => import('@/components/chatWithMyself/ChatComposerHaimEditor'),
);

function Fallback() {
  return (
    <div className="flex h-full items-center px-2.5 text-sm text-gray-400">
      에디터 불러오는 중…
    </div>
  );
}

/**
 * Drop-in replacement for the previous ChatComposerMdEditor export.
 */
export default function ChatComposerMdEditor(props: ChatComposerEditorProps) {
  const [editorType, setEditorType] = useState<EditorTypeId>(() => loadEditorType());

  useEffect(() => {
    const sync = () => setEditorType(loadEditorType());
    window.addEventListener(EDITOR_TYPE_CHANGED_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(EDITOR_TYPE_CHANGED_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const useHaim = editorType === EDITOR_TYPE_HAIM;

  return (
    <Suspense fallback={<Fallback />}>
      {useHaim ? (
        <ChatComposerHaimEditor {...props} />
      ) : (
        <ChatComposerLegacyMdEditor {...props} />
      )}
    </Suspense>
  );
}
