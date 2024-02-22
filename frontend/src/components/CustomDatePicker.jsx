import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CustomDatePicker = () => {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        console.log("Selected Date:", date);
    };

    return (
        <div className="w-64 flex items-center">
            <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                isClearable
                placeholderText=" Select a date"
                className="w-full px-3 py-2 h-10 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
        </div>
    );
};

export default CustomDatePicker;
