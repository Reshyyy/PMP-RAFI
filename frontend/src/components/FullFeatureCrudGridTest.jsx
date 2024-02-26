import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import RemoveRedEyeSharpIcon from '@mui/icons-material/RemoveRedEyeSharp';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
    useGridApiContext,
    GridToolbar,
    GridToolbarExport
} from '@mui/x-data-grid';
import {
    randomCreatedDate,
    randomTraderName,
    randomId,
    randomArrayItem,
} from '@mui/x-data-grid-generator';
import { Stack } from '@mui/material';

const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => {
    return randomArrayItem();
};

const EditToolbar = (props) => {
    const { setRows, setRowModesModel } = props;
    const [excelData, setExcelData] = useState(null);

    const apiRef = useGridApiContext(0);

    // upload
    const [typeError, setTypeError] = useState(null);
    const [excelFile, setExcelFile] = useState(null);
    const handleFileUpload = (e) => {
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

    const test = () => {
        const excel_file = document.querySelector('.excel_file');
        excel_file.addEventListener('change', (event) => {
            var reader = new FIleReader();
            reader.readAsArrayBuffer(event.target.files[0]);
            reader.onload = function(event){
                var data = new Uint8Array(reader.result);
                var work_book = XLSX.read(data, {type: 'array'});
                var sheet_name = work_book.SheetNames;
                var sheet_data = XLSX.utils.sheet_to.json(work_book.Sheets[sheet_name[0]], {header:1});

                if(sheet_data.length > 0){
                    var table_output = '<table class="table table-striped table-bordered">';
                    for(var row = 0; row<sheet_data.length; roww++){
                        table_output += '<tr>';
                        
                        for(var cell = 0; cell < sheet_data[row].length; cell++){
                            table_output += '<td>' + sheet_data[row][cell]+'</td>';
                        }

                        table_output += '</tr>';
                    }
                    table_output += '</table>'
                    document.getElementById('excel_data').innerHTML = table_output;
                }
            }
        })
    }

    // Add Record
    const handleClick = () => {
        const id = randomId();
        setRows((oldRows) => [...oldRows, { id, description: '', specs: '', type: '', qty: '', total: '', finDim: '', targetDate: '', recurring: '', isNew: true }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'description' },
        }));
    };

    const handleExportClick = () => {
        apiRef.current.exportDataAsCsv();
    };

    const handleUploadClick = () => {
        e.preventDefault();
        if (excelFile !== null) {
            const workbook = XLSX.read(excelFile, { type: 'buffer' });
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);
            setExcelData(data.slice(0, 10).map((row, index) => ({ ...row, id: index + 1 })));
        }

        if (excelData) {
            const id = randomId();
            const rowsFromExcel = excelData.map((row, index) => ({
                id: id + index, // Use a unique identifier for each row
                description: row[0] || '', // Assuming the first column contains description
                specs: row[1] || '', // Assuming the second column contains specs
                type: row[2] || '', // Assuming the third column contains type
                qty: row[3] || '', // Assuming the fourth column contains quantity
                total: row[4] || '', // Assuming the fifth column contains total
                finDim: row[5] || '', // Assuming the sixth column contains financial dimension
                targetDate: row[6] || '', // Assuming the seventh column contains target date
                recurring: row[7] || '', // Assuming the eighth column contains recurring
                isNew: true
            }));
            setRows((oldRows) => [...oldRows, ...rowsFromExcel]);
            setExcelData(null); // Reset excelData state after upload
        }
    };

    return (
        <Stack flexDirection='row'>
            <GridToolbarContainer>
                <Button variant='outlined' sx={{
                    backgroundColor: '#f6e05e',
                    '&:hover': {
                        backgroundColor: '#90cdf4',
                    },
                    color: '#1a202c',
                    fontWeight: 'bold',
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    display: 'inline-flex',
                    alignItems: 'center',
                }} color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                    Add record
                </Button>

                <Stack>
                    <input type="file" id='excel_file' />
                </Stack>
                <Button variant='outlined' sx={{
                    backgroundColor: '#f6e05e',
                    '&:hover': {
                        backgroundColor: '#90cdf4',
                    },
                    color: '#1a202c',
                    fontWeight: 'bold',
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    display: 'inline-flex',
                    alignItems: 'center',
                }} color="primary" startIcon={<ArrowUpwardIcon onClick={handleUploadClick} />}>
                    Upload
                </Button>

                <GridToolbarExport
                    variant='outlined'
                    sx={{
                        backgroundColor: '#f6e05e',
                        '&:hover': {
                            backgroundColor: '#90cdf4',
                        },
                        color: '#1a202c',
                        fontWeight: 'bold',
                        padding: '8px 16px',
                        borderRadius: '9999px',
                        display: 'inline-flex',
                        alignItems: 'center',
                    }}
                    csvOptions={{
                        fileName: 'PMP',
                        utf8WithBom: true,
                    }}
                    printOptions={{
                        hideFooter: true,
                        hideToolbar: true,
                    }}

                />
            </GridToolbarContainer >
        </Stack>
    );
}

const FullFeaturedCrudGridTest = () => {
    const [rows, setRows] = React.useState([]);
    const [rowModesModel, setRowModesModel] = React.useState({});

    const apiRef = React.useRef(null);

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleViewClick = (id) => () => {
        // Implement your logic here for handling the view action
        const row = rows.find((row) => row.id === id);
        console.log('Viewing row:', row);
        // You can perform any additional actions here, such as displaying a modal with row details
    };

    const handleDeleteClick = (id) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns = [
        { field: 'description', headerName: 'Description', width: 200, editable: true },
        {
            field: 'specs',
            headerName: 'Specs',
            width: 150,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
        {
            field: 'type',
            headerName: 'Type',
            type: 'singleSelect',
            valueOptions: ['Market', 'Finance', 'Development'],
            width: 120,
            editable: true,
        },
        {
            field: 'qty',
            headerName: 'Quantity',
            type: 'number',
            width: 100,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
        {
            field: 'total',
            headerName: 'Total Estimated Amount',
            type: 'number',
            width: 150,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
        {
            field: 'finDim',
            headerName: 'Financial Dimension',
            width: 150,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
        {
            field: 'targetDate',
            headerName: 'Target Date',
            type: 'date',
            width: 120,
            editable: true,
        },
        {
            field: 'recurring',
            headerName: 'Recurring',
            type: 'singleSelect',
            valueOptions: ['No', 'Yes'],
            width: 120,
            editable: true,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 150,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<RemoveRedEyeSharpIcon />}
                        label="View"
                        onClick={handleViewClick(id)} // Define a function to handle the view action
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />
                ];
            },
        },
    ];

    return (
        <Box
            sx={{
                height: 500,
                width: '100%',
                '& .actions': {
                    color: 'text.secondary',
                },
                '& .textPrimary': {
                    color: 'text.primary',
                },

            }}
        >
            <DataGrid
                rows={rows}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slots={{
                    toolbar: EditToolbar, GridToolbar
                }}
                slotProps={{
                    toolbar: { setRows, setRowModesModel, apiRef },
                }}
                apiRef={apiRef}
                sx={{
                    '@media print': {
                        '.MuiDataGrid-main': { color: 'rgba(0, 0, 0, 0.87)' },
                    },
                    bgcolor: 'white'
                }}
            />
        </Box>
    );
}

export default FullFeaturedCrudGridTest