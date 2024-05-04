import React, { useState, useEffect } from 'react';
import { DateTimeField, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { TextField } from '@mui/material';

export const FinishDateField = ({ value, id, onCellValueChange }) => {
    const [selectedDate, setSelectedDate] = useState(value ? dayjs(value) : null);

    useEffect(() => {
        setSelectedDate(value ? dayjs(value) : null);
    }, [value]);

    const handleDateChange = (newDate) => {
        if (newDate && dayjs(newDate).isValid()) { 
            onCellValueChange({
                id: id,
                field: "est_finish", 
                value: dayjs(newDate).format('YYYY-MM-DD HH:mm:ss'),
            });
        } else {
            onCellValueChange({
                id: id,
                field: "est_finish",
                value: null,
            });
        }
        setSelectedDate(newDate);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimeField
                label=""
                value={selectedDate}
                onChange={handleDateChange}
                renderInput={(props) => <TextField {...props} />}
                format="M/D, HH:mm:ss"
                ampm={false}
            />
        </LocalizationProvider>
    );
};
