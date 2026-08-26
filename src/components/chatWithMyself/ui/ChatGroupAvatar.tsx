import { useEffect, useState } from 'react';
import { Camera } from 'lucide-react';
import { SELF_GROUP } from '@/utils/chatWithMyself';
import { groupColor, isSelfGroupName } from '@/utils/chatWithMyself/groupAvatar';

const sizeClass = {
  sm: 'h-5 w-5 text-[10px]',
  md: 'h-7 w-7 text-xs',
  lg: 'h-8 w-8 text-xs',
};

const cameraSize = {
  sm: 10,
  md: 12,
  lg: 14,
};

/**
 * Circular group avatar: photo when available, else hash color + first char (or yellow "나").
 *
 * @param {{
 *   name?: string,
 *   size?: 'sm'|'md'|'lg',
 *   className?: string,
 *   iconPath?: string|null,
 *   iconUrl?: string|null,
 *   colorKey?: string|null,
 *   getPresignedUrl?: ((path: string) => Promise<string|null|undefined>)|null,
 *   editable?: boolean,
 *   onRequestEdit?: (() => void)|null,
 *   title?: string,
 * }} props
 */
export default function ChatGroupAvatar({
  name,
  size = 'md',
  className = '',
  iconPath = null,
  iconUrl = null,
  colorKey = null,
  getPresignedUrl = null,
  editable = false,
  onRequestEdit = null,
  title
}: any) {
  const label = name || SELF_GROUP;
  const self = isSelfGroupName(label);
  const tintKey = colorKey || label;
  // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  const dim = sizeClass[size] || sizeClass.md;
  // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  const cam = cameraSize[size] || cameraSize.md;
  const [fetched, setFetched] = useState(
    /** @type {{ path: string|null, url: string|null }} */ ({
      path: null,
      url: null,
    }),
  );

  useEffect(() => {
    if (iconUrl || !iconPath || !getPresignedUrl || self) {
      return undefined;
    }
    let cancelled = false;
    Promise.resolve(getPresignedUrl(iconPath))
      .then((u) => {
        if (!cancelled) {
          setFetched({ path: iconPath, url: u || null });
        }
      })
      .catch(() => {
        if (!cancelled) {
          setFetched({ path: iconPath, url: null });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [iconPath, iconUrl, getPresignedUrl, self]);

  const resolvedUrl =
    iconUrl ||
    (fetched.path === iconPath ? fetched.url : null);

  const face = resolvedUrl ? (
    <img
      src={resolvedUrl}
      alt=""
      className="h-full w-full object-cover"
      draggable={false}
    />
  ) : self ? (
    <span className="font-bold text-gray-900">나</span>
  ) : (
    <span className="font-bold text-white">{label.slice(0, 1)}</span>
  );

  const shellClass = `relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full ${dim} ${className}`;
  const shellStyle = resolvedUrl
    ? undefined
    : self
      ? undefined
      : { background: groupColor(tintKey) };
  const shellBg = resolvedUrl
    ? 'bg-gray-200 dark:bg-odp-borderSoft'
    : self
      ? 'bg-yellow-400'
      : '';

  if (editable && onRequestEdit && !self) {
    return (
      <button
        type="button"
        title={title || '그룹 아이콘 변경'}
        aria-label={title || '그룹 아이콘 변경'}
        className={`group/avatar ${shellClass} ${shellBg} outline-none ring-offset-1 transition-[box-shadow,transform] duration-150 hover:scale-105 focus-visible:ring-2 focus-visible:ring-blue-400`}
        style={shellStyle}
        onMouseDown={(e: any) => {
          // Keep a sibling rename/draft input focused until the picker opens.
          e.preventDefault();
          e.stopPropagation();
        }}
        onClick={(e: any) => {
          e.preventDefault();
          e.stopPropagation();
          onRequestEdit();
        }}
        onPointerDown={(e: any) => e.stopPropagation()}
      >
        {face}
        <span
          className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-full bg-black/55 text-white opacity-0 transition-opacity duration-150 group-hover/avatar:opacity-100 group-focus-visible/avatar:opacity-100"
          aria-hidden
        >
          <Camera size={cam} strokeWidth={2.25} className="drop-shadow-sm" />
        </span>
      </button>
    );
  }

  return (
    <span
      className={`${shellClass} ${shellBg}`}
      style={shellStyle}
      aria-hidden
    >
      {face}
    </span>
  );
}
