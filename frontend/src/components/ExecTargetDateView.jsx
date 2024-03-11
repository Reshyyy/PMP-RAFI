import * as React from 'react';
import { useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function ExecTargetDateView({ onTargetDateChange, targetDate }) {
  const [selectedTargetDate, setSelectedTargetDate] = useState(null);

  const handleTargetDateChange = (targetDate) => {
    setSelectedTargetDate(onTargetDateChange)
    if (onTargetDateChange) {
      onTargetDateChange(targetDate);
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Target Date"
        inputFormat="yyyy-MM-dd"
        value={dayjs(targetDate || selectedTargetDate)}
        onChange={handleTargetDateChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
