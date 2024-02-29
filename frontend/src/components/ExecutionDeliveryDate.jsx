import * as React from 'react';
import { useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function ExecutionDeliveryDate({ onDateChange }) {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date)
    onDateChange(date);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
      label="Delivery Date"
      value={selectedDate}
      onChange={handleDateChange}
      inputFormat="yyyy-MM-dd"
      animateYearScrolling
    />
    </LocalizationProvider>
  );
}