import React from 'react'
import Button from '@mui/material/Button';

const ExportButton = () => {
    return (
        <>
            <Button
                className="ml-2"
                sx={{
                    marginLeft: '8px',
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
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24" style={{ marginRight: '8px' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
                <span>Export</span>
            </Button>
        </>
    )
}

export default ExportButton