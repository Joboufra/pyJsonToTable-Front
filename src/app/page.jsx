"use client"
import { useState } from 'react';
import JsonInput from './components/jsonInput';
import HtmlTable from './components/htmlTable'; 
import Modal from './components/modal'; 
import NavBar from './components/Navbar';
import Welcome from './components/Welcome';

export default function Home() {
  const [jsonInput, setJsonInput] = useState('');
  const [tableHtml, setTableHtml] = useState('');
  const [filteredTableHtml, setFilteredTableHtml] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');
  const [showNoResultsMessage, setShowNoResultsMessage] = useState(false);
  
  const showModal = (title, content) => {
    setModalTitle(title);
    setModalContent(content);
    setIsModalOpen(true);
  };
  
  // Ejemplo de uso para un error de JSON
  const handleJsonError = (error) => {
    showModal('Error de análisis', 'El JSON no es válido');
  };
  
  const handleSubmit = async () => {
    if (!jsonInput) {
      showModal('Advertencia', 'No se ha proporcionado ningún JSON');
      return;
    }
  
    try {
      const parsedJson = JSON.parse(jsonInput);
      const response = await fetch(process.env.API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'access_token': process.env.API_KEY,
        },
        body: JSON.stringify({ data: parsedJson }),
      });
  
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
  
      const jsonResponse = await response.json();
      const styledTableHtml = addStylesToTable(jsonResponse.html);
      console.log(jsonResponse);
      setTableHtml(styledTableHtml); 
    } catch (error) {
      console.error('Error en la solicitud o en el análisis del JSON');
      handleJsonError(error);
    }
  };  
  
  const addStylesToTable = (html) => {
    //Elemento temporal para aplicar estilos
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    const table = tempDiv.querySelector('table');
    if (table) {
      //Buscar el encabezado que contiene "data" y eliminarlo - Pendiente revisar en back
      const dataTh = Array.from(table.querySelectorAll('th')).find(th => th.textContent.trim() === 'data');
      if (dataTh) {
        dataTh.parentNode.removeChild(dataTh);
      }

      //Aplicar estilos a la tabla
      table.className = 'min-w-full';
      table.querySelectorAll('th').forEach(th => {
        th.className = 'text-center text-xs font-medium text-gray-200 bg-slate-800/50 uppercase tracking-wider border border-gray-600 p-2';
      });
      table.querySelectorAll('td').forEach(td => {
        td.className = 'whitespace-nowrap text-center border border-gray-600 bg-slate-700/50';
      });
    }
    return tempDiv.innerHTML;
  };

  const handleSearch = (searchTerm) => {
    searchTerm = searchTerm.trim();
  
    if (!searchTerm) {
      setFilteredTableHtml(tableHtml);
      setShowNoResultsMessage(false);
      return;
    }
  
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = tableHtml;
    const rows = tempDiv.querySelectorAll('table tr');
    let visibleRows = 0;
  
    rows.forEach(row => {
      const hasTd = row.querySelector('td');
      if (hasTd) {
        const isMatch = Array.from(row.cells).some(cell => cell.textContent.includes(searchTerm));
        row.style.display = isMatch ? '' : 'none';
        if (isMatch) visibleRows++;
      }
    });
  
    setFilteredTableHtml(tempDiv.innerHTML);
    setShowNoResultsMessage(visibleRows === 0);
  };

  const handleClearData = () => {
    setJsonInput('');
    setTableHtml('');

  };

  return (
    <div className="flex flex-col h-screen">
      <header className={`h-16 ${isModalOpen ? 'filter blur-sm' : ''}`}>
        <NavBar 
          showSearch={!!tableHtml}
          onSearch={handleSearch}
          showClearButton={!!tableHtml}
          onClearData={handleClearData}
        />
      </header>
      <div className={`flex flex-row flex-grow overflow-hidden ${isModalOpen ? 'filter blur-sm' : ''}`}>
        <div className="w-1/6">
          <JsonInput
            jsonInput={jsonInput}
            setJsonInput={setJsonInput}
            handleSubmit={handleSubmit}
            isModalOpen={isModalOpen}
          />
        </div>
        <div className="w-5/6">
        {!tableHtml ? (
          <Welcome />
        ) : showNoResultsMessage ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-lg text-slate-400">No se encontraron resultados para tu búsqueda.</p>
          </div>
        ) : (
          <HtmlTable tableHtml={filteredTableHtml || tableHtml} />
        )}
      </div>
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={modalTitle}
          content={modalContent}
        />
      )}
    </div>
  );  
}