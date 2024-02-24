import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Box, Button, FormLabel, Grid, Input, Stack, } from '@mui/material';
import { TextField, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import SearchBarMUI from '../components/SearchBarMUI';
import Modal from '@mui/material/Modal';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import BasicDatePicker from '../components/BasicDatePicker';
import AddButton from '../components/AddButton';
import ExportButton from '../components/ExportButton';
import UploadButton from '../components/UploadButton';

const HomePage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const [dialogValues, setDialogValues] = useState({
    description: '',
    specs: '',
    type: '',
    recurring: '',
    qty: '',
    total_amount: '',
    fin_dim: '',
    targetDate: null
  })

  const handleDescriptionChange = (value) => {
    setDialogValues({ ...dialogValues, description: value })
  }

  const handleSpecsChange = (value) => {
    setDialogValues({ ...dialogValues, specs: value })
  }

  const handleTypeChange = (value) => {
    setDialogValues({ ...dialogValues, type: value })
  }

  const handleRecurringChange = (value) => {
    setDialogValues({ ...dialogValues, recurring: value })
  }

  const handleQtyChange = (value) => {
    setDialogValues({ ...dialogValues, qty: value })
  }

  const handleTotalAmountChange = (value) => {
    setDialogValues({ ...dialogValues, total_amount: value })
  }

  const handleFinDimChange = (value) => {
    setDialogValues({ ...dialogValues, fin_dim: value })
  }

  const handleTargetDateChange = (value) => {
    setDialogValues({ ...dialogValues, targetDate: value })
  }

  const handleAddRow = () => {
    const newRow = {
      description: dialogValues.description,
      specs: dialogValues.specs,
      type: dialogValues.type,
      recurring: dialogValues.recurring,
      qty: dialogValues.qty,
      total_amount: dialogValues.total_amount,
      fin_dim: dialogValues.fin_dim,
      targetDate: dialogValues.targetDate
    };

    // Add the new row to tableData state
    setTableData([...tableData, newRow]);

    // Log the results
    console.log("New Row:", newRow);

    // Close the Dialog
    closeDialog();
  }

  // Upload Button
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [excelData, setExcelData] = useState(null);

  const handleFileSelect = () => {
    setIsFileSelected(true);
    setExcelData(excelData);
  };

  return (
    <Grid container spacing={2}>
      {/* Grid Sidebar */}
      <Grid item xs={2}>
        <Sidebar />
      </Grid>

      {/* Grid Content */}
      <Grid item xs={10} padding={3} mt={4}>
        <Stack flexDirection='row' justifyContent='space-between' alignItems='end' >
          <Stack flexDirection='row'>

            {/* ADD BUTTON */}
            <AddButton />

            {/* UPLOAD BUTTON */}
            <UploadButton onFileSelect={handleFileSelect} />

            {/* EXPORT BUTTON*/}
            <ExportButton />
          </Stack>

          {/* SEARCH COMPONENT */}
          <Stack>
            <SearchBarMUI />
          </Stack>
        </Stack>
        <Stack>
          {/* Display text if file is selected */}
          {isFileSelected && <Typography padding={2}>A file has been selected.</Typography>}

          {/* Display the Excel data */}
          {excelData && (
            <div>
              {excelData.map((row, index) => (
                <div key={index}>
                  {Object.keys(row).map((key) => (
                    <span key={key}>{row[key]} | </span>
                  ))}
                  <br />
                </div>
              ))}
            </div>
          )}
        </Stack>
      </Grid>

    </Grid>
  )
}

export default HomePage
