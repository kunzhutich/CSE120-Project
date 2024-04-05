import * as React from 'react';
import Box from '@mui/material/Box';
import {GridToolbar, DataGrid} from '@mui/x-data-grid';

// Creates column definitions for the DataGrid
const columns = [
  { field: 'un', headerName: '#UN', flex: 1},
  { field: 'lateral', headerName: 'Lat', flex: 1 },
  { field: 'sg', headerName: 'SG', flex: 1 },
  { field: 'contact', headerName: 'Contact', flex: 1},
  { field: 'phoneNumber', headerName: 'Phone', flex: 1},
  { field: 'rqstFlo', headerName: 'Rqst Flo', flex: 1 },
  { field: 'hours', headerName: 'Hours', flex: 1 },
  { field: 'estStart', headerName: 'Est Start', editable: true, flex: 1.25},
  { field: 'primeDate', headerName: 'Prime Date', editable: true, flex: 1},
  { field: 'primeTime', headerName: 'Prime Time', editable: true, flex: 1},
  { field: 'startDate', headerName: 'Start Date', editable: true, flex: 1 },
  { field: 'startTime', headerName: 'Start Time', editable: true, flex: 1 },
  { field: 'finishDate', headerName: 'Finish Date', editable: true, flex: 1 },
  { field: 'finishTime', headerName: 'Finish Time', editable: true, flex: 1 },
  { field: 'totalHours', headerName: 'totalHours', editable: true, flex: 1 },
  { field: 'build', headerName: 'BI', editable: true, flex: 1 },
  { field: 'called', headerName: 'Called', editable: true, flex: 1 },
  { field: 'wdoNotes', headerName: 'WDO Notes', editable: true, flex: 2 },
  { field: 'farmerComments', headerName: 'Farmer Comments', editable: true, flex: 2 },
  { field: 'mark', headerName: 'Mark', flex: 1 },
  { field: 'towaResponse', headerName: 'Towa Response', flex: 1 },
];

// Creates row data for the DataGrid
const rows = [
    {id: 1, un: ' ', lateral: ' ', sg: ' ',
    contact: ' ', phoneNumber: ' ', rqstFlo: ' ',
    hours: ' ', estStart: ' ', primeDate: ' ', primeTime: ' ', 
    startDate: ' ', startTime: ' ', finishDate: ' ', finishTime: ' ', 
    totalHours: ' ', build: ' ', called: ' ', wdoNotes: ' ',
    farmerComments: ' ', mark: ' ', towaResponse: ' ',
  },

];

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
export default function UNorderstable() {
  return (
    <Box sx = {{height: '100vh', width: '100%'}}>
      <DataGrid
      rows={rows}
      columns={columns}
      hideFooter

      slots={{
        toolbar: GridToolbar,
      }}
      />
    </Box>
  );
}