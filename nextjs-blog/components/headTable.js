import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import StripedDataGrid from './StripedDataGrid'; // Import the StripedDataGrid component
import CustomToolbar from './CustomToolbar'; // Import the CustomToolbar component
import useSWR from "swr";
import fetcher from '../utils/fetcher';
import dayjs from 'dayjs';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


const DatePickerCell = ({ value, id, onCellValueChange }) => {
    const [selectedDate, setSelectedDate] = useState(value ? dayjs(value) : null);

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
        if (newDate && newDate.isValid()) { 
            onCellValueChange({
                id: id,
                field: 'est_start',
                value: newDate.format('YYYY-MM-DD HH:mm:ss'),
            });
        } else {
            onCellValueChange({
                id: id,
                field: 'est_start',
                value: null,
            });
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
                label=""
                value={selectedDate}
                onChange={handleDateChange}
                inputFormat="YYYY-MM-DD HH:mm:ss"
                ampm={false}
                renderInput={(props) => <input {...props} />}
            />
        </LocalizationProvider>
    );
};



export default function HeadTable(props) {
    const { requiredString, headerColor  } = props;
    console.log(requiredString);
    const [orders, setOrders] = useState([]);

    const handleProcessRowUpdateError = React.useCallback((error) => {
        console.log(error);
    }, []);

    const {data, error, loading} = useSWR(`http://127.0.0.1:5000/${requiredString}`, fetcher, {refreshInterval: 1000});

    if (error) return <div>Failed to load</div>
    if (loading) return <div>Loading</div>

    if (!data) return <div>No Data</div>

    const handleCellEditCommit = async (updatedRow) => {
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

    const head1 = data.map((item) => ({
        ...item,
        id: item.combo, // Use `combo` as the `id`
    }));


    // Creates column definitions for the DataGrid
    const columns = [
        { field: 'id', headerName: 'Combo', width: 130, hide: true, headerClassName: 'super-app-theme--header' },
        { field: 'lat', headerName: 'Lateral', flex: 1, headerClassName: 'super-app-theme--header' },
        { field: 'sg', headerName: 'SG', flex: 1, headerClassName: 'super-app-theme--header' },
        { field: 'name', headerName: 'Contact', flex: 2, headerClassName: 'super-app-theme--header' },
        { field: 'phone', headerName: 'Phone', flex: 1, headerClassName: 'super-app-theme--header' },
        { field: 'flow', headerName: 'Rqst Flo', flex: 1, headerClassName: 'super-app-theme--header' },
        { field: 'hours', headerName: 'Hours', flex: 1, headerClassName: 'super-app-theme--header' },
        { field: 'est_start', headerName: 'Est Start', editable: true, flex: 1.25, headerClassName: 'super-app-theme--header',
            renderCell: (params) => <DatePickerCell 
                id={params.id} 
                value={params.value ? dayjs(params.value) : null} 
                onCellValueChange={handleCellEditCommit} 
            />
        },
        { field: 'prime_date', headerName: 'Prime Date', editable: true, flex: 1, headerClassName: 'super-app-theme--header' },
        { field: 'prime_time', headerName: 'Prime Time', editable: true, flex: 1, headerClassName: 'super-app-theme--header' },
        { field: 'start_date', headerName: 'Start Date', editable: true, flex: 1, headerClassName: 'super-app-theme--header' },
        { field: 'start_time', headerName: 'Start Time', editable: true, flex: 1, headerClassName: 'super-app-theme--header' },
        { field: 'finish_date', headerName: 'Finish Date', editable: true, flex: 1, headerClassName: 'super-app-theme--header' },
        { field: 'finish_time', headerName: 'Finish Time', editable: true,  flex: 1, headerClassName: 'super-app-theme--header' },
        { field: 'prime_total', headerName: 'Prime Total', flex: 1, headerClassName: 'super-app-theme--header' },
        { field: 'total_hours', headerName: 'Total Hour', flex: 1, headerClassName: 'super-app-theme--header' },
        { field: 'called', headerName: 'Called', editable: true, flex: 1, headerClassName: 'super-app-theme--header' },
    ];



    return (
        <Box sx = {{height: 'auto', width: '100%', paddingLeft: 4, paddingRight: 4, '& .super-app-theme--header': { backgroundColor: headerColor } }}>
            <StripedDataGrid
                rows={orders}
                columns={columns}
                slots={{
                    toolbar: CustomToolbar
                }}
                getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                }
                onProcessRowUpdateError={handleProcessRowUpdateError}
                hideFooter
            />
        </Box>
    );
}
}