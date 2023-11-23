import Image from 'next/image';
import Link from 'next/link';
import Search from './Search';

const NavBar = ({ showSearch, onSearch }) => {
  return (
    <nav className="sticky top-0 left-0 w-full bg-[#121212] h-16 flex justify-between items-center px-4 border-b-2 border-secondary-500">
      <Link href="/" passHref>
        <div className="flex items-center uppercase font-bold">
          <Image 
            src="/jsonToTable.webp"
            alt="Logo" 
            width={50}
            height={20}
          />JSON to Table
        </div>
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
            <Link href="/" className="text-white font-medium uppercase">
              Tabla de datos
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
