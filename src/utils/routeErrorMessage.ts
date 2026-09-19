import { isRouteErrorResponse } from 'react-router';

export type FormattedRouteError = {
  title: string;
  summary: string;
  details: string;
  /** Full plain-text payload for clipboard copy. */
  copyText: string;
};

function stringifyUnknown(value: unknown): string {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  if (value instanceof Error) {
    return [value.name, value.message, value.stack].filter(Boolean).join('\n');
  }
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

function currentHref(): string {
  if (typeof window === 'undefined') return '';
  return window.location.href || '';
}

/**
 * Normalize a route / render error into display fields and a copyable report.
 */
export function formatRouteError(error: unknown): FormattedRouteError {
  const href = currentHref();
  const when = new Date().toISOString();

  if (isRouteErrorResponse(error)) {
    const dataText = stringifyUnknown(error.data).trim();
    const summary = `${error.status}${error.statusText ? ` ${error.statusText}` : ''}`.trim();
    const title =
      error.status === 404
        ? '페이지를 찾을 수 없습니다'
        : '요청을 처리할 수 없습니다';
    const details = [summary, dataText].filter(Boolean).join('\n\n');
    const copyText = [
      'DocuHaim route error',
      `Time: ${when}`,
      href ? `URL: ${href}` : '',
      `Status: ${summary}`,
      dataText ? `Data:\n${dataText}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    return { title, summary, details: details || summary, copyText };
  }

  if (error instanceof Error) {
    const summary = error.message?.trim() || error.name || 'Unknown error';
    const details = (error.stack || summary).trim();
    const copyText = [
      'DocuHaim render error',
      `Time: ${when}`,
      href ? `URL: ${href}` : '',
      `Name: ${error.name || 'Error'}`,
      `Message: ${summary}`,
      error.stack ? `Stack:\n${error.stack}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    return {
      title: '예기치 않은 오류가 발생했습니다',
      summary,
      details,
      copyText,
    };
  }

  const details = stringifyUnknown(error).trim() || 'Unknown error';
  const copyText = [
    'DocuHaim unknown error',
    `Time: ${when}`,
    href ? `URL: ${href}` : '',
    details,
  ]
    .filter(Boolean)
    .join('\n');

  return {
    title: '예기치 않은 오류가 발생했습니다',
    summary: details.split('\n')[0] || details,
    details,
    copyText,
  };
}
