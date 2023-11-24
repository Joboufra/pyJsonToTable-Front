
export default function Modal({ isOpen, onClose, title, content }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
      <div className="relative p-8 bg-slate-800/90 border border-slate-700 w-full max-w-md m-auto flex-col flex rounded-lg">
        <span className="absolute top-0 right-0 p-4">
        </span>
        <h1 className="text-xl font-bold">{title}</h1>
        <p className="my-4">{content}</p>
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
