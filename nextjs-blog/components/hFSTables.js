import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import StripedDataGrid from './StripedDataGrid'; // Import the StripedDataGrid component
import CustomToolbar from './CustomToolbar';
import dayjs from 'dayjs';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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



export default function HFSTable({ orders, headerColor, requiredString }) {
    console.log("Orders in HFSTable for", requiredString, ":", orders);

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
        { field: 'id', headerName: requiredString, width: 150, headerClassName: 'super-app-theme--header' },
        { field: 'sg', headerName: 'SG', width: 75, headerClassName: 'super-app-theme--header'},
        { field: 'name', headerName: 'Contact', flex: 1, headerClassName: 'super-app-theme--header'},
        { field: 'hours', headerName: 'Hours', width: 75, headerClassName: 'super-app-theme--header'},
        { field: 'est_start', headerName: 'Est Start', headerClassName: 'super-app-theme--header',
            renderCell: (params) => <DatePickerCell 
                id={params.id} 
                value={params.value ? dayjs(params.value) : null} 
                onCellValueChange={handleCellEditCommit} 
            />
        },
        { field: 'called', headerName: 'Called', flex: 1, headerClassName: 'super-app-theme--header',
            renderCell: (params) => <CalledEditor 
                id={params.id} 
                value={params.value} 
                onCellValueChange={handleCellEditCommit} 
            /> 
        },
    ];

    return (
        <Box sx={{height: 420, width: '39vw', paddingLeft: 1, paddingRight: 4, '& .super-app-theme--header': { backgroundColor: headerColor }}}>
            <StripedDataGrid
                rows={orders}
                columns={columns}  
                slots={{ toolbar: CustomToolbar }}
                getRowClassName={getRowClassName}
                onProcessRowUpdateError={handleProcessRowUpdateError}
                hideFooter
            />
        </Box>
    );
}