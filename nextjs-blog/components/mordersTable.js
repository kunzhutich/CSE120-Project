import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import StripedDataGrid from './StripedDataGrid'; // Import the StripedDataGrid component
import CustomToolbar from './CustomToolbar'; // Import the CustomToolbar component


// Creates column definitions for the DataGrid
const columns = [
  { field: 'combo', headerName: 'Combo', flex: 2.5 },
  { field: 'lat', headerName: 'Lat', flex: 1 },
  { field: 'sg', headerName: 'SG', flex: 1 },
  { field: 'name', headerName: 'Name1', flex: 1.5 },
  { field: 'phone', headerName: 'Phone', flex: 1.5 },
  { field: 'flow', headerName: 'Flow', flex: 1 },
  { field: 'hours', headerName: 'Hours', flex: 1 },
  // { field: 'type', headerName: 'Type', flex: 1 },
  { field: 'date', headerName: 'Date', flex: 1 },
  { field: 'tranTime', headerName: 'Trantime', flex: 1.5 },
  { field: 'ex', headerName: 'EX', flex: 1 },
  { field: 'final', headerName: 'Final', flex: 0.25 },
  { field: 'comment', headerName: 'Comment', editable: true,  flex: 2 },
  { field: 'sbxcfs', headerName: 'SBXCFS', flex: 1 },
  { field: 'head', headerName: 'Head', editable: true, flex: 0.25 },
  { field: 'estStart', headerName: 'Est Start', editable: true, flex: 1.25 },
  { field: 'estFinish', headerName: 'Est Finish', editable: true, flex: 1.25 },
  { field: 'attention', headerName: 'Attention', editable: true, flex: 1 },
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
    <Box sx = {{height: '100vh', width: '100%', paddingLeft: 4, paddingRight: 4}}>
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