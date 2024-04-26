import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import StripedDataGrid from './StripedDataGrid'; // Import the StripedDataGrid component
import {GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton,
        GridToolbarDensitySelector, DataGrid} from '@mui/x-data-grid';
import CustomToolbar from './CustomToolbar';
import dayjs from 'dayjs';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import useSWR from "swr";
import fetcher from '../utils/fetcher';


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



export default function HFSTable(props) {
    const { requiredString, headerColor  } = props;
    console.log(requiredString);
    const [orders, setOrders] = useState([]);

    const {data, error, loading} = useSWR(`http://127.0.0.1:5000/${requiredString}`, fetcher, {refreshInterval: 1000});

    if (error) return <div>Failed to load</div>
    if (loading) return <div>Loading</div>

    if(!data) return <div>No Data</div>

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
        console.log(error);
    }, []);

    // Creates column definitions for the DataGrid
    const columns = [
        { field: 'id', headerName: 'Head', width: 150, headerClassName: 'super-app-theme--header' },
        { field: 'sg', headerName: 'SG', width: 75, headerClassName: 'super-app-theme--header'},
        { field: 'name', headerName: 'Contact', width: 250, headerClassName: 'super-app-theme--header'},
        { field: 'hours', headerName: 'Hours', width: 75, headerClassName: 'super-app-theme--header'},
        { field: 'est_start', headerName: 'Est Start', editable: true, headerClassName: 'super-app-theme--header',
            renderCell: (params) => <DatePickerCell 
                id={params.id} 
                value={params.value ? dayjs(params.value) : null} 
                onCellValueChange={handleCellEditCommit} 
            />
        },
    ];



    const head1 = data.map((item) => ({
        ...item,
        id: item.combo,
    }))


    return (
        <Box sx = {{height: 420, width: '39vw', paddingLeft: 2, paddingRight: 4, '& .super-app-theme--header': { backgroundColor: headerColor }}}>
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

    // return (
    //     <Box sx = {{height: 420, width: '39vw', paddingLeft: 2, paddingRight: 4, '& .super-app-theme--header': { backgroundColor: headerColor }}}>
    //         <StripedDataGrid
    //             rows={head1}
    //             columns={columns}
    //             hideFooter
    //             slots={{
    //                 toolbar: CustomToolbar
    //             }}
    //             getRowClassName={(params) =>
    //                 params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
    //             }
    //             processRowUpdate={(updatedRow, originalRow) =>
    //                     handleCellEditCommit(updatedRow)
    //             }
    //         />
    //     </Box>
    // );
}