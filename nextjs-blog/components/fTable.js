import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import StripedDataGrid from './StripedDataGrid'; // Import the StripedDataGrid component
import CustomToolbar from './CustomToolbar'; // Import the CustomToolbar component


// Define the columns for the DataGrid
const columns = [
    { field: 'id', headerName: 'Combo', width: 130, flex: 2, headerClassName: 'super-app-theme--header' },
    { field: 'lat', headerName: 'Lat', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'sg', headerName: 'SG', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'name', headerName: 'Name', flex: 2, headerClassName: 'super-app-theme--header' },
    { field: 'phone', headerName: 'Phone', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'flow', headerName: 'Flow', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'hours', headerName: 'Hours', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'acre', headerName: 'Acre', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'crop', headerName: 'Crop', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'type', headerName: 'Type', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'date', headerName: 'Date', editable: true, flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'sbxcfs', headerName: 'SBXCFS', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'head', headerName: 'Head', editable: true, flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'estStart', headerName: 'Est Start', editable: true, flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'estStop', headerName: 'Est Stop', editable: true, flex: 1, headerClassName: 'super-app-theme--header' },
];

export default function FTable() {
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

    const handleProcessRowUpdateError = React.useCallback((error) => {
        console.log(error);
    }, []);

    

    return (
        <Box sx={{height: '100vh', width: '100%', paddingTop: 9, paddingLeft: 4, paddingRight: 4, '& .super-app-theme--header': {
          backgroundColor: 'rgba(101, 176, 193, 0.5)',}}}>
            <StripedDataGrid
                rows={orders}
                columns={columns}
                containerProps={{
                  sx: {overflowY: '100px'}
                }}
                pageSize={5}
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