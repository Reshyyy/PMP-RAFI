import * as React from 'react';
import { useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function BasicDatePickerExecution({ onDateChange }) {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date)
    onDateChange(date);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
      label="Date of Request"
      value={selectedDate}
      onChange={handleDateChange}
      format="MM/dd/yyyy HH:mm"
      animateYearScrolling
      readOnly
    />
    </LocalizationProvider>
  );
}