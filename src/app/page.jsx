"use client";

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
      return Array.from(headers).map((header) => header.textContent.trim());
    };

    if (tableHtml) {
      console.log('Tabla actualizada, se modifican los filtros.');
      setTableColumns(extractColumnNames());
    } else {
      setTableColumns([]);
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
    <div className="flex flex-col gap-3">
      <button onClick={() => handleExport('csv')} className="py-3 px-4 bg-teal-700 text-white rounded-lg hover:bg-teal-600 transition-all">
        Exportar como CSV
      </button>
      <button onClick={() => handleExport('excel')} className="py-3 px-4 bg-emerald-700 text-white rounded-lg hover:bg-emerald-600 transition-all">
        Exportar como Excel
      </button>
    </div>
  );

  function convertTableHtmlToData(html) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const rows = tempDiv.querySelectorAll('table tr');

    const data = Array.from(rows)
      .slice(1)
      .map((row) => Array.from(row.cells).map((cell) => cell.textContent.trim()));

    return data;
  }

  function exportToCsv(data, filename = 'JsonToTable.csv') {
    const csvContent = 'data:text/csv;charset=utf-8,' + data.map((row) => row.join(',')).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function exportToExcel(data, filename = 'JsonToTable.xlsx') {
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'JsonToTable - Joboufra');

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
    console.error(error);
    showModal('Error de analisis', 'El JSON proporcionado no es valido');
  };

  const handleSubmit = async () => {
    if (!jsonInput) {
      showModal('Advertencia', 'No se ha proporcionado ningun JSON');
      return;
    }
    try {
      const parsedJson = JSON.parse(jsonInput);
      const response = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: process.env.NEXT_PUBLIC_API_KEY,
        },
        body: JSON.stringify({ data: parsedJson }),
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const jsonResponse = await response.json();
      const styledTableHtml = addStylesToTable(jsonResponse.html);
      setTableHtml(styledTableHtml);
      setFilteredTableHtml(styledTableHtml);
    } catch (error) {
      console.error('Error en la solicitud o en el analisis del JSON');
      handleJsonError(error);
    }
  };

  const addStylesToTable = (html) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    const table = tempDiv.querySelector('table');
    if (!table) return html;

    // Remove "data" header if present
    const dataTh = Array.from(table.querySelectorAll('th')).find((th) => th.textContent.trim() === 'data');
    if (dataTh) dataTh.parentNode.removeChild(dataTh);

    // Estilos integrados con la paleta actual
    table.className = 'min-w-full text-sm text-slate-100';
    table.querySelectorAll('th').forEach((th) => {
      th.textContent = th.textContent.trim().toUpperCase();
      th.className =
        'text-center text-xs font-semibold text-teal-100 bg-slate-900/80 uppercase tracking-[0.16em] border-b border-slate-700 px-3 py-3 sticky top-0';
    });
    const bodyRows =
      table.querySelectorAll('tbody tr').length > 0
        ? Array.from(table.querySelectorAll('tbody tr'))
        : Array.from(table.querySelectorAll('tr')).slice(1);

    bodyRows.forEach((row, idx) => {
      const isEvenRow = idx % 2 === 0;
      const rowBg = isEvenRow ? 'rgba(15,23,42,0.55)' : 'rgba(12,18,31,0.55)';
      row.style.backgroundColor = rowBg;
      row.style.setProperty('background', rowBg, 'important');
      row.querySelectorAll('td').forEach((td) => {
        td.className = 'whitespace-nowrap text-center border-b border-slate-800 px-3 py-2 text-slate-100';
        td.style.backgroundColor = rowBg;
        td.style.setProperty('background', rowBg, 'important');
      });
    });

    return tempDiv.innerHTML;
  };

  const handleSearch = (searchTerm, selectedColumn) => {
    const term = (searchTerm || '').trim();
    if (!tableHtml) return;

    if (!term) {
      setFilteredTableHtml(tableHtml);
      setShowNoResultsMessage(false);
      return;
    }

    const columnsToUse =
      selectedColumn && selectedColumn !== 'all'
        ? [selectedColumn]
        : tableColumns;

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
          if (index >= headerCells.length) return false;
          const columnName = headerCells[index].textContent.trim();
          const columnAllowed = columnsToUse.length === 0 || columnsToUse.includes(columnName);
          return columnAllowed && cell.textContent.toLowerCase().includes(term.toLowerCase());
        });
        row.style.display = isMatch ? '' : 'none';
        if (isMatch) visibleRows++;
      }
    });

    console.log('Filas que coinciden con la busqueda:', visibleRows);
    setFilteredTableHtml(tempDiv.innerHTML);
    setShowNoResultsMessage(visibleRows === 0);
  };

  const handleClearData = () => {
    setJsonInput('');
    setTableHtml('');
    setFilteredTableHtml('');
    setTableColumns([]);
    setShowNoResultsMessage(false);
  };

  const handleOpenAboutModal = () => {
    setIsAboutModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      <title>JsonToTable</title>
      <meta name="description" content="Transforma tus JSON a representaciones interactivas en formato tabla" />
      <meta property="og:title" content="JsonToTable | jsontotable.joboufra.es" />
      <link rel="canonical" href="https://jsontotable.joboufra.es/" />

      <header className={`h-16 ${isModalOpen ? 'filter blur-sm' : ''}`}>
        <NavBar
          showSearch={!!tableHtml}
          showAbout={!!tableHtml}
          onSearch={handleSearch}
          showClearButton={!!tableHtml}
          onClearData={handleClearData}
          onOpenAboutModal={handleOpenAboutModal}
          onExport={handleOpenExportModal}
          columns={tableColumns}
        />
      </header>

      <main className={`flex-1 ${isModalOpen || isAboutModalOpen || isExportModalOpen ? 'filter blur-sm' : ''}`}>
        <div className="w-full px-4 md:px-8 py-6 md:py-10 flex flex-col gap-6">
          <section className="bg-slate-900/60 border border-slate-700/80 rounded-3xl shadow-2xl backdrop-blur-md px-5 md:px-8 py-6 md:py-8 h-full">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <div className="flex flex-col gap-1">
                <p className="text-sm uppercase tracking-[0.3em] text-teal-200/80">JSON TO TABLE</p>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-50 leading-tight">
                  Convierte tu JSON en una tabla lista para explorar
                </h1>
                <p className="text-slate-300 max-w-3xl">
                  Pega tu JSON aquí: Valida, consulta los datos, filtra y exporta.
                </p>
              </div>
              <div className="flex items-center gap-3" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 h-full">
              <div className="lg:col-span-4">
                <JsonInput
                  jsonInput={jsonInput}
                  setJsonInput={setJsonInput}
                  handleSubmit={handleSubmit}
                />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="lg:col-span-8"
              >
                {!tableHtml ? (
                  <Welcome />
                ) : showNoResultsMessage ? (
                  <div className="flex justify-center items-center h-full rounded-2xl border border-dashed border-slate-700/70 bg-slate-900/50 p-6">
                    <p className="text-lg text-slate-300">No se encontraron resultados para tu busqueda</p>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25 }}
                    className="h-full w-full"
                  >
                    <HtmlTable tableHtml={filteredTableHtml || tableHtml} />
                  </motion.div>
                )}
              </motion.div>
            </div>
          </section>
        </div>
      </main>

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
          title="JsonToTable - v2.0.0 | Jose Boullosa"
          content={
            <>
              <p>
                Todo el codigo de este proyecto se puede consultar en mi repositorio de{' '}
                <a className="text-teal-500 font-bold" target="_blank" href="https://github.com/Joboufra/pyJsonToTable-Front">
                  GitHub
                </a>
              </p>
            </>
          }
        />
      )}
      {isExportModalOpen && (
        <Modal isOpen={isExportModalOpen} onClose={() => setIsExportModalOpen(false)} title="Exportar Datos" content={<div>Selecciona el formato de archivo para exportar:</div>}>
          {exportOptions}
        </Modal>
      )}
    </div>
  );
}
