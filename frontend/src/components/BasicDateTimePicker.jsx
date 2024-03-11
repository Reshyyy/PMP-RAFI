import React, { useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function BasicDateTimePicker({ onDateRequestChange, dateOfReq }) {
    const [selectedDateOfRequest, setSelectedDateOfRequest] = useState(null);

    const handleDateRequestChange = (dateOfReq) => {
        setSelectedDateOfRequest(dateOfReq)
        if (onDateRequestChange) {
            onDateRequestChange(dateOfReq);
        }
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker']}>
                <DateTimePicker
                    label="Date of Request"
                    value={dateOfReq || selectedDateOfRequest}
                    onChange={handleDateRequestChange}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}