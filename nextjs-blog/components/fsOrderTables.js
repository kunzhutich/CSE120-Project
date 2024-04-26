import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import StripedDataGrid from './StripedDataGrid'; // Import the StripedDataGrid component
import {GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton,
        GridToolbarDensitySelector, DataGrid} from '@mui/x-data-grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// Define the options for the dropdown menu
const headOptions = [
    { value: 'h1', label: 'Head 1' },
    { value: 'h2', label: 'Head 2' },
    { value: 'h3', label: 'Head 3' },
    { value: 'h4', label: 'Head 4' },
    { value: 'h5', label: 'Head 5' },
    { value: 'un', label: 'Unordered' },

];

// Define a custom editor for the 'Head' field
const HeadEditor = ({ value, onCellValueChange, id }) => {
    const headOptions = [
        { value: 'h1', label: 'Head 1' },
        { value: 'h2', label: 'Head 2' },
        { value: 'h3', label: 'Head 3' },
        { value: 'h4', label: 'Head 4' },
        { value: 'h5', label: 'Head 5' },
        { value: 'un', label: 'Unordered' },
    ];

    const handleChange = (event) => {
        onCellValueChange(id, event.target.value);
    };

    return (
        <select value={value || ''} onChange={handleChange}>
            <option value="">Select...</option>
            {headOptions.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default function FSTable({ orders, onHeadChange }) {
    const columns = [
        { field: 'id', headerName: 'Combo', width: 130, flex: 2, headerClassName: 'super-app-theme--header' },
        { field: 'lat', headerName: 'Lat', flex: 1, headerClassName: 'super-app-theme--header' },
        { field: 'sg', headerName: 'SG', flex: 1, headerClassName: 'super-app-theme--header' },
        { field: 'name', headerName: 'Name', flex: 2, headerClassName: 'super-app-theme--header' },
        { field: 'phone', headerName: 'Phone', flex: 1, headerClassName: 'super-app-theme--header' },
        { field: 'flow', headerName: 'Flow', flex: 1, headerClassName: 'super-app-theme--header' },
        { field: 'hours', headerName: 'Hours', flex: 1, headerClassName: 'super-app-theme--header' },
        { field: 'crop', headerName: 'Crop', flex: 1, headerClassName: 'super-app-theme--header' },
        { field: 'date', headerName: 'Date', editable: true, flex: 1, headerClassName: 'super-app-theme--header' },
        { field: 'head', headerName: 'Head', editable: true, flex: 1.5, headerClassName: 'super-app-theme--header',
            renderCell: (params) => <HeadEditor 
                id={params.id} 
                value={params.value} 
                onCellValueChange={onHeadChange} 
            />
        },
    ];

    return (
        <Box sx={{ height: '93vh', width: '60vw', paddingLeft: 4, paddingRight: 1, '& .super-app-theme--header': { backgroundColor: 'rgba(101, 176, 193, 0.5)' }}}>
            <StripedDataGrid
                rows={orders}
                columns={columns}
                slots={{ toolbar: CustomToolbar }}
                hideFooter
                getRowClassName={(params) => params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'}
            />
        </Box>
    );
}