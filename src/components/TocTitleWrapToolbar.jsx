import TocTitleWrapToggle from '@/components/TocTitleWrapToggle';

/** md-editor-rt defToolbars: TOC title wrap switch (place after catalog). */
export default function TocTitleWrapToolbar({
  checked = false,
  onChange,
  theme = 'light',
}) {
  return (
    <span className="md-editor-toolbar-item inline-flex items-center !w-auto !min-w-0 px-1">
      <TocTitleWrapToggle
        checked={checked}
        onChange={onChange}
        isDark={theme === 'dark'}
      />
    </span>
  );
}
