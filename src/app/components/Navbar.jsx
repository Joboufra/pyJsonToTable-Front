// NavBar.js
import Image from 'next/image';
import Search from './Search';

const NavBar = ({ showSearch, onSearch, showClearButton, onClearData, onOpenAboutModal, columns, onExport }) => {
  return (
    <nav className="sticky top-0 left-0 w-full bg-[#121212] h-16 flex items-center justify-between px-4 border-b-2 border-secondary-500">
        <div className="flex items-center uppercase font-bold">
          <Image 
            src="/logo.webp"
            alt="Logo" 
            width={48}
            height={48}
          /><p className='hidden md:inline text-slate-100'>JSON to Table</p>
        </div>
      {/* Buscador */}
      {showSearch && (
        <div className="flex-grow flex justify-center items-center text-slate-100">
          <Search onSearch={onSearch} columns={columns} />
        </div>
      )}
      {/* Botón de modal 'Sobre la app' */}
      <button
        onClick={onOpenAboutModal}
        className="text-white hover:text-teal-400 bg-transparent font-xs py-1 px-2 rounded hidden xl:inline"
      >
        Sobre la app
      </button>

       {/* Botón para exportar datos */}
          {showClearButton && (
            <button
              onClick={onExport}
              className="bg-green-700 hover:bg-green-600 text-slate-100 md:text-base text-xs font-semibold p-2 scale-90 sm:w-10 sm:scale-50 md:scale-90 md:w-44 rounded flex items-center justify-center md:gap-2"
              
            >
              Exportar
            </button>
          )}

          {/* Botón para limpiar datos */}
          {showClearButton && (
            <button
              className="bg-red-700 hover:bg-red-600 text-slate-100 md:text-base text-xs font-semibold p-2 scale-90 sm:w-10 sm:scale-50 md:scale-90 md:w-44 rounded flex items-center justify-center md:gap-2"
              onClick={onClearData}
            >
              Limpiar datos
            </button>
          )}
    </nav>
  );
};

export default NavBar;
