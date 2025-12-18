// HtmlTable.js
import { useCallback, useState } from 'react';

export default function HtmlTable({ tableHtml, visibleTableHtml, showCopySelection = true }) {
  const [copyAllStatus, setCopyAllStatus] = useState('idle');
  const [copyVisibleStatus, setCopyVisibleStatus] = useState('idle');

  const copyHtmlTable = useCallback(async (html, setStatus, includeHeader = false) => {
    if (!html) return;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const rows = Array.from(tempDiv.querySelectorAll('table tr'));
    const rowsToCopy = rows.filter((row, idx) => {
      if (row.style.display === 'none') return false;
      if (idx === 0) return includeHeader;
      return true;
    });
    if (!rowsToCopy.length) return;

    const textToCopy = rowsToCopy
      .map((row) => Array.from(row.cells).map((cell) => cell.textContent.trim()).join('\t'))
      .join('\n');

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setStatus('copied');
    } catch (error) {
      console.error('Error al copiar la tabla', error);
      setStatus('error');
    } finally {
      setTimeout(() => setStatus('idle'), 1800);
    }
  }, []);

  const copyAllRows = () => copyHtmlTable(tableHtml, setCopyAllStatus, false);
  const copyVisibleRows = () => copyHtmlTable(visibleTableHtml || tableHtml, setCopyVisibleStatus, true);

  const getLabel = (status, base) => {
    if (status === 'copied') return 'Copiado';
    if (status === 'error') return 'Error al copiar';
    return base;
  };

  return (
    <div className="h-full rounded-2xl border border-slate-700 bg-slate-900/50 backdrop-blur shadow-xl">
      <div className="flex flex-col gap-3 px-5 py-4 border-b border-slate-800 text-sm text-slate-300 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-[0.24em] text-slate-400">Resultado</span>
          <span className="text-sm font-semibold text-slate-100">Tabla generada</span>
        </div>
        <div className="flex flex-col gap-2 w-full sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 md:w-auto">
          {showCopySelection && (
            <button
              type="button"
              onClick={copyVisibleRows}
              disabled={!visibleTableHtml || copyVisibleStatus === 'copied'}
              className="relative w-full sm:w-auto overflow-hidden rounded-lg bg-gradient-to-r from-slate-200 to-slate-100 hover:from-slate-100 hover:to-white text-slate-900 text-xs font-semibold px-3 py-2 shadow-lg shadow-teal-900/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {getLabel(copyVisibleStatus, 'Copiar seleccion')}
            </button>
          )}
          {!showCopySelection && (
            <button
              type="button"
              onClick={copyAllRows}
              disabled={!tableHtml || copyAllStatus === 'copied'}
              className="relative w-full sm:w-auto overflow-hidden rounded-lg bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-500 hover:to-emerald-400 text-slate-950 text-xs font-semibold px-3 py-2 shadow-lg shadow-teal-900/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {getLabel(copyAllStatus, 'Copiar todo')}
            </button>
          )}
          <span className="hidden md:inline-flex px-3 py-1 rounded-full text-xs bg-slate-800/70 text-slate-300 border border-slate-700 whitespace-nowrap">
            Haz scroll para ver todos los datos
          </span>
        </div>
      </div>
      <div className="relative">
        <div
          className="overflow-auto w-full h-[520px] scrollbar scrollbar-thumb-teal-700 scrollbar-track-slate-800 text-slate-100 px-4 pb-4 relative isolate"
          style={{ scrollPaddingTop: '64px' }}
          dangerouslySetInnerHTML={{ __html: visibleTableHtml || tableHtml }}
        ></div>
      </div>
    </div>
  );
}


