import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import StripedDataGrid from './StripedDataGrid'; // Import the StripedDataGrid component
import CustomToolbar from './CustomToolbar'; 

// Define the options for the dropdown menu
const headOptions = [
    { value: 'h1', label: 'Head 1' },
    { value: 'h2', label: 'Head 2' },
    { value: 'h3', label: 'Head 3' },
    { value: 'h4', label: 'Head 4' },
    { value: 'h5', label: 'Head 5' },
    { value: 'un', label: 'Unordered' },

];

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
        onCellValueChange({
            id: id,
            field: 'head',
            value: event.target.value
        });
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


    const handleCellEditCommit = async (params) => {

        console.log("Final data being sent for update:", params);

        const { id, field, value } = params;
        const currentOrderData = orders.find(order => order.id === id);
        if (!currentOrderData) {
            console.error("Order not found");
            return;
        }
    
        const updatedOrder = { ...currentOrderData, [field]: value };
        console.log("Sending update for", id, updatedOrder);
    
        try {
            const encodedId = encodeURIComponent(id);
            const response = await fetch(`http://127.0.0.1:5000/updateOrder/${encodedId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'SA': sessionStorage.getItem('sa'),
                },
                body: JSON.stringify(updatedOrder),
            });
            if (!response.ok) {
                throw new Error('Failed to update order');
            }
            const updatedData = await response.json();
            console.log("Order updated successfully:", updatedData.message);
    
            // Optionally update local state to reflect backend confirmation
            setOrders(prevOrders => prevOrders.map(order => order.id === id ? { ...order, ...updatedOrder } : order));
        } catch (error) {
            console.error('Failed to update order:', error);
        }
    };

    const handleProcessRowUpdateError = React.useCallback((error) => {
        console.log('Update error:', error);
    }, []);


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
        { field: 'head', headerName: 'Head', editable: true, flex: 1.5,  headerClassName: 'super-app-theme--header',
            renderCell: (params) => <HeadEditor
                value={params.value}
                onCellValueChange={(newValue) => handleCellEditCommit({ id: params.id, head: newValue })}
            />
        },
    ];

    return (
        <Box sx={{height: '100vh', width: '60vw', paddingLeft: 4, '& .super-app-theme--header': { backgroundColor: 'rgba(101, 176, 193, 0.5)' }}}>
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
                onProcessRowUpdateError={handleProcessRowUpdateError}
            />
        </Box>
    );
}