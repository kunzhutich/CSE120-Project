import React, { useEffect, useState, useContext } from 'react';
import { AppStateContext } from '../context/AppStateContext';
import Box from '@mui/material/Box';
import StripedDataGrid from './StripedDataGrid'; // Import the StripedDataGrid component
import CustomToolbar from './CustomToolbar'; // Import the CustomToolbar component
import dayjs from 'dayjs';
import { DatePickerCell } from '../componentsHelpers/DatePickerCell';
import { FinishDateField } from '../componentsHelpers/FinishDateField';
import { CalledEditor } from '../componentsHelpers/CalledEditor';
import { WdoAndFarmerCell } from '../componentsHelpers/WdoAndFarmerCells';
import { getRowClassName } from '../componentsHelpers/getRowClassName';
import { TotalHoursField } from '../componentsHelpers/TotalHoursField';
import { handleFinishCalculation, calculateDuration } from '../componentsHelpers/TimeCalculator';


export default function FloodHead ({ requiredString, headerColor, miniColumns }) {
    console.log(requiredString);
    const { state, dispatch } = useContext(AppStateContext);
    const actionTypeSet = `SET_${requiredString.toUpperCase()}_TABLE`;
    const actionTypeUpdate = `UPDATE_${requiredString.toUpperCase()}_TABLE`;
    const tableKey = `${requiredString.toLowerCase()}Table`;

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const sa = sessionStorage.getItem('sa');
                const response = await fetch(`http://127.0.0.1:5000/${requiredString}`, {
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
                console.log("Fetched data:", data);
                dispatch({ type: actionTypeSet, payload: data.map(item => ({ ...item, id: item.combo })) });
            } catch (error) {
                console.error("Failed to fetch orders:", error);
            }
        };

        console.log("Fetching orders for", requiredString);
        fetchOrders();
    }, [dispatch, requiredString]);

    const handleCellEditCommit = async (params) => {

        console.log("Final data being sent for update:", params);

        const { id, field, value } = params;
        const currentOrderData = state[tableKey].find(order => order.id === id);
        if (!currentOrderData) {
            console.error("Order not found");
            return;
        }
    
        const updatedOrder = { ...currentOrderData, [params.field]: params.value };
        console.log("Sending update for", id, updatedOrder);

        if (field === 'est_start' && updatedOrder.hours) {
            const finishDate = handleFinishCalculation(value, updatedOrder.hours);
            if (finishDate) {
                updatedOrder.est_finish = finishDate;
                console.log("Calculated est_finish:", finishDate);
            }
        }
        if (field === 'prime_datetime' || field === 'start_datetime') {
            const primeTotal = calculateDuration(updatedOrder.prime_datetime, updatedOrder.start_datetime);
            updatedOrder.prime_total = primeTotal;  // Update the 'prime_total' in the order object
        }
        if (field === 'start_datetime' || field === 'finish_datetime') {
            const totalHours = calculateDuration(updatedOrder.start_datetime, updatedOrder.finish_datetime);
            updatedOrder.total_hours = totalHours;  // Update the 'total_hours' in the order object
        }
    
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
            dispatch({ type: actionTypeUpdate, payload: updatedOrder });
            dispatch({ type: 'UPDATE_F_TABLE', payload: updatedOrder });
        } catch (error) {
            console.error('Failed to update order:', error);
        }
    };

    const handleProcessRowUpdateError = React.useCallback((error) => {
        console.log('Update error:', error);
    }, []);

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
        { field: 'prime_total', headerName: 'Prime Total', flex: 1, headerClassName: 'super-app-theme--header',
            renderCell: (params) => <TotalHoursField 
                id={params.id} 
                value={params.value}
                onCellValueChange={handleCellEditCommit}
                field="prime_total"
            /> 
        },
        { field: 'total_hours', headerName: 'Total Hour', flex: 1, headerClassName: 'super-app-theme--header',
            renderCell: (params) => <TotalHoursField 
                id={params.id} 
                value={params.value}
                onCellValueChange={handleCellEditCommit}
                field="total_hours"
            />  
        },
        { field: 'called', headerName: 'Called', flex: 1, headerClassName: 'super-app-theme--header',
            renderCell: (params) => <CalledEditor 
                id={params.id} 
                value={params.value} 
                onCellValueChange={handleCellEditCommit} 
            /> 
        },
        { field: 'wdo_notes', headerName: 'WDO Notes', flex: 1, headerClassName: 'super-app-theme--header',
            renderCell: (params) => <WdoAndFarmerCell 
                {...params} 
                onCellValueChange={handleCellEditCommit} 
                field="wdo_notes"
            />
        },
        { field: 'farmer_comments', headerName: 'Farmer Comments', flex: 1, headerClassName: 'super-app-theme--header',
            renderCell: (params) => <WdoAndFarmerCell
                {...params} 
                onCellValueChange={handleCellEditCommit} 
                field="farmer_comments"
            />
        },
    ];

    const miniHeadTables = [
        { field: 'id', headerName: requiredString, width: 150, headerClassName: 'super-app-theme--header' },
        { field: 'sg', headerName: 'SG', width: 75, headerClassName: 'super-app-theme--header'},
        { field: 'name', headerName: 'Contact', flex: 1, headerClassName: 'super-app-theme--header'},
        { field: 'hours', headerName: 'Hours', width: 75, headerClassName: 'super-app-theme--header'},
        { field: 'est_start', headerName: 'Est Start', headerClassName: 'super-app-theme--header',
            renderCell: (params) => <DatePickerCell 
                id={params.id} 
                value={params.value ? dayjs(params.value) : null} 
                onCellValueChange={handleCellEditCommit} 
                field="est_start"
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
        <Box sx = {{height: '93vh', width: '100%', paddingLeft: 4, paddingRight: 4, '& .super-app-theme--header': { backgroundColor: headerColor } }}>
            <StripedDataGrid
                rows={state[tableKey]}
                columns={miniColumns ? miniHeadTables : columns}
                slots={{
                    toolbar: CustomToolbar
                }}
                getRowClassName={getRowClassName}
                onProcessRowUpdateError={handleProcessRowUpdateError}
                hideFooter
                initialState={{
                    columns: {
                      columnVisibilityModel: {
                        wdo_notes: false,
                        farmer_comments: false
                      },
                    },
                }}
            />
        </Box>
    );
}