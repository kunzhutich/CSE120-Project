import React, {useState, useEffect, useContext } from 'react';
import { AppStateContext } from '../context/AppStateContext';
import Box from '@mui/material/Box';
import StripedDataGrid from './StripedDataGrid'; // Import the StripedDataGrid component
import CustomToolbar from './CustomToolbar';
import dayjs from 'dayjs';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DatePickerCell } from '../componentsHelpers/DatePickerCell';
import { CalledEditor } from '../componentsHelpers/CalledEditor';
import { getRowClassName } from '../componentsHelpers/getRowClassName';
import { FinishDateField } from '../componentsHelpers/FinishDateField';


// const handleFinishCalculation = (estStart, hours) => {
//     if (!estStart || isNaN(new Date(estStart).getTime())) {
//         console.error("Invalid estStart provided:", estStart);
//         return null; // Exit the function if estStart is not valid
//     }

//     const estStartDate = new Date(estStart + 'Z'); // Ensure UTC time
//     estStartDate.setUTCHours(estStartDate.getUTCHours() + hours);
//     if (isNaN(estStartDate.getTime())) {
//         console.error("Resulting date is invalid after adding hours:", estStartDate);
//         return null; // Exit if resulting date is invalid
//     }

//     return estStartDate.toISOString().slice(0, 19).replace('T', ' ');
// };

const handleFinishCalculation = (estStart, hours) => {
    if (!estStart || isNaN(new Date(estStart).getTime())) {
        return null;
    }
    const estStartDate = new Date(estStart + 'Z');
    estStartDate.setUTCHours(estStartDate.getUTCHours() + hours);
    return estStartDate.toISOString().slice(0, 19).replace('T', ' ');
};



export default function HFSTable({ orders, setOrders, headerColor, requiredString }) {
    console.log(`Orders in HFSTable for ${requiredString}:`, orders);
    // console.log("Orders in HFSTable for", requiredString, ":", orders);
    

    const { state, dispatch } = useContext(AppStateContext);

    console.log("Orders for H1 in fsOrders state:", state.fsOrders.filter(order => order.head === 'H1'));


    const handleCellEditCommit = async (params) => {
        console.log("Final data being sent for update:", params);
    
        const { id, field, value } = params;
        const currentOrderData = state.fHeadTable.find(order => order.id === id);
        if (!currentOrderData) {
            console.error("Order not found");
            return;
        }
    
        const updatedOrder = { ...currentOrderData, [params.field]: params.value };
    
        if (field === 'head' && !value) {
            updatedOrder.est_start = null;
            updatedOrder.est_finish = null;
        } else if (field === 'est_start' && updatedOrder.head) {
            const finishDate = handleFinishCalculation(value, updatedOrder.hours);
            if (finishDate) {
                updatedOrder.est_finish = finishDate;
            }
        }
    
        // Update the state
        setOrders(prevOrders => prevOrders.map(order => order.id === id ? updatedOrder : order));
    
        // Send update to backend
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
            dispatch({ type: 'UPDATE_F_HEAD_TABLE', payload: updatedOrder });

            useEffect(() => {
                console.log("Current orders in state:", state.fsOrders);
                const filteredOrders = state.fsOrders.filter(order => order.head === requiredString);
                console.log(`Orders in HFSTable for ${requiredString}:`, filteredOrders);
            }, [state.fsOrders, requiredString]);  // Ensure this runs every time state.fsOrders or requiredString changes
              
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
                hours={params.row.hours}
                setOrders={setOrders}
                calculateFinish={handleFinishCalculation}
                onCellValueChange={handleCellEditCommit} 
            />
        },
        { field: 'est_finish', headerName: 'Est Finish', flex: 1, headerClassName: 'super-app-theme--header',
            renderCell: (params) => <FinishDateField 
                id={params.id} 
                value={params.value ? dayjs(params.value).toISOString() : null}
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
                rows={state.fHeadTable}
                columns={columns}  
                slots={{ toolbar: CustomToolbar }}
                getRowClassName={getRowClassName}
                onProcessRowUpdateError={handleProcessRowUpdateError}
                hideFooter
            />
        </Box>
    );
}