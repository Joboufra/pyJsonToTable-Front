export default function Search({ onSearch }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(e.target.value);
    }
  };

  return (
    <div className="p-4">
      <input
        type="text"
        className="p-2 md:w-96 w-40 border border-slate-500 bg-slate-800 text-slate-300 text-center rounded"
        placeholder="Buscar en la tabla"
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}