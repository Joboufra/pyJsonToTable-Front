// NavBar.js
import Image from 'next/image';
import Search from './Search';

const NavBar = ({ showSearch, showAbout = true, onSearch, showClearButton, onClearData, onOpenAboutModal, columns, onExport }) => {
  const isMinimal = !showSearch && !showClearButton;

  return (
    <nav className="sticky top-0 left-0 w-full bg-slate-950/70 backdrop-blur-xl border-b border-slate-800/80 z-30 px-4 md:px-6 py-2">
      <div
        className={`flex flex-col md:flex-row items-center md:items-center ${isMinimal ? 'justify-center text-center' : 'md:justify-between'} gap-2 md:gap-4`}
      >
        <div className="flex items-center gap-3 uppercase font-bold text-slate-100 tracking-[0.14em] whitespace-nowrap">
          <Image src="/logo.webp" alt="Logo" width={40} height={40} />
          <p>JSON to Table</p>
        </div>

        {showSearch && (
          <div className="w-full md:flex-grow flex justify-center items-center text-slate-100 max-w-4xl">
            <Search onSearch={onSearch} columns={columns} />
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto">
          {showAbout && (
            <button
              onClick={onOpenAboutModal}
              className="text-white hover:text-teal-400 bg-transparent text-xs py-1 px-2 rounded transition-colors w-full sm:w-auto whitespace-nowrap"
            >
              Sobre la app
            </button>
          )}

          {showClearButton && (
            <button
              onClick={onExport}
              className="bg-emerald-600 hover:bg-emerald-500 text-slate-50 text-xs md:text-sm font-semibold px-3 py-2 rounded-lg flex items-center justify-center md:gap-2 transition-colors w-full sm:w-auto whitespace-nowrap"
            >
              Exportar
            </button>
          )}

          {showClearButton && (
            <button
              className="bg-rose-600 hover:bg-rose-500 text-slate-50 text-xs md:text-sm font-semibold px-3 py-2 rounded-lg flex items-center justify-center md:gap-2 transition-colors w-full sm:w-auto whitespace-nowrap"
              onClick={onClearData}
            >
              Limpiar
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
