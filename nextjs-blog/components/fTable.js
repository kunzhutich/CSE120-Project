import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import {GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton,
        GridToolbarDensitySelector, DataGrid} from '@mui/x-data-grid';

import StripedDataGrid from './StripedDataGrid'; // Import the StripedDataGrid component
import CustomToolbar from './CustomToolbar'; // Import the CustomToolbar component
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import DialogContentText from '@mui/material/DialogContentText';
import IconButton from '@mui/material/IconButton';


// const DatePickerCell = () => {
//   const [selectedDate, setSelectedDate] = useState(null);

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DateTimePicker
//         label=""
//         value={selectedDate}
//         onChange={(date) => setSelectedDate(date)}
//         renderInput={(props) => <input {...props} readOnly />}
//         renderOpenPicker={(openPicker) => (
//           <input
//             type="text"
//             value={selectedDate ? dayjs(selectedDate).format('MM/DD/YYYY') : ''}
//             onFocus={openPicker}
//             readOnly
//           />
//         )}
//       />
//     </LocalizationProvider>
//   );
// };

const DatePickerCell = (props) => {
    const { value, id, onCellValueChange } = props;
    const [selectedDate, setSelectedDate] = useState(value);
  
    const handleDateChange = (newDate) => {
      setSelectedDate(newDate);
      onCellValueChange({
        id: id,
        estStart: newDate ? newDate.format('YYYY-MM-DD HH:mm:ss') : null,
      });
    };
  
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label=""
          value={selectedDate}
          onChange={handleDateChange}
          renderInput={(props) => <input {...props} readOnly />}
        />
      </LocalizationProvider>
    );
};

const CommentsCell = (props) => {
    const { value, row } = props;
    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState(value || row.comments);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleCommentChange = (event) => {
      setComment(event.target.value);
    };
  
    const handleMenuClose = (option) => {
      setComment(option);
      setOpen(false);
      props.onChange(option);
    };
  
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleClickOpen}
          >
            <MoreVertIcon />
          </IconButton>
          <span>{comment}</span>
        </div>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
          <DialogTitle>Comment</DialogTitle>
          <DialogContent>
            <DialogContentText>{comment}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };
  

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

// Define the columns for the DataGrid

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
        { field: 'comment', headerName: 'Comment', editable: true,  flex: 1.5, renderCell: (params) => <CommentsCell {...params} />, headerClassName: 'super-app-theme--header' },
        { field: 'sbxcfs', headerName: 'SBXCFS', flex: 1, headerClassName: 'super-app-theme--header' },
        { field: 'head', headerName: 'Head', editable: true, flex: 1.5, 
            renderCell: (params) => <HeadEditor
                value={params.value}
                onCellValueChange={(newValue) => handleCellEditCommit({ id: params.id, head: newValue })}
            />, headerClassName: 'super-app-theme--header' },
        // { field: 'estStart', headerName: 'Est Start', flex: 1, headerClassName: 'super-app-theme--header', renderCell: (params) => <DatePickerCell />  },
        { field: 'estStart', headerName: 'Est Start', flex: 1.25, headerClassName: 'super-app-theme--header', 
            renderCell: (params) => <DatePickerCell
            id={params.id}
            value={params.value ? dayjs(params.value) : null}
            onCellValueChange={handleCellEditCommit}
            /> 
        },
        { field: 'estStop', headerName: 'Est Stop', editable: true, flex: 1, headerClassName: 'super-app-theme--header' },
    ];
    

    return (
        <Box sx={{height: '90vh', width: '100%', paddingLeft: 4, paddingRight: 4, '& .super-app-theme--header': {
          backgroundColor: 'rgba(101, 176, 193, 0.5)',}}}>
            <StripedDataGrid
                rows={orders}
                columns={columns}
                pageSize={5}
                slots={{
                  toolbar: CustomToolbar
                }}
                hideFooter

                getRowClassName={(params) =>
                  params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                }
                onProcessRowUpdateError={handleProcessRowUpdateError}
            />
        </Box>
    );
}