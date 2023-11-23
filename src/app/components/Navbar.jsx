import React from 'react';
import Search from './Search'; // Asegúrate de importar el componente Search
import Link from 'next/link';

const NavBar = ({ showSearch, onSearch }) => {
  return (
    <nav className="sticky top-0 left-0 w-full bg-[#121212] h-16 flex justify-between items-center px-4 border-b-2 border-secondary-500">
      <Link href={"/"} className='text-white font-semibold'>
        Logo
      </Link>

      {/* Buscador, que aparece solo si showSearch es true */}
      {showSearch && (
        <div className="flex-grow flex justify-center items-center">
          <Search onSearch={onSearch} />
        </div>
      )}

      {/* Ejemplo de otros elementos del NavBar a la derecha */}
      <div className='menu flex'>
        <ul className='flex items-center space-x-5'>
          <li>
            <Link href="#tabla" className="text-white font-medium">
              Tabla de datos
            </Link>
          </li>
          <li>
            <Link href="#estructura" className="text-white font-medium">
              Estructura
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
