import React, { useState } from 'react';

export default function Search({ onSearch, columns = [] }) {
  const [selectedColumn, setSelectedColumn] = useState('all');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(e.target.value, selectedColumn);
    }
  };

  const handleColumnChange = (e) => {
    setSelectedColumn(e.target.value);
  };

  return (
    <div className="p-4 flex flex-column md:flex-row gap-2 text-xs md:text-base ">
      <select 
        className="p-2 border border-slate-500 bg-slate-800 text-slate-300 rounded"
        onChange={handleColumnChange}
        value={selectedColumn}
      >
        <option
          className="border border-slate-500 bg-slate-800 text-slate-300"
          value="">Seleccionar columna</option>
          {columns && columns.map((column, index) => (
            <option key={index} value={column}>
              {column}
            </option>
          ))}
      </select>
      <input
        type="text"
        className="md:w-96 w-20 border border-slate-500 bg-slate-800 text-slate-300 text-center rounded"
        placeholder="Buscar"
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
