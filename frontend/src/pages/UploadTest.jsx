import React, { useState } from "react";
import * as XLSX from 'xlsx';
import { Box, Button } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';

const UploadTest = () => {
    const [excelFile, setExcelFile] = useState(null);
    const [typeError, setTypeError] = useState(null);
    const [excelData, setExcelData] = useState([]);
    const [columns, setColumns] = useState([]); // State for dynamic columns
    const [rows, setRows] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});

    const handleFile = (e) => {
        let fileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile && fileTypes.includes(selectedFile.type)) {
                setTypeError(null);
                let reader = new FileReader();
                reader.readAsArrayBuffer(selectedFile);
                reader.onload = (e) => {
                    setExcelFile(e.target.result);
                }
            }
            else {
                setTypeError('Please select only excel file types');
                setExcelFile(null);
            }
        }
        else {
            console.log('Please select your file');
        }
    }

    const handleFileSubmit = (e) => {
        e.preventDefault();
        if (excelFile !== null) {
            const workbook = XLSX.read(excelFile, { type: 'buffer' });
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);
            setExcelData(data.slice(0, 10).map((row, index) => ({ ...row, id: index + 1 })));

            // Create columns dynamically based on keys in the first row of the Excel data
            const firstRowKeys = Object.keys(data[0]);
            const dynamicColumns = firstRowKeys.map(key => ({
                field: key,
                headerName: key,
                width: 150,
                editable: true,
            }));

            // Add the "Actions" column dynamically
            dynamicColumns.push({
                field: 'actions',
                headerName: 'Actions',
                width: 150,
                cellClassName: 'actions',
                getActions: ({ id }) => [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />
                ],
            });

            setColumns(dynamicColumns);
        }
    };

    const generateRandom = () => {
        const length = 8;
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let retVal = "";
        for (let i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }

    const handleEditCellChange = (editCell) => {
        const updatedData = excelData.map((row) =>
            row.id === editCell.id ? { ...row, [editCell.field]: editCell.props.value } : row
        );
        setExcelData(updatedData);
    };

    const handleRowSelectionChange = (newSelection) => {
        setSelectedRowIds(newSelection.selectionModel);
    };

    const handleDeleteRows = () => {
        const updatedData = excelData.filter(row => !selectedRowIds.includes(row.id));
        setExcelData(updatedData);
        setSelectedRowIds([]);
    };

    const handleAddRow = () => {
        const newId = excelData.length > 0 ? excelData[excelData.length - 1].id + 1 : 1;
        const newRow = { id: newId };
        setExcelData([...excelData, newRow]);
    };

    return (
        <div className="wrapper">
            <h3>Upload & View Excel Sheets</h3>
            <form className="form-group custom-form" onSubmit={handleFileSubmit}>
                <input type="file" className="form-control" required onChange={handleFile} />
                <button type="submit" className="btn btn-success btn-md">UPLOAD</button>
                {typeError && (
                    <div className="alert alert-danger" role="alert">{typeError}</div>
                )}
            </form>
            <div className="viewer">
                <Box sx={{ height: 500, width: '100%', backgroundColor: 'white', borderRadius: 1 }}>
                    <DataGrid
                        rows={excelData}
                        columns={excelData.length > 0 ? Object.keys(excelData[0]).map((key) => ({
                            field: key,
                            headerName: key,
                            width: 150,
                            editable: true,
                        })) : []}
                        pageSize={5}
                        getRowId={(row) => row.id}
                        onEditCellChange={handleEditCellChange}
                        checkboxSelection
                        selectionModel={selectedRowIds}
                        onSelectionModelChange={handleRowSelectionChange}
                        options={{ exportButton: true }}
                    />
                </Box>
                <Button onClick={handleDeleteRows}>Delete Selected Rows</Button>
                <Button onClick={handleAddRow}>Add Row</Button>
            </div>
        </div>
    )
}

export default UploadTest;
