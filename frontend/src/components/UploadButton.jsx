import React, { useState, useRef } from 'react'
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const UploadButton = ({ onFileSelect }) => {
    // Ref for input file
    const fileInputRef = useRef(null);

    // onchange states
    const [excelFile, setExcelFile] = useState(null);
    const [typeError, setTypeError] = useState(null);
    const [showNotice, setShowNotice] = useState(false);

    // submit state
    const [excelData, setExcelData] = useState(null);

    // onchange event
    const handleFileInputChange = (e) => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
        // Your file input handling logic here
        // Call onFileSelect if a file is successfully selected
        if (e.target.files[0]) {
            onFileSelect(); // Call the onFileSelect function when a file is selected
        }
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
            console.log(excelData)
        } else {
            setTypeError('Please select a file');
            setExcelFile(null);
        }
        setShowNotice(!selectedFile); // Show notice if no file is selected
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

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });
    return (
        <>
            <Button
                component="label"
                role={undefined}
                tabIndex={-1}
                startIcon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                </svg>}
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

                Upload
                <VisuallyHiddenInput type="file" onChange={handleFileInputChange} />
            </Button>

            {showNotice && (
                <p style={{ color: 'red' }}>{typeError}</p>
            )}
        </>
    )
}

export default UploadButton