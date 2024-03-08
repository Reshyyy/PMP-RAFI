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
import FilterListIcon from '@mui/icons-material/FilterList';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
    useGridApiContext,
    GridToolbar,
    GridToolbarExport,
    GridToolbarFilterButton
} from '@mui/x-data-grid';
import {
    randomCreatedDate,
    randomTraderName,
    randomId,
    randomArrayItem,
} from '@mui/x-data-grid-generator';
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, MenuItem, Modal, Select, Stack, Tab, TextField } from '@mui/material';
import axios from 'axios';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ModalAddCOmponent from './ModalAddComponent';
import RefreshIcon from '@mui/icons-material/Refresh';
import ModalUpdateComponent from './ModalUpdateComponent';
import ModalViewHistoryComponent from './ModalViewHistoryComponent';
import SearchIcon from "@mui/icons-material/Search";
import { useMsal } from '@azure/msal-react';

const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => {
    return randomArrayItem();
};

const EditToolbar = (props) => {
    const { setRows, setRowModesModel, userDeptInfo } = props;
    const apiRef = useGridApiContext(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const [records, setRecords] = useState([]);
    const asd = localStorage.getItem('userInfo') != null ? JSON.parse(localStorage.getItem('userInfo')) : ''
    const fetchUpdatedData = () => {
        axios.get(`http://20.188.123.92:82/ProcurementManagement/Planning/Filter?&Department=${asd.DefaultDepartment}&page=1`)
            .then(response => {
                // Transform the values in the 'targetDateNeed' field into Date objects
                const transformedRows = response.data.map(row => ({
                    ...row,
                    targetDateNeed: new Date(row.targetDateNeed),
                }));
                setRows(transformedRows);
            })
            .catch(error => {
                setError(error); // Handle any errors
            });
    }

    const handleRefreshButton = async () => {
        fetchUpdatedData();
    }

    const [bUnit, setBUnit] = useState(asd.DefaultDepartment);
    const [gridData, setGridData] = useState([]);

    const handleUnitsDropdown = async (e) => {
        const selectedValue = e.target.value;
        setBUnit(selectedValue)

        // Make API call to fetch data based on selected value
        try {
            const response = await fetch(`http://20.188.123.92:82/ProcurementManagement/Planning/Filter?Search=${searchTerm}&Department=${selectedValue}&page=1`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            // Convert 'targetDateNeed' field to Date objects
            const modifiedData = data.map(row => ({
                ...row,
                targetDateNeed: new Date(row.targetDateNeed)
            }));

            setRows(modifiedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const [units, setUnits] = useState([]);
    const fetchBU = async () => {
        const accessToken = localStorage.getItem('accessToken');

        const formData = {
            "RAFIPayIntegration":
            {
                "TargetFinDim": "Department",
                "LegalEntity": "RAFI",
                "CurBusinessUnit": "ITU",
                "EmployeeID": "ID000005606"
            }
        }
        try {
            const res = await axios.post('/api/services/RAFIPAYIntegration/RAFIPAYJournalAPI/GetFinancialDimensionList', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                }
            })
            const fetchedUnits = res.data.FinancialDimensionValues;
            setUnits(fetchedUnits)
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        fetchBU();
    }, [])

    // const handleSearch = async () => {
    //     try {
    //         const response = await fetch(`http://20.188.123.92:82/ProcurementManagement/Planning/Filter?Search=${searchTerm}&Department=${asd.DefaultDepartment}&page=1`);
    //         const data = await response.json();
    //         setSearchResults(data);
    //         await fetchUpdatedData();
    //     } catch (error) {
    //         console.error('Error fetching search results:', error);
    //     }
    // };

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://20.188.123.92:82/ProcurementManagement/Planning/Filter?Search=${searchTerm}&Department=${asd.DefaultDepartment}&page=1`);
            const transformedRows = response.data.map(row => ({
                ...row,
                targetDateNeed: new Date(row.targetDateNeed),
            }));
            setRows(transformedRows); // Update state with transformed data
        } catch (error) {
            setError(error); // Handle any errors
        } finally {
            setIsLoading(false);
        }
    };


    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <Stack flexDirection='row' justifyContent='justify-between'>
            <GridToolbarContainer>
                <Stack flexDirection='row'>
                    <Button color="primary" startIcon={<RefreshIcon />} onClick={handleRefreshButton}>
                        Refresh
                    </Button>
                </Stack>
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

                <GridToolbarFilterButton />


                <Stack>
                    {asd.DefaultDepartment === "FPG-PRO" &&
                        <FormControl sx={{ minWidth: 120 }} size="small">
                            {/* <InputLabel id="demo-select-small-label">Age</InputLabel> */}
                            <Select
                                displayEmpty
                                value={bUnit || ''}
                                onChange={handleUnitsDropdown}
                                inputProps={{ 'aria-label': 'Without label' }}
                            >

                                {units.map((unit) => (
                                    <MenuItem key={unit.$id} value={unit.FinancialDimension}>
                                        {unit.FinancialDimension}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                    }

                </Stack>

                <Stack>
                    <TextField
                        id="search"
                        type="search"
                        // label="Search"
                        size='small'
                        value={searchTerm}
                        onChange={handleSearchChange}
                        sx={{ width: 300, bgcolor: 'white', borderRadius: 1 }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleSearch}>
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Stack>


            </GridToolbarContainer>
        </Stack>
    );
}

const FullFeaturedCrudGrid = ({ searchResults }) => {
    const [rows, setRows] = React.useState([]);
    const [rowModesModel, setRowModesModel] = useState({});
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const apiRef = React.useRef(null);
    const [searchTerm, setSearchTerm] = useState('')

    // State for storing fetched types
    const [types, setTypes] = useState([]);
    const mapBooleanToYesNo = (boolValue) => {
        return boolValue ? "Yes" : "No";
    }
    const [currentRow, setCurrentRow] = useState(null);
    const [executionRow, setExecutionRow] = useState(null);


    const [records, setRecords] = useState([])

    const [getMainAcc, setGetMainAcc] = useState(null);

    const fetchMainAccount = async () => {
        try {
            const res = await axios.get('http://20.188.123.92:82/api/services/RAFIPAYIntegration/RAFIPAYJournalAPI/GetMainAccountList');
            setGetMainAcc(res.data);
        } catch (error) {
            console.error('Error Fetching Main Account', error)
        }
    }



    const fetchTypes = () => {
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
    }


    // Fetching of Data
    const fetchRecords = () => {
        // axios.get('http://20.188.123.92:82/ProcurementManagement/Planning/Filter')
        axios.get(`http://20.188.123.92:82/ProcurementManagement/Planning/Filter?Department=${userDeptInfo.DefaultDepartment}&page=1`)
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
                console.error(error); // Handle any errors
            });
    }

    useEffect(() => {
        fetchRecords();
        fetchTypes();
    }, []);

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };
    const [dataToUpdate, setDataToUpdate] = useState(null)
    const [totalRows, setTotalRows] = useState(0);

    // Execution
    const [executionDetails, setExecutionDetails] = useState();
    const [viewExecution, setViewExecution] = useState(null);
    const userDeptInfo = localStorage.getItem('userInfo') != null ? JSON.parse(localStorage.getItem('userInfo')) : ''

    const handleViewClick = (id) => () => {
        setIsViewModalOpen(true);
        setModalClicked('view')
        console.log('Viewing row:', id);

        // console.log(DefaultBusinessUnit)

        let row = apiRef.current.getRowWithUpdatedValues(id);
        setCurrentRow(row);

        axios.get(`http://20.188.123.92:82/ProcurementManagement/Execution/GetExecution/${id}`)
            .then(response => {
                // If the request is successful, extract type data from the response
                const viewExecution = response.data;
                // Set the fetched types to the state
                setViewExecution(viewExecution);
                console.log('View Execution Details:', viewExecution);
            })
            .catch(error => {
                console.error(error); // Handle any errors
            });
    };

    const [modalClicked, setModalClicked] = useState('')
    const handleEditClick = (id) => () => {
        setIsModalOpen(true);
        setModalClicked('edit')
        // fetchData();

        // fetchExecutionDetails(id);
        axios.get(`http://20.188.123.92:82/ProcurementManagement/Execution/GetExecution/${id}`)
            .then(response => {
                // If the request is successful, extract type data from the response
                const executionDetails = response.data;
                // Set the fetched types to the state
                setExecutionDetails(executionDetails);
                console.log('Execution Details:', executionDetails)
            })
            .catch(error => {
                console.error(error); // Handle any errors
            });

        let row = apiRef.current.getRowWithUpdatedValues(id)
        setCurrentRow(row);

        console.log('Edit - Selected ID', id)
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

    const [isModalOpen, setIsModalOpen] = useState(false);
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

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handlePageSizeChange = (newPageSize) => {
        setPageSize(newPageSize);
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
            width: 100,
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
                height: 435,
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
                    toolbar: EditToolbar, GridToolbar
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
                paginationMode="client"
                pagination
                // pageSizeOptions={[5, 10, 25]}
                autoPageSize
                keepNonExistentRowsSelected
            />

            {modalClicked === 'edit' && <ModalUpdateComponent open={isModalOpen} setIsModalOpen={setIsModalOpen} onClose={handleModalClose} currentRow={currentRow} executionDetails={executionDetails} />}

            {modalClicked === 'view' && <ModalViewHistoryComponent isFPGPRO={userDeptInfo?.DefaultDepartment} isITU={userDeptInfo?.DefaultBusinessUnit} openView={isViewModalOpen} setIsViewModalOpen={setIsViewModalOpen} onCloseView={handleViewModalClose} currentRow={currentRow} viewExecution={viewExecution} />}

        </Box>


    );
}

export default FullFeaturedCrudGrid