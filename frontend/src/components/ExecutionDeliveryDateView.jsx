import * as React from 'react';
import { useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function ExecutionDeliveryDateView({ onDateDeliveryDateChange, dateDDate }) {
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState(dayjs());

  const handleDateChange = (dateDDate) => {
    const formattedDate = dateDDate.format('YYYY-MM-DDTHH:mm:ss.SSSZ');
    setSelectedDeliveryDate(dateDDate);
    if (onDateDeliveryDateChange) {
      onDateDeliveryDateChange(formattedDate);
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
      label="Delivery Date"
      // value={selectedDeliveryDate != null ? dayjs(selectedDeliveryDate) : null}
      value={dateDDate || selectedDeliveryDate}
      onChange={handleDateChange}
      inputFormat="yyyy-MM-dd"
      animateYearScrolling
    />
    </LocalizationProvider>
  );
}