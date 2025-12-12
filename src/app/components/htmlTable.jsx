// HtmlTable.js
export default function HtmlTable({ tableHtml }) {
  return (
    <div className="h-full rounded-2xl border border-slate-700 bg-slate-900/50 backdrop-blur shadow-xl">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 text-sm text-slate-300">
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-[0.24em] text-slate-400">Resultado</span>
          <span className="text-sm font-semibold text-slate-100">Tabla generada</span>
        </div>
        <span className="px-3 py-1 rounded-full text-xs bg-slate-800/70 text-slate-300 border border-slate-700">
          Haz scroll para ver todos los datos
        </span>
      </div>
      <div className="relative">
        <div
          className="overflow-auto w-full h-[520px] scrollbar scrollbar-thumb-teal-700 scrollbar-track-slate-800 text-slate-100 px-4 pb-4 relative isolate"
          style={{ scrollPaddingTop: '64px' }}
          dangerouslySetInnerHTML={{ __html: tableHtml }}
        ></div>
      </div>
    </div>
  );
}
