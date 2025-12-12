import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

export default function JsonInput({ jsonInput, setJsonInput, handleSubmit }) {
  const sampleJson = [
    { titulo: 'Libro 1', autor: 'Autor A', genero: 'Ficcion', paginas: 280, editorial: 'Editora Norte', precio: 24.9 },
    { titulo: 'Libro 2', autor: 'Autor B', genero: 'Tecnologia', paginas: 240, editorial: 'Tech House', precio: 18.5 },
    { titulo: 'Libro 3', autor: 'Autor C', genero: 'Historia', paginas: 310, editorial: 'Memoria Press', precio: 22.0 },
    { titulo: 'Libro 4', autor: 'Autor D', genero: 'Cocina', paginas: 180, editorial: 'Sabor Editores', precio: 15.75 },
    { titulo: 'Libro 5', autor: 'Autor E', genero: 'Ciencia', paginas: 340, editorial: 'Astro Books', precio: 29.1 },
    { titulo: 'Libro 6', autor: 'Autor F', genero: 'Misterio', paginas: 260, editorial: 'Noir Co', precio: 19.9 },
    { titulo: 'Libro 7', autor: 'Autor G', genero: 'Ficcion', paginas: 295, editorial: 'Editora Norte', precio: 23.4 },
    { titulo: 'Libro 8', autor: 'Autor H', genero: 'Infantil', paginas: 150, editorial: 'Pequenio Sol', precio: 12.5 },
    { titulo: 'Libro 9', autor: 'Autor I', genero: 'Aventura', paginas: 370, editorial: 'Ruta Editorial', precio: 27.8 },
    { titulo: 'Libro 10', autor: 'Autor J', genero: 'Romance', paginas: 220, editorial: 'Amor&Co', precio: 17.6 },
    { titulo: 'Libro 11', autor: 'Autor K', genero: 'Ensayo', paginas: 200, editorial: 'Punto Critico', precio: 16.2 },
    { titulo: 'Libro 12', autor: 'Autor L', genero: 'Fantasia', paginas: 410, editorial: 'Dragon Press', precio: 31.5 },
    { titulo: 'Libro 13', autor: 'Autor M', genero: 'Viajes', paginas: 190, editorial: 'Mapa Abierto', precio: 14.9 },
    { titulo: 'Libro 14', autor: 'Autor N', genero: 'Biografia', paginas: 330, editorial: 'Vidas', precio: 25.3 },
    { titulo: 'Libro 15', autor: 'Autor O', genero: 'Tecnologia', paginas: 280, editorial: 'Tech House', precio: 21.0 },
  ];

  // Hidden shortcut to auto-fill with a sample JSON
  useEffect(() => {
    const fillSample = (e) => {
      if (e.ctrlKey && e.shiftKey && e.code === 'KeyS') {
        e.preventDefault();
        setJsonInput(JSON.stringify(sampleJson, null, 2));
      }
    };
    window.addEventListener('keydown', fillSample);
    return () => window.removeEventListener('keydown', fillSample);
  }, [setJsonInput]);

  return (
    <div className="flex flex-col h-full rounded-2xl border border-slate-700 bg-gradient-to-b from-slate-900/60 to-slate-900/30 backdrop-blur p-4 md:p-5 gap-4 shadow-lg">
      <div className="flex flex-col">
        <p className="text-xs text-slate-400 uppercase tracking-[0.18em]">Entrada JSON</p>
        <h3 className="text-lg font-semibold text-slate-50 leading-tight">Pega o escribe tu JSON aquí</h3>
      </div>
      <textarea
        className="h-64 md:h-[420px] bg-slate-950/50 border border-slate-700 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30 outline-none text-slate-100 p-3 rounded-xl resize-none font-mono text-sm leading-6 scrollbar scrollbar-thumb-teal-700 scrollbar-track-slate-800"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Introduce tu JSON aqui..."
      ></textarea>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <button
          className="bg-teal-500 hover:bg-teal-400 text-slate-900 font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-sm transition-colors"
          onClick={handleSubmit}
          type="button"
        >
          Procesar JSON <FontAwesomeIcon icon={faPlay} className="w-4 h-4" />
        </button>
        <div className="text-xs text-slate-400 flex items-center justify-center bg-slate-900/40 border border-dashed border-slate-700 rounded-xl px-3 py-2">
          Pega un JSON válido para comenzar
        </div>
      </div>
    </div>
  );
}
