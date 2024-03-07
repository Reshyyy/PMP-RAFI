import * as React from 'react';
import { useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function ExecutionDeliveryDate({ onDateChange, date }) {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateChange(date);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
      label="Delivery Date"
      readOnly
      // value={selectedDate != null ? dayjs(selectedDate) : null}
      value={dayjs(date || selectedDate)}
      onChange={handleDateChange}
      inputFormat="yyyy-MM-dd"
      animateYearScrolling
    />
    </LocalizationProvider>
  );
}