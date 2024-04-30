import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import StripedDataGrid from './StripedDataGrid'; // Import the StripedDataGrid component
import CustomToolbar from './CustomToolbar'; // Import the CustomToolbar component
import dayjs from 'dayjs';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import MoreVertIcon from '@mui/icons-material/MoreVert';
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

const CommentsCell = ({ value, row, onCellValueChange }) => {
    const [open, setOpen] = useState(false);
    const [tempComment, setTempComment] = useState(value);

    const handleOpen = () => {
        setOpen(true);
        setTempComment(value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        setOpen(false);
        onCellValueChange({
            id: row.id,
            field: 'comment',
            value: tempComment,
        });
    };

    const handleCommentChange = (event) => {
        setTempComment(event.target.value);
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={handleOpen} aria-label="more">
                <MoreVertIcon />
            </IconButton>
            <span>{value}</span>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
                <DialogTitle>Comment</DialogTitle>
                <DialogContent>
                    <input 
                        type="text" 
                        value={tempComment} 
                        onChange={handleCommentChange} 
                        autoFocus 
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};


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
        <Box sx={{ minWidth: 120 }}>
            <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
                <Select
                    labelId="head-select-label"
                    id="head-select"
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
                const formattedData = data.map((item) => ({
                    ...item,
                    id: item.combo,
                }));
                setOrders(formattedData);
            } catch (error) {
                console.error("Failed to fetch orders:", error);
            }
        };

        fetchOrders();
    }, []);

    useEffect(() => {
        const handleFocusLoss = (event) => {
            console.log('Focus lost to:', document.activeElement);
        };
    
        document.addEventListener('focusout', handleFocusLoss);
        return () => {
            document.removeEventListener('focusout', handleFocusLoss);
        };
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
        { field: 'id', headerName: 'Combo', width: 145, headerClassName: 'super-app-theme--header', hide: true },
        { field: 'lat', headerName: 'Lat', width: 70, headerClassName: 'super-app-theme--header', hide: true },
        { field: 'sg', headerName: 'SG', width: 60, headerClassName: 'super-app-theme--header' },
        { field: 'name', headerName: 'Name', flex: 1, headerClassName: 'super-app-theme--header' },
        { field: 'phone', headerName: 'Phone', width: 85, headerClassName: 'super-app-theme--header' },
        { field: 'flow', headerName: 'Flow', width: 60, headerClassName: 'super-app-theme--header' },
        { field: 'hours', headerName: 'Hours', width: 10, headerClassName: 'super-app-theme--header' },
        { field: 'acre', headerName: 'Acre', width: 10, headerClassName: 'super-app-theme--header' },
        { field: 'crop', headerName: 'Crop', width: 10, headerClassName: 'super-app-theme--header' },
        { field: 'type', headerName: 'Type', width: 10, headerClassName: 'super-app-theme--header' },
        { field: 'date', headerName: 'Date', width: 60, headerClassName: 'super-app-theme--header',
            valueFormatter: (params) => dayjs(params.value).format('MM/DD')  
        },
        { field: 'ex', headerName: 'EX', width: 10, headerClassName: 'super-app-theme--header' },
        { field: 'final', headerName: 'Final', width: 10, headerClassName: 'super-app-theme--header' },
        { field: 'comment', headerName: 'Comment', flex: 1, headerClassName: 'super-app-theme--header',
            renderCell: (params) => <CommentsCell {...params} onCellValueChange={handleCellEditCommit} />
        },
        { field: 'sbxcfs', headerName: 'SBXCFS', width: 70, headerClassName: 'super-app-theme--header' },
        { field: 'head', headerName: 'Head', width: 100, headerClassName: 'super-app-theme--header',
            renderCell: (params) => <HeadEditor 
                id={params.id} 
                value={params.value} 
                onCellValueChange={handleCellEditCommit} 
            />
        },
        { field: 'est_start', headerName: 'Est Start', flex: 1, headerClassName: 'super-app-theme--header',
            renderCell: (params) => <DatePickerCell 
                id={params.id} 
                value={params.value ? dayjs(params.value) : null} 
                onCellValueChange={handleCellEditCommit} 
            />
        },
        { field: 'est_finish', headerName: 'Est Finish', flex: 1, headerClassName: 'super-app-theme--header' },
        { field: 'called', headerName: 'Called', flex: 1, headerClassName: 'super-app-theme--header',
            renderCell: (params) => <CalledEditor 
                id={params.id} 
                value={params.value} 
                onCellValueChange={handleCellEditCommit} 
            />
        },
    ];

    return (
        <Box sx={{ height: '93vh', width: '100%', paddingLeft: 4, paddingRight: 4, '& .super-app-theme--header': { backgroundColor: 'rgba(101, 176, 193, 0.5)' } }}>
            <StripedDataGrid
                rows={orders}
                columns={columns}
                pageSize={5}
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
                        final: false,
                        called: false
                      },
                    },
                }}
            />
        </Box>
    );
}
