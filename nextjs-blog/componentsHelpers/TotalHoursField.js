import React from 'react';
import { TextField } from '@mui/material';

const formatHoursToHHMMSS = (decimalHours) => {
    if (decimalHours === null || decimalHours === undefined || isNaN(decimalHours)) return '';
    const hours = Math.floor(decimalHours);
    const totalMinutes = Math.floor(decimalHours * 60);
    const minutes = totalMinutes % 60;
    const totalSeconds = Math.round(decimalHours * 3600);
    const seconds = totalSeconds % 60;

    // Avoid rounding seconds to 60 by calculating seconds relative to total minutes
    let adjustedMinutes = minutes;
    let adjustedHours = hours;
    if (seconds === 60) {
        adjustedMinutes += 1;
        if (adjustedMinutes === 60) {
            adjustedMinutes = 0;
            adjustedHours += 1;
        }
        return `${String(adjustedHours).padStart(2, '0')}:${String(adjustedMinutes).padStart(2, '0')}:00`;
    }

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export const TotalHoursField = ({ value, id, onCellValueChange, field }) => {
    const handleTimeChange = (event) => {
        const hours = parseHHMMSSToHours(event.target.value);
        onCellValueChange({
            id: id,
            field: field,
            value: hours,
        });
    };

    return (
        <TextField
            value={formatHoursToHHMMSS(value)}
            onChange={handleTimeChange}
            placeholder="HH:MM:SS"
            fullWidth
        />
    );
};