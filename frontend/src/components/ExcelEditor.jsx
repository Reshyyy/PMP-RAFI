import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { DataGrid } from '@mui/x-data-grid';

const ExcelEditor = () => {
  const [rows, setRows] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const excelData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      // Generate unique IDs for each row
      const rowsWithIds = excelData.map((row, index) => ({
        id: index, // You can replace 'index' with any unique identifier from your data
        data: row,
      }));

      setRows(rowsWithIds);
    };

    reader.readAsArrayBuffer(file);
  };

  const addRow = () => {
    setRows([...rows, Array(rows[0].data.length).fill('')]);
  };

  const deleteRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const updateCellValue = (rowIndex, columnIndex, value) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex].data[columnIndex] = value;
    setRows(updatedRows);
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.aoa_to_sheet(rows.map(row => row.data));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([excelBuffer], { type: 'application/octet-stream' }), 'data.xlsx');
  };

  const columns = rows.length ? rows[0].data.map((_, index) => ({ key: index, name: `Column ${index + 1}` })) : [];

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      <button onClick={addRow}>Add Row</button>
      <button onClick={exportToExcel}>Export to Excel</button>
      <DataGrid
        rows={rows}
        columns={columns}
        onRowsChange={({ fromRow, toRow, updated }) => {
          for (let i = fromRow; i <= toRow; i++) {
            setRows((prevRows) => {
              const newRows = [...prevRows];
              newRows[i].data = { ...newRows[i].data, ...updated };
              return newRows;
            });
          }
        }}
      />
    </div>
  );
};

export default ExcelEditor;
