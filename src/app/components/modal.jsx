export default function Modal({ isOpen, onClose, title, content, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex text-slate-100">
      <div className="relative p-8 bg-slate-800/90 border border-slate-700 w-full max-w-md m-auto flex-col flex rounded-lg">
        <h1 className="text-xl font-bold">{title}</h1>
        <div className="my-4">{content}</div>
        {children}
        <button
          onClick={onClose}
          className="py-2 px-4 bg-teal-700 text-white rounded hover:bg-teal-800"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
