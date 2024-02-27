import React, { useState } from 'react';
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
import BasicDatePicker from './BasicDatePicker'; // You may need to adjust this import based on your file structure
import { createTheme } from '@mui/material/styles'
import { Divider, FormLabel, Stack } from '@mui/material';

const AddButton = () => {

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


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Modal Type Dropdown
    const [type, setType] = React.useState('');

    const handleTypeChangeDropdown = (event) => {
        setType(event.target.value);
    };

    const handleFinDimDropdown = (event) => {
        setType(event.target.value);
    };

    // Add functionality
    const handleAdd = () => {
        const description = document.getElementById("description").value;
        const specs = document.getElementById("specs").value;
        const quantity = document.getElementById("quantity").value;
        const totalEstimatedAmount = document.getElementById("totalEstimatedAmount").value;
        const financialDimension = document.getElementById("financialDimension").value;

        // Check if any required field is empty
        if (
            !description ||
            !specs ||
            !quantity ||
            !totalEstimatedAmount ||
            !financialDimension
        ) {
            alert("Please fill in all required fields.");
            return;
        }

        console.log('Add button clicked')
        // Here you can proceed with adding the data
    }

    return (
        <>
            {/* ADD BUTTON */}
            <Button
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
                onClick={handleOpen}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24" style={{ marginRight: '8px' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add
            </Button>

            {/* DIALOG SECTION */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography sx={{ mb: 2, textAlign: 'center' }} id="modal-modal-title" variant="h6" component="h2">
                        Title
                    </Typography>

                    <Stack sx={{ mb: 2 }} spacing={2}>
                        {/* Description */}
                        <TextField
                            sx={{ flexGrow: 1 }}
                            fullWidth
                            id="outlined-required description"
                            label="Description"
                            defaultValue=""
                            required
                        />

                        {/* Specs */}
                        <TextField
                            sx={{ flexGrow: 1 }}
                            fullWidth
                            id="outlined-required specs"
                            label="Specs"
                            defaultValue=""
                            required
                        />
                    </Stack>


                    <Stack sx={{ width: '100%' }} flexDirection='row' justifyContent='space-between' gap='16px'>
                        <Stack sx={{ width: '33%' }}>
                            {/* Type */}
                            <FormControl sx={{ mb: 2 }}>
                                <InputLabel id="demo-simple-select-label" required>Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={type}
                                    label="Type"
                                    onChange={handleTypeChangeDropdown}
                                    fullWidth  // Add this to make the select field fullWidth
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>
                        <Stack sx={{ width: '33%' }}>
                            {/* Quantity */}
                            <TextField
                                sx={{ mb: 2 }}
                                id="outlined-number quantity"
                                label="Quantity"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth  // Add this to make the text field fullWidth
                                placeholder='0'
                                required
                            />
                        </Stack>
                        <Stack sx={{ width: '33%' }}>
                            {/* Total Estimated Amount */}
                            <TextField
                                sx={{ mb: 2 }}
                                id="outlined-number totalEstimatedAmount"
                                label="Total Estimated Amount"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth  // Add this to make the text field fullWidth
                                placeholder='0.00'
                                required
                            />
                        </Stack>
                    </Stack>





                    <Stack sx={{ width: '100%' }} flexDirection='row' justifyContent='space-between' gap='30px'>
                        <Stack sx={{ width: '60%' }}>
                            {/* Financial Dimension */}
                            {/* <TextField
                                sx={{ mb: 2 }}
                                fullWidth
                                id="outlined-required financialDimension"
                                label="Financial Dimension"
                                defaultValue=""
                                required
                            /> */}

                            {/* Financial Dimension */}
                            <FormControl sx={{ mb: 2 }}>
                                <InputLabel id="demo-simple-select-label" required>Financial Dimension</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={type}
                                    label="Financial Dimension"
                                    onChange={handleFinDimDropdown}
                                    fullWidth  // Add this to make the select field fullWidth
                                >
                                    <MenuItem value={10}>ASDASD</MenuItem>
                                    <MenuItem value={20}>QWEQWE</MenuItem>
                                    <MenuItem value={30}>ZXCZXC</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>

                        <Stack sx={{ width: '30%' }}>
                            {/* Target Date */}
                            <BasicDatePicker style={{ maxWidth: '100px' }} required />

                        </Stack>

                        <Stack sx={{ width: '30%' }}>
                            {/* Recurring */}
                            <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label" required>Recurring</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="no" control={<Radio />} label="No" />

                                </RadioGroup>
                            </FormControl>
                        </Stack>
                    </Stack>

                    <Divider />

                    <Stack direction='row' justifyContent='flex-end' marginTop={2} spacing={2}>
                        <Button onClick={handleClose} variant="outlined" sx={{ width: '80px' }}>Cancel</Button>
                        <Button onClick={handleAdd} variant="contained" sx={{ width: '80px', bgcolor: '#FFD23F', '&:hover': { backgroundColor: '#FFA732' } }}>Add</Button>
                    </Stack>



                </Box>

            </Modal>
        </>
    )
}

export default AddButton