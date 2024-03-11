import * as React from 'react';
import { useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function BasicDatePickerExecutionView({ onDateRequestChange, dateOfReq }) {
  const [selectedDateOfRequest, setSelectedDateOfRequest] = useState(dayjs());

  const handleDateRequestChange = (dateOfReq) => {
    // Format on demand
    const formattedDate = dateOfReq.format('YYYY-MM-DDTHH:mm:ss.SSSZ');
    setSelectedDateOfRequest(dateOfReq)
    if (onDateRequestChange) {
      onDateRequestChange(formattedDate);
    }
  }

  // Format the date using dayjs to "YYYY-MM-DDTHH:mm:ss.SS"
  // const formattedDate = date ? dayjs(date || selectedDate).format("YYYY-MM-DDTHH:mm:ss.SS") : null;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Date of Request"
        value={dateOfReq || selectedDateOfRequest}
        onChange={handleDateRequestChange}
        inputFormat="yyyy-MM-dd"
        animateYearScrolling
        emptyLabel="yeet"
        placeholder={"Date of Birth"}
      />
    </LocalizationProvider>
  );
}
