import React, { useState } from 'react'
import './Table.css'
import CustomDatePicker from './CustomDatePicker';


const Table = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const openDialog = () => {
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
    };

    const [tableData, setTableData] = useState([]);

    const addRow = () => {
        const newRow = { description: '', specs: '', type: '', team: '', recurring: '', qty: '', total_amount: '', fin_dim: '', targetDate: null };
        setTableData([...tableData, newRow]);
    }

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

    return (
        <div className='mt-12'>
            {/* Search Bar */}
            <div className='flex justify-between  mb-2'>
                <button onClick={openDialog} className="bg-yellow-300 hover:bg-blue-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <span>Add</span>
                </button>



                {/* Search */}
                {/* <form class="max-w-md">
                    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border-gray-100 rounded-lg bg-gray-0 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-150 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." required />
                        <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                    </div>
                </form> */}


            </div>
            {/* Dialog */}
            {isDialogOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                {/* Dialog content */}
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start flex-col divide-y">
                                        {/* Content of your dialog */}

                                        {/* Description */}
                                        <h6
                                            class="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit">
                                            Description
                                        </h6>
                                        <div class="relative h-11 w-full min-w-[200px]">
                                            <input
                                                value={dialogValues.description}
                                                onChange={(e) => handleDescriptionChange(e.target.value)}
                                                class="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                                placeholder=" " />
                                            <label
                                                class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                                Description
                                            </label>
                                        </div>

                                        {/* Specs */}
                                        <h6
                                            class="mt-3 block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit">
                                            Specs
                                        </h6>
                                        <div class="relative h-11 w-full min-w-[200px]">
                                            <input
                                                value={dialogValues.specs}
                                                onChange={(e) => handleSpecsChange(e.target.value)}
                                                class="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                                placeholder="" />
                                            <label
                                                class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                                Specifications
                                            </label>
                                        </div>

                                        {/* Type and Recurring */}
                                        <div className='flex'>
                                            <div>
                                                <h6
                                                    class="mt-3 block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit">
                                                    Type
                                                </h6>
                                                <div class="relative h-11 w-full min-w-[200px]">
                                                    <select value={dialogValues.type} onChange={(e) => handleTypeChange(e.target.value)}>
                                                        <option value="">Select Type</option>
                                                        <option value="Type 1">Type 1</option>
                                                        <option value="Type 2">Type 2</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className=''>
                                                <h6
                                                    class="mt-3 block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit">
                                                    Recurring?
                                                </h6>
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

                                        {/* Planning */}
                                        <h6
                                            class="mt-3 block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit">
                                            Qty.
                                        </h6>
                                        <div class="relative h-11">
                                            <input
                                                value={dialogValues.qty}
                                                onChange={(e) => handleQtyChange(e.target.value)}
                                                class="h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                                placeholder="" />
                                            <label
                                                class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                                Quantity
                                            </label>
                                        </div>

                                        {/* Total Estimated Amount */}
                                        <h6
                                            class="mt-3 block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit">
                                            Total Estimated Amount
                                        </h6>
                                        <div class="relative">
                                            <input
                                                value={dialogValues.total_amount}
                                                onChange={(e) => handleTotalAmountChange(e.target.value)}
                                                class="h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                                placeholder="" />
                                            <label
                                                class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                                Total
                                            </label>
                                        </div>

                                        {/* Financial Dimension */}
                                        <h6
                                            class="mt-3 block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit">
                                            Financial Dimension
                                        </h6>
                                        <div class="relative h-11 w-full min-w-[200px]">
                                            <input
                                                value={dialogValues.fin_dim}
                                                onChange={(e) => handleFinDimChange(e.target.value)}
                                                class="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                                placeholder=" " />
                                            <label
                                                class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                                Financial Dimension
                                            </label>
                                        </div>

                                        {/* Target Date */}
                                        <div class="relative h-11 w-full min-w-[200px]">
                                            <h6
                                                class="mt-3 block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit">
                                                Target Date
                                            </h6>
                                            <CustomDatePicker />
                                            

                                        </div>

                                    </div>
                                </div>

                                {/* Dialog actions */}
                                <div className="mt-10 bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button onClick={handleAddRow} type="button" className="inline-flex w-full justify-center rounded-md bg-yellow-300 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-400 sm:ml-3 sm:w-auto">Add</button>
                                    <button onClick={closeDialog} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Table
