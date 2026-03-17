import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { MdPreview } from 'md-editor-rt';
import '@/styles/md-editor-rt/style.css';
import { ArrowLeft, Settings } from 'lucide-react';
import PrintFontOptionsModal from '@/components/PrintFontOptionsModal';
import { loadPrintFontsFromStorage, DEFAULT_PRINT_FONTS } from '@/utils/printSettingsStore';

const EDITOR_ID = 'export-pdf-preview';

const headingId = ({ index }) => `pdf-ex-heading-${index}`;

const printFontStyles = `
  #export-pdf-preview,
  #export-pdf-preview .md-editor-preview {
    font-family: var(--print-font-body, inherit);
  }
  #export-pdf-preview .md-editor-preview h1,
  #export-pdf-preview .md-editor-preview h2,
  #export-pdf-preview .md-editor-preview h3,
  #export-pdf-preview .md-editor-preview h4,
  #export-pdf-preview .md-editor-preview h5,
  #export-pdf-preview .md-editor-preview h6 {
    font-family: var(--print-font-heading, inherit);
  }
  #export-pdf-preview .md-editor-preview b,
  #export-pdf-preview .md-editor-preview strong {
    font-family: var(--print-font-bold, inherit);
  }
  #export-pdf-preview .md-editor-preview code,
  #export-pdf-preview .md-editor-preview pre,
  #export-pdf-preview .md-editor-preview .md-editor-code pre,
  #export-pdf-preview .md-editor-preview .md-editor-code pre code {
    font-family: var(--print-font-code, inherit);
  }
`;

export default function ExportPDFPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { value = '' } = location.state ?? {};
  const [fonts, setFonts] = useState(() => ({ ...DEFAULT_PRINT_FONTS }));
  const [fontModalOpen, setFontModalOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadPrintFontsFromStorage().then((loaded) => {
      if (!cancelled) setFonts(loaded);
    });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (location.state == null) {
      navigate('/', { replace: true });
    }
  }, [location.state, navigate]);

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleExport = useCallback(() => {
    const target = document.querySelector(`#${EDITOR_ID}`);
    if (!target) return;
    window.print();
  }, []);

  const fontStyleVars = {
    '--print-font-body': fonts.body || 'inherit',
    '--print-font-heading': fonts.heading || 'inherit',
    '--print-font-bold': fonts.bold || 'inherit',
    '--print-font-code': fonts.code || 'inherit',
  };

  if (location.state == null) {
    return null;
  }

  return (
    <div
      className="export-pdf-page flex flex-col min-h-full bg-white dark:bg-white print:bg-white min-w-0"
      style={fontStyleVars}
    >
      <style>{printFontStyles}</style>
      <div className="flex items-center justify-between gap-4 px-4 py-3 border-b border-gray-200 dark:border-odp-borderSoft shrink-0 print:hidden">
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-2 text-sm text-gray-600 dark:text-odp-fg hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-odp-focusBg px-3 py-2 rounded transition"
          aria-label="뒤로 가기"
        >
          <ArrowLeft size={18} />
          뒤로 가기
        </button>
        <h2 className="font-semibold text-gray-800 dark:text-odp-fg truncate flex-1 text-center">
          PDF로 내보내기
        </h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFontModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 dark:text-odp-fg hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-odp-focusBg rounded transition"
            aria-label="폰트 설정"
          >
            <Settings size={16} />
            폰트 설정
          </button>
          <button
            type="button"
            className="md-editor-btn"
            onClick={handleExport}
          >
            내보내기
          </button>
        </div>
      </div>

      <MdPreview
        id={EDITOR_ID}
        theme="light"
        language="ko-KR"
        value={value}
        mdHeadingId={headingId}
        codeFoldable={false}
        showCodeRowNumber={false}
      />

      <PrintFontOptionsModal
        isOpen={fontModalOpen}
        onClose={() => setFontModalOpen(false)}
        fonts={fonts}
        onFontsChange={(next) => setFonts(next)}
      />
    </div>
  );
}
