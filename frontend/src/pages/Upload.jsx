import React from 'react'
import { useState } from "react";
import * as XLSX from 'xlsx';
import { Card, Typography } from "@material-tailwind/react";

const Upload = () => {
    // onchange states
    const [excelFile, setExcelFile] = useState(null);
    const [typeError, setTypeError] = useState(null);

    // submit state
    const [excelData, setExcelData] = useState(null);

    // onchange event
    const handleFile = (e) => {
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
    const handleFileSubmit = (e) => {
        e.preventDefault();
        if (excelFile !== null) {
           
            const workbook = XLSX.read(excelFile, { type: 'buffer' });
            console.log(workbook)
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);
            console.log(data.slice(3, 999))
            setExcelData(data.slice(0, 10));
        }
        
    }

    return (
        <div className="wrapper">
            <h3>Upload & View Excel Sheets</h3>

            {/* form */}
            <form className="form-group custom-form" onSubmit={handleFileSubmit}>
                <input type="file" className="form-control" required onChange={handleFile} />
                <button type="submit" className="btn btn-success btn-md">UPLOAD</button>
                {typeError && (
                    <div className="alert alert-danger" role="alert">{typeError}</div>
                )}
            </form>

            {/* view data */}
            <div className="viewer">
                {excelData ? (
                    // <div className="table-responsive">
                    //     <table className="table">

                    //         <thead>
                    //             <tr>
                    //                 {Object.keys(excelData[0]).map((key) => (
                    //                     <th key={key} className='py-4 px-4'>
                    //                         {key}
                    //                     </th>
                    //                 ))}
                    //             </tr>
                    //         </thead>

                    //         <tbody>
                    //             {excelData.map((individualExcelData, index) => (
                    //                 <tr key={index}>
                    //                     {Object.keys(individualExcelData).map((key) => (
                    //                         <td key={key}>{individualExcelData[key]}</td>
                    //                     ))}
                    //                 </tr>
                    //             ))}
                    //         </tbody>

                    //     </table>

                    // </div>

                    <Card className="h-full w-full overflow-scroll z-10">
                        <table className="w-full min-w-max table-auto text-left">
                            <thead>
                                <tr>
                                    {Object.keys(excelData[0]).map((key) => ( 
                                        <th key={key} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                            {key}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {excelData.map((individualExcelData, index) => (
                                    <tr key={index}>
                                        {Object.keys(individualExcelData).map((key) => (
                                            <td key={key} className="p-4 border-b border-blue-gray-50">{individualExcelData[key]}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Card>

                ) : (
                    <div>No File is uploaded yet!</div>
                )}
            </div>


        </div>
    )
}

export default Upload
