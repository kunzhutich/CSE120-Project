import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import StripedDataGrid from './StripedDataGrid'; // Import the StripedDataGrid component
import CustomToolbar from './CustomToolbar';
import dayjs from 'dayjs';
import { DatePickerCell } from '../componentsHelpers/DatePickerCell';
import { FinishDateField } from '../componentsHelpers/FinishDateField';
import { CalledEditor } from '../componentsHelpers/CalledEditor';
import { getRowClassName } from '../componentsHelpers/getRowClassName';

const handleFinishCalculation = (estStart, hours) => {
    if (!estStart || isNaN(new Date(estStart).getTime())) {
        return null;
    }
    const estStartDate = new Date(estStart + 'Z');

    // Extract the integer part and the fractional part of the hours
    const wholeHours = Math.floor(hours);
    const fractionOfHour = hours - wholeHours;

    // Calculate minutes from the fractional part of hours
    const minutes = Math.round(fractionOfHour * 60);

    // Add whole hours and minutes separately
    estStartDate.setUTCHours(estStartDate.getUTCHours() + wholeHours);
    estStartDate.setUTCMinutes(estStartDate.getUTCMinutes() + minutes);

    return estStartDate.toISOString().slice(0, 19).replace('T', ' ');
};



export default function HFSTable({ orders, setOrders, headerColor, requiredString }) {
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
        // const updatedOrder = { ...currentOrderData, [params.field]: params.value };
    
        if (field === 'est_start' && updatedOrder.hours) {
            const finishDate = handleFinishCalculation(value, updatedOrder.hours);
            if (finishDate) {
                updatedOrder.est_finish = finishDate;
                console.log("Calculated est_finish:", finishDate);
            }
        }
    
        // Update the state
        // setOrders(prevOrders => prevOrders.map(order => order.id === id ? updatedOrder : order));
        setOrders(prevOrders => prevOrders.map(order => order.id === params.id ? { ...order, [params.field]: params.value } : order));

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
                rows={formattedOrders}
                columns={columns}  
                slots={{ toolbar: CustomToolbar }}
                getRowClassName={getRowClassName}
                onProcessRowUpdateError={handleProcessRowUpdateError}
                hideFooter
                initialState={{
                    columns: {
                      columnVisibilityModel: {
                        est_finish: false
                      },
                    },
                }}
            />
        </Box>
    );
}