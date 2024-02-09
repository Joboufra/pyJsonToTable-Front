// components/JsonInput.js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react';

export default function JsonInput({ jsonInput, setJsonInput, handleSubmit, isModalOpen }) {

  const jsonTest = [
      {
          "Titulo": "Libro 1",
          "Autor": "Autor 1",
          "Genero": "Ficción",
          "AñoPublicacion": 2020,
          "Editorial": "Editorial 1",
          "ISBN": "978-1234567890",
          "Paginas": 300,
          "Idioma": "Español",
          "Formato": "Tapa dura",
          "Precio": 25.99
      },
      {
          "Titulo": "Libro 2",
          "Autor": "Autor 2",
          "Genero": "No Ficción",
          "AñoPublicacion": 2019,
          "Editorial": "Editorial 2",
          "ISBN": "978-0987654321",
          "Paginas": 250,
          "Idioma": "Inglés",
          "Formato": "Tapa blanda",
          "Precio": 19.99
      },
      {
          "Titulo": "Libro 3",
          "Autor": "Autor 3",
          "Genero": "Ciencia Ficción",
          "AñoPublicacion": 2021,
          "Editorial": "Editorial 3",
          "ISBN": "978-9876543210",
          "Paginas": 400,
          "Idioma": "Español",
          "Formato": "Tapa dura",
          "Precio": 29.99
      },
      {
          "Titulo": "Libro 4",
          "Autor": "Autor 4",
          "Genero": "Misterio",
          "AñoPublicacion": 2018,
          "Editorial": "Editorial 4",
          "ISBN": "978-5678901234",
          "Paginas": 320,
          "Idioma": "Inglés",
          "Formato": "Tapa blanda",
          "Precio": 22.50
      },
      {
          "Titulo": "Libro 5",
          "Autor": "Autor 5",
          "Genero": "Fantasía",
          "AñoPublicacion": 2017,
          "Editorial": "Editorial 5",
          "ISBN": "978-5432109876",
          "Paginas": 350,
          "Idioma": "Español",
          "Formato": "Tapa dura",
          "Precio": 27.99
      },
      {
          "Titulo": "Libro 6",
          "Autor": "Autor 6",
          "Genero": "Historia",
          "AñoPublicacion": 2016,
          "Editorial": "Editorial 6",
          "ISBN": "978-6789012345",
          "Paginas": 280,
          "Idioma": "Español",
          "Formato": "Tapa blanda",
          "Precio": 18.75
      },
      {
          "Titulo": "Libro 7",
          "Autor": "Autor 7",
          "Genero": "Aventura",
          "AñoPublicacion": 2019,
          "Editorial": "Editorial 7",
          "ISBN": "978-4321098765",
          "Paginas": 310,
          "Idioma": "Inglés",
          "Formato": "Tapa dura",
          "Precio": 24.99
      },
      {
          "Titulo": "Libro 8",
          "Autor": "Autor 8",
          "Genero": "Romance",
          "AñoPublicacion": 2022,
          "Editorial": "Editorial 8",
          "ISBN": "978-8765432109",
          "Paginas": 260,
          "Idioma": "Español",
          "Formato": "Tapa blanda",
          "Precio": 21.50
      },
      {
          "Titulo": "Libro 9",
          "Autor": "Autor 9",
          "Genero": "Ciencia",
          "AñoPublicacion": 2020,
          "Editorial": "Editorial 9",
          "ISBN": "978-3210987654",
          "Paginas": 380,
          "Idioma": "Inglés",
          "Formato": "Tapa dura",
          "Precio": 28.75
      },
      {
          "Titulo": "Libro 10",
          "Autor": "Autor 10",
          "Genero": "Ficción",
          "AñoPublicacion": 2015,
          "Editorial": "Editorial 10",
          "ISBN": "978-1098765432",
          "Paginas": 270,
          "Idioma": "Español",
          "Formato": "Tapa blanda",
          "Precio": 20.99
      },
      {
          "Titulo": "Libro 11",
          "Autor": "Autor 11",
          "Genero": "Misterio",
          "AñoPublicacion": 2017,
          "Editorial": "Editorial 11",
          "ISBN": "978-2345678901",
          "Paginas": 330,
          "Idioma": "Inglés",
          "Formato": "Tapa dura",
          "Precio": 23.50
      },
      {
          "Titulo": "Libro 12",
          "Autor": "Autor 12",
          "Genero": "Fantasía",
          "AñoPublicacion": 2021,
          "Editorial": "Editorial 12",
          "ISBN": "978-7654321098",
          "Paginas": 310,
          "Idioma": "Español",
          "Formato": "Tapa blanda",
          "Precio": 22.99
      },
      {
          "Titulo": "Libro 13",
          "Autor": "Autor 13",
          "Genero": "Historia",
          "AñoPublicacion": 2018,
          "Editorial": "Editorial 13",
          "ISBN": "978-3456789012",
          "Paginas": 290,
          "Idioma": "Inglés",
          "Formato": "Tapa dura",
          "Precio": 26.75
      },
      {
          "Titulo": "Libro 14",
          "Autor": "Autor 14",
          "Genero": "Aventura",
          "AñoPublicacion": 2023,
          "Editorial": "Editorial 14",
          "ISBN": "978-4567890123",
          "Paginas": 340,
          "Idioma": "Español",
          "Formato": "Tapa blanda",
          "Precio": 24.50
      },
      {
          "Titulo": "Libro 15",
          "Autor": "Autor 15",
          "Genero": "Romance",
          "AñoPublicacion": 2019,
          "Editorial": "Editorial 15",
          "ISBN": "978-5678901234",
          "Paginas": 320,
          "Idioma": "Inglés",
          "Formato": "Tapa dura",
          "Precio": 21.99
      },
      {
          "Titulo": "Libro 16",
          "Autor": "Autor 16",
          "Genero": "Ciencia",
          "AñoPublicacion": 2017,
          "Editorial": "Editorial 16",
          "ISBN": "978-6789012345",
          "Paginas": 360,
          "Idioma": "Español",
          "Formato": "Tapa dura",
          "Precio": 29.75
      },
      {
          "Titulo": "Libro 17",
          "Autor": "Autor 17",
          "Genero": "Ficción",
          "AñoPublicacion": 2016,
          "Editorial": "Editorial 17",
          "ISBN": "978-7890123456",
          "Paginas": 280,
          "Idioma": "Inglés",
          "Formato": "Tapa blanda",
          "Precio": 20.50
      },
      {
          "Titulo": "Libro 18",
          "Autor": "Autor 18",
          "Genero": "Misterio",
          "AñoPublicacion": 2022,
          "Editorial": "Editorial 18",
          "ISBN": "978-8901234567",
          "Paginas": 310,
          "Idioma": "Español",
          "Formato": "Tapa dura",
          "Precio": 27.99
      },
      {
          "Titulo": "Libro 19",
          "Autor": "Autor 19",
          "Genero": "Fantasía",
          "AñoPublicacion": 2020,
          "Editorial": "Editorial 19",
          "ISBN": "978-9012345678",
          "Paginas": 330,
          "Idioma": "Inglés",
          "Formato": "Tapa blanda",
          "Precio": 23.75
      },
      {
          "Titulo": "Libro 20",
          "Autor": "Autor 20",
          "Genero": "Historia",
          "AñoPublicacion": 2023,
          "Editorial": "Editorial 20",
          "ISBN": "978-0123456789",
          "Paginas": 300,
          "Idioma": "Español",
          "Formato": "Tapa dura",
          "Precio": 26.99
      },
    {
          "Titulo": "Libro 21",
          "Autor": "Autor 21",
          "Genero": "Aventura",
          "AñoPublicacion": 2022,
          "Editorial": "Editorial 21",
          "ISBN": "978-0987654321",
          "Paginas": 290,
          "Idioma": "Español",
          "Formato": "Tapa blanda",
          "Precio": 22.99
      },
      {
          "Titulo": "Libro 22",
          "Autor": "Autor 22",
          "Genero": "Romance",
          "AñoPublicacion": 2021,
          "Editorial": "Editorial 22",
          "ISBN": "978-9876543210",
          "Paginas": 330,
          "Idioma": "Inglés",
          "Formato": "Tapa dura",
          "Precio": 26.75
      },
      {
          "Titulo": "Libro 23",
          "Autor": "Autor 23",
          "Genero": "Ciencia",
          "AñoPublicacion": 2019,
          "Editorial": "Editorial 23",
          "ISBN": "978-2345678901",
          "Paginas": 320,
          "Idioma": "Español",
          "Formato": "Tapa dura",
          "Precio": 21.99
      },
      {
          "Titulo": "Libro 24",
          "Autor": "Autor 24",
          "Genero": "Ficción",
          "AñoPublicacion": 2020,
          "Editorial": "Editorial 24",
          "ISBN": "978-7654321098",
          "Paginas": 280,
          "Idioma": "Inglés",
          "Formato": "Tapa blanda",
          "Precio": 23.50
      },
      {
          "Titulo": "Libro 25",
          "Autor": "Autor 25",
          "Genero": "Misterio",
          "AñoPublicacion": 2018,
          "Editorial": "Editorial 25",
          "ISBN": "978-3456789012",
          "Paginas": 310,
          "Idioma": "Español",
          "Formato": "Tapa blanda",
          "Precio": 24.50
      },
      {
          "Titulo": "Libro 26",
          "Autor": "Autor 26",
          "Genero": "Fantasía",
          "AñoPublicacion": 2023,
          "Editorial": "Editorial 26",
          "ISBN": "978-4567890123",
          "Paginas": 340,
          "Idioma": "Inglés",
          "Formato": "Tapa dura",
          "Precio": 21.99
      },
      {
          "Titulo": "Libro 27",
          "Autor": "Autor 27",
          "Genero": "Historia",
          "AñoPublicacion": 2017,
          "Editorial": "Editorial 27",
          "ISBN": "978-5678901234",
          "Paginas": 360,
          "Idioma": "Español",
          "Formato": "Tapa dura",
          "Precio": 29.75
      },
      {
          "Titulo": "Libro 28",
          "Autor": "Autor 28",
          "Genero": "Aventura",
          "AñoPublicacion": 2019,
          "Editorial": "Editorial 28",
          "ISBN": "978-6789012345",
          "Paginas": 280,
          "Idioma": "Inglés",
          "Formato": "Tapa blanda",
          "Precio": 20.50
      },
      {
          "Titulo": "Libro 29",
          "Autor": "Autor 29",
          "Genero": "Romance",
          "AñoPublicacion": 2022,
          "Editorial": "Editorial 29",
          "ISBN": "978-8901234567",
          "Paginas": 310,
          "Idioma": "Español",
          "Formato": "Tapa dura",
          "Precio": 27.99
      },
      {
          "Titulo": "Libro 30",
          "Autor": "Autor 30",
          "Genero": "Ciencia",
          "AñoPublicacion": 2020,
          "Editorial": "Editorial 30",
          "ISBN": "978-9012345678",
          "Paginas": 330,
          "Idioma": "Inglés",
          "Formato": "Tapa blanda",
          "Precio": 23.75
      }
    ];

  useEffect(() => {
    const fillJsonShortcut = (e) => {
      if (e.ctrlKey && e.shiftKey && e.code === 'KeyS') {
        e.preventDefault();
        setJsonInput(JSON.stringify(jsonTest, null, 2));
      }
    };

    window.addEventListener('keydown', fillJsonShortcut);

    return () => {
      window.removeEventListener('keydown', fillJsonShortcut);
    };
  }, [jsonTest]);

  return (
    <div className="flex flex-col h-30 md:h-screen bg-slate-400/10 p-4 gap-5 overflow-hidden">
      <textarea
        className="md:h-5/6 h-1/6 bg-white/10 border border-gray-500 p-2 resize-none scrollbar scrollbar-thumb-teal-700 scrollbar-track-slate-700"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Introduce tu JSON aquí"
      >
      </textarea>
      <button
        className="bg-teal-600 hover:bg-teal-700 text-slate-100 font-bold py-2 md:py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-sm l:text-base"
        onClick={handleSubmit}
      >
        Procesar JSON <FontAwesomeIcon icon={faPlay} className="w-5 h-5 md:w-5 md:h-5"/>
      </button>
    </div>
  );
}
