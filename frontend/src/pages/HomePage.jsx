import React, { useState, useRef } from 'react';
import rafiBG from '/src/assets/rafiBG.png';
import NavBar from '../components/NavBar';
import Sidebar from '../components/Sidebar';
import Table from '../components/Table';
import CustomDatePicker from '../components/CustomDatePicker';
import SearchBar from '../components/SearchBar';
import TableFinal from '../components/TableFinal';
import { TableMaterialTailwind } from '../components/TableMaterialTailwind';
import { Box, Button, Grid, Input, } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddIcon from '@mui/icons-material/Add';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, FormControl, InputLabel, Select, MenuItem, FormControlLabel, RadioGroup, Radio, Typography } from '@mui/material';
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

  // UPLOAD FILE EXCEL
  // onchange states
  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);

  // submit state
  const [excelData, setExcelData] = useState(null);

  // onchange event
  const handleFileInputChange = (e) => {
    fileInputRef.current.click();
    let fileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        setTypeError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFile(e.target.result);
        }
        console.log(excelData)
      }
      else {
        setTypeError('Please select only excel file types');
        setExcelFile(null);
      }
    }
    else {
      console.log('Please select your file');
    }
    console.log(excelData)
  }

  // submit event
  const handleUploadFile = (e) => {
    e.preventDefault();
    if (excelFile !== null) {

      const workbook = XLSX.read(excelFile, { type: 'buffer' });
      console.log(workbook)
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      console.log(data.slice(3, 999))
      setExcelData(data.slice(3));
    }

  }

  return (
    <Grid container spacing={1} sx={{ backgroundSize: 'cover', backgroundPosition: 'center' }}>

      {/* Test */}
      {/* Grid Sidebar */}
      <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'center' }}>
        <Sidebar />
      </Grid>
      <Grid item xs={8} sx={{  }}>
        <Box sx={{ mt: 12 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <Button
                onClick={openDialog}
                sx={{
                  backgroundColor: '#f6e05e', // Yellow-300
                  '&:hover': {
                    backgroundColor: '#90cdf4', // Blue-400
                  },
                  color: '#1a202c', // Gray-800
                  fontWeight: 'bold',
                  padding: '8px 16px', // py-2 px-4 in Tailwind CSS
                  borderRadius: '9999px', // rounded-full in Tailwind CSS
                  display: 'inline-flex',
                  alignItems: 'center',
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24" style={{ marginRight: '8px' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add
              </Button>

              {/* Upload */}
              <Input
                type="file"
                sx={{ display: 'none' }}
                onChange={handleFileInputChange}
              />
              <Button
                onClick={handleUploadFile}
                sx={{
                  marginLeft: '8px', // ml-2 in Tailwind CSS
                  backgroundColor: '#f6e05e', // Yellow-300
                  '&:hover': {
                    backgroundColor: '#90cdf4', // Blue-400
                  },
                  color: '#1a202c', // Gray-800
                  fontWeight: 'bold',
                  padding: '8px 16px', // py-2 px-4 in Tailwind CSS
                  borderRadius: '9999px', // rounded in Tailwind CSS
                  display: 'inline-flex',
                  alignItems: 'center',
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24" style={{ marginRight: '8px' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                </svg>
                <span>Upload</span>
              </Button>

              {/* Export */}
              <Button
                className="ml-2"
                sx={{
                  backgroundColor: '#f6e05e', // Yellow-300
                  '&:hover': {
                    backgroundColor: '#90cdf4', // Blue-400
                  },
                  color: '#1a202c', // Gray-800
                  fontWeight: 'bold',
                  padding: '8px 16px', // py-2 px-4 in Tailwind CSS
                  borderRadius: '9999px', // rounded in Tailwind CSS
                  display: 'inline-flex',
                  alignItems: 'center',
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24" style={{ marginRight: '8px' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
                <span>Export</span>
              </Button>
            </Box>

            <Box>
              <SearchBar />
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={1} sx={{  }}>
      
      </Grid>




      {/* Grid Content */}
      <div className='col-span-10 mx-5'>

        {/* <Table /> */}
        <div className='mt-12'>

          <div className='flex justify-between'>
            {/* Action Buttons */}



            
          </div>

          {/* Table */}
          {/* <TableFinal /> */}
          <TableMaterialTailwind />
          <div className='flex-wrap'>
            Test
          </div>

        </div>


      </div>

      {/* Grid End */}
      <div className='col-span-1'></div>

      {/* Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all lg:w-[928px] sm:my-8 sm:max-w-full sm:w-full sm:h-full">
                {/* Dialog content */}
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-center flex-col">
                    {/* Content of your dialog */}
                    {/* Header */}

                    <div className="py-3 mb-4 sm:flex sm:flex-row-reverse sm:px-6">
                      <h1>Title Header</h1>
                    </div>



                    {/* Description */}
                    <div className='flex'>
                      <div>

                        <div class="relative h-11 w-full min-w-[200px]">
                          <label class="block text-gray-700 text-sm font-bold mb-2" for="description">
                            Description
                          </label>
                          <input value={dialogValues.description} onChange={(e) => handleDescriptionChange(e.target.value)} className="shadow appearance-none border rounded w-[431px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" type="text" placeholder="Description" />
                        </div>

                      </div>


                      {/* Specs */}
                      <div className='flex ml-4'>
                        <div>
                          <label class="block text-gray-700 text-sm font-bold mb-2" for="specs">
                            Specs
                          </label>
                          <input value={dialogValues.specs} onChange={(e) => handleSpecsChange(e.target.value)} className="shadow appearance-none border rounded w-[431px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="specs" type="text" placeholder="Specifications" />

                        </div>
                      </div>
                    </div>


                    <div className='flex mt-4'>
                      {/* Type */}
                      <div className='flex'>
                        <div>
                          <h6
                            class="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit">
                            Type
                          </h6>
                          <div class="relative h-11 w-full min-w-[200px]">
                            <select style={{ width: '200px' }} value={dialogValues.type} onChange={(e) => handleTypeChange(e.target.value)}>
                              <option value="">Select Type</option>
                              <option value="Type 1">Type 1</option>
                              <option value="Type 2">Type 2</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className='flex'>
                        {/* Planning */}
                        <div className='ml-6'>
                          <label class="block text-gray-700 text-sm font-bold mb-2" for="qty">
                            Quantity
                          </label>
                          <input value={dialogValues.qty} onChange={(e) => handleQtyChange(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="qty" type="number" placeholder="Quantity" />
                        </div>

                        {/* Total Estimated Amount */}
                        <div className='ml-4'>
                          <label class="block text-gray-700 text-sm font-bold mb-2" for="total">
                            Total Estimated Amount
                          </label>
                          <input value={dialogValues.total_amount} onChange={(e) => handleTotalAmountChange(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="total" type="number" placeholder="Total Estimated Amount" />
                        </div>

                        {/* Recurring */}
                        {/* Total Estimated Amount */}
                        <div className='ml-4'>
                          <label class="block text-gray-700 text-sm font-bold mb-2" for="recurring">
                            Recurring?
                          </label>
                          <div class="relative h-11 w-full min-w-[200px]">
                            <div>
                              <label>
                                <input type="radio" value="Yes" checked={dialogValues.recurring === 'Yes'} onChange={() => handleRecurringChange('Yes')} />
                                Yes
                              </label>
                              <label>
                                <input type="radio" value="No" checked={dialogValues.recurring === 'No'} onChange={() => handleRecurringChange('No')} style={{ marginLeft: '1.5rem' }} />
                                No
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>



                    {/* Financial Dimension */}
                    <div className='flex'>
                      <div>
                        <label class="block mt-3 text-gray-700 text-sm font-bold mb-2" for="financial">
                          Financial Dimension
                        </label>
                        <input value={dialogValues.fin_dim} onChange={(e) => handleFinDimChange(e.target.value)} className="shadow appearance-none border rounded w-[431px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="financial" type="text" placeholder="Financial Dimensions" />
                      </div>
                      {/* Target Date */}
                      <div class="ml-4 relative h-11 w-full min-w-[200px]">
                        <h6
                          class="block mt-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit">
                          Target Date
                        </h6>
                        <CustomDatePicker />
                      </div>


                    </div>


                  </div>
                </div>

                {/* Dialog actions */}
                <div className="mt-10 bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button onClick={handleAddRow} type="button" className="lg:w-[100px] inline-flex w-full justify-center rounded-md bg-yellow-300 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-400 sm:ml-3 sm:w-auto">Add</button>
                  <button onClick={closeDialog} type="button" className="lg:w-[100px] mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Grid>
  )
}

export default HomePage
