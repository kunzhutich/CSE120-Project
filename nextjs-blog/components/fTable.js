import React, { useEffect, useState, useContext } from 'react';
import { AppStateContext } from '../context/AppStateContext';
import Box from '@mui/material/Box';
import StripedDataGrid from './StripedDataGrid'; // Import the StripedDataGrid component
import CustomToolbar from './CustomToolbar'; // Import the CustomToolbar component
import dayjs from 'dayjs';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DatePickerCell } from '../componentsHelpers/DatePickerCell';
import { FinishDateField } from '../componentsHelpers/FinishDateField';
import { CalledEditor } from '../componentsHelpers/CalledEditor';
import { getRowClassName } from '../componentsHelpers/getRowClassName';
import { CommentsCell } from '../componentsHelpers/CommentsCell';
import { handleFinishCalculation } from '../componentsHelpers/TimeCalculator';


const HeadEditor = ({ value, onCellValueChange, id }) => {
    const [localValue, setLocalValue] = useState(value);

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const headOptions = [
        { value: 'h1', label: 'Head 1' },
        { value: 'h2', label: 'Head 2' },
        { value: 'h3', label: 'Head 3' },
        { value: 'h4', label: 'Head 4' },
        { value: 'h5', label: 'Head 5' },
        { value: 'un', label: 'Unordered' },
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


export default function FTable({ miniColumns }) {
    const { state, dispatch } = useContext(AppStateContext);

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
                dispatch({ type: 'SET_F_TABLE', payload: data.map(item => ({ ...item, id: item.combo })) });
            } catch (error) {
                console.error("Failed to fetch orders:", error);
            }
        };

        fetchOrders();
    }, [dispatch]);    

    const handleCellEditCommit = async (params) => {
        console.log("Final data being sent for update:", params);

        const { id, field, value } = params;
        const currentOrder = state.fTable.find(order => order.id === id);
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
            dispatch({ type: 'UPDATE_F_TABLE', payload: updatedOrder });
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

    const getInitialState = () => {
        if (miniColumns) {
            return {
                columns: {
                    columnVisibilityModel: {
                        ex: false,
                        final: false
                    },
                },
            };
        } else {
            return {
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
            };
        }
    };
    

    return (
        <Box sx={{ height: '93vh', width: '100%', paddingLeft: 4, paddingRight: 4, '& .super-app-theme--header': { backgroundColor: 'rgba(101, 176, 193, 0.5)' } }}>
            <StripedDataGrid
                rows={state.fTable}
                columns={miniColumns ? miniColumns : columns}
                pageSize={5}
                slots={{ 
                    toolbar: CustomToolbar 
                }}
                getRowClassName={getRowClassName}
                onProcessRowUpdateError={handleProcessRowUpdateError}
                hideFooter
                initialState={getInitialState()}
            />
        </Box>
    );
}
