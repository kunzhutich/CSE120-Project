import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import StripedDataGrid from './StripedDataGrid';
import CustomToolbar from './CustomToolbar';
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

const DatePickerCell = ({ value, id, onCellValueChange }) => {
    const [selectedDate, setSelectedDate] = useState(value);

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
        onCellValueChange({
            id: id,
            field: 'est_start',
            value: newDate ? newDate.format('YYYY-MM-DD HH:mm:ss') : null,
        });
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

// const CommentsCell = ({ value, row }) => {
//     const [open, setOpen] = useState(false);
//     const [comment, setComment] = useState(value || row.comments);

//     const handleClickOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);
//     const handleCommentChange = (event) => setComment(event.target.value);

//     return (
//         <div style={{ display: 'flex', alignItems: 'center' }}>
//             <IconButton onClick={handleClickOpen} aria-label="more">
//                 <MoreVertIcon />
//             </IconButton>
//             <span>{comment}</span>
//             <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
//                 <DialogTitle>Comment</DialogTitle>
//                 <DialogContent>
//                     <DialogContentText>{comment}</DialogContentText>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose}>Close</Button>
//                 </DialogActions>
//             </Dialog>
//         </div>
//     );
// };

//THE ABOVE FUNCTION WAS ORIGINALLY IN HERE
//AND THE BELOW CODE IS FROM fTable.js

const CommentsCell = ({ value, row, onCellValueChange }) => {
    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState(value || row.comments);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleCommentChange = (event) => {
        const newComment = event.target.value;
        setComment(newComment);
        onCellValueChange({
            id: row.id,
            field: 'comment',
            value: newComment,
        });
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={handleClickOpen} aria-label="more">
                <MoreVertIcon />
            </IconButton>
            <span>{comment}</span>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
                <DialogTitle>Comment</DialogTitle>
                <DialogContent>
                    <DialogContentText>{comment}</DialogContentText>
                    <input type="text" value={comment} onChange={handleCommentChange} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

const HeadEditor = ({ value, onCellValueChange }) => {
    const headOptions = [
        { value: 'm', label: 'Micro Order' },
    ];

    const handleChange = (event) => onCellValueChange(event.target.value);

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

export default function MordersTable() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const sa = sessionStorage.getItem('sa');
                const response = await fetch('http://127.0.0.1:5000/morders', {
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

    const handleCellEditCommit = async (params) => {
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

    // const columns = [
    //     { field: 'combo', headerName: 'Combo', flex: 2.5, headerClassName: 'super-app-theme--header'},
    //     { field: 'lat', headerName: 'Lat', flex: 1, headerClassName: 'super-app-theme--header' },
    //     { field: 'sg', headerName: 'SG', flex: 1, headerClassName: 'super-app-theme--header' },
    //     { field: 'name', headerName: 'Name', flex: 1.5, headerClassName: 'super-app-theme--header' },
    //     { field: 'phone', headerName: 'Phone', flex: 1.5, headerClassName: 'super-app-theme--header' },
    //     { field: 'flow', headerName: 'Flow', flex: 1, headerClassName: 'super-app-theme--header' },
    //     { field: 'hours', headerName: 'Hours', flex: 1, headerClassName: 'super-app-theme--header' },
    //     // { field: 'type', headerName: 'Type', flex: 1, headerClassName: 'super-app-theme--header' },
    //     { field: 'date', headerName: 'Date', flex: 1, headerClassName: 'super-app-theme--header' },
    //     { field: 'tranTime', headerName: 'Trantime', flex: 1.5, headerClassName: 'super-app-theme--header' },
    //     { field: 'ex', headerName: 'EX', flex: 1, headerClassName: 'super-app-theme--header' },
    //     { field: 'final', headerName: 'Final', flex: 0.25, headerClassName: 'super-app-theme--header' },
    //     { field: 'comment', headerName: 'Comment', editable: true,  flex: 2, renderCell: (params) => <CommentsCell {...params} />, headerClassName: 'super-app-theme--header' },
    //     { field: 'sbxcfs', headerName: 'SBXCFS', flex: 1, headerClassName: 'super-app-theme--header' },
    //     { field: 'head', headerName: 'Head', editable: true, flex: 1.75, headerClassName: 'super-app-theme--header', renderCell: (params)=> <HeadEditor value = {params.value} 
    //     onCellValueChange= {(newValue) => params.api.setValue(params.id, 'head', newValue)} /> },
    //     { field: 'estStart', headerName: 'Est Start', flex: 1.25, headerClassName: 'super-app-theme--header', 
    //         renderCell: (params) => <DatePickerCell
    //         id={params.id}
    //         value={params.value ? dayjs(params.value) : null}
    //         onCellValueChange={handleCellEditCommit}
    //         /> 
    //     },
    //     { field: 'estFinish', headerName: 'Est Finish', editable: true, flex: 1.25, headerClassName: 'super-app-theme--header' },
    //     { field: 'attention', headerName: 'Attention', editable: true, flex: 1, headerClassName: 'super-app-theme--header' },
    // ];

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
        { field: 'date', headerName: 'Date', flex: 1, headerClassName: 'super-app-theme--header' },
        { field: 'comment', headerName: 'Comment', editable: true, flex: 1.5, headerClassName: 'super-app-theme--header',
            renderCell: (params) => <CommentsCell {...params} onCellValueChange={handleCellEditCommit} />
        },
        { field: 'sbxcfs', headerName: 'SBXCFS', flex: 1, headerClassName: 'super-app-theme--header' },
        { field: 'head', headerName: 'Head', editable: true, flex: 1.5, headerClassName: 'super-app-theme--header',
            renderCell: (params) => <HeadEditor 
                id={params.id} 
                value={params.value} 
                onCellValueChange={handleCellEditCommit} 
            />
        },
        { field: 'est_start', headerName: 'Est Start', editable: true, flex: 1.25, headerClassName: 'super-app-theme--header',
            renderCell: (params) => <DatePickerCell 
                id={params.id} 
                value={params.value ? dayjs(params.value) : null} 
                onCellValueChange={handleCellEditCommit} 
            />
        },
        { field: 'est_finish', headerName: 'Est Finish', flex: 1, headerClassName: 'super-app-theme--header' },
    ];

    return (
        <Box sx={{ height: '90vh', width: '100%', paddingLeft: 4, paddingRight: 4, '& .super-app-theme--header': { backgroundColor: 'rgba(101, 176, 193, 0.5)' }}}>
            <StripedDataGrid
                rows={orders}
                columns={columns}
                slots={{
                    toolbar: CustomToolbar,
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