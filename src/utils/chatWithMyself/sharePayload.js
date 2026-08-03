const URL_ONLY_RE = /^https?:\/\/\S+$/i;

function trimOrEmpty(value) {
  if (value == null) return '';
  return String(value).trim();
}

/**
 * @param {{ title?: string, text?: string, url?: string } | URLSearchParams | Record<string, string>} input
 * @returns {{ body: string | null, title: string, text: string, url: string }}
 */
export function normalizeSharePayload(input) {
  let title = '';
  let text = '';
  let url = '';

  if (input instanceof URLSearchParams) {
    title = trimOrEmpty(input.get('title'));
    text = trimOrEmpty(input.get('text'));
    url = trimOrEmpty(input.get('url'));
  } else if (input && typeof input === 'object') {
    title = trimOrEmpty(input.title);
    text = trimOrEmpty(input.text);
    url = trimOrEmpty(input.url);
  }

  if (!url && text && URL_ONLY_RE.test(text)) {
    url = text;
    text = '';
  }

  if (!url && text) {
    const embedded = text.match(/https?:\/\/\S+/i);
    if (embedded && text.trim() === embedded[0]) {
      url = embedded[0];
      text = '';
    }
  }

  let body = null;
  if (title && (url || text)) {
    body = `${title}\n\n${url || text}`;
  } else if (url && !text && !title) {
    body = url;
  } else if (text && !url && !title) {
    body = text;
  } else if (title && !url && !text) {
    body = title;
  } else if (url && text) {
    body = title ? `${title}\n\n${text}\n${url}` : `${text}\n${url}`;
  }

  return { body, title, text, url };
}

export function sharePayloadFromSearch(search) {
  const params =
    typeof search === 'string'
      ? new URLSearchParams(search.startsWith('?') ? search.slice(1) : search)
      : search instanceof URLSearchParams
        ? search
        : new URLSearchParams();
  return normalizeSharePayload(params);
}
