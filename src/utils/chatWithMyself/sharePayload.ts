const URL_ONLY_RE = /^https?:\/\/\S+$/i;

function trimOrEmpty(value: any) {
  if (value == null) return '';
  return String(value).trim();
}

function urlsRoughlyEqual(a: any, b: any) {
  if (!a || !b) return false;
  if (a === b) return true;
  const strip = (s: any) => s.replace(/\/+$/, '').toLowerCase();
  return strip(a) === strip(b);
}

/**
 * Android / iOS share sheets often fill both `text` and `url` with the same link,
 * or put `title + url` into `text` while also setting `url`. Collapse that.
 * @param {{ title: string, text: string, url: string }} parts
 */
function dedupeShareParts({
  title,
  text,
  url
}: any) {
  let nextTitle = title;
  let nextText = text;
  let nextUrl = url;

  if (nextUrl && nextText && urlsRoughlyEqual(nextText, nextUrl)) {
    nextText = '';
  }

  if (!nextUrl && nextText && URL_ONLY_RE.test(nextText)) {
    nextUrl = nextText;
    nextText = '';
  }

  if (!nextUrl && nextText) {
    const embedded = nextText.match(/https?:\/\/\S+/i);
    if (embedded && nextText.trim() === embedded[0]) {
      nextUrl = embedded[0];
      nextText = '';
    }
  }

  // text already ends with the url (common: "Title https://…")
  if (nextUrl && nextText) {
    const trimmedText = nextText.replace(/\s+$/, '');
    if (
      trimmedText === nextUrl ||
      trimmedText.endsWith(nextUrl) ||
      trimmedText.endsWith(`${nextUrl}/`)
    ) {
      const withoutUrl = trimmedText
        .slice(0, Math.max(0, trimmedText.length - nextUrl.length))
        .replace(/\s+$/, '');
      nextText = withoutUrl;
    }
  }

  // text is only the title (or title + whitespace) while title is set
  if (nextTitle && nextText && urlsRoughlyEqual(nextText, nextTitle)) {
    nextText = '';
  }
  if (nextTitle && nextText) {
    const titlePrefix = `${nextTitle}\n\n`;
    if (nextText.startsWith(titlePrefix)) {
      nextText = nextText.slice(titlePrefix.length).trim();
    } else if (nextText.startsWith(`${nextTitle}\n`)) {
      nextText = nextText.slice(nextTitle.length).trim();
    } else if (nextText.startsWith(`${nextTitle} `)) {
      nextText = nextText.slice(nextTitle.length).trim();
    }
  }

  return { title: nextTitle, text: nextText, url: nextUrl };
}

/**
 * @param {{ title?: string, text?: string, url?: string } | URLSearchParams | Record<string, string>} input
 * @returns {{ body: string | null, title: string, text: string, url: string }}
 */
export function normalizeSharePayload(input: any) {
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

  ({ title, text, url } = dedupeShareParts({ title, text, url }));

  let body = null;
  if (title && text && url) {
    body = `${title}\n\n${text}\n${url}`;
  } else if (title && (url || text)) {
    body = `${title}\n\n${url || text}`;
  } else if (url && text) {
    body = `${text}\n${url}`;
  } else if (url) {
    body = url;
  } else if (text) {
    body = text;
  } else if (title) {
    body = title;
  }

  return { body, title, text, url };
}

export function sharePayloadFromSearch(search: any) {
  const params =
    typeof search === 'string'
      ? new URLSearchParams(search.startsWith('?') ? search.slice(1) : search)
      : search instanceof URLSearchParams
        ? search
        : new URLSearchParams();
  return normalizeSharePayload(params);
}
