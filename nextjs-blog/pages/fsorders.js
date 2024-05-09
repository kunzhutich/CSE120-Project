import React, { useState, useEffect, useContext } from 'react';
import { AppStateContext } from '../context/AppStateContext';
import NavBar from "../components/navBar";
import FTable from "../components/fTable";
import FloodHead from '../components/fHeadTable';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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


const fsorders = () => {
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


            if (field === 'head') {
                const oldHead = currentOrder.head;
                const newHead = value;
    
                if (oldHead && oldHead !== newHead) {
                    dispatch({ type: `REMOVE_FROM_${oldHead.toUpperCase()}_TABLE`, payload: { id } });
                }
                if (newHead) {
                    dispatch({ type: `ADD_TO_${newHead.toUpperCase()}_TABLE`, payload: updatedOrder });
                }
            }
        } catch (error) {
            console.error('Failed to update order:', error);
        }
    };

    const miniFTable = [
        { field: 'id', headerName: 'Combo', width: 130, flex: 2, headerClassName: 'super-app-theme--header' },
        { field: 'lat', headerName: 'Lat', width: 50, flex: 1, headerClassName: 'super-app-theme--header' },
        { field: 'sg', headerName: 'SG', flex: 1, headerClassName: 'super-app-theme--header' },
        { field: 'name', headerName: 'Name', flex: 2, headerClassName: 'super-app-theme--header' },
        { field: 'phone', headerName: 'Phone', flex: 1, headerClassName: 'super-app-theme--header' },
        { field: 'flow', headerName: 'Flow', flex: 1, headerClassName: 'super-app-theme--header' },
        { field: 'hours', headerName: 'Hours', flex: 1, headerClassName: 'super-app-theme--header' },
        { field: 'crop', headerName: 'Crop', flex: 1, headerClassName: 'super-app-theme--header' },
        { field: 'date', headerName: 'Date', width: 60, headerClassName: 'super-app-theme--header',
            valueFormatter: (params) => dayjs(params.value).format('MM/DD')  
        },
        { field: 'ex', headerName: 'EX', width: 10, headerClassName: 'super-app-theme--header' },
        { field: 'final', headerName: 'Final', width: 10, headerClassName: 'super-app-theme--header' },
        { field: 'head', headerName: 'Head', flex: 1.5, headerClassName: 'super-app-theme--header',
            renderCell: (params) => <HeadEditor 
                id={params.id} 
                value={params.value} 
                onCellValueChange={handleCellEditCommit} 
            />
        },
    ];

    return (
        <div>
            <NavBar />
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{width: '65vw', position: 'sticky', top: 65 }}>
                    <FTable miniColumns={miniFTable}/>        
                </div>
                <div>
                    <FloodHead 
                        miniColumns={true}
                        headerColor='rgba(108, 193, 101)' 
                        requiredString={'H1'} 
                        style={{width: '45vw', height: '35vh'}}
                    />
                    <FloodHead 
                        miniColumns={true}
                        headerColor='rgba(135, 206, 250, 1)' 
                        requiredString={'H2'} 
                    />
                    <FloodHead 
                        miniColumns={true}
                        headerColor='rgba(255, 182, 193, 1)' 
                        requiredString={'H3'} 
                    />
                    <FloodHead 
                        miniColumns={true}
                        headerColor='rgba(220, 200, 255, 1)' 
                        requiredString={'H4'} 
                    />
                    <FloodHead 
                        miniColumns={true}
                        headerColor='rgba(210, 180, 140, 1)' 
                        requiredString={'H5'} 
                    />
                    <FloodHead 
                        miniColumns={true}
                        headerColor='rgba(101, 176, 193, 0.5)' 
                        requiredString={'UN'}
                    />
                </div>
            </div>
        </div>
    );
};

export default fsorders;