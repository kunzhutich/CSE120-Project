import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import StripedDataGrid from './StripedDataGrid'; // Import the StripedDataGrid component
import CustomToolbar from './CustomToolbar'; // Import the CustomToolbar component
// import {GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton,
// GridToolbarDensitySelector, DataGrid} from '@mui/x-data-grid';



// Define the columns for the DataGrid
// Creates column definitions for the DataGrid
const mhcolumns = [
    { field: 'id', headerName: 'ID', width: 30 },
    { field: 'lateral', headerName: 'Lat', flex: 2 },
    { field: 'sg', headerName: 'SG', flex: 1 },
    { field: 'contact', headerName: 'Contact', flex: 1 },
    { field: 'phoneNumber', headerName: 'Phone', flex: 2 },
    { field: 'flow', headerName: 'Flow', flex: 1 },
    { field: 'hours', headerName: 'Hours', flex: 1 },
    { field: 'estStop', headerName: 'Est Stop', flex: 1 },
    { field: 'startDate', headerName: 'Start Date', flex: 1 },
    { field: 'startTime', headerName: 'Start Time', flex: 1 },
    { field: 'finDate', headerName: 'Finish Date', flex: 1 },
    { field: 'finTime', headerName: 'Finish Time', editable: true, flex: 1 },
    { field: 'hrs', headerName: 'Total Hours', flex: 1 },
    { field: 'billed', headerName: 'Billed', editable: true, flex: 1 },
    { field: 'called', headerName: 'Called', editable: true, flex: 1 },
    { field: 'notes', headerName: 'WDO Notes', editable: true, flex: 1 },
    { field: 'farmerCom', headerName: 'Farmer Comments', editable: true, flex: 1 },
    { field: 'abnormal', headerName: 'Mark if Abnormal', editable: true, flex: 1 },
    { field: 'towaResp', headerName: 'Towa Response', editable: true, flex: 1 },


  ];


// function CustomToolbar() {
//   return (
//     <GridToolbarContainer>
//       <GridToolbarColumnsButton />
//       <GridToolbarFilterButton />
//       <GridToolbarDensitySelector
//         slotProps={{ tooltip: { title: 'Change density' } }}
//       />
//     </GridToolbarContainer>
//   );
// }


export default function MHTable() {
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
    <Box sx={{ height: '100vh', width: '100%', paddingTop: 2, paddingLeft: 2, paddingRight: 2, paddingBottom: 2}}>
          <StripedDataGrid
              rows={orders}
              columns={mhcolumns}
              pageSizeOptions={5}
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