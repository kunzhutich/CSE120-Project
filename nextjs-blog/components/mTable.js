import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import CustomToolbar from './CustomToolbar';
import dayjs from 'dayjs';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import StripedDataGrid from './StripedDataGrid';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const DatePickerCell = ({ value, id, onCellValueChange, field }) => {
    const [selectedDate, setSelectedDate] = useState(value ? dayjs(value) : null);

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
        if (newDate && newDate.isValid()) { 
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

const CalledEditor = ({ value, onCellValueChange, id }) => {
    const headOptions = [
        { value: 'C', label: 'C' },
        { value: 'O', label: 'O' },
    ];

    const handleChange = (event) => {
        onCellValueChange({
            id: id,
            field: 'called',
            value: event.target.value
        });
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
                <Select
                    labelId="called-select-label"
                    id="called-select"
                    value={value || ''}
                    onChange={handleChange}
                    autoWidth
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    sx={{ fontSize: '0.65rem'}}
                >
                    <MenuItem value="">
                        <em>Select...</em>
                    </MenuItem>
                    {headOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

const getRowClassName = (params) => {
    if (params.row.called === "O") {
        return `dark-gray ${params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'}`;
    }
    if (params.row.ex === 'Y' || params.row.final === 'Y') {
        return `abnormal ${params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'}`;
    }
    return params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd';
}



export default function MTable() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const sa = sessionStorage.getItem('sa');
                const response = await fetch('http://127.0.0.1:5000/M', {
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


    // Creates column definitions for the DataGrid
    const columns = [
        { field: 'id', headerName: 'Combo', width: 145, hide: true, headerClassName: 'super-app-theme--header' },
        { field: 'lat', headerName: 'Lateral', width: 70, headerClassName: 'super-app-theme--header' },
        { field: 'sg', headerName: 'SG', width: 60, headerClassName: 'super-app-theme--header' },
        { field: 'name', headerName: 'Contact', flex: 1, headerClassName: 'super-app-theme--header' },
        { field: 'phone', headerName: 'Phone', width: 85, headerClassName: 'super-app-theme--header' },
        { field: 'flow', headerName: 'Flow', width: 80, headerClassName: 'super-app-theme--header' },
        { field: 'hours', headerName: 'Hours', width: 10, headerClassName: 'super-app-theme--header' },
        { field: 'est_start', headerName: 'Est Start', flex: 1, headerClassName: 'super-app-theme--header',
            renderCell: (params) => <DatePickerCell 
                id={params.id} 
                value={params.value ? dayjs(params.value) : null} 
                onCellValueChange={handleCellEditCommit} 
                field="est_start"
            />
        },
        { field: 'prime_datetime', headerName: 'Prime DateTime', flex: 1, headerClassName: 'super-app-theme--header',
            renderCell: (params) => <DatePickerCell 
                id={params.id} 
                value={params.value ? dayjs(params.value) : null} 
                onCellValueChange={handleCellEditCommit} 
                field="prime_datetime"
            /> 
        },
        { field: 'start_datetime', headerName: 'Start DateTime', flex: 1, headerClassName: 'super-app-theme--header',
            renderCell: (params) => <DatePickerCell 
                id={params.id} 
                value={params.value ? dayjs(params.value) : null} 
                onCellValueChange={handleCellEditCommit} 
                field="start_datetime"
            /> 
        },
        { field: 'finish_datetime', headerName: 'Finish DateTime', flex: 1, headerClassName: 'super-app-theme--header',
            renderCell: (params) => <DatePickerCell 
                id={params.id} 
                value={params.value ? dayjs(params.value) : null} 
                onCellValueChange={handleCellEditCommit} 
                field="finish_datetime"
            /> 
        },
        { field: 'prime_total', headerName: 'Prime Total', flex: 1, headerClassName: 'super-app-theme--header' },
        { field: 'total_hours', headerName: 'Total Hour', flex: 1, headerClassName: 'super-app-theme--header' },
        { field: 'called', headerName: 'Called', flex: 1, headerClassName: 'super-app-theme--header',
            renderCell: (params) => <CalledEditor 
                id={params.id} 
                value={params.value} 
                onCellValueChange={handleCellEditCommit} 
            /> 
        },
    ];


    return (
        <Box sx={{ height: '93vh', width: '100', paddingLeft: 4, paddingRight: 4, '& .super-app-theme--header': { backgroundColor: 'rgba(255, 165, 0, 1)' } }}>
            <StripedDataGrid
                rows={orders}
                columns={columns}
                slots={{
                    toolbar: CustomToolbar
                }}
                getRowClassName={getRowClassName}
                onProcessRowUpdateError={handleProcessRowUpdateError}
                hideFooter
                initialState={{
                    columns: {
                      columnVisibilityModel: {
                        acre: false,
                        crop: false,
                        type: false,
                        ex: false,
                        final: false
                      },
                    },
                }}
            />
        </Box>
    );
}