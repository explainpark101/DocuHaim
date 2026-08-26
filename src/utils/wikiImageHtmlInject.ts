/**
 * markdown-it HTML → novel editor:
 * 1) ![[path]] / ![[path|size]] → wiki img
 * 2) Same caption pairing as md-editor wikiImageMarkdownIt
 *    (image paragraph + next text paragraph, or img + br + tail in one paragraph)
 */

import { renderAppMarkdown } from '@/utils/createAppMarkdownIt';
import { dbgClipboard } from '@/utils/clipboardImageDebug';
import {
  buildWikiImageStyle,
  parseWikiImageInner,
} from '@/utils/wikiImageSyntax';

const WIKI_IMG_RE = /!\[\[([^[\]]+)\]\]/g;

function escapeAttr(s: any) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;');
}

/**
 * Tiptap `insertContent`용 JSON — 이미지 단락 + 빈 캡션 단락 (HTML 파싱 대신 스키마 직접 삽입).
 * @param {string[]} paths S3 object keys
 * @returns {Record<string, unknown>[]}
 */
export function wikiImageWithCaptionBlocksDocFromPaths(paths: any) {
  if (!Array.isArray(paths) || paths.length === 0) {
    dbgClipboard('doc:wikiImageWithCaptionBlocks', { pathCount: 0, reason: 'empty paths' });
    return [];
  }
  const blocks = [];
  for (const raw of paths) {
    const path = String(raw ?? '').trim();
    if (!path) continue;
    blocks.push({
      type: 'paragraph',
      attrs: { class: 'novel-wiki-image-line' },
      content: [{ type: 'wikiImage', attrs: { path } }],
    });
    blocks.push({
      type: 'paragraph',
      attrs: { class: 'novel-wiki-caption-line' },
      content: [],
    });
  }
  dbgClipboard('doc:wikiImageWithCaptionBlocks', {
    pathCount: paths.length,
    blockCount: blocks.length,
  });
  return blocks;
}

export function wikiImageWithCaptionBlocksHtmlFromPaths(paths: any) {
  if (!Array.isArray(paths) || paths.length === 0) {
    dbgClipboard('html:wikiImageWithCaptionBlocks', { paths, htmlLength: 0, reason: 'empty paths' });
    return '';
  }
  const html = paths
    .map((raw) => {
      const path = String(raw ?? '').trim();
      if (!path) return '';
      const esc = escapeAttr(path);
      return `<p class="novel-wiki-image-line"><img data-wiki-path="${esc}" alt="" class="novel-wiki-image" /></p><p class="novel-wiki-caption-line"></p>`;
    })
    .filter(Boolean)
    .join('');
  dbgClipboard('html:wikiImageWithCaptionBlocks', {
    pathCount: paths.length,
    htmlLength: html.length,
    preview: html.length > 200 ? `${html.slice(0, 200)}…` : html,
  });
  return html;
}

/** 단락에 위키 이미지 img 하나만 있고 다른 텍스트가 없음 */
export function isParagraphOnlyWikiImage(p: any) {
  if (!p || p.tagName !== 'P') return false;
  let imgCount = 0;
  for (const n of p.childNodes) {
    if (n.nodeType === 3) {
      if (n.textContent && n.textContent.trim()) return false;
    } else if (n.nodeType === 1) {
      if (n.tagName !== 'IMG' || !n.getAttribute('data-wiki-path')) return false;
      imgCount += 1;
      if (imgCount > 1) return false;
    }
  }
  return imgCount === 1;
}

export function injectWikiImagesIntoHtml(html: any) {
  if (!html || typeof html !== 'string') return html;
  return html.replace(WIKI_IMG_RE, (_, rawInner) => {
    const parsed = parseWikiImageInner(rawInner);
    const path = parsed?.path;
    if (!path) return '![[]]';
    const attrs = [
      `data-wiki-path="${escapeAttr(path)}"`,
      'alt=""',
      'class="novel-wiki-image"',
    ];
    if (parsed?.width) attrs.push(`data-wiki-width="${escapeAttr(parsed.width)}"`);
    if (parsed?.height) attrs.push(`data-wiki-height="${escapeAttr(parsed.height)}"`);
    if (parsed?.background) attrs.push(`data-wiki-bg="${escapeAttr(parsed.background)}"`);
    const style = buildWikiImageStyle(parsed ?? {});
    if (style) attrs.push(`style="${escapeAttr(style)}"`);
    return `<img ${attrs.join(' ')} />`;
  });
}

/**
 * 위키 이미지 단독 단락 + 다음 단락(캡션) 또는 같은 단락의 img+br+본문을 캡션 쌍으로 표시한다.
 * Tiptap은 figure 미지원이므로 class로 묶고, 스타일은 CSS로 맞춘다.
 */
export function annotateWikiImageCaptionPairs(html: any) {
  if (!html || typeof html !== 'string') return html;
  if (typeof document === 'undefined') return html;

  const wrap = document.createElement('div');
  wrap.innerHTML = html;

  // 1) 한 단락 안: img + (br 또는 바로 텍스트) + 캡션 → 두 단락으로 분리
  wrap.querySelectorAll('p').forEach((p) => {
    if (!p.parentNode) return;
    const img = p.firstElementChild;
    if (!img || img.tagName !== 'IMG' || !img.getAttribute('data-wiki-path')) return;

    let n = img.nextSibling;
    while (n && n.nodeType === 3 && !(n.textContent || '').trim()) n = n.nextSibling;
    if (!n) return;

    const tail = [];
    if (n.nodeName === 'BR') {
      let cur = n.nextSibling;
      while (cur) {
        const nx = cur.nextSibling;
        tail.push(cur);
        cur = nx;
      }
    } else {
      tail.push(n);
      let cur = n.nextSibling;
      while (cur) {
        const nx = cur.nextSibling;
        tail.push(cur);
        cur = nx;
      }
    }

    if (!tail.length) return;

    const hasCaption = tail.some((node) => {
      if (node.nodeType === 3) return Boolean(node.textContent && node.textContent.trim());
      if (node.nodeType === 1) return true;
      return false;
    });
    if (!hasCaption) return;

    const imgP = document.createElement('p');
    imgP.className = 'novel-wiki-image-line';
    imgP.appendChild(img.cloneNode(true));

    const capP = document.createElement('p');
    capP.className = 'novel-wiki-caption-line';
    tail.forEach((node) => capP.appendChild(node));

    p.replaceWith(imgP, capP);
  });

  // 2) 연속 단락: 위키 이미지 전용 단락 + 다음 텍스트 단락
  let el = wrap.firstElementChild;
  while (el) {
    const next = el.nextElementSibling;
    if (
      el.tagName === 'P' &&
      isParagraphOnlyWikiImage(el) &&
      next &&
      next.tagName === 'P' &&
      !next.classList.contains('novel-wiki-image-line') &&
      next.textContent &&
      next.textContent.trim()
    ) {
      el.classList.add('novel-wiki-image-line');
      next.classList.add('novel-wiki-caption-line');
      el = next.nextElementSibling;
      continue;
    }
    el = next;
  }

  return wrap.innerHTML;
}

/**
 * Turndown 직전: 편집기 HTML에서 캡션 쌍을 markdown-it 과 동일한 figure 로 잠깐 합쳐 직렬화한다.
 */
export function mergeWikiCaptionPairsForTurndown(html: any) {
  if (!html || typeof html !== 'string') return html;
  if (typeof document === 'undefined') return html;

  const wrap = document.createElement('div');
  wrap.innerHTML = html;

  let el = wrap.firstElementChild;
  while (el) {
    const next = el.nextElementSibling;
    if (
      el.tagName === 'P' &&
      el.classList.contains('novel-wiki-image-line') &&
      next &&
      next.tagName === 'P' &&
      next.classList.contains('novel-wiki-caption-line')
    ) {
      const img = el.querySelector('img[data-wiki-path]');
      const path = img?.getAttribute('data-wiki-path');
      if (path && img) {
        const figure = document.createElement('figure');
        figure.className = 'novel-wiki-figure';
        figure.appendChild(img.cloneNode(true));
        const fc = document.createElement('figcaption');
        fc.innerHTML = next.innerHTML;
        figure.appendChild(fc);
        el.replaceWith(figure);
        next.remove();
        el = figure.nextElementSibling;
        continue;
      }
    }
    el = next;
  }

  return wrap.innerHTML;
}

/**
 * markdown-it / md-editor task list HTML → Tiptap TaskList/TaskItem shape.
 * @param {string} html
 */
export function convertMarkdownTaskListsToTiptapHtml(html: any) {
  if (typeof document === 'undefined' || !html || typeof html !== 'string') return html;
  try {
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    const uls = wrap.querySelectorAll('ul:not([data-type="taskList"])');
    uls.forEach((ul) => {
      const items = [...ul.children].filter((el) => el.tagName === 'LI');
      if (items.length === 0) return;
      const markers = items.map((li) => findMarkdownTaskCheckbox(li as HTMLElement));
      if (!markers.every((marker): marker is TaskCheckboxMarker => marker !== null)) return;

      ul.setAttribute('data-type', 'taskList');
      ul.className = 'not-prose pl-2';

      items.forEach((li, i) => {
        const marker = markers[i];
        if (!marker) return;
        const { input, checked } = marker;
        input.remove();

        let innerHtml = li.innerHTML.trim();
        if (!innerHtml) {
          innerHtml = '<p></p>';
        } else if (!innerHtml.startsWith('<')) {
          const p = document.createElement('p');
          p.textContent = innerHtml;
          innerHtml = p.outerHTML;
        }

        li.innerHTML = '';
        li.setAttribute('data-type', 'taskItem');
        li.setAttribute('data-checked', checked ? 'true' : 'false');

        const label = document.createElement('label');
        const cb = document.createElement('input');
        cb.type = 'checkbox';
        if (checked) cb.setAttribute('checked', 'checked');
        const span = document.createElement('span');
        label.appendChild(cb);
        label.appendChild(span);

        const div = document.createElement('div');
        div.innerHTML = innerHtml;

        li.appendChild(label);
        li.appendChild(div);
      });
    });
    return wrap.innerHTML;
  } catch {
    return html;
  }
}

type TaskCheckboxMarker = { input: HTMLInputElement; checked: boolean };

function findMarkdownTaskCheckbox(li: HTMLElement): TaskCheckboxMarker | null {
  const taskInput = li.querySelector(
    ':scope > input.task-list-item-checkbox[type="checkbox"], :scope > input[type="checkbox"]',
  ) as HTMLInputElement | null;
  if (taskInput) {
    return { input: taskInput, checked: taskInput.hasAttribute('checked') };
  }
  const label = li.querySelector(':scope > label');
  if (label) {
    const inp = label.querySelector(':scope > input[type="checkbox"]') as HTMLInputElement | null;
    if (inp) {
      return { input: inp, checked: inp.hasAttribute('checked') };
    }
  }
  const p = li.querySelector(':scope > p');
  if (p) {
    const inp = p.querySelector(':scope > input[type="checkbox"]') as HTMLInputElement | null;
    if (inp) {
      return { input: inp, checked: inp.hasAttribute('checked') };
    }
  }
  return null;
}

/** @deprecated Use convertMarkdownTaskListsToTiptapHtml */
export const convertMarkedTaskListsToTiptapHtml = convertMarkdownTaskListsToTiptapHtml;

/** Full markdown → novel initial HTML (markdown-it 15 + wiki img + caption pairs). */
export function markdownToNovelEditorHtml(md: any) {
  try {
    const raw = renderAppMarkdown(md ?? '', 'novel');
    const withTasks = convertMarkdownTaskListsToTiptapHtml(raw);
    return annotateWikiImageCaptionPairs(injectWikiImagesIntoHtml(withTasks));
  } catch {
    return '<p></p>';
  }
}
