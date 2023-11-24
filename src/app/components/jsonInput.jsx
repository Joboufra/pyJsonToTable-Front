// components/JsonInput.js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
export default function JsonInput({ jsonInput, setJsonInput, handleSubmit, isModalOpen }) {
  return (
    <div className="flex flex-col h-screen bg-slate-400/10 p-4 gap-5 overflow-hidden">
      <textarea
        className="h-5/6 bg-white/10 border border-gray-500 p-2 resize-none scrollbar scrollbar-thumb-teal-700 scrollbar-track-slate-700"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Introduce tu JSON aquí"
      >
      </textarea>
      <button
        className="bg-teal-600 hover:bg-teal-700 text-slate-100 font-bold p-4 rounded-xl flex items-center justify-center gap-2"
        onClick={handleSubmit}
      >
        Procesar JSON <FontAwesomeIcon icon={faPlay} className="w-5 h-5"/>

      </button>
    </div>
  );
}