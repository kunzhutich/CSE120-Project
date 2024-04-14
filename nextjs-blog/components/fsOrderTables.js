import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import StripedDataGrid from './StripedDataGrid'; // Import the StripedDataGrid component
import {GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton,
        GridToolbarDensitySelector, DataGrid} from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'Combo', width: 130, flex: 2, headerClassName: 'super-app-theme--header' },
    { field: 'lat', headerName: 'Lat', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'sg', headerName: 'SG', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'name', headerName: 'Name', flex: 2, headerClassName: 'super-app-theme--header' },
    { field: 'phone', headerName: 'Phone', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'flow', headerName: 'Flow', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'hours', headerName: 'Hours', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'crop', headerName: 'Crop', flex: 1, headerClassName: 'super-app-theme--header'},
    { field: 'date', headerName: 'Date', witdh: 50, editable: true, flex: 3, headerClassName: 'super-app-theme--header' },
    { field: 'head', headerName: 'Head', editable: true, flex: 1, headerClassName: 'super-app-theme--header' },
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
        <Box sx={{height: 800, width: '60vw', paddingLeft: 4, '& .super-app-theme--header': {
            backgroundColor: 'rgba(101, 176, 193, 0.5)',
          }}}>
            <StripedDataGrid
                rows={orders}
                columns={columns}
                hideFooter
                
                slots={{
                  toolbar: CustomToolbar
                }}
                getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                  }
            />
        </Box>
    );
}