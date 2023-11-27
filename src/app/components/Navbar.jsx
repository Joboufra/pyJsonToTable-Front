// NavBar.js
import Image from 'next/image';
import Link from 'next/link';
import Search from './Search';


const NavBar = ({ showSearch, onSearch, showClearButton, onClearData }) => {
  return (
    <nav className="sticky top-0 left-0 w-full bg-[#121212] h-16 flex justify-between items-center px-4 border-b-2 border-secondary-500">
      <Link href="/" passHref>
        <div className="flex items-center uppercase font-bold">
          <Image 
            src="/logo.webp"
            alt="Logo" 
            width={48}
            height={48}
          />JSON to Table
        </div>
      </Link>

      {/* Buscador, que aparece solo si showSearch es true */}
      {showSearch && (
        <div className="flex-grow flex justify-center items-center">
          <Search onSearch={onSearch} />
        </div>
      )}

      {/* Botón para limpiar datos, visible solo si hay datos cargados */}
      {showClearButton && (
        <button
          className="bg-red-700 hover:bg-red-600 text-slate-100 font-semibold p-2 w-44 rounded flex items-center justify-center gap-2"
          onClick={onClearData}
        >
          Limpiar datos
        </button>
      )}
    </nav>
  );
};

export default NavBar;
