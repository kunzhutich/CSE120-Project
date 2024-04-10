import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import {GridToolbar, DataGrid, gridClasses} from '@mui/x-data-grid';
import { alpha, styled } from '@mui/material/styles';

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity,
      ),
      '&:hover': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity,
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  },
}));

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

// Creates row data for the DataGrid
// const rows = [
//   {id: 1, combo: '019007009 -650082', lateral: 'CERES', sg: '01-01.5',
//     name: 'Vito Chiesa', phoneNumber: '531-5235', flow: '0.93',
//     hours: '48', date: '10/09', tranTime: '13280347', ex: null, final: 'N',
//     comment: 'HOME 8832916', sbxcfs: '0.93', head: 'M', estStart: 'Thu 1430', 
//     estFinish: 'Fri 1300', attention: null
//   },
//   {id: 2, combo: '019004018 -650081', lateral: 'CERES', sg: '02-01.5',
//   name: 'Vito Chiesa', phoneNumber: '531-5235', flow: '1.34',
//   hours: '72', date: '10/09', tranTime: '13272572', ex: null, final: 'N',
//   comment: 'HM 8832916', sbxcfs: '1.34', head: 'M', estStart: 'Thu 1200', 
//   estFinish: 'Sun 1200', attention: null
// },
// ];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector
        slotProps={{ tooltip: { title: 'Change density' } }}
      />
      <Box sx={{ flexGrow: 1 }} />
      <GridToolbarExport
        slotProps={{
          tooltip: { title: 'Export data' },
          button: { variant: 'outlined' },
        }}
      />
    </GridToolbarContainer>
  );
}
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
    <div style={{ height: 400, width: '100%' }}>
    <Box sx = {{height: '100vh', width: '100%'}}>
      <StripedDataGrid
      rows={orders}
      columns={columns}
      hideFooter

      slots={{
        toolbar: GridToolbar,
      }}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
      }
      />
    </Box>
    </div>
  );
}