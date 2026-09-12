import { useCallback, useEffect, useState } from 'react';
import {
  getExportPdfToolPresentation,
  setExportPdfToolPresentation,
  type ExportPdfToolId,
} from '@/utils/print/exportPdfToolPresentation';

type Args = {
  isLandscape: boolean;
  fontModalOpen: boolean;
  setFontModalOpen: (open: boolean) => void;
  chromeModalOpen: boolean;
  setChromeModalOpen: (open: boolean) => void;
};

/**
 * Landscape-only right dock for Export PDF font / page-chrome tools.
 * Remembers modal vs dock preference per tool; XOR one dock panel at a time.
 */
export function useExportPdfToolsDock({
  isLandscape,
  fontModalOpen,
  setFontModalOpen,
  chromeModalOpen,
  setChromeModalOpen,
}: Args) {
  const [dockTool, setDockTool] = useState<ExportPdfToolId | null>(null);
  const [toolsDockWidth, setToolsDockWidth] = useState(0);

  const closeDock = useCallback(() => {
    setDockTool(null);
  }, []);

  const openFont = useCallback(() => {
    setChromeModalOpen(false);
    if (isLandscape && getExportPdfToolPresentation('font') === 'dock') {
      setFontModalOpen(false);
      setDockTool('font');
      return;
    }
    setDockTool(null);
    setFontModalOpen(true);
  }, [isLandscape, setChromeModalOpen, setFontModalOpen]);

  const openChrome = useCallback(() => {
    setFontModalOpen(false);
    if (isLandscape && getExportPdfToolPresentation('chrome') === 'dock') {
      setChromeModalOpen(false);
      setDockTool('chrome');
      return;
    }
    setDockTool(null);
    setChromeModalOpen(true);
  }, [isLandscape, setChromeModalOpen, setFontModalOpen]);

  const dockFontFromModal = useCallback(() => {
    if (!isLandscape) return;
    setExportPdfToolPresentation('font', 'dock');
    setFontModalOpen(false);
    setChromeModalOpen(false);
    setDockTool('font');
  }, [isLandscape, setChromeModalOpen, setFontModalOpen]);

  const dockChromeFromModal = useCallback(() => {
    if (!isLandscape) return;
    setExportPdfToolPresentation('chrome', 'dock');
    setChromeModalOpen(false);
    setFontModalOpen(false);
    setDockTool('chrome');
  }, [isLandscape, setChromeModalOpen, setFontModalOpen]);

  const undockFontToModal = useCallback(() => {
    setExportPdfToolPresentation('font', 'modal');
    setDockTool(null);
    setChromeModalOpen(false);
    setFontModalOpen(true);
  }, [setChromeModalOpen, setFontModalOpen]);

  const undockChromeToModal = useCallback(() => {
    setExportPdfToolPresentation('chrome', 'modal');
    setDockTool(null);
    setFontModalOpen(false);
    setChromeModalOpen(true);
  }, [setChromeModalOpen, setFontModalOpen]);

  // Portrait / non-landscape: force undock into modal.
  useEffect(() => {
    if (isLandscape || !dockTool) return;
    const tool = dockTool;
    setExportPdfToolPresentation(tool, 'modal');
    setDockTool(null);
    if (tool === 'font') {
      setChromeModalOpen(false);
      setFontModalOpen(true);
    } else {
      setFontModalOpen(false);
      setChromeModalOpen(true);
    }
  }, [dockTool, isLandscape, setChromeModalOpen, setFontModalOpen]);

  // Prefer dock: AS / openChromeModal still set modal flags — redirect when preferred.
  useEffect(() => {
    if (!isLandscape || !fontModalOpen) return;
    if (getExportPdfToolPresentation('font') !== 'dock') return;
    setFontModalOpen(false);
    setChromeModalOpen(false);
    setDockTool('font');
  }, [fontModalOpen, isLandscape, setChromeModalOpen, setFontModalOpen]);

  useEffect(() => {
    if (!isLandscape || !chromeModalOpen) return;
    if (getExportPdfToolPresentation('chrome') !== 'dock') return;
    setChromeModalOpen(false);
    setFontModalOpen(false);
    setDockTool('chrome');
  }, [chromeModalOpen, isLandscape, setChromeModalOpen, setFontModalOpen]);

  return {
    dockTool,
    toolsDockWidth,
    setToolsDockWidth,
    closeDock,
    openFont,
    openChrome,
    dockFontFromModal,
    dockChromeFromModal,
    undockFontToModal,
    undockChromeToModal,
    fontPresentation: (dockTool === 'font' ? 'dock' : 'modal') as 'modal' | 'dock',
    chromePresentation: (dockTool === 'chrome' ? 'dock' : 'modal') as 'modal' | 'dock',
    fontUiOpen: dockTool === 'font' || fontModalOpen,
    chromeUiOpen: dockTool === 'chrome' || chromeModalOpen,
  };
}
