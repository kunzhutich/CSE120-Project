import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import {GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton,
  GridToolbarDensitySelector, DataGrid} from '@mui/x-data-grid';

  const columns = [
    { field: 'id', headerName: 'Combo', width: 130, flex: 2 },
    { field: 'lat', headerName: 'Lat', flex: 1 },
    { field: 'sg', headerName: 'SG', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 2 },
    { field: 'phone', headerName: 'Phone', flex: 1 },
    { field: 'flow', headerName: 'Flow', flex: 1 },
    { field: 'hours', headerName: 'Hours', flex: 1 },
    { field: 'acre', headerName: 'Acre', flex: 1 },
    { field: 'crop', headerName: 'Crop', flex: 1 },
    { field: 'type', headerName: 'Type', flex: 1 },
    { field: 'date', headerName: 'Date', editable: true, flex: 1 },
    { field: 'sbxcfs', headerName: 'SBXCFS', flex: 1 },
    { field: 'head', headerName: 'Head', editable: true, flex: 1 },
    { field: 'estStart', headerName: 'Est Start', editable: true, flex: 1 },
    { field: 'estStop', headerName: 'Est Stop', editable: true, flex: 1 },
];

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

export default function FSTable() {
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
        <Box sx={{height: 847, width: '100%', paddingLeft: 4, paddingRight: 4}}>
            <DataGrid
                rows={orders}
                columns={columns}
                pageSize={5}
                hideFooter
                
                slots={{
                  toolbar: CustomToolbar
                }}
            />
        </Box>
    );
}