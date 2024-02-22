import React, { useState } from 'react'

const TableTest = () => {
    const [tableData, setTableData] = useState([]);

    const addRow = () => {
        const newRow = { id: tableData.length + 1, description: '', specs: '', type: '', recurring: 'No', qty: '', total_amount: '', fin_dim: '', targetDate: '' };
        setTableData([...tableData, newRow]);
    }

    const handleDescriptionChange = (index, value) => {
        const newData = [...tableData];
        newData[index].description = value;
        setTableData(newData);
    }

    const handleSpecsChange = (index, value) => {
        const newData = [...tableData];
        newData[index].specs = value;
        setTableData(newData);
    }

    const handleTypeChange = (index, value) => {
        const newData = [...tableData];
        newData[index].type = value;
        setTableData(newData);
    }

    const handleRecurringChange = (index, value) => {
        const newData = [...tableData];
        newData[index].recurring = value;
        setTableData(newData);
    }

    const handleQtyChange = (index, value) => {
        const newData = [...tableData];
        if (!isNaN(value)) {
            newData[index].qty = value;
        }
        setTableData(newData);
    }

    const handleTotalAmountChange = (index, value) => {
        const newData = [...tableData];
        newData[index].total_amount = value;
        setTableData(newData);
    }

    const handleFinDimChange = (index, value) => {
        const newData = [...tableData];
        newData[index].fin_dim = value;
        setTableData(newData);
    }

    const handleTargetDateChange = (index, value) => {
        const newData = [...tableData];
        newData[index].targetDate = value;
        setTableData(newData);
    }

    return (
        <div className='overflow-x-scroll'>
            <button onClick={addRow} className="bg-yellow-300 hover:bg-blue-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <span>Add</span>
            </button>

            <table className='table-fixed'>
                <thead className=''>
                    <tr className=''>
                        <th className=''>ID</th>
                        {/* Description Tab */}
                        <th className=''>Description</th>
                        <th>Specs</th>
                        <th>Type</th>
                        <th>Recurring</th>
                        {/* Planning Tab */}
                        <th>QTY</th>
                        <th>Total Estimated Amount</th>
                        <th>Financial Dimension</th>
                        <th>Target Date</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((row, index) => (
                        <tr key={row.id}>
                            <td className='w-[200px]'>{row.id}</td>
                            {/* Description Data */}
                            <td><input type="text" value={row.description} onChange={(e) => handleDescriptionChange(index, e.target.value)} /></td>
                            <td><input type="text" value={row.specs} onChange={(e) => handleSpecsChange(index, e.target.value)} /></td>
                            <td>
                                <select value={row.type} onChange={(e) => handleTypeChange(index, e.target.value)}>
                                    <option value="">Select Type</option>
                                    <option value="Type 1">Type 1</option>
                                    <option value="Type 2">Type 2</option>
                                </select>
                                {/* <input type="text" value={row.type} onChange={(e) => handleTypeChange(index, e.target.value)} /> */}
                            </td>
                            <td>
                                <div>
                                    <label>
                                        <input type="radio" value="Yes" checked={row.recurring === 'Yes'} onChange={(e) => handleRecurringChange(index, e.target.value)} />
                                        Yes
                                    </label>
                                    <label>
                                        <input type="radio" value="No" checked={row.recurring === 'No'} onChange={(e) => handleRecurringChange(index, e.target.value)} />
                                        No
                                    </label>
                                </div>
                                {/* <input type="text" value={row.recurring} onChange={(e) => handleRecurringChange(index, e.target.value)} /> */}
                            </td>
                            {/* Planning Data */}
                            <td><input type="text" value={row.qty} onChange={(e) => handleQtyChange(index, e.target.value)} /></td>
                            <td><input type="text" value={row.total_amount} onChange={(e) => handleTotalAmountChange(index, e.target.value)} /></td>
                            <td><input type="text" value={row.fin_dim} onChange={(e) => handleFinDimChange(index, e.target.value)} /></td>
                            <td><input type="text" value={row.targetDate} onChange={(e) => handleTargetDateChange(index, e.target.value)} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default TableTest
