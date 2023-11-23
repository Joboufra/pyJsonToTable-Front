export default function HtmlTable({ tableHtml }) {
  return (
    <div className="bg-white/10 backdrop-blur-md p-4 h-full">
      <div
        className="overflow-auto max-h-full scrollbar scrollbar-thumb-teal-700 scrollbar-track-slate-800"
        style={{ maxWidth: 'calc(100vw - 20%)'}}
        dangerouslySetInnerHTML={{ __html: tableHtml }}
      ></div>
    </div>
  );
}
