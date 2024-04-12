import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import StripedDataGrid from './StripedDataGrid'; // Import the StripedDataGrid component
import CustomToolbar from './CustomToolbar'; // Import the CustomToolbar component


// Creates column definitions for the DataGrid
const columns = [
  { field: 'combo', headerName: 'Combo', flex: 2.5, headerClassName: 'super-app-theme--header'},
  { field: 'lat', headerName: 'Lat', flex: 1, headerClassName: 'super-app-theme--header' },
  { field: 'sg', headerName: 'SG', flex: 1, headerClassName: 'super-app-theme--header' },
  { field: 'name', headerName: 'Name', flex: 1.5, headerClassName: 'super-app-theme--header' },
  { field: 'phone', headerName: 'Phone', flex: 1.5, headerClassName: 'super-app-theme--header' },
  { field: 'flow', headerName: 'Flow', flex: 1, headerClassName: 'super-app-theme--header' },
  { field: 'hours', headerName: 'Hours', flex: 1, headerClassName: 'super-app-theme--header' },
  // { field: 'type', headerName: 'Type', flex: 1, headerClassName: 'super-app-theme--header' },
  { field: 'date', headerName: 'Date', flex: 1, headerClassName: 'super-app-theme--header' },
  { field: 'tranTime', headerName: 'Trantime', flex: 1.5, headerClassName: 'super-app-theme--header' },
  { field: 'ex', headerName: 'EX', flex: 1, headerClassName: 'super-app-theme--header' },
  { field: 'final', headerName: 'Final', flex: 0.25, headerClassName: 'super-app-theme--header' },
  { field: 'comment', headerName: 'Comment', editable: true,  flex: 2, headerClassName: 'super-app-theme--header' },
  { field: 'sbxcfs', headerName: 'SBXCFS', flex: 1, headerClassName: 'super-app-theme--header' },
  { field: 'head', headerName: 'Head', editable: true, flex: 0.25, headerClassName: 'super-app-theme--header' },
  { field: 'estStart', headerName: 'Est Start', editable: true, flex: 1.25, headerClassName: 'super-app-theme--header' },
  { field: 'estFinish', headerName: 'Est Finish', editable: true, flex: 1.25, headerClassName: 'super-app-theme--header' },
  { field: 'attention', headerName: 'Attention', editable: true, flex: 1, headerClassName: 'super-app-theme--header' },
];

export default function MordersTable() {
  const [orders, setOrders] = useState([]);

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
    <Box sx = {{height: '100vh', width: '100%', paddingTop: 2, paddingLeft: 4, paddingRight: 4, '& .super-app-theme--header': {
      backgroundColor: 'rgba(101, 176, 193, 0.5)',
    },}}>
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