import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import StripedDataGrid from './StripedDataGrid'; // Import the StripedDataGrid component
import {GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton,
        GridToolbarDensitySelector, DataGrid} from '@mui/x-data-grid';

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
const HeadEditor = ({ value, onCellValueChange }) => {
    const handleChange = (event) => {
        onCellValueChange(event.target.value);
    };

    return (
        <select value={value} onChange={handleChange}>
            <option value="">Select...</option>
            {headOptions.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

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
    { field: 'head', headerName: 'Head', editable: true, flex: 1.5, 
    renderCell: (params)=> <HeadEditor value = {params.value} 
    onCellValueChange= {(newValue) => params.api.setValue(params.id, 'head', newValue)} />, headerClassName: 'super-app-theme--header' },
];

// Custom toolbar for datagrid settings
function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector
          slotProps={{ tooltip: { title: 'Change density' } }}
        />
      </GridToolbarContainer>
    );
  }

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



    const handleCellEditCommit = async (updatedRow) => {
        try {
            const { id, ...updatedOrder } = updatedRow; // Destructure the updatedRow object to get id and rest of the updatedOrder
            const updatedOrders = orders.map(order =>
                order.id === id ? { ...order, ...updatedOrder } : order
            );
            setOrders(updatedOrders);

            const encodedId = encodeURIComponent(id);

            // Send the updated data to your backend API for saving
            const sa = sessionStorage.getItem('sa');
            const response = await fetch(`http://127.0.0.1:5000/updateOrder/${encodedId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'SA': sa,
                },
                body: JSON.stringify(updatedOrder), // Send the entire updatedOrder object
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            if (response.ok) {
                console.log(message);
            }
        } catch (error) {
            console.error('Failed to update order:', error);
        };
    };

    const HeadEditor = ({ value, onCellValueChange }) => {
        const handleChange = (event) => {
            const newValue = event.target.value;
            onCellValueChange(newValue);
        };

        return (
            <select value={value} onChange={handleChange}>
                <option value="">Select...</option>
                {headOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        );
    };

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
        {
            field: 'head', headerName: 'Head', editable: true, flex: 1.5,  headerClassName: 'super-app-theme--header',
            renderCell: (params) => <HeadEditor
                value={params.value}
                onCellValueChange={(newValue) => handleCellEditCommit({ id: params.id, head: newValue })}
            />
        },
    ];

    return (
        <Box sx={{height: '100vh', width: '60vw', paddingLeft: 4, '& .super-app-theme--header': {
            backgroundColor: 'rgba(101, 176, 193, 0.5)',
          }}}>
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
                processRowUpdate={(updatedRow, originalRow) =>
                    handleCellEditCommit(updatedRow)
                }
            />
        </Box>
    );
}