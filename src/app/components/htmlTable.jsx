// HtmlTable.js
export default function HtmlTable({ tableHtml }) {
  return (
    <div className="bg-slate-400/10 backdrop-blur-md p-4 h-full">
      <div
        className="overflow-auto w-full h-full scrollbar scrollbar-thumb-teal-700 scrollbar-track-slate-800 text-slate-100"
        dangerouslySetInnerHTML={{ __html: tableHtml }}
      ></div>
    </div>
  );
}
