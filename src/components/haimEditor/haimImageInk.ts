/**
 * Optional Web Ink API (DelegatedInkTrailPresenter) helpers.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Ink_API
 */

export type InkTrailStyle = {
  color: string;
  diameter: number;
};

export type DelegatedInkTrailPresenter = {
  updateInkTrailStartPoint: (
    event: PointerEvent,
    style: InkTrailStyle,
  ) => void;
};

type InkNavigator = Navigator & {
  ink?: {
    requestPresenter: (options?: {
      presentationArea?: Element;
    }) => Promise<DelegatedInkTrailPresenter>;
  };
};

export function isInkApiAvailable(): boolean {
  if (typeof navigator === 'undefined') return false;
  return Boolean((navigator as InkNavigator).ink?.requestPresenter);
}

export async function requestInkPresenter(
  presentationArea: Element,
): Promise<DelegatedInkTrailPresenter | null> {
  const ink = (navigator as InkNavigator).ink;
  if (!ink?.requestPresenter) return null;
  try {
    return await ink.requestPresenter({ presentationArea });
  } catch {
    return null;
  }
}
