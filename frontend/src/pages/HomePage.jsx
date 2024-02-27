import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Typography, Grid, Stack, Button, Box, } from '@mui/material';
import SearchBarMUI from '../components/SearchBarMUI';
import AddButton from '../components/AddButton';
import ExportButton from '../components/ExportButton';
import UploadButton from '../components/UploadButton';
import DataGridTable from '../components/DataGridTable';
import { DataGrid } from '@mui/x-data-grid';
import UploadTest from './UploadTest';
import FullFeaturedCrudGrid from '../components/FullFeatureCrudGrid';
import ExcelEditor from '../components/ExcelEditor';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {

  // Upload Button
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [excelData, setExcelData] = useState(null);

  const handleFileSelect = () => {
    setIsFileSelected(true);
    setExcelData(excelData);
  };

  const apiTest = () => {
    axios
      .post('api/services/RAFIPAYIntegration/RAFIPAYJournalAPI/GetFinancialDimensionList')
  }

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
            {/* ACTION BUTTONS */}
            {/* <AddButton /> */}
            {/* <UploadButton onFileSelect={handleFileSelect} /> */}
            {/* <ExportButton /> */}

          </Stack>
          {/* Searchbar Component */}
          <Stack>
            <SearchBarMUI />
          </Stack>
        </Stack>

        <Stack sx={{ mt: 1 }}>
          {/* Display text if file is selected */}
          {isFileSelected && <Typography padding={2}>A file has been selected.</Typography>}
          {/* <DataGridTable /> */}
          {/* <UploadTest /> */}
          <FullFeaturedCrudGrid />


        </Stack>
      </Grid>

    </Grid>
  )
}

export default HomePage
