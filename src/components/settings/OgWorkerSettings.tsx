import { useEffect, useState } from 'react';
import {
  OG_WORKER_DEPLOY_BUTTON_IMG,
  OG_WORKER_DEPLOY_URL,
  loadOgWorkerUrl,
  normalizeOgWorkerBaseUrl,
  saveOgWorkerUrl,
} from '@/utils/ogWorkerSettings';

/**
 * Settings: optional Cloudflare Worker for Open Graph (tried first when set).
 * @see https://cloudflare-experiments.com/docs/experiments/social-preview-inspector
 */
export default function OgWorkerSettings() {
  const [draft, setDraft] = useState('');
  const [saved, setSaved] = useState('');
  const [hint, setHint] = useState<string | null>(null);

  useEffect(() => {
    const current = loadOgWorkerUrl();
    setDraft(current);
    setSaved(current);
  }, []);

  const dirty = normalizeOgWorkerBaseUrl(draft) !== saved;
  const draftNormalized = normalizeOgWorkerBaseUrl(draft);
  const draftInvalid = Boolean(String(draft || '').trim()) && !draftNormalized;

  const handleSave = () => {
    const raw = String(draft || '').trim();
    if (raw && !draftNormalized) {
      setHint('https:// 로 시작하는 Worker 주소를 입력하세요.');
      return;
    }
    const next = saveOgWorkerUrl(raw);
    setDraft(next);
    setSaved(next);
    setHint(
      next
        ? '저장됨 — OG 요청 시 이 Worker를 가장 먼저 사용합니다.'
        : 'Worker URL을 비웠습니다.',
    );
  };

  const handleClear = () => {
    setDraft('');
    const next = saveOgWorkerUrl('');
    setSaved(next);
    setHint('Worker URL을 비웠습니다.');
  };

  return (
    <div
      id="settings-og"
      tabIndex={-1}
      className="scroll-mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface"
    >
      <h3 className="mb-2 text-sm font-bold text-gray-700 dark:text-odp-fgStrong">
        Open Graph Worker
      </h3>
      <p className="mb-3 text-xs text-gray-600 dark:text-odp-muted">
        Cloudflare{' '}
        <a
          href="https://cloudflare-experiments.com/docs/experiments/social-preview-inspector"
          target="_blank"
          rel="noreferrer noopener"
          className="text-blue-600 underline-offset-2 hover:underline dark:text-blue-400"
        >
          Social Preview Inspector
        </a>
        로 OG/Twitter 메타를 가져옵니다. 주소가 있으면 Microlink·프록시·opengraph.to
        보다 먼저 호출합니다. API:{' '}
        <code className="rounded bg-gray-100 px-1 text-[11px] dark:bg-odp-bgSoft">
          GET /inspect?url=…
        </code>
      </p>

      <div className="mb-3">
        <a
          href={OG_WORKER_DEPLOY_URL}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-block"
        >
          <img
            src={OG_WORKER_DEPLOY_BUTTON_IMG}
            alt="Deploy to Cloudflare Workers"
            width={184}
            height={39}
            className="h-[39px] w-[184px]"
          />
        </a>
        <p className="mt-1.5 text-[11px] text-gray-500 dark:text-odp-muted">
          Deploy 후 나온{' '}
          <code className="rounded bg-gray-100 px-1 dark:bg-odp-bgSoft">
            *.workers.dev
          </code>{' '}
          주소를 아래에 붙여 넣으세요.
        </p>
      </div>

      <label className="mb-1 block text-xs font-semibold text-gray-600 dark:text-odp-muted">
        Worker 주소
      </label>
      <input
        type="url"
        inputMode="url"
        autoComplete="off"
        spellCheck={false}
        placeholder="https://your-worker.workers.dev"
        className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-fgStrong"
        value={draft}
        onChange={(e) => {
          setDraft(e.target.value);
          setHint(null);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleSave();
          }
        }}
      />
      {draftInvalid ? (
        <p className="mt-1 text-[11px] text-red-600 dark:text-red-400">
          https:// 또는 http:// 로 시작하는 유효한 URL이어야 합니다.
        </p>
      ) : null}

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handleSave}
          disabled={!dirty && !draftInvalid}
          className="rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          저장
        </button>
        <button
          type="button"
          onClick={handleClear}
          disabled={!saved && !draft}
          className="rounded px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:text-odp-muted dark:hover:bg-odp-focusBg"
        >
          지우기
        </button>
        {saved ? (
          <span className="truncate text-[11px] text-emerald-600 dark:text-emerald-400">
            사용 중: {saved}
          </span>
        ) : (
          <span className="text-[11px] text-gray-500 dark:text-odp-muted">
            미설정 (공용 폴백만 사용)
          </span>
        )}
      </div>
      {hint ? (
        <p className="mt-2 text-[11px] text-gray-600 dark:text-odp-muted">{hint}</p>
      ) : null}
    </div>
  );
}
