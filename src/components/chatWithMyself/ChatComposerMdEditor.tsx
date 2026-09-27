/**
 * Chat composer editor surface — respects Settings editor type
 * (기존 에디터 / Haim Editor). Only the selected engine chunk loads.
 * While the chunk loads, a plain textarea stays usable.
 */

import { lazy, Suspense, useEffect, useState } from 'react';
import {
  EDITOR_TYPE_CHANGED_EVENT,
  EDITOR_TYPE_HAIM,
  loadEditorType,
  type EditorTypeId,
} from '@/utils/editorTypeSettings';
import type { ChatComposerEditorProps } from '@/components/chatWithMyself/ChatComposerLegacyMdEditor';
import ChatComposerPlainTextarea from '@/components/chatWithMyself/ChatComposerPlainTextarea';

const ChatComposerLegacyMdEditor = lazy(
  () => import('@/components/chatWithMyself/ChatComposerLegacyMdEditor'),
);
const ChatComposerHaimEditor = lazy(
  () => import('@/components/chatWithMyself/ChatComposerHaimEditor'),
);

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
  const loadingFallback = (
    <ChatComposerPlainTextarea
      value={props.value}
      onChange={props.onChange}
      fillParent
    />
  );

  return (
    <Suspense fallback={loadingFallback}>
      {useHaim ? (
        <ChatComposerHaimEditor {...props} />
      ) : (
        <ChatComposerLegacyMdEditor {...props} />
      )}
    </Suspense>
  );
}
