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
    <div className="p-4 flex md:flex-row flex-col gap-2">
      <select 
        className="p-2 border border-slate-500 bg-slate-800 text-slate-300 rounded"
        onChange={handleColumnChange}
        value={selectedColumn}
      >
        <option
          className="p-4 md:w-96 w-40 border border-slate-500 bg-slate-800 text-slate-300"
          value="all">Todas las columnas</option>
          {columns && columns.map((column, index) => (
            <option key={index} value={column}>
              {column}
            </option>
          ))}
      </select>
      <input
        type="text"
        className="p-2 md:w-96 w-40 border border-slate-500 bg-slate-800 text-slate-300 text-center rounded"
        placeholder="Buscar en la tabla"
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
