import * as React from 'react';
import { useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function BasicDatePickerExecution({ onDateChange, date }) {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date)
    if (onDateChange) {
      onDateChange(date);
    }
  }

  // Format the date using dayjs to "YYYY-MM-DDTHH:mm:ss.SS"
  const formattedDate = date ? dayjs(date || selectedDate).format("YYYY-MM-DDTHH:mm:ss.SS") : null;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Date of Request"
        value={dayjs(date || selectedDate)}
        onChange={handleDateChange}
        format="YYYY-MM-DD"
        animateYearScrolling
        readOnly
      />
    </LocalizationProvider>
  );
}
