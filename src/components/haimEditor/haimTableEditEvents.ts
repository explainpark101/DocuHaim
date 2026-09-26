/**
 * Custom events for opening the haim-table editor from TipTap NodeViews.
 */

export const HAIM_TABLE_EDIT_REQUEST_EVENT = 'haim-table-edit-request';

export type HaimTableEditRequestDetail = {
  /** TipTap document position of the rawMarkdownBlock, or null for a new insert. */
  pos: number | null;
  /** Current raw markdown (comment + GFM table). Empty when inserting. */
  text: string;
};

export function dispatchHaimTableEditRequest(
  target: EventTarget,
  detail: HaimTableEditRequestDetail,
): void {
  target.dispatchEvent(
    new CustomEvent(HAIM_TABLE_EDIT_REQUEST_EVENT, {
      detail,
      bubbles: true,
    }),
  );
}
