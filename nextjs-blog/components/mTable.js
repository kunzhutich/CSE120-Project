import React, { useEffect, useState, useContext } from 'react';
import { AppStateContext } from '../context/AppStateContext';
import Box from '@mui/material/Box';
import StripedDataGrid from './StripedDataGrid';
import CustomToolbar from './CustomToolbar';
import dayjs from 'dayjs';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DatePickerCell } from '../componentsHelpers/DatePickerCell';
import { FinishDateField } from '../componentsHelpers/FinishDateField';
import { CalledEditor } from '../componentsHelpers/CalledEditor';
import { getRowClassName } from '../componentsHelpers/getRowClassName';
import { CommentsCell } from '../componentsHelpers/CommentsCell';


const HeadEditor = ({ value, onCellValueChange, id }) => {
    const [localValue, setLocalValue] = useState(value);

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const headOptions = [
        { value: 'm', label: 'Micro' },
    ];

    const handleChange = (event) => {
        const newValue = event.target.value;
        setLocalValue(newValue);
        onCellValueChange({
            id: id,
            field: 'head',
            value: newValue
        });
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
                <Select
                    labelId="head-select-label"
                    id="head-select"
                    value={localValue || ''}
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



export default function MTable() {
    const { state, dispatch } = useContext(AppStateContext);

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
                dispatch({ type: 'SET_M_TABLE', payload: data.map(item => ({ ...item, id: item.combo })) });
            } catch (error) {
                console.error("Failed to fetch orders:", error);
            }
        };

        fetchOrders();
    }, [dispatch]);

    const handleCellEditCommit = async (params) => {
        const { id, field, value } = params;

        const currentOrder = state.mTable.find(order => order.id === id);

        let updatedOrder = { ...currentOrder, [field]: value };

        if (field === 'head' && !value) {
            updatedOrder.est_start = null;
            updatedOrder.est_finish = null;
        } else if (field === 'est_start' && updatedOrder.head) {
            const finishDate = handleFinishCalculation(value, updatedOrder.hours);
            if (finishDate) {
                updatedOrder.est_finish = finishDate;
            }
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
            dispatch({ type: 'UPDATE_M_TABLE', payload: updatedOrder });
        } catch (error) {
            console.error('Failed to update order:', error);
        }
    };

    const handleProcessRowUpdateError = React.useCallback((error) => {
        console.log('Update error:', error);
    }, []);

    const columns = [
        { field: 'id', headerName: 'Combo', width: 145, headerClassName: 'super-app-theme--header' },
        { field: 'lat', headerName: 'Lat', width: 70, headerClassName: 'super-app-theme--header' },
        { field: 'sg', headerName: 'SG', width: 70, headerClassName: 'super-app-theme--header' },
        { field: 'name', headerName: 'Name', flex: 1, headerClassName: 'super-app-theme--header' },
        { field: 'phone', headerName: 'Phone', width: 85, headerClassName: 'super-app-theme--header' },
        { field: 'flow', headerName: 'Flow', width: 60, headerClassName: 'super-app-theme--header' },
        { field: 'hours', headerName: 'Hours', width: 10, headerClassName: 'super-app-theme--header' },
        { field: 'acre', headerName: 'Acre', width: 50, headerClassName: 'super-app-theme--header' },
        { field: 'crop', headerName: 'Crop', width: 10, headerClassName: 'super-app-theme--header' },
        { field: 'type', headerName: 'Type', width: 10, headerClassName: 'super-app-theme--header' },
        { field: 'date', headerName: 'Date', width: 60, headerClassName: 'super-app-theme--header',
            valueFormatter: (params) => dayjs(params.value).format('MM/DD')  
        },
        { field: 'comment', headerName: 'Comment', editable: true, flex: 1, headerClassName: 'super-app-theme--header',
            renderCell: (params) => <CommentsCell value={params.value} />
        },
        { field: 'sbxcfs', headerName: 'SBXCFS', width: 70, headerClassName: 'super-app-theme--header' },
        { field: 'head', headerName: 'Head', width: 110, headerClassName: 'super-app-theme--header',
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
        <Box sx={{ height: '93vh', width: '100%', paddingLeft: 4, paddingRight: 4, '& .super-app-theme--header': { backgroundColor: 'rgba(101, 176, 193, 0.5)' }}}>
            <StripedDataGrid
                rows={state.mTable}
                columns={columns}
                slots={{
                    toolbar: CustomToolbar,
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