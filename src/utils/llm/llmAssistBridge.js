import { isDesktopApp } from '@/utils/isDesktopApp';
/** postMessage bridge between parent tab and LLM assist popout window */

export const LLM_ASSIST_CHANNEL = 's3haim-llm-assist';

export const LLM_ASSIST_MSG = {
  READY: `${LLM_ASSIST_CHANNEL}:ready`,
  SYNC: `${LLM_ASSIST_CHANNEL}:sync`,
  ACTION: `${LLM_ASSIST_CHANNEL}:action`,
  PARENT_CLOSING: `${LLM_ASSIST_CHANNEL}:parent-closing`,
};

export function isLlmAssistMessage(data) {
  return Boolean(data && typeof data.type === 'string' && data.type.startsWith(LLM_ASSIST_CHANNEL));
}

export function getLlmAssistPopoutUrl() {
  if (isDesktopApp()) {
    const url = new URL(window.location.href);
    url.hash = '#/llm-assist-popout';
    return url.toString();
  }
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') || '/';
  const path = `${base}/llm-assist-popout`.replace(/\/+/g, '/');
  return new URL(path, window.location.origin).toString();
}

export const LLM_ASSIST_POPOUT_NAME = 's3haim-llm-assist';

export const LLM_ASSIST_POPOUT_FEATURES =
  'popup=yes,width=480,height=820,menubar=no,toolbar=no,location=no,status=no,resizable=yes';

/**
 * @param {Window} target
 * @param {string} type
 * @param {Record<string, unknown>} [payload]
 */
export function postLlmAssistMessage(target, type, payload = {}) {
  if (!target || target.closed) return;
  target.postMessage({ type, ...payload }, window.location.origin);
}
