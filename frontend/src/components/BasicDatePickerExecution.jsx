import * as React from 'react';
import { useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function BasicDatePickerExecution({ onDateChange, dateReq }) {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (dateReq) => {
    setSelectedDate(dateReq)
    if (onDateChange) {
      onDateChange(dateReq);
    }
  }

  // Format the date using dayjs to "YYYY-MM-DDTHH:mm:ss.SS"
  // const formattedDate = date ? dayjs(date || selectedDate).format("YYYY-MM-DDTHH:mm:ss.SS") : null;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Date of Request"
        readOnly
        value={dayjs(dateReq || selectedDate)}
        onChange={handleDateChange}
        inputFormat="yyyy-MM-dd"
        animateYearScrolling
        emptyLabel="yeet"
        placeholder={"Date of Birth"}
      />
    </LocalizationProvider>
  );
}
