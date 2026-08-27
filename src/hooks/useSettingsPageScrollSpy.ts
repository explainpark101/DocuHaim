import { useEffect, useState, type RefObject } from 'react';

export function useSettingsPageScrollSpy(
  scrollRootRef: RefObject<HTMLElement | null>,
  sectionIds: string[],
  fallbackSectionId = '',
) {
  const [activeSectionId, setActiveSectionId] = useState(fallbackSectionId);

  useEffect(() => {
    const root = scrollRootRef.current;
    if (!root || sectionIds.length === 0) return undefined;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (elements.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0]?.target;
        if (top?.id) setActiveSectionId(top.id);
      },
      {
        root,
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0, 0.15, 0.35, 0.55, 0.75, 1],
      },
    );

    for (const element of elements) observer.observe(element);
    return () => observer.disconnect();
  }, [scrollRootRef, sectionIds, fallbackSectionId]);

  return activeSectionId;
}
