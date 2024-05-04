import React, { useState, useEffect } from 'react';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';


dayjs.extend(customParseFormat);

export const DatePickerCell = ({ value, id, onCellValueChange, field }) => {
    const [selectedDate, setSelectedDate] = useState(value ? dayjs(value) : null);

    useEffect(() => {
        setSelectedDate(value ? dayjs(value) : null);
    }, [value]);

    const handleDateChange = (newDate) => {
        if (newDate && dayjs(newDate).isValid()) { 
            onCellValueChange({
                id: id,
                field: field, 
                value: newDate.format('YYYY-MM-DD HH:mm:ss'),
            });
        } else {
            onCellValueChange({
                id: id,
                field: field,
                value: null,
            });
        }
        setSelectedDate(newDate);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
                label=""
                value={selectedDate}
                onChange={handleDateChange}
                inputFormat="YYYY-MM-DD HH:mm:ss"
                views={['month', 'day', 'hours', 'minutes', 'seconds']}
                format="M/D, HH:mm:ss"
                ampm={false}
                renderInput={(props) => <input {...props} />}
            />
        </LocalizationProvider>
    );
};