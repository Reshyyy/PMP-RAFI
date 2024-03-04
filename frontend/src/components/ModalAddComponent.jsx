import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import BasicDatePicker from './BasicDatePicker';
import { createTheme } from '@mui/material/styles'
import { Divider, FormHelperText, FormLabel, Stack } from '@mui/material';
import axios from 'axios';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import BasicDatePickerExecution from './BasicDatePickerExecution';
import ExecutionDeliveryDate from './ExecutionDeliveryDate';

// Define enum for type
const Status = {
    delivered: 'DELIVERED',
    notDelivered: 'NOT DELIVERED'
};

// Define enum for team
const Team = {
    ITU_OPS: 'ITU-OPS',
    ITU_INF: 'ITU-INF',
    ITU_SEC: 'ITU-SEC',
    ITU_ETI: 'ITU/ETI'
};

// Define
const FinDim = ['ASD', 'ZXC', 'QWE'];
const ModalAddCOmponent = (props) => {
    const [selectedOption, setSelectedOption] = useState([]);
    const [types, setTypes] = useState([]);

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

    // Modal
    const { open, setIsModalOpen, onClose, currentRow } = props;

    // Modal Type Dropdown
    const [type, setType] = React.useState('');
    const [typeError, setTypeError] = useState(false);
    const handleTypeChangeDropdown = (event) => {
        setType(event.target.value);
        // if (event.target.validity.valid) {
        //     setTypeError(false);
        // } else {
        //     setTypeError(true);
        // }
    };

    // Modal Team Dropdown
    const [businessUnit, setBusinessUnit] = React.useState('');
    const [businessUnitError, setbusinessUnitError] = useState(false);
    const handleBusinessUnitDropdown = (event) => {
        setBusinessUnit(event.target.value);
        // if (event.target.validity.valid) {
        //     setbusinessUnitError(false);
        // } else {
        //     setbusinessUnitError(true);
        // }
    };

    // Modal FinDim Dropdown
    const [finDim, setfinDim] = React.useState('');
    const handleFinDimDropdown = (event) => {
        setfinDim(event.target.value);
    };

    // update dropdown fields - kani
    useEffect(() => {
        setType(currentRow?.type);
        setBusinessUnit(currentRow?.businessUnit);
        setfinDim(currentRow?.finDim);
        // console.log(finDim)
    }, [currentRow])

    const [description, setDescription] = useState('');
    const [descriptionError, setDescriptionError] = useState(false);
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
        if (e.target.validity.valid) {
            setDescriptionError(false);
        } else {
            setDescriptionError(true);
        }
    }

    const [specs, setSpecs] = useState('');
    const handleSpecsChange = (e) => {
        setSpecs(e.target.value);
    }

    const [totalEstAmt, setTotalEstAmt] = useState(0);
    const handleTotalChange = (e) => {
        setTotalEstAmt(e.target.value);
    }

    const [qty, setQty] = React.useState(0);
    const [qtyError, setQtyError] = useState(false);
    const handleQtyChange = (e) => {
        setQty(e.target.value);
        if (e.target.validity.valid) {
            setQtyError(false);
        } else {
            setQtyError(true);
        }
    }

    const handleDateChange = (date) => {
        console.log('Selected date:', date);
    };

    const [recurring, setRecurring] = useState(null);
    const [recurringError, setRecurringError] = useState(false);

    const handleRecurringChange = (event) => {
        setRecurring(event.target.value);
        setRecurringError(false);
    }

    const [dataToUpdate, setdataToUpdate] = useState(null)
    const fetchData = () => {
        axios.get('http://20.188.123.92:82/ProcurementManagement/Planning/Filter')
            .then((res) => {
                setdataToUpdate(res.data)
            })
            .catch((err) => {
                console.error(err)
            })
    }

    const fetchType = () => {
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

    // State for storing fetched types

    useEffect(() => {
        fetchData();
        fetchType();
    }, []);

    const [tabVal, setTabVal] = React.useState('1');
    const handleTabChange = (event, newValue) => {
        setTabVal(newValue);
    };

    const [status, setStatus] = useState('')
    const handleStatusDropdown = (e) => {
        setStatus(e.target.value);
    }

    const handleUpdatePlanning = () => {
        const formData = {
            planningId: '',
            description: description,
            specifcation: specs,
            type: type,
            businessUnit: businessUnit,
            recurring: Boolean(recurring),
            quantity: parseInt(qty),
            totalEstAmt: parseFloat(totalEstAmt),
            finDim: finDim,
            targetDateNeed: new Date().toISOString().substring(0, 10) // Format: YYYY-MM-DD
        };

        axios.post('http://20.188.123.92:82/ProcurementManagement/Planning/Update', formData)
            .then(response => {
                console.log('Update request successful:', response.data);
                setIsModalOpen(false); // Close the modal after successful submission
            })
            .catch(error => {
                console.error('Error adding planning:', error);
                // Handle errors here, such as displaying an error message to the user
            });
    };

    useEffect(() => {
        if (currentRow) {
            setDescription(currentRow.description);
            setSpecs(currentRow.specifcation);
        }
    }, [currentRow]);

    return (
        <div>
            {currentRow && (
                <Modal
                    open={open}
                    onClose={onClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description">
                    <Box sx={style}>
                        <TabContext value={tabVal} >
                            <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                                <Tab label="Planning" value="1" />
                                <Tab label="Execution" value="2" />
                            </TabList>
                            <TabPanel value="1">
                                <Stack sx={{ mb: 2 }} spacing={2}>
                                    {/* Description */}
                                    <TextField
                                        sx={{ flexGrow: 1 }}
                                        onChange={handleDescriptionChange}
                                        fullWidth
                                        id="outlined-required"
                                        label="Description"
                                        defaultValue=""
                                        required
                                        value={currentRow?.description}
                                        error={descriptionError}
                                        helperText={descriptionError ? 'Description is required.' : ''}
                                    />

                                    {/* Specs */}
                                    <TextField
                                        sx={{ flexGrow: 1 }}
                                        fullWidth
                                        id="outlined-required"
                                        label="Specs"
                                        defaultValue={currentRow?.specifcation}
                                        onChange={handleSpecsChange}
                                        value={specs}
                                    ></TextField>
                                </Stack>

                                <Stack sx={{ width: '100%' }} flexDirection='row' justifyContent='space-between' gap='16px'>
                                    <Stack sx={{ width: '33%' }}>
                                        {/* Type */}
                                        <FormControl sx={{ mb: 2 }}>
                                            <InputLabel id="type-dropdown" required>Type</InputLabel>
                                            <Select
                                                labelId="type-dropdown"
                                                id="type-dropdown"
                                                value={type}
                                                label="Type"
                                                error={typeError}
                                                onChange={handleTypeChangeDropdown}
                                                helperText={typeError ? 'Type is required.' : ''}
                                                fullWidth  // Add this to make the select field fullWidth
                                            >
                                                {types.map((type) => (
                                                    <MenuItem
                                                        key={type.ID}
                                                        value={type.Name}
                                                    >
                                                        {type?.Name}
                                                    </MenuItem>
                                                ))}
                                            </Select>

                                        </FormControl>
                                    </Stack>

                                    <Stack sx={{ width: '33%' }}>
                                        {/* Business Unit */}
                                        <FormControl sx={{ mb: 2 }}>
                                            <InputLabel id="demo-simple-select-label" required>Business Unit</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={businessUnit}
                                                error={businessUnitError}
                                                helperText={businessUnitError ? 'Required field.' : ''}
                                                label="Business Unit"
                                                onChange={handleBusinessUnitDropdown}
                                                fullWidth  // Add this to make the select field fullWidth
                                            >
                                                <MenuItem value={Team.ITU_OPS}>ITU-OPS</MenuItem>
                                                <MenuItem value={Team.ITU_INF}>ITU-INF</MenuItem>
                                                <MenuItem value={Team.ITU_SEC}>ITU-SEC</MenuItem>
                                                <MenuItem value={Team.ITU_ETI}>ITU/ETI</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Stack>

                                    <Stack sx={{ width: '33%' }}>
                                        {/* Quantity */}
                                        <TextField
                                            sx={{ mb: 2 }}
                                            id="outlined-number"
                                            label="Quantity"
                                            type="number"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            fullWidth  // Add this to make the text field fullWidth
                                            placeholder='0'
                                            onChange={handleQtyChange}
                                            error={qtyError}
                                            value={currentRow?.quantity}
                                            helperText={qtyError ? 'Quantity is required' : ''}
                                        />
                                    </Stack>

                                    <Stack sx={{ width: '33%' }}>
                                        {/* Total Estimated Amount */}
                                        <TextField
                                            sx={{ mb: 2 }}
                                            id="outlined-number"
                                            label="Total Estimated Amount"
                                            type="number"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            fullWidth  // Add this to make the text field fullWidth
                                            placeholder='0.00'
                                            required
                                            onChange={handleTotalChange}
                                            value={currentRow?.totalEstAmt}
                                        />
                                    </Stack>
                                </Stack>

                                <Stack sx={{ width: '100%' }} flexDirection='row' justifyContent='space-between' gap='30px'>
                                    <Stack sx={{ width: '60%' }}>

                                        {/* Financial Dimension */}
                                        <FormControl sx={{ mb: 2 }}>
                                            <InputLabel id="finDim-dropdown">Main Account</InputLabel>
                                            <Select
                                                labelId="finDim-dropdown"
                                                id="finDim-dropdown"
                                                value={finDim}
                                                label="Financial Dimension"
                                                onChange={handleFinDimDropdown}
                                                fullWidth  // Add this to make the select field fullWidth
                                            >
                                                {
                                                    FinDim.map((option) => <MenuItem value={option}>{option}</MenuItem>)
                                                }
                                                {/* <MenuItem value={FinDim.ASD}>ASDASD</MenuItem>
                                        <MenuItem value={FinDim.QWE}>QWEQWE</MenuItem>
                                        <MenuItem value={FinDim.ZXC}>ZXCZXC</MenuItem> */}
                                            </Select>
                                        </FormControl>
                                    </Stack>

                                    <Stack sx={{ width: '30%' }}>
                                        {/* Target Date */}
                                        <BasicDatePicker onDateChange={handleDateChange} style={{ maxWidth: '100px' }} />

                                    </Stack>

                                    <Stack sx={{ width: '30%' }}>
                                        {/* Recurring */}
                                        <FormControl error={recurringError}>
                                            <FormLabel id="demo-row-radio-buttons-group-label" required>Recurring</FormLabel>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="row-radio-buttons-group"
                                                value={currentRow?.recurring}
                                                onChange={handleRecurringChange}
                                            >
                                                <FormControlLabel value={1} control={<Radio />} label="Yes" />
                                                <FormControlLabel value={0} control={<Radio />} label="No" />

                                            </RadioGroup>
                                        </FormControl>
                                    </Stack>
                                </Stack>

                                <Divider />

                                <Stack direction='row' justifyContent='flex-end' marginTop={2} spacing={2}>
                                    <Button onClick={() => setIsModalOpen(false)} variant="outlined" sx={{ width: '80px' }}>Cancel</Button>
                                    <Button onClick={handleUpdatePlanning} variant="contained" sx={{ width: '80px', bgcolor: '#FFD23F', '&:hover': { backgroundColor: '#FFA732' } }}>Update</Button>
                                </Stack>
                            </TabPanel>

                            {/* Execution Tab */}
                            <TabPanel value="2">
                                <Stack justifyContent='center' alignItems='center'>
                                    <Stack sx={{ width: '50%' }}>
                                        {/* Target Date */}
                                        <BasicDatePickerExecution onDateChange={handleDateChange} style={{ maxWidth: '100px' }} />
                                    </Stack>

                                    <Stack sx={{ mt: 2, width: '50%' }}>
                                        {/* PR # */}
                                        <TextField
                                            sx={{ flexGrow: 1 }}
                                            onChange={handleDescriptionChange}
                                            fullWidth
                                            id="outlined-required"
                                            label="PR #"
                                            defaultValue=""
                                            required
                                            value={description}
                                            error={descriptionError}
                                            helperText={descriptionError ? 'Description is required.' : ''}
                                        />
                                    </Stack>

                                    <Stack sx={{ mt: 2, width: '50%' }}>
                                        {/* PO # */}
                                        <TextField
                                            sx={{ flexGrow: 1 }}
                                            fullWidth
                                            id="outlined-required"
                                            label="PO #"
                                            defaultValue=""
                                            required
                                        />
                                    </Stack>

                                    <Stack sx={{ width: '50%', mt: 2 }}>
                                        {/* Target Date */}
                                        <ExecutionDeliveryDate onDateChange={handleDateChange} style={{ maxWidth: '100px' }} required />
                                    </Stack>

                                    <Stack width="50%" sx={{ mt: 2 }}>
                                        {/* Status */}
                                        <FormControl sx={{ mb: 2 }}>
                                            <InputLabel id="demo-simple-select-label" required>Status</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={status}
                                                label="Team"
                                                onChange={handleStatusDropdown}
                                                fullWidth  // Add this to make the select field fullWidth
                                            >
                                                <MenuItem value={Status.delivered}>DELIVERED</MenuItem>
                                                <MenuItem value={Status.notDelivered}>NOT DELIVERED</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Stack>
                                </Stack>

                                <Divider />

                                <Stack direction='row' justifyContent='flex-end' marginTop={2} spacing={2}>
                                    <Button onClick={() => setIsModalOpen(false)} variant="outlined" sx={{ width: '80px' }}>Cancel</Button>
                                    <Button variant="contained" sx={{ width: '80px', bgcolor: '#FFD23F', '&:hover': { backgroundColor: '#FFA732' } }}>Update</Button>
                                </Stack>

                            </TabPanel>
                        </TabContext>
                    </Box>
                </Modal>
            )}
        </div>

    )
}

export default ModalAddCOmponent
