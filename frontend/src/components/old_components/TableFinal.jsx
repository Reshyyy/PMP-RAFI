import React from 'react'

const TableFinal = () => {
    const handleEdit = () => {
        console.log('Edit button clicked');
    }

    const handleViewHistory = () => {
        console.log('View History button clicked');
    }

    return (
        <div className='overflow-x-scroll min-h-[50vh] bg-white'>
            <table className='shadow-2xl font-[Poppins] border-2 border-spacing-2 border-cyan-200 w-6/12 border-collapse border border-slate-500'>
                <thead className='text-black'>
                    <tr className='bg-white'>
                        <th className='text-center border-collapse border border-slate-500' colSpan="5">DESCRIPTION</th>
                        <th className='text-center border-collapse border border-slate-500' colSpan="4">PLANNING</th>
                        <th className='text-center border-collapse border border-slate-500'></th>
                        {/* <th className='text-center border-collapse border border-slate-500 bg-yellow-300 fixed-column' colSpan="5">EXECUTION</th> */}
                    </tr>
                    <tr>
                        {/* Description */}
                        <th className='py-3 border-collapse border border-slate-500' style={{ minWidth: '400px' }}>Description</th>
                        <th className='py-3 bg-gray-200 border-collapse border border-slate-500' style={{ minWidth: '120px' }}>Specifications</th>
                        <th className='py-3 bg-gray-200 border-collapse border border-slate-500'>Type</th>
                        <th className='py-3 bg-gray-200 border-collapse border border-slate-500'>Team</th>
                        <th className='py-3 bg-gray-200 border-collapse border border-slate-500' style={{ minWidth: '100px' }}>Recurring</th>
                        {/* Planning */}
                        <th className='py-3 bg-gray-200 border-collapse border border-slate-500'>QTY</th>
                        <th className='py-3 bg-gray-200 border-collapse border border-slate-500' style={{ minWidth: '120px' }}>Total Estimated Amount</th>
                        <th className='py-3 bg-gray-200 border-collapse border border-slate-500' style={{ minWidth: '200px' }}>Financial Dimension</th>
                        <th className='py-3 bg-gray-200 border-collapse border border-slate-500'>Target Date</th>
                        {/* Execution */}
                        {/* <th className='py-3 bg-gray-200 border-collapse border border-slate-500' style={{ minWidth: '120px' }}>Date of Request</th>
                  <th className='py-3 bg-gray-200 border-collapse border border-slate-500 bg-gray-500'>PR #</th>
                  <th className='py-3 bg-gray-200 border-collapse border border-slate-500 bg-gray-500'>PO #</th>
                  <th className='py-3 bg-gray-200 border-collapse border border-slate-500 bg-gray-500'>Delivery Date</th>
                  <th className='py-3 bg-gray-200 border-collapse border border-slate-500 bg-cyan-500'>Status</th> */}
                        {/* Actions */}
                        <th className='py-3 bg-gray-200' colSpan="5">ACTIONS</th>
                    </tr>
                </thead>
                <tbody className='text-cyan-900 text-center'>
                    <tr className='bg-white duration-300 outline hover:outline-blue-500'>
                        {/* Description Rows */}
                        <td className='py-1 px-6 border-collapse border border-slate-500'>PR-0012312312 : asdasdasdadasdasdasdasdasdasdasdasdasdasdasdasdasdasasd</td>
                        <td className='py-1 px-6 border-collapse border border-slate-500'>asdasdE</td>
                        <td className='py-1 px-6 border-collapse border border-slate-500'>asdasd</td>
                        <td className='py-1 px-6 border-collapse border border-slate-500'>asd</td>
                        <td className='py-1 px-6 border-collapse border border-slate-500'>78</td>
                        {/* Planning Rows */}
                        <td className='py-1 px-6 border-collapse border border-slate-500'>121</td>
                        <td className='py-1 px-6 border-collapse border border-slate-500'>asda</td>
                        <td className='py-1 px-6 border-collapse border border-slate-500' >asd</td>
                        <td className='py-1 px-6 border-collapse border border-slate-500'>1/12/12</td>
                        {/* Execution Rows */}
                        {/* <td className='py-1 px-6 border-collapse border border-slate-500'>1/12/12</td>
                  <td className='py-1 px-6 border-collapse border border-slate-500'>asdasd</td>
                  <td className='py-1 px-6 border-collapse border border-slate-500'>asdasd</td>
                  <td className='py-1 px-6 border-collapse border border-slate-500'>asdasd</td>
                  <td className='py-1 px-6 border-collapse border border-slate-500'>asdasd</td> */}
                        {/* Actions */}
                        <td className='p-2'>
                            <div className='flex items-center justify-around w-[220px]'>
                                <button className='hover:text-red-800 flex' onClick={handleEdit}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                    Edit
                                </button>

                                <button className='hover:text-blue-800 flex ml-3' onClick={handleViewHistory}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                    View History
                                </button>

                            </div>
                        </td>

                    </tr>



                </tbody>
            </table>
        </div>
    )
}

export default TableFinal
