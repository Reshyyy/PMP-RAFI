import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box, Button, Divider, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Modal, Radio, RadioGroup, Select, Stack, Tab, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BasicDatePicker from './BasicDatePicker';
import BasicDatePickerUpdate from './BasicDatePickerUpdate';
import BasicDatePickerExecution from './BasicDatePickerExecution';
import ExecutionDeliveryDate from './ExecutionDeliveryDate';

// Define enum for type
const Status = {
    delivered: 'DELIVERED',
    notDelivered: 'NOT DELIVERED'
};

// Define enum for team
const Team = [
    'ITU-OPS',
    'ITU-INF',
    'ITU-SEC',
    'ITU/ETI'
];

// enum for FinDim
const FinDim = ['ASD', 'ZXC', 'QWE'];

// enum for Recurring
const Recurring = [1, 0];

const ModalViewHistoryComponent = (props, id) => {
    const [tabVal, setTabVal] = React.useState('2');
    const { open, setIsViewModalOpen, onClose, currentRow, viewExecution } = props;
    const [description, setDescription] = useState(null);
    const [specs, setSpecs] = useState(null);
    const [type, setType] = useState(null);
    const [types, setTypes] = useState([]);
    const [businessUnit, setBusinessUnit] = useState(null);
    const [bUnit, setBUnit] = useState([]);
    const [qty, setQty] = useState(0);
    const [totalEstAmt, setTotalEstAmt] = useState(0.00);
    const [finDim, setFinDim] = useState(null);
    const [date, setDate] = useState(null);
    const [targetDateUpdate, setTargetDateUpdate] = useState(null);
    const [recurring, setRecurring] = useState(0);
    const [executionData, setExecutionData] = useState(null);

    const handleTabChange = (event, newValue) => {
        setTabVal(newValue);
    };

    const handleExecutionDateChange = (date) => {
        console.log('Selected date:', date);
        setTargetDateUpdate(date)
    };

    const handlePRChange = (e) => {
        setPR(e.target.value)
    }

    const handleStatusDropdown = (e) => {
        setStatus(e.target.value);
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    const handleSpecsChange = (e) => {
        setSpecs(e.target.value);
    }

    const handleTypeChangeDropdown = (e) => {
        setType(e.target.value);
    };

    const handleBusinessUnitDropdown = (e) => {
        setBusinessUnit(e.target.value);
    };

    const handleQtyChange = (e) => {
        setQty(e.target.value);
    }

    const handleTotalChange = (e) => {
        setTotalEstAmt(e.target.value);
    }

    const handleFinDimDropdown = (e) => {
        setFinDim(e.target.value);
    }

    const handleDateChange = (date) => {
        console.log('Selected date:', date);
        setTargetDateUpdate(date)
    };

    const handleRecurringChange = (e) => {
        const value = e.target.value === "1" ? true : false;
        setRecurring(value);
        console.log(value)
    }

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

    useEffect(() => {
        if (currentRow) {
            console.log('selected ID', currentRow.planningId)
            setDescription(currentRow.description);
            setSpecs(currentRow.specifcation);
            setType(currentRow.type);
            setBusinessUnit(currentRow.businessUnit);
            setQty(currentRow.quantity);
            setTotalEstAmt(currentRow.totalEstAmt);
            setFinDim(currentRow.finDim);
            setDate(currentRow.targetDateNeed);
            setRecurring(currentRow.recurring);
        }
    }, [currentRow]);

    useEffect(() => {
        if(viewExecution) {
            console.log('view execution ID', viewExecution.Execution?.executionId)
            // setPR(viewExecution.Execution?.prno)
        }
    }, [viewExecution])

    

    return (
        <div>
            {/* {currentRow && ( */}
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
                                    value={description || ''}
                                ></TextField>
                                {/* Specs */}
                                <TextField
                                    sx={{ flexGrow: 1 }}
                                    fullWidth
                                    id="outlined-required"
                                    label="Specs"
                                    defaultValue=""
                                    onChange={handleSpecsChange}
                                    value={specs || ''}
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
                                            value={type || ''}
                                            label="Type"
                                            onChange={handleTypeChangeDropdown}
                                            fullWidth
                                        >
                                            {types.map((type) => (
                                                <MenuItem key={type.ID} value={type.Name}>
                                                    {type.Name}
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
                                            value={businessUnit || ''}
                                            label="Business Unit"
                                            onChange={handleBusinessUnitDropdown}
                                            fullWidth  // Add this to make the select field fullWidth
                                        >
                                            {

                                            }
                                            {Team.map((item) => {
                                                return <MenuItem value={item}>{item}</MenuItem>
                                            })}
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
                                        value={qty}
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
                                        fullWidth
                                        placeholder='0.00'
                                        required
                                        onChange={handleTotalChange}
                                        value={totalEstAmt || ''}
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
                                            value={finDim || ''}
                                            label="Main Account"
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
                                    <BasicDatePickerUpdate date={date} onDateChange={handleDateChange} style={{ maxWidth: '100px' }} />
                                </Stack>
                            </Stack>

                        </TabPanel>

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
                                        onChange={handlePRChange}
                                        fullWidth
                                        id="outlined-required"
                                        label="PR #"
                                        defaultValue=""
                                        required
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
                                    <ExecutionDeliveryDate onDateChange={handleExecutionDateChange} style={{ maxWidth: '100px' }} required />

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
                                <Button onClick={() => setIsViewModalOpen(false)} variant="outlined" sx={{ width: '80px' }}>Cancel</Button>
                                <Button variant="contained" sx={{ width: '80px', bgcolor: '#FFD23F', '&:hover': { backgroundColor: '#FFA732' } }}>Update</Button>
                            </Stack>
                        </TabPanel>
                    </TabContext>
                </Box>
            </Modal>
            {/* )} */}
        </div>
    )
}

export default ModalViewHistoryComponent
