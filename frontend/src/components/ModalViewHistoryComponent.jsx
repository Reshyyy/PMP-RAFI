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
import ExecTargetDate from './ExecTargetDate';
import ExecDateOfRequest from './ExecDateOfRequest';

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

const ModalViewHistoryComponent = (props) => {
    const [tabView, setTabView] = React.useState('1');
    const { openView, setIsViewModalOpen, onCloseView, currentRow, viewExecution, isITU, isFPGPRO } = props;
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
    const [dateReq, setDateReq] = useState(null);
    const [prno, setPR] = useState(null);
    const [pono, setPO] = useState(null);
    const [deliveryDate, setDeliveryDate] = useState(null);
    const [status, setStatus] = useState(null);
    const [method, setMethod] = useState(null);
    const [methods, setMethods] = useState([]);
    const [contractDuration, setContractDuration] = useState(null);

    const handleTabViewChange = (event, newValue) => {
        setTabView(newValue);
    };

    const handleExecutionDateChange = (date) => {
        console.log('Selected delivery date:', date);
        setDeliveryDate(date);
    };

    const handleDeliveryDateChange = (date) => {
        console.log('Selected delivery date:', date);
        setDeliveryDate(date);
    };

    const handlePRChange = (e) => {
        setPR(e.target.value)
    }

    const handlePOChange = (e) => {
        setPO(e.target.value)
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

    const handleDateOfRequest = (dateReq) => {
        console.log('Selected date of request:', dateReq);
        setDateReq(dateReq)
    };

    const handleRecurringChange = (e) => {
        const value = e.target.value === "1" ? true : false;
        setRecurring(value);
        console.log(value)
    }

    const handleMethodChange = (e) => {
        setMethod(e.target.value);
    }

    const handleContractDurationChange = (e) => {
        setContractDuration(e.target.value);
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
        fetchTypes();
    }, [currentRow]);

    useEffect(() => {
        if (viewExecution) {
            console.log('view execution ID', viewExecution.Execution?.executionId);
            setDateReq(viewExecution.Execution?.dateOfRequest);
            setMethod(viewExecution.Execution?.method);
            setContractDuration(viewExecution.Execution?.contractDuration);
            setPR(viewExecution.Execution?.prno);
            setPO(viewExecution.Execution?.pono);
            setDeliveryDate(viewExecution.Execution?.deliveryDate);
            setStatus(viewExecution.Execution?.status)

        }
    }, [viewExecution])

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

    const [updateExecData, setUpdateExecData] = useState(null);
    const handleUpdateExecution = () => {
        const formData = {

            "pmodel": {
                planningId: currentRow.planningId,
                description: description,
                specifcation: specs,
                type: type,
                businessUnit: businessUnit,
                recurring: Boolean(recurring),
                quantity: parseInt(qty),
                totalEstAmt: parseFloat(totalEstAmt),
                finDim: finDim,
                targetDateNeed: targetDateUpdate ? targetDateUpdate.toISOString().substring(0, 10) : null,
            },

            "emodel": {
                executionId: viewExecution.executionId,
                planningId: currentRow.planningId,
                dateOfRequest: dateReq ? dateReq.toISOString().substring(0, 10) : null,
                method: method,
                contractDuration: contractDuration,
                prno: prno,
                pono: pono,
                deliveryDate: deliveryDate ? deliveryDate.toISOString().substring(0, 10) : null,
                status: status
            }
        };

        axios.post('http://20.188.123.92:82/ProcurementManagement/Execution/Update', formData)
            .then(response => {
                console.log('Update execution successful:', response.data);
                setIsViewModalOpen(false); // Close the modal after successful submission
            })
            .catch(error => {
                console.error('Error execution update planning:', error);
                // Handle errors here, such as displaying an error message to the user
            });
    };

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

    const [mainAccs, setMainAccs] = useState([]);
    const fetchMainAccountList = async () => {
        const accessToken = localStorage.getItem('accessToken');

        const formData = {
            "RAFIPayIntegration":
            {
                "LegalEntity": "rafi"
            }
        }
        try {
            const res = await axios.post('/api/services/RAFIPAYIntegration/RAFIPAYJournalAPI/GetMainAccountList', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                }
            })
            const fetchedMainAccounts = res.data.MainAccountList;
            setMainAccs(fetchedMainAccounts)
        } catch (error) {
            console.error(error);
        }
    }

    const fetchMethod = async () => {

        try {
            const res = await axios.get('http://20.188.123.92:82/ProcurementManagement/Execution/Method')
            const fetchedMethod = res.data;
            setMethods(fetchedMethod)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchBU();
        fetchMainAccountList();
        fetchMethod();
    }, []);


    return (
        <div>
            {isITU === "ITU" && <Modal
                open={openView}
                onClose={onCloseView}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <TabContext value={tabView} >
                        <p>READONLY</p>
                        <TabList onChange={handleTabViewChange} aria-label="lab API tabs example">
                            <Tab label="Planning" value="1" />
                            <Tab label="Execution" value="2" />
                        </TabList>
                        {currentRow && (
                            <TabPanel value="1">
                                <Stack sx={{ mb: 2 }} spacing={2}>
                                    {/* Description */}
                                    <TextField
                                        sx={{ flexGrow: 1 }}
                                        fullWidth
                                        id="outlined-required"
                                        label="Description"
                                        defaultValue=""
                                        required
                                        value={description || ''}
                                        inputProps={{ readOnly: true }}
                                    ></TextField>
                                    {/* Specs */}
                                    <TextField
                                        sx={{ flexGrow: 1 }}
                                        fullWidth
                                        id="outlined-required"
                                        label="Specs"
                                        defaultValue=""
                                        value={specs || ''}
                                        inputProps={{ readOnly: true }}
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
                                                onChange={handleTypeChangeDropdown} x
                                                inputProps={{ readOnly: true }}
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
                                                inputProps={{ readOnly: true }}
                                            >

                                                {units.map((unit) => (
                                                    <MenuItem key={unit.$id} value={unit.FinancialDimension}>
                                                        {unit.FinancialDimension}
                                                    </MenuItem>
                                                ))}

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
                                            inputProps={{ readOnly: true }}
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
                                            inputProps={{ readOnly: true }}
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
                                                inputProps={{ readOnly: true }}
                                            >
                                                {mainAccs.map((acc) => (
                                                    <MenuItem key={acc.$id} value={acc.MainAccount}>
                                                        {acc.MainAccount}
                                                    </MenuItem>
                                                ))}

                                            </Select>
                                        </FormControl>
                                    </Stack>
                                    <Stack sx={{ width: '30%' }}>
                                        {/* Target Date */}
                                        <ExecTargetDate date={date} onDateChange={handleDateChange} style={{ maxWidth: '100px' }} />
                                    </Stack>
                                    <Stack sx={{ width: '30%' }}>
                                        {/* Recurring */}
                                        <FormControl readOnly>
                                            <FormLabel id="recurring-rb" required>Recurring</FormLabel>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="row-radio-buttons-group"
                                                // value={recurring || ''}
                                                defaultValue={currentRow.recurring}
                                                onChange={handleRecurringChange}
                                            >
                                                {/* {Recurring.map((recur) => {
                                                    <FormControlLabel key={recur} value={recur} control={<Radio />} label="Yes" />
                                                })} */}
                                                <FormControlLabel disabled control={<Radio value={1} />} label="Yes" />
                                                <FormControlLabel disabled control={<Radio value={0} />} label="No" />
                                            </RadioGroup>
                                        </FormControl>
                                    </Stack>
                                </Stack>

                                <Divider />
                                <Stack direction='row' justifyContent='flex-end' marginTop={2} spacing={2}>
                                    <Button onClick={() => setIsViewModalOpen(false)} variant="outlined" sx={{ width: '80px' }}>Cancel</Button>
                                    <Button disabled onClick={handleUpdateExecution} variant="contained" sx={{ width: '80px', bgcolor: '#FFD23F', '&:hover': { backgroundColor: '#FFA732' } }}>Update</Button>
                                </Stack>
                            </TabPanel>
                        )}


                        {viewExecution && (
                            // EXECUTION TAB
                            <TabPanel value="2">
                                <Stack justifyContent='center' alignItems='center'>
                                    <Stack sx={{ width: '50%' }}>
                                        {/* Date of Request */}
                                        <BasicDatePickerExecution dateReq={dateReq} onDateChange={handleDateOfRequest} style={{ maxWidth: '100px' }} />
                                    </Stack>

                                    <Stack sx={{ mt: 2, width: '50%' }}>
                                        {/* Method */}
                                        <FormControl>
                                            <InputLabel id="type-dropdown" required>Method</InputLabel>
                                            <Select
                                                labelId="type-dropdown"
                                                id="type-dropdown"
                                                value={method || ''}
                                                label="Method"
                                                onChange={handleMethodChange}
                                                fullWidth
                                                inputProps={{ readOnly: true }}
                                            >
                                                {methods.map((method) => (
                                                    <MenuItem key={method.ID} value={method.Name}>
                                                        {method.Name}
                                                    </MenuItem>
                                                ))}

                                            </Select>
                                        </FormControl>
                                    </Stack>

                                    <Stack sx={{ mt: 2, width: '50%' }}>
                                        {/* Contract Duration */}
                                        <TextField
                                            sx={{ flexGrow: 1 }}
                                            onChange={handleContractDurationChange}
                                            fullWidth
                                            id="outlined-required"
                                            label="Contract Duration"
                                            defaultValue=""
                                            required
                                            value={contractDuration || ''}
                                            inputProps={{ readOnly: true }}
                                        />
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
                                            value={prno || ''}
                                            inputProps={{ readOnly: true }}
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
                                            value={pono || ''}
                                            onChange={handlePOChange}
                                            readOnly
                                            inputProps={{ readOnly: true }}
                                        />
                                    </Stack>

                                    <Stack sx={{ width: '50%', mt: 2 }}>
                                        {/* Delivery Date */}
                                        <ExecutionDeliveryDate date={date} onDateChange={handleDeliveryDateChange} style={{ maxWidth: '100px' }} required />
                                    </Stack>

                                    <Stack width="50%" sx={{ mt: 2 }}>
                                        {/* Status */}
                                        <FormControl sx={{ mb: 2 }}>
                                            <InputLabel id="demo-simple-select-label" required>Status</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={status || ''}
                                                label="Team"
                                                onChange={handleStatusDropdown}
                                                fullWidth  // Add this to make the select field fullWidth
                                                readOnly
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
                                    <Button disabled onClick={handleUpdateExecution} variant="contained" sx={{ width: '80px', bgcolor: '#FFD23F', '&:hover': { backgroundColor: '#FFA732' } }}>Update</Button>
                                </Stack>

                            </TabPanel>
                        )}
                    </TabContext>
                </Box>
            </Modal>}
            {isFPGPRO === "FPG-PRO" && <Modal
                open={openView}
                onClose={onCloseView}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <TabContext value={tabView} >
                        <p>sfsfsfsfsf</p>
                        <TabList onChange={handleTabViewChange} aria-label="lab API tabs example">
                            <Tab label="Planning" value="1" />
                            <Tab label="Execution" value="2" />
                        </TabList>
                        {currentRow && (
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

                                                {units.map((unit) => (
                                                    <MenuItem key={unit.$id} value={unit.FinancialDimension}>
                                                        {unit.FinancialDimension}
                                                    </MenuItem>
                                                ))}

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
                                                {mainAccs.map((acc) => (
                                                    <MenuItem key={acc.$id} value={acc.MainAccount}>
                                                        {acc.MainAccount}
                                                    </MenuItem>
                                                ))}

                                            </Select>
                                        </FormControl>
                                    </Stack>
                                    <Stack sx={{ width: '30%' }}>
                                        {/* Target Date */}
                                        <ExecTargetDate date={date} onDateChange={handleDateChange} style={{ maxWidth: '100px' }} />
                                    </Stack>
                                    <Stack sx={{ width: '30%' }}>
                                        {/* Recurring */}
                                        <FormControl>
                                            <FormLabel id="recurring-rb" required>Recurring</FormLabel>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="row-radio-buttons-group"
                                                // value={recurring || ''}
                                                defaultValue={currentRow.recurring}
                                                onChange={handleRecurringChange}
                                            >
                                                {/* {Recurring.map((recur) => {
                                                    <FormControlLabel key={recur} value={recur} control={<Radio />} label="Yes" />
                                                })} */}
                                                <FormControlLabel control={<Radio value={1} />} label="Yes" />
                                                <FormControlLabel control={<Radio value={0} />} label="No" />
                                            </RadioGroup>
                                        </FormControl>
                                    </Stack>
                                </Stack>

                                <Divider />
                                <Stack direction='row' justifyContent='flex-end' marginTop={2} spacing={2}>
                                    <Button onClick={() => setIsViewModalOpen(false)} variant="outlined" sx={{ width: '80px' }}>Cancel</Button>
                                    <Button onClick={handleUpdateExecution} variant="contained" sx={{ width: '80px', bgcolor: '#FFD23F', '&:hover': { backgroundColor: '#FFA732' } }}>Update</Button>
                                </Stack>
                            </TabPanel>
                        )}


                        {viewExecution && (
                            // EXECUTION TAB
                            <TabPanel value="2">
                                <Stack justifyContent='center' alignItems='center'>
                                    <Stack sx={{ width: '50%' }}>
                                        {/* Date of Request */}
                                        <BasicDatePickerExecution dateReq={dateReq} onDateChange={handleDateOfRequest} style={{ maxWidth: '100px' }} />
                                    </Stack>

                                    <Stack sx={{ mt: 2, width: '50%' }}>
                                        {/* Method */}
                                        <FormControl>
                                            <InputLabel id="type-dropdown" required>Method</InputLabel>
                                            <Select
                                                labelId="type-dropdown"
                                                id="type-dropdown"
                                                value={method || ''}
                                                label="Method"
                                                onChange={handleMethodChange}
                                                fullWidth
                                            >
                                                {methods.map((method) => (
                                                    <MenuItem key={method.ID} value={method.Name}>
                                                        {method.Name}
                                                    </MenuItem>
                                                ))}

                                            </Select>
                                        </FormControl>
                                    </Stack>

                                    <Stack sx={{ mt: 2, width: '50%' }}>
                                        {/* Contract Duration */}
                                        <TextField
                                            sx={{ flexGrow: 1 }}
                                            onChange={handleContractDurationChange}
                                            fullWidth
                                            id="outlined-required"
                                            label="Contract Duration"
                                            defaultValue=""
                                            required
                                            value={contractDuration || ''}
                                        />
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
                                            value={prno || ''}
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
                                            value={pono || ''}
                                            onChange={handlePOChange}
                                        />
                                    </Stack>

                                    <Stack sx={{ width: '50%', mt: 2 }}>
                                        {/* Delivery Date */}
                                        <ExecutionDeliveryDate date={date} onDateChange={handleDeliveryDateChange} style={{ maxWidth: '100px' }} required />
                                    </Stack>

                                    <Stack width="50%" sx={{ mt: 2 }}>
                                        {/* Status */}
                                        <FormControl sx={{ mb: 2 }}>
                                            <InputLabel id="demo-simple-select-label" required>Status</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={status || ''}
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
                                    <Button onClick={handleUpdateExecution} variant="contained" sx={{ width: '80px', bgcolor: '#FFD23F', '&:hover': { backgroundColor: '#FFA732' } }}>Update</Button>
                                </Stack>

                            </TabPanel>
                        )}
                    </TabContext>
                </Box>
            </Modal>}

        </div>
    )
}

export default ModalViewHistoryComponent
