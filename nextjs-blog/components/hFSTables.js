import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import {GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton,
        GridToolbarDensitySelector, DataGrid} from '@mui/x-data-grid';

// Creates column definitions for the DataGrid
const columns = [
    { field: 'id', headerName: 'Head', width: 150 },
    { field: 'sg', headerName: 'SG', width: 75},
    { field: 'name', headerName: 'Contact', width: 250},
    { field: 'hours', headerName: 'Hours', width: 75},
    { field: 'estStart', headerName: 'Est Start', editable: true},
];

// Custom toolbar for datagrid settings
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector
        slotProps={{ tooltip: { title: 'Change density' } }}
      />
    </GridToolbarContainer>
  );
}

export default function HFSTable() {
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

return (
    <Box sx = {{height: 400, width: '25vw', paddingTop: 8, paddingLeft: 4, paddingRight: 4}}>
        <DataGrid
            rows={orders}
            columns={columns}
            hideFooter

            slots={{
                toolbar: CustomToolbar
            }}
        />
    </Box>
    );
}