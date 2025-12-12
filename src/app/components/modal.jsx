export default function Modal({ isOpen, onClose, title, content, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black/60 backdrop-blur-sm flex text-slate-100 p-4">
      <div className="relative p-6 md:p-8 bg-slate-900/90 border border-slate-700 w-full max-w-md m-auto flex-col flex rounded-2xl shadow-2xl gap-4">
        <h1 className="text-xl font-bold">{title}</h1>
        <div className="text-sm text-slate-200 leading-relaxed">{content}</div>
        {children}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="py-2 px-4 bg-slate-800 text-white rounded-lg hover:bg-slate-700 border border-slate-700 transition-colors"
            type="button"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
