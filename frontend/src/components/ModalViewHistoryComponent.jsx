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
const ModalViewHistoryComponent = (props) => {
    const [tabVal, setTabVal] = React.useState('2');
    const { open, setIsViewModalOpen, onClose, currentRow } = props;

    const handleTabChange = (event, newValue) => {
        setTabVal(newValue);
    };

    const handleDateChange = (date) => {
        console.log('Selected date:', date);
        setTargetDateUpdate(date)
    };

    const handlePRChange = (e) => {
        setPR(e.target.value)
    }

    const handleStatusDropdown = (e) => {
        setStatus(e.target.value);
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
                            <Tab label="Planning" value="1" disabled/>
                            <Tab label="Execution" value="2" />
                        </TabList>
                        <TabPanel value="1">

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
