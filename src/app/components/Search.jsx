import React, { useState } from 'react';

export default function Search({ onSearch, columns = [] }) {
  const [selectedColumn, setSelectedColumn] = useState('all');
  const [term, setTerm] = useState('');

  const triggerSearch = () => onSearch(term, selectedColumn);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      triggerSearch();
    }
  };

  const handleColumnChange = (e) => {
    setSelectedColumn(e.target.value);
  };

  return (
    <div className="p-2 flex flex-col md:flex-row gap-2 text-xs md:text-sm items-center justify-center w-full">
      <select
        className="p-2 border border-slate-700 bg-slate-900 text-slate-200 rounded-lg focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30 outline-none min-w-[150px] w-full md:w-auto"
        onChange={handleColumnChange}
        value={selectedColumn}
      >
        <option className="bg-slate-900 text-slate-200" value="all">
          Todas las columnas
        </option>
        {columns &&
          columns.map((column, index) => (
            <option key={index} value={column} className="bg-slate-900 text-slate-200">
              {column}
            </option>
          ))}
      </select>
      <div className="flex items-center gap-2 w-full md:w-auto">
        <input
          type="text"
          className="w-full md:w-80 border border-slate-700 bg-slate-900 text-slate-200 text-center rounded-lg px-3 py-2 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30 outline-none"
          placeholder="Buscar valor..."
          onKeyDown={handleKeyDown}
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        <button
          onClick={triggerSearch}
          className="bg-teal-500 hover:bg-teal-400 text-slate-900 font-semibold px-3 py-2 rounded-lg transition-colors w-full md:w-auto"
          type="button"
        >
          Buscar
        </button>
      </div>
    </div>
  );
}
