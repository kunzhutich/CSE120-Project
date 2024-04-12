import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import {GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton,
        GridToolbarDensitySelector, DataGrid} from '@mui/x-data-grid';


// Define the columns for the DataGrid
// Creates column definitions for the DataGrid
const columns = [
    { field: 'id', headerName: 'Combo', width: 130, flex: 2, headerClassName: 'super-app-theme--header' },
    { field: 'lat', headerName: 'Lat', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'sg', headerName: 'SG', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'name', headerName: 'Name', flex: 2, headerClassName: 'super-app-theme--header' },
    { field: 'phone', headerName: 'Phone', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'flow', headerName: 'Flow', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'hours', headerName: 'Hours', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'acre', headerName: 'Acre', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'crop', headerName: 'Crop', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'type', headerName: 'Type', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'date', headerName: 'Date', editable: true, flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'sbxcfs', headerName: 'SBXCFS', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'head', headerName: 'Head', editable: true, flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'estStart', headerName: 'Est Start', editable: true, flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'estStop', headerName: 'Est Stop', editable: true, flex: 1, headerClassName: 'super-app-theme--header' },
];

const mhcolumns = [
    { field: 'id', headerName: '', width: 30 },
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

export default function MTable() {
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
        <Box sx={{ height: '100vh', width: '100%', paddingTop: 9, paddingLeft: 4, paddingRight: 4, '& .super-app-theme--header': {
            backgroundColor: 'rgba(255, 165, 0, 1)',
          } }}>
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

export function MHTable() {
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
      <Box sx={{ height: '100%', width: '100%' }}>
          <DataGrid
              rows={orders}
              columns={mhcolumns}
              pageSize={5}
          />
      </Box>
  );
}