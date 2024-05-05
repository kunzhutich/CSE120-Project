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

// const DatePickerCell = ({ value, id, hours, onCellValueChange, calculateFinish, setOrders }) => {
//     const [selectedDate, setSelectedDate] = useState(value ? dayjs(value) : null);

//     // const handleDateChange = (newDate) => {
//     //     setSelectedDate(newDate);
//     //     if (newDate && newDate.isValid()) { 
//     //         onCellValueChange({
//     //             id: id,
//     //             field: 'est_start',
//     //             value: newDate.format('YYYY-MM-DD HH:mm:ss'),
//     //         });
//     //     } else {
//     //         onCellValueChange({
//     //             id: id,
//     //             field: 'est_start',
//     //             value: null,
//     //         });
//     //     }
//     // };

//     const handleDateChange = (newDate) => {
//         setSelectedDate(newDate);
//         if (newDate && newDate.isValid()) {
//             const formattedDate = newDate.format('YYYY-MM-DD HH:mm:ss');
//             onCellValueChange({
//                 id: id,
//                 field: 'est_start',
//                 value: formattedDate,
//             });
//             // calculateFinish(id, formattedDate, hours, setOrders);
//             calculateFinish(formattedDate, hours);
//         } else {
//             onCellValueChange({
//                 id: id,
//                 field: 'est_start',
//                 value: null,
//             });
//         }
//     };

//     return (
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DateTimePicker
//                 label=""
//                 value={selectedDate}
//                 onChange={handleDateChange}
//                 inputFormat="YYYY-MM-DD HH:mm:ss"
//                 views={['month', 'day', 'hours', 'minutes', 'seconds']}
//                 format="M/D, HH:mm:ss"
//                 shouldRespectLeadingZeros
//                 ampm={false}
//                 renderInput={(props) => <input {...props} />}
//             />
//         </LocalizationProvider>
//     );
// };

const DatePickerCell = ({ value, id, hours, onCellValueChange, calculateFinish, setOrders }) => {
    const [selectedDate, setSelectedDate] = useState(value ? dayjs(value) : null);

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
        if (newDate && newDate.isValid()) {
            const formattedDate = newDate.format('YYYY-MM-DD HH:mm:ss');
            onCellValueChange({
                id: id,
                field: 'est_start',
                value: formattedDate,
            });
            const finishDate = calculateFinish(formattedDate, hours);
            if (finishDate) {
                // Update the state with the new finish date
                setOrders(prevOrders => prevOrders.map(order => 
                    order.id === id ? { ...order, est_start: formattedDate, est_finish: finishDate } : order
                ));
            }
        } else {
            onCellValueChange({
                id: id,
                field: 'est_start',
                value: null,
            });
            // Also reset est_finish if est_start is set to null
            setOrders(prevOrders => prevOrders.map(order => 
                order.id === id ? { ...order, est_start: null, est_finish: null } : order
            ));
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
                label=""
                value={selectedDate}
                onChange={handleDateChange}
                inputFormat="YYYY-MM-DD HH:mm:ss"
                views={['month', 'day', 'hours', 'minutes', 'seconds']}
                format="M/D, HH:mm:ss"
                shouldRespectLeadingZeros
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

// const handleFinishCalculation = (estStart, hours) => {
//     const estStartDate = new Date(estStart + 'Z'); // Append 'Z' to specify UTC time
//     estStartDate.setUTCHours(estStartDate.getUTCHours() + hours);
//     return estStartDate.toISOString().slice(0, 19).replace('T', ' ');
// }

// const handleFinishCalculation = (id, estStart, hours, setOrders) => {
//     console.log("Received estStart:", estStart); // Debug print
//     console.log("Received hours:", hours); // Debug print

//     if (!estStart || isNaN(new Date(estStart).getTime())) {
//         console.error("Invalid estStart provided:", estStart);
//         return; // Exit the function if estStart is not valid
//     }

//     const estStartDate = new Date(estStart + 'Z'); // Append 'Z' to specify UTC time
//     console.log("Initial Date Object:", estStartDate); // Debug print

//     estStartDate.setUTCHours(estStartDate.getUTCHours() + hours);
//     if (isNaN(estStartDate.getTime())) {
//         console.error("Resulting date is invalid after adding hours:", estStartDate);
//         return; // Additional check for validity after adding hours
//     }

//     const finishDate = estStartDate.toISOString().slice(0, 19).replace('T', ' ');
//     console.log("Calculated finishDate:", finishDate); // Debug print

//     setOrders(prevOrders => {
//         return prevOrders.map(order => {
//             if (order.id === id) {
//                 return { ...order, est_finish: finishDate };
//             }
//             return order;
//         });
//     });
// };

const handleFinishCalculation = (estStart, hours) => {
    if (!estStart || isNaN(new Date(estStart).getTime())) {
        console.error("Invalid estStart provided:", estStart);
        return null; // Exit the function if estStart is not valid
    }

    const estStartDate = new Date(estStart + 'Z'); // Ensure UTC time
    estStartDate.setUTCHours(estStartDate.getUTCHours() + hours);
    if (isNaN(estStartDate.getTime())) {
        console.error("Resulting date is invalid after adding hours:", estStartDate);
        return null; // Exit if resulting date is invalid
    }

    return estStartDate.toISOString().slice(0, 19).replace('T', ' ');
};





export default function HFSTable({ orders, setOrders, headerColor, requiredString }) {
    console.log("Orders in HFSTable for", requiredString, ":", orders);

    // const handleCellEditCommit = async (params) => {
    //     console.log("Final data being sent for update:", params);
    
    //     const { id, field, value } = params;
    //     const currentOrderData = orders.find(order => order.id === id);
    //     if (!currentOrderData) {
    //         console.error("Order not found");
    //         return;
    //     }
    
    //     const updatedOrder = { ...currentOrderData, [field]: value };
    
    //     if (field === 'est_start' && updatedOrder.hours) {
    //         updatedOrder.est_finish = handleFinishCalculation(id, value, updatedOrder.hours, setOrders);
    //         console.log("Calculated est_finish:", updatedOrder.est_finish);
    //     }
    
    //     try {
    //         const response = await fetch(`http://127.0.0.1:5000/updateOrder/${encodeURIComponent(id)}`, {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'SA': sessionStorage.getItem('sa'),
    //             },
    //             body: JSON.stringify(updatedOrder),
    //         });
    //         if (!response.ok) {
    //             throw new Error('Failed to update order');
    //         }
    //         const updatedData = await response.json();
    //         console.log("Order updated successfully:", updatedData.message);
    
    //         // Update local state to reflect backend confirmation
    //         setOrders(prevOrders => prevOrders.map(order => order.id === id ? updatedOrder : order));
    //     } catch (error) {
    //         console.error('Failed to update order:', error);
    //     }
    // };

    const handleCellEditCommit = async (params) => {
        console.log("Final data being sent for update:", params);
    
        const { id, field, value } = params;
        const currentOrderData = orders.find(order => order.id === id);
        if (!currentOrderData) {
            console.error("Order not found");
            return;
        }
    
        const updatedOrder = { ...currentOrderData, [field]: value };
    
        if (field === 'est_start' && updatedOrder.hours) {
            const finishDate = handleFinishCalculation(value, updatedOrder.hours);
            if (finishDate) {
                updatedOrder.est_finish = finishDate;
                console.log("Calculated est_finish:", finishDate);
            }
        }
    
        // Update the state
        setOrders(prevOrders => prevOrders.map(order => order.id === id ? updatedOrder : order));
    
        // Send update to backend
        try {
            const response = await fetch(`http://127.0.0.1:5000/updateOrder/${encodeURIComponent(id)}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'SA': sessionStorage.getItem('sa'),
                },
                body: JSON.stringify(updatedOrder)
            });
            if (!response.ok) {
                throw new Error('Failed to update order');
            }
            const updatedData = await response.json();
            console.log("Order updated successfully:", updatedData.message);
        } catch (error) {
            console.error('Failed to update order:', error);
        }
    };

    const handleProcessRowUpdateError = React.useCallback((error) => {
        console.log(error);
    }, []);

    const formattedOrders = orders.map(order => ({
        ...order,
        est_finish: order.est_finish ? dayjs(order.est_finish).format('YYYY-MM-DD HH:mm:ss') : '',
    }));

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
                hours={params.row.hours}
                setOrders={setOrders}
                calculateFinish={handleFinishCalculation}
                onCellValueChange={handleCellEditCommit} 
            />
        },
        { field: 'est_finish', headerName: 'Est Finish', headerClassName: 'super-app-theme--header' },
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
                // rows={orders}
                rows={formattedOrders}
                columns={columns}  
                slots={{ toolbar: CustomToolbar }}
                getRowClassName={getRowClassName}
                onProcessRowUpdateError={handleProcessRowUpdateError}
                hideFooter
            />
        </Box>
    );
}