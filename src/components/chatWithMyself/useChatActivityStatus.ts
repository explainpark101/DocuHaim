import { useEffect, useRef } from 'react';
import { useActivityIndicator, ActivityTypes } from '@/contexts/ActivityIndicatorContext';

export const CHAT_ACTIVITY_IDS = {
  sync: 'chat-sync-status',
  send: 'chat-send',
  edit: 'chat-edit',
  delete: 'chat-delete',
  loadOlder: 'chat-load-older',
  loadNewer: 'chat-load-newer',
  search: 'chat-search',
  jump: 'chat-jump',
  boot: 'chat-boot',
  note: 'chat-add-note',
  error: 'chat-error',
};

/**
 * Wire chat pane status flags into the app bottom ActivityIndicatorBar.
 */
export function useChatActivityStatus({
  storageReady,
  storageMode,
  pendingSend = false,
  pendingEdit = false,
  deleting = false,
  loadingOlder = false,
  loadingNewer = false,
  searchLoading = false,
  jumping = false,
  booting = false,
  noteSubmitting = false,
  error = ''
}: any) {
  const { addIndicator, removeIndicator, updateIndicator } = useActivityIndicator();
  const timersRef = useRef([]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach((t) => window.clearTimeout(t));
      timersRef.current = [];
      Object.values(CHAT_ACTIVITY_IDS).forEach((id) => removeIndicator(id));
    };
  }, [removeIndicator]);

  const scheduleRemove = (id: any, ms = 1400) => {
    const t = window.setTimeout(() => removeIndicator(id), ms);
    // @ts-expect-error TS(2345) FIXME: Argument of type 'number' is not assignable to par... Remove this comment to see the full error message
    timersRef.current.push(t);
  };

  // Persistent sync / storage chip.
  useEffect(() => {
    const detail = !storageReady
      ? storageMode === 'local'
        ? '로컬 폴더를 연 뒤 채팅을 사용할 수 있습니다.'
        : storageMode === 'webdav'
          ? '설정에서 WebDAV 연결 정보를 저장한 뒤 채팅을 사용할 수 있습니다.'
          : 'S3에 로그인한 뒤 채팅을 사용할 수 있습니다.'
      : storageMode === 'local'
        ? '로컬 · 준비됨'
        : storageMode === 'webdav'
          ? 'WebDAV · 동기화 가능'
          : 'S3 · 동기화 가능';

    const payload = {
      id: CHAT_ACTIVITY_IDS.sync,
      type: ActivityTypes.CHAT_SYNC,
      label: '채팅',
      detail,
      status: storageReady ? 'done' : 'error',
      pin: true,
    };
    // @ts-expect-error TS(2345) FIXME: Argument of type '{ id: string; type: "chat-sync";... Remove this comment to see the full error message
    addIndicator(payload);
    // ADD is no-op when the id already exists; keep status/detail in sync.
    updateIndicator(CHAT_ACTIVITY_IDS.sync, {
      detail: payload.detail,
      // @ts-expect-error TS(2322) FIXME: Type 'string' is not assignable to type 'ActivityS... Remove this comment to see the full error message
      status: payload.status,
      label: payload.label,
      type: payload.type,
      pin: true,
    });
  }, [storageReady, storageMode, addIndicator, updateIndicator]);

  useEffect(() => {
    if (pendingSend) {
      addIndicator({
        id: CHAT_ACTIVITY_IDS.send,
        type: ActivityTypes.CHAT_SEND,
        label: '전송 중',
        status: 'processing',
      });
    } else {
      removeIndicator(CHAT_ACTIVITY_IDS.send);
    }
  }, [pendingSend, addIndicator, removeIndicator]);

  useEffect(() => {
    if (pendingEdit) {
      addIndicator({
        id: CHAT_ACTIVITY_IDS.edit,
        type: ActivityTypes.CHAT_SEND,
        label: '수정 저장 중',
        status: 'processing',
      });
    } else {
      removeIndicator(CHAT_ACTIVITY_IDS.edit);
    }
  }, [pendingEdit, addIndicator, removeIndicator]);

  useEffect(() => {
    if (deleting) {
      addIndicator({
        id: CHAT_ACTIVITY_IDS.delete,
        type: ActivityTypes.CHAT_SEND,
        label: '삭제 중',
        status: 'processing',
      });
    } else {
      removeIndicator(CHAT_ACTIVITY_IDS.delete);
    }
  }, [deleting, addIndicator, removeIndicator]);

  // Boot / initial load.
  useEffect(() => {
    if (booting) {
      addIndicator({
        id: CHAT_ACTIVITY_IDS.boot,
        type: ActivityTypes.CHAT_LOAD,
        label: '채팅 불러오는 중',
        status: 'processing',
      });
    } else {
      removeIndicator(CHAT_ACTIVITY_IDS.boot);
    }
  }, [booting, addIndicator, removeIndicator]);

  useEffect(() => {
    if (loadingOlder) {
      addIndicator({
        id: CHAT_ACTIVITY_IDS.loadOlder,
        type: ActivityTypes.CHAT_LOAD,
        label: '이전 대화 동기화',
        status: 'processing',
      });
    } else {
      removeIndicator(CHAT_ACTIVITY_IDS.loadOlder);
    }
  }, [loadingOlder, addIndicator, removeIndicator]);

  useEffect(() => {
    if (loadingNewer) {
      addIndicator({
        id: CHAT_ACTIVITY_IDS.loadNewer,
        type: ActivityTypes.CHAT_LOAD,
        label: '이후 대화 동기화',
        status: 'processing',
      });
    } else {
      removeIndicator(CHAT_ACTIVITY_IDS.loadNewer);
    }
  }, [loadingNewer, addIndicator, removeIndicator]);

  useEffect(() => {
    if (searchLoading) {
      addIndicator({
        id: CHAT_ACTIVITY_IDS.search,
        type: ActivityTypes.CHAT_SEARCH,
        label: '검색 중',
        status: 'processing',
      });
    } else {
      removeIndicator(CHAT_ACTIVITY_IDS.search);
    }
  }, [searchLoading, addIndicator, removeIndicator]);

  useEffect(() => {
    if (jumping) {
      addIndicator({
        id: CHAT_ACTIVITY_IDS.jump,
        type: ActivityTypes.CHAT_LOAD,
        label: '날짜로 이동 중',
        status: 'processing',
      });
    } else {
      removeIndicator(CHAT_ACTIVITY_IDS.jump);
    }
  }, [jumping, addIndicator, removeIndicator]);

  useEffect(() => {
    if (noteSubmitting) {
      addIndicator({
        id: CHAT_ACTIVITY_IDS.note,
        type: ActivityTypes.CHAT_NOTE,
        label: '노트로 추가 중',
        status: 'processing',
      });
    } else {
      removeIndicator(CHAT_ACTIVITY_IDS.note);
    }
  }, [noteSubmitting, addIndicator, removeIndicator]);

  // Surface chat errors in the status bar briefly.
  useEffect(() => {
    if (!error) {
      removeIndicator(CHAT_ACTIVITY_IDS.error);
      return;
    }
    addIndicator({
      id: CHAT_ACTIVITY_IDS.error,
      type: ActivityTypes.CHAT_SEND,
      label: '채팅 오류',
      detail: error,
      status: 'error',
    });
    scheduleRemove(CHAT_ACTIVITY_IDS.error, 4000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, addIndicator, removeIndicator]);
}
