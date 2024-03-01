import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box, FormControl, InputLabel, MenuItem, Modal, Select, Stack, Tab, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BasicDatePicker from './BasicDatePicker';

// Define enum for team
const Team = [
    'ITU-OPS',
    'ITU-INF',
    'ITU-SEC',
    'ITU/ETI'
];

const FinDim = ['ASD', 'ZXC', 'QWE'];
const ModalUpdateComponent = (props) => {
    const [tabVal, setTabVal] = React.useState('1');
    const { open, setIsModalOpen, onClose, currentRow } = props;
    const [description, setDescription] = useState(null);
    const [specs, setSpecs] = useState(null);
    const [type, setType] = useState(null);
    const [types, setTypes] = useState([]);
    const [businessUnit, setBusinessUnit] = useState(null);
    const [bUnit, setBUnit] = useState([]);
    const [qty, setQty] = useState(0);
    const [total, setTotal] = useState(0.00);
    const [finDim, setFinDim] = useState(null);
    const [values, setValues] = useState({});
    const [date, setDate] = useState(null);


    const handleTabChange = (event, newValue) => {
        setTabVal(newValue);
    };

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
        setTotal(e.target.value);
    }

    const handleFinDimDropdown = (e) => {
        setFinDim(e.target.value);
    }

    const handleDateChange = (date) => {
        console.log('Selected date:', date);
    };

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
            setDescription(currentRow.description);
            setSpecs(currentRow.specifcation);
            setType(currentRow.type);
            setBusinessUnit(currentRow.businessUnit);
            setQty(currentRow.quantity);
            setTotal(currentRow.totalEstAmt);
            setFinDim(currentRow.finDim);
            setDate(currentRow.targetDateNeed);
        }

        fetchTypes();
    }, [currentRow]);

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
                                            value={total || ''}
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
                                        <BasicDatePicker date={date} onDateChange={handleDateChange} style={{ maxWidth: '100px' }} />

                                    </Stack>


                                </Stack>

                            </TabPanel>
                        </TabContext>
                    </Box>
                </Modal>
            )}
        </div>
    )
}

export default ModalUpdateComponent
