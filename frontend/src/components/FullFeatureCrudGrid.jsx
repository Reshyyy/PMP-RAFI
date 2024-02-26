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

    const apiRef = useGridApiContext(0);

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

    return (
        <Stack flexDirection='row' position="absolute" top='-53px'>
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

const FullFeaturedCrudGrid = () => {
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

export default FullFeaturedCrudGrid