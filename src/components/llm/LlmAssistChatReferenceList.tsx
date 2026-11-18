import { useMemo, useState, type CSSProperties } from 'react';
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ChevronDown, FileText, X } from 'lucide-react';
import LlmAssistCollapsible from '@/components/llm/LlmAssistCollapsible';
import {
  formatLlmAssistReferenceBadge,
  reorderLlmAssistChatReferences,
  type LlmAssistChatReference,
} from '@/utils/llm/llmAssistChatReferences';

type Tone = 'composer' | 'user';

type LlmAssistChatReferenceListProps = {
  references: LlmAssistChatReference[];
  /** When true, badges are drag-reorderable and removable. */
  editable?: boolean;
  onRemove?: (id: string) => void;
  onReorder?: (next: LlmAssistChatReference[]) => void;
  tone?: Tone;
  className?: string;
};

const BADGE_BASE =
  'inline-flex max-w-[min(100%,14rem)] items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium leading-tight';

const TONE_BADGE: Record<Tone, string> = {
  composer:
    'border-sky-300 bg-sky-50 text-sky-900 dark:border-sky-700 dark:bg-sky-950/50 dark:text-sky-100',
  user: 'border-white/35 bg-white/15 text-white',
};

const TONE_DETAIL: Record<Tone, string> = {
  composer:
    'border-sky-200 bg-sky-50/80 text-sky-950 dark:border-sky-800 dark:bg-sky-950/40 dark:text-sky-100',
  user: 'border-white/25 bg-white/10 text-white',
};

function ReferenceBadgeChrome({
  refItem,
  tone,
  className = '',
  onRemove,
  dragHandleProps,
  innerRef,
  style,
}: {
  refItem: LlmAssistChatReference;
  tone: Tone;
  className?: string;
  onRemove?: (id: string) => void;
  dragHandleProps?: Record<string, unknown>;
  innerRef?: (node: HTMLElement | null) => void;
  style?: CSSProperties;
}) {
  const label = formatLlmAssistReferenceBadge(refItem);
  return (
    <div
      ref={innerRef}
      style={style}
      className={`${BADGE_BASE} ${TONE_BADGE[tone]} ${className}`}
      title={refItem.path || label}
      {...(dragHandleProps || {})}
    >
      <FileText size={11} className="shrink-0 opacity-80" aria-hidden />
      <span className="min-w-0 truncate">{label}</span>
      {onRemove ? (
        <button
          type="button"
          className="shrink-0 rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/10"
          aria-label={`${label} 제거`}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onRemove(refItem.id);
          }}
        >
          <X size={10} aria-hidden />
        </button>
      ) : null}
    </div>
  );
}

function SortableBadge({
  refItem,
  tone,
  onRemove,
}: {
  refItem: LlmAssistChatReference;
  tone: Tone;
  onRemove?: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: refItem.id,
  });
  return (
    <ReferenceBadgeChrome
      refItem={refItem}
      tone={tone}
      className="cursor-grab active:cursor-grabbing"
      {...(onRemove ? { onRemove } : {})}
      dragHandleProps={{ ...attributes, ...listeners }}
      innerRef={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.55 : 1,
      }}
    />
  );
}

/**
 * Cursor-style reference badges + collapsed detail dump.
 * Editable mode supports drag reorder for pending composer refs.
 */
export default function LlmAssistChatReferenceList({
  references,
  editable = false,
  onRemove,
  onReorder,
  tone = 'composer',
  className = '',
}: LlmAssistChatReferenceListProps) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));
  const ids = useMemo(() => references.map((r) => r.id), [references]);

  if (!references.length) return null;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    onReorder?.(
      reorderLlmAssistChatReferences(references, String(active.id), String(over.id)),
    );
  };

  return (
    <div className={`space-y-1 ${className}`}>
      {editable && onReorder ? (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={ids} strategy={horizontalListSortingStrategy}>
            <div className="flex flex-wrap items-center gap-1">
              {references.map((refItem) => (
                <SortableBadge
                  key={refItem.id}
                  refItem={refItem}
                  tone={tone}
                  {...(onRemove ? { onRemove } : {})}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      ) : (
        <div className="flex flex-wrap items-center gap-1">
          {references.map((refItem) => (
            <ReferenceBadgeChrome key={refItem.id} refItem={refItem} tone={tone} />
          ))}
        </div>
      )}

      <button
        type="button"
        className={`inline-flex items-center gap-0.5 rounded px-1 py-0.5 text-[10px] ${
          tone === 'user'
            ? 'text-white/85 hover:bg-white/10'
            : 'text-sky-800 hover:bg-sky-100 dark:text-sky-200 dark:hover:bg-sky-900/40'
        }`}
        aria-expanded={detailsOpen}
        onClick={() => setDetailsOpen((v) => !v)}
      >
        <ChevronDown
          size={12}
          className={`transition-transform ${detailsOpen ? 'rotate-180' : ''}`}
          aria-hidden
        />
        자세히 보기 ({references.length})
      </button>

      <LlmAssistCollapsible open={detailsOpen}>
        <div className="space-y-1.5 pb-0.5">
          {references.map((refItem, index) => (
            <div
              key={refItem.id}
              className={`rounded-md border px-2 py-1.5 text-[10px] ${TONE_DETAIL[tone]}`}
            >
              <div className="mb-0.5 font-medium opacity-90">
                {index + 1}. {formatLlmAssistReferenceBadge(refItem)}
                {refItem.path && refItem.path !== refItem.fileName ? (
                  <span className="ml-1 font-normal opacity-70">{refItem.path}</span>
                ) : null}
              </div>
              <div className="whitespace-pre-wrap break-words opacity-95">{refItem.text}</div>
            </div>
          ))}
        </div>
      </LlmAssistCollapsible>
    </div>
  );
}
