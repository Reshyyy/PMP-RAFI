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
import { FormControl, InputLabel, MenuItem, Modal, Select, Stack, Tab, TextField } from '@mui/material';
import axios from 'axios';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ModalAddCOmponent from './ModalAddComponent';
import RefreshIcon from '@mui/icons-material/Refresh';
import ModalUpdateComponent from './ModalUpdateComponent';
import ModalViewHistoryComponent from './ModalViewHistoryComponent';

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

    const [records, setRecords] = useState([]);

    const fetchUpdatedData = () => {
        axios.get('http://20.188.123.92:82/ProcurementManagement/Planning/Filter?page=1')
            .then(response => {
                // Transform the values in the 'targetDateNeed' field into Date objects
                const transformedRows = response.data.map(row => ({
                    ...row,
                    targetDateNeed: new Date(row.targetDateNeed),
                }));
                // Update state with transformed data
                setRows(transformedRows);
            })
            .catch(error => {
                setError(error); // Handle any errors
            });
    }
    const handleRefreshButton = () => {
        fetchUpdatedData();
    }

    return (
        <Stack flexDirection='row'>
            <GridToolbarContainer>
                {/* <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                    Add record
                </Button> */}

                {/* <Button variant='outlined' sx={{
                    position: 'absolute',
                    top: '-53px',
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
                }} color="primary" startIcon={<ArrowUpwardIcon onClick={handleUploadClick}/>}>
                    Upload
                </Button> */}

                <Button color="primary" startIcon={<RefreshIcon />} onClick={handleRefreshButton}>
                    Refresh
                </Button>

                <GridToolbarExport
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
    const [rowModesModel, setRowModesModel] = useState({});

    const apiRef = React.useRef(null);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        border: '1px solid #000',
        boxShadow: 24,
        p: 4,
    };

    // State for storing fetched types
    const [types, setTypes] = useState([]);
    const mapBooleanToYesNo = (boolValue) => {
        return boolValue ? "Yes" : "No";
    }
    const [currentRow, setCurrentRow] = useState(null);


    const [records, setRecords] = useState([])
    useEffect(() => {
        const fetchRecords = () => {
            axios.get('http://20.188.123.92:82/ProcurementManagement/Planning/Filter?page=1')
                .then(response => {
                    // Transform the values in the 'targetDateNeed' field into Date objects
                    const transformedRows = response.data.map(row => ({
                        ...row,
                        targetDateNeed: new Date(row.targetDateNeed),
                    }));
                    // Update state with transformed data
                    setRows(transformedRows);
                })
                .catch(error => {
                    setError(error); // Handle any errors
                });
        }
        fetchRecords();

        axios.get('http://20.188.123.92:82/ProcurementManagement/Planning/Type')
            .then(response => {
                // If the request is successful, extract type data from the response
                const fetchedTypes = response.data;
                // Set the fetched types to the state
                setTypes(fetchedTypes);
            })
            .catch(error => {
                console.error(error); // Handle any errors
            });

    }, []);

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const [dataToUpdate, setDataToUpdate] = useState(null)
    const fetchData = () => {
        axios.get('http://20.188.123.92:82/ProcurementManagement/Planning/Filter')
            .then((res) => {
                setDataToUpdate(res.data)
                console.log('fetched data', dataToUpdate)
            })
            .catch((err) => {
                console.error(err)
            })
    }

    useEffect(() => {
        fetchData()
    }, [])

    

    const handleEditClick = (id) => () => {
        setIsModalOpen(true);
        fetchData();

        let row = apiRef.current.getRowWithUpdatedValues(id)
        setCurrentRow(row);

        console.log('Selected ID', id)
        axios.get('http://20.188.123.92:82/ProcurementManagement/Planning/Type')
            .then(response => {
                // If the request is successful, extract type data from the response
                const fetchedTypes = response.data;
                // Set the fetched types to the state
                setTypes(fetchedTypes);
                console.log('fetched types', fetchedTypes)
            })
            .catch(error => {
                console.error(error); // Handle any errors
            });

        // Update the row mode to Edit mode
        // setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {

        console.log('selected ID', id)

        let row = apiRef.current.getRowWithUpdatedValues(id)
        console.log(row)

        const formData = {
            planningId: id,
            description: row.description,
            specifcation: row.specifcation,
            type: row.type,
            businessUnit: row.businessUnit,
            recurring: Boolean(row.recurring),
            quantity: parseInt(row.quantity),
            totalEstAmt: parseFloat(row.totalEstAmt),
            finDim: row.finDim,
            targetDateNeed: new Date(row.targetDateNeed).toISOString().substring(0, 10) // Format: YYYY-MM-DD
        };

        axios.put('http://20.188.123.92:82/ProcurementManagement/Planning/Update', formData)
            .then(response => {
                console.log('Update Successful:', response.data);
                // Set the row mode to View mode for the edited row
                setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
            })
            .catch(error => {
                console.error('Error update:', error);
                // Handle errors here, such as displaying an error message to the user
            })
        // setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const [tabVal, setTabVal] = React.useState('2');

    const handleTabChange = (event, newValue) => {
        setTabVal(newValue);
    };

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    const handleViewModalOpen = () => {
        console.log('clicked')
        setIsViewModalOpen(true);
    };

    const handleViewModalClose = () => {
        setIsViewModalOpen(false);
    }

    const handleModalOpen = () => {
        console.log('clicked')
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    

    const handleViewClick = (id) => () => {
        console.log('Viewing row:');
        setIsViewModalOpen(true);
        // You can perform any additional actions here, such as displaying a modal with row details
    };

    const handleDeleteClick = (id) => () => {
        console.log('Deleted Data with ID', id)
        axios.delete(`http://20.188.123.92:82/ProcurementManagement/Planning/Cancel/${id}`)
            .then(res => {
                setRows(rows.filter((row) => row.id !== id));
            })
            .catch(error => {
                console.error(error);
            })

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
        { field: 'description', headerName: 'Description', width: 200, editable: false },
        {
            field: 'specifcation',
            headerName: 'Specs',
            width: 150,
            align: 'left',
            headerAlign: 'left',
            editable: false,
        },
        {
            field: 'type',
            headerName: 'Type',
            type: 'singleSelect',
            valueOptions: types.map((type) => {
                return type.Name
            }),
            width: 120,
            editable: false,
        },
        {
            field: 'businessUnit',
            headerName: 'Business Unit',
            type: 'singleSelect',
            valueOptions: ['ASD', 'QWE', 'ZXC'],
            width: 120,
            editable: false,
        },
        {
            field: 'recurring',
            headerName: 'Recurring',
            type: 'singleSelect',
            valueOptions: ['No', 'Yes'],
            width: 120,
            editable: false,
            valueGetter: (params) => params.value ? 'Yes' : 'No'
        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            type: 'number',
            width: 100,
            align: 'left',
            headerAlign: 'left',
            editable: false,
        },
        {
            field: 'totalEstAmt',
            headerName: 'Total Estimated Amount',
            type: 'number',
            width: 150,
            align: 'left',
            headerAlign: 'left',
            editable: false,
        },
        {
            field: 'finDim',
            headerName: 'Main Account',
            width: 150,
            align: 'left',
            headerAlign: 'left',
            editable: false,
        },
        {
            field: 'targetDateNeed',
            headerName: 'Target Date',
            type: 'date',
            width: 120,
            editable: false,
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
                        onClick={handleViewClick(id)}
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
                checkboxSelection
                editMode="row"
                getRowId={(row) => row.planningId}
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slots={{
                    toolbar: EditToolbar
                }}
                slotProps={{
                    toolbar: { setRows, setRowModesModel },
                }}
                apiRef={apiRef}
                sx={{
                    '@media print': {
                        '.MuiDataGrid-main': { color: 'rgba(0, 0, 0, 0.87)' },
                    },
                    bgcolor: 'white'
                }}
            />


            {/* <ModalAddCOmponent open={isModalOpen} setIsModalOpen={setIsModalOpen} onClose={handleModalClose} currentRow={currentRow} /> */}
            <ModalUpdateComponent open={isModalOpen} setIsModalOpen={setIsModalOpen} onClose={handleModalClose} currentRow={currentRow} />
            <ModalViewHistoryComponent open={isViewModalOpen} setIsViewModalOpen={setIsViewModalOpen} onClose={handleViewModalClose} />
        </Box>


    );
}

export default FullFeaturedCrudGrid