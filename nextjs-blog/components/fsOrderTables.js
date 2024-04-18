import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import StripedDataGrid from './StripedDataGrid'; // Import the StripedDataGrid component
import CustomToolbar from './CustomToolbar'; // Import the CustomToolbar component

// Define the options for the dropdown menu
const headOptions = [
    { value: 'h1', label: 'Head 1' },
    { value: 'h2', label: 'Head 2' },
    { value: 'h3', label: 'Head 3' },
    { value: 'h4', label: 'Head 4' },
    { value: 'h5', label: 'Head 5' },
];

// Define a custom editor for the 'Head' field
const HeadEditor = ({ value, onCellValueChange }) => {
    const handleChange = (event) => {
        onCellValueChange(event.target.value);
    };

    return (
        <select value={value} onChange={handleChange}>
            {headOptions.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

const columns = [
    { field: 'id', headerName: 'Combo', width: 130, flex: 2 },
    { field: 'lat', headerName: 'Lat', flex: 1 },
    { field: 'sg', headerName: 'SG', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 2 },
    { field: 'phone', headerName: 'Phone', flex: 1 },
    { field: 'flow', headerName: 'Flow', flex: 1 },
    { field: 'hours', headerName: 'Hours', flex: 1 },
    { field: 'crop', headerName: 'Crop', flex: 1},
    { field: 'date', headerName: 'Date', editable: true, flex: 1 },
    { field: 'head', headerName: 'Head', editable: true, flex: 1, 
    renderCell: (params)=> <HeadEditor value = {params.value} 
    onCellValueChange= {(newValue) => params.api.setValue(params.id, 'head', newValue)} /> },
];


export default function FSTable() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const sa = sessionStorage.getItem('sa');
                const response = await fetch('http://127.0.0.1:5000/forders', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'SA': sa,
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                // Map the fetched data to include a unique 'id' for each row using 'combo'
                const formattedData = data.map((item) => ({
                    ...item,
                    id: item.combo, // Use `combo` as the `id`
                }));
                setOrders(formattedData);
            } catch (error) {
                console.error("Failed to fetch orders:", error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <Box sx={{height: 800, width: '60vw', paddingLeft: 4, paddingTop: 2}}>
            <StripedDataGrid
                rows={orders}
                columns={columns}
                hideFooter
                
                slots={{
                  toolbar: CustomToolbar
                }}
                getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                  }
            />
        </Box>
    );
}