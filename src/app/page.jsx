"use client"
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import JsonInput from './components/jsonInput';
import HtmlTable from './components/htmlTable'; 
import Modal from './components/modal'; 
import NavBar from './components/Navbar';
import Welcome from './components/Welcome';
import * as XLSX from 'xlsx';

export default function Home() {
  const [jsonInput, setJsonInput] = useState('');
  const [tableHtml, setTableHtml] = useState('');
  const [filteredTableHtml, setFilteredTableHtml] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');
  const [showNoResultsMessage, setShowNoResultsMessage] = useState(false);
  const [tableColumns, setTableColumns] = useState([]);
 

  useEffect(() => {
    const extractColumnNames = () => {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = tableHtml;
      const headers = tempDiv.querySelectorAll('table tr th');
      const columnNames = Array.from(headers).map(header => header.textContent.trim());
      return columnNames;
    };

    if (tableHtml) {
      console.log("tableHtml actualizado, extrayendo nombres de columna...");
      setTableColumns(extractColumnNames());
    }
  }, [tableHtml]);

  const showModal = (title, content) => {
    setModalTitle(title);
    setModalContent(content);
    setIsModalOpen(true);
  };
  
  const handleOpenExportModal = () => {
    setIsExportModalOpen(true);
  };

  const exportOptions = (
    <p className="flex justify-between flex-row mb-5">
      <button onClick={() => handleExport('csv')} className="py-2 px-4 bg-cyan-700 text-white rounded hover:bg-cyan-800">Exportar como CSV</button>
      <button onClick={() => handleExport('excel')} className="py-2 px-4 bg-green-700 text-white rounded hover:bg-green-800" >Exportar como Excel</button>
    </p>
  );

  function convertTableHtmlToData(html) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const rows = tempDiv.querySelectorAll('table tr');
    
    const data = Array.from(rows).slice(1).map(row => {
      return Array.from(row.cells).map(cell => cell.textContent.trim());
    });
  
    return data;
  }

  function exportToCsv(data, filename = 'JsonToTable.csv') {
    const csvContent = "data:text/csv;charset=utf-8," 
      + data.map(row => row.join(",")).join("\n");
  
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link); // Necesario para FF
    link.click();
    document.body.removeChild(link);
  }
  
  function exportToExcel(data, filename = 'JsonToTable.xlsx') {
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "JsonToTable - Joboufra");
    
    XLSX.writeFile(workbook, filename);
  }

const handleExport = (format) => {
  const data = convertTableHtmlToData(tableHtml);

  if (format === 'csv') {
    exportToCsv(data);
  } else if (format === 'excel') {
    exportToExcel(data);
  }

  setIsExportModalOpen(false);
}; 

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
      const response = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': process.env.NEXT_PUBLIC_API_KEY,
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

  const handleSearch = (searchTerm, selectedColumns) => {
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
  
    rows.forEach((row, rowIndex) => {
      if (rowIndex === 0) return; 
      const cells = row.querySelectorAll('td');
      if (cells.length > 0) {
        const headerCells = row.parentNode.rows[0].cells;
        const isMatch = Array.from(cells).some((cell, index) => {
          if (index >= headerCells.length) {
            return false;
          }
          const columnName = headerCells[index].textContent.trim();
          const cellMatch = selectedColumns.includes(columnName) && cell.textContent.includes(searchTerm);
          return cellMatch;
        });
        row.style.display = isMatch ? '' : 'none';
        if (isMatch) visibleRows++;
      }
    });
  
    console.log("Filas que coinciden con la búsqueda:", visibleRows);
    setFilteredTableHtml(tempDiv.innerHTML);
    setShowNoResultsMessage(visibleRows === 0);
  };
  
  const handleClearData = () => {
    setJsonInput('');
    setTableHtml('');
  };

  const handleOpenAboutModal = () => {
    setIsAboutModalOpen(true);
  };

  return (
    <div className="flex flex-col h-screen">
      <title>JsonToTable</title>
        <meta name="description" content="Transforma tus JSON a representaciones interactivas en formato tabla" />
        <meta property="og:title" content="JsonToTable | jsontotable.joboufra.es" />
        <link rel="canonical" href="https://jsontotable.joboufra.es/" />
      <header className={`h-16 ${isModalOpen ? 'filter blur-sm' : ''}`}>
        <NavBar
          showSearch={!!tableHtml}
          onSearch={handleSearch}
          showClearButton={!!tableHtml}
          onClearData={handleClearData}
          onOpenAboutModal={handleOpenAboutModal}
          onExport={handleOpenExportModal}
          columns={tableColumns}
        />
      </header>
    <div className={`flex flex-col md:flex-row md:flex-grow md:overflow-hidden ${isModalOpen || isAboutModalOpen || isExportModalOpen ? 'filter blur-sm' : ''}`}>
      <div className="md:w-1/6 w-full">
        <JsonInput
          jsonInput={jsonInput}
          setJsonInput={setJsonInput}
          handleSubmit={handleSubmit}
          isModalOpen={isModalOpen}
          onOpenAboutModal={handleOpenAboutModal}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="w-full md:w-5/6"
      >
        {!tableHtml ? (
          <Welcome />
        ) : showNoResultsMessage ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-lg text-slate-400">No se encontraron resultados para tu búsqueda.</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="h-full w-full"
          >
            <HtmlTable tableHtml={filteredTableHtml || tableHtml} />
          </motion.div>
        )}
      </motion.div>
    </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={modalTitle}
          content={modalContent}
        />
      )}
      {isAboutModalOpen && (
        <Modal
          isOpen={isAboutModalOpen}
          isModalOpen={isModalOpen}
          onClose={() => setIsAboutModalOpen(false)}
          
          title="JsonToTable - v1.3.0 | Jose Boullosa"
          content={
            <>
              <p>Todo el código de este proyecto se puede consultar en mi repositorio de <a className='text-teal-500 font-bold' target="_blank" href='https://github.com/Joboufra/pyJsonToTable-Front'>GitHub</a></p>
            </>
          }
        />
      )}
      {isExportModalOpen && (
          <Modal
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
          title="Exportar Datos"
          content={<div>Selecciona el formato de archivo para exportar:</div>}
        >
          {exportOptions}
        </Modal>
      )}
    </div>
  );
}