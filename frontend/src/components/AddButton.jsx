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
import { Divider, FormHelperText, FormLabel, Stack } from '@mui/material';


// Define enum for type
const Type = {
    Goods: 'Goods',
    Services: 'Services',
    Others: 'Others'
};

// Define enum for team
const Team = {
    ITU_OPS: 'ITU-OPS',
    ITU_INF: 'ITU-INF',
    ITU_SEC: 'ITU-SEC',
    ITU_ETI: 'ITU/ETI'
  };

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

    // Modal
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Modal Type Dropdown
    const [type, setType] = useState('');
    const [typeError, setTypeError] = useState(false);
    const handleTypeChangeDropdown = (event) => {
        setType(event.target.value);
        if (e.target.validity.valid) {
            setTypeError(false);
        } else {
            setTypeError(true);
        }
    };

    // Modal Team Dropdown
    const [team, setTeam] = React.useState('');
    const handleTeamDropdown = (event) => {
        setTeam(event.target.value);
    };

    // Modal FinDim Dropdown
    const [finDim, setfinDim] = React.useState('');
    const handleFinDimDropdown = (event) => {
        setfinDim(event.target.value);
    };


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
    const [specsError, setSpecsError] = useState(false);
    const handleSpecsChange = (e) => {
        setSpecs(e.target.value);
        if (e.target.validity.valid) {
            setSpecsError(false);
        } else {
            setSpecsError(true);
        }
    }

    const [total, setTotal] = useState('');
    const [totalError, setTotalError] = useState(false);
    const handleTotalChange = (e) => {
        setTotal(e.target.value);
        if (e.target.validity.valid) {
            setTotalError(false);
        } else {
            setTotalError(true);
        }
    }

    const [qty, setQty] = React.useState('');
    const [qtyError, setQtyError] = useState(false);
    const handleQtyChange = (e) => {
        setQty(e.target.value);
        if (e.target.validity.valid) {
            setQtyError(false);
        } else {
            setQtyError(true);
        }
    }

    // if dropdown
    // const handleQtyDropdown = (e) => {
    //     setQty(e.target.value);
    //     if (e.target.validity.valid) {
    //         setQtyError(false);
    //     } else {
    //         setQtyError(true);
    //     }
    // }

    const handleAdd = () => {
        // Check if any required field is empty
        if (!description || !specs || !total || !qty || !type || !team) {
            setDescriptionError(!description);
            setSpecsError(!specs);
            setTotalError(!total);
            setQtyError(!qty);
            setType(!type);
            setTeam(!team);
            return;
        }

        console.log('Add button clicked');
        // Here you can proceed with adding the data
    };

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
                            onChange={handleDescriptionChange}
                            fullWidth
                            id="outlined-required"
                            label="Description"
                            defaultValue=""
                            required
                            value={description}
                            error={descriptionError}
                            helperText={descriptionError ? 'Description is required.' : ''}
                        />

                        {/* Specs */}
                        <TextField
                            sx={{ flexGrow: 1 }}
                            fullWidth
                            id="outlined-required"
                            label="Specs"
                            defaultValue=""
                            required
                            onChange={handleSpecsChange}
                            value={specs}
                            error={specsError}
                            helperText={specsError ? 'Specifications is required.' : ''}
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
                                    error={typeError}
                                    onChange={handleTypeChangeDropdown}
                                    helperText={typeError ? 'Type is required.' : ''}
                                    fullWidth  // Add this to make the select field fullWidth
                                >
                                    <MenuItem value={Type.Goods}>Goods</MenuItem>
                                    <MenuItem value={Type.Services}>Services</MenuItem>
                                    <MenuItem value={Type.Others}>Others...</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>
                        <Stack sx={{ width: '33%' }}>
                            {/* Team */}
                            <FormControl sx={{ mb: 2 }}>
                                <InputLabel id="demo-simple-select-label" required>Team</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={team}
                                    label="Team"
                                    onChange={handleTeamDropdown}
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
                                required
                                onChange={handleQtyChange}
                                error={qtyError}
                                value={qty}
                                helperText={qtyError ? 'Quantity is required' : ''}


                            />

                            {/* Quantity */}
                            {/* <FormControl sx={{ mb: 2 }}>
                                <InputLabel id="demo-simple-select-label" required>QTY</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={qty}
                                    label="Quantity"
                                    onChange={handleQtyDropdown}
                                    fullWidth  // Add this to make the select field fullWidth
                                >
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                </Select>
                            </FormControl> */}
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
                                error={totalError}
                                value={total}
                                helperText={totalError ? 'Total Est. Amount is required' : ''}
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
                                    value={finDim}
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