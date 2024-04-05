import React from 'react';
import Box from '@mui/material/Box';
import {GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton,
  GridToolbarDensitySelector, DataGrid} from '@mui/x-data-grid';

// Creates column definitions for the DataGrid
const columns = [
  { field: 'id', headerName: '', width: 30, hide: true },
  { field: 'head', headerName: 'Head', flex: 2 },
  { field: 'lateral', headerName: 'Lateral', flex: 1 },
  { field: 'contact', headerName: 'Contact', flex: 2 },
  { field: 'phoneNumber', headerName: 'Phone', flex: 1 },
  { field: 'rqstFlo', headerName: 'Rqst Flo', flex: 1 },
  { field: 'hours', headerName: 'Hours', flex: 1 },
  { field: 'estStart', headerName: 'Est Start', editable: true, flex: 1 },
  { field: 'primeDate', headerName: 'Prime Date', editable: true, flex: 1 },
  { field: 'primeTime', headerName: 'Prime Time', editable: true, flex: 1 },
  { field: 'startDate', headerName: 'Start Date', editable: true, flex: 1 },
  { field: 'startTime', headerName: 'Start Time', editable: true, flex: 1 },
  { field: 'finishDate', headerName: 'Finish Date', editable: true, flex: 1 },
  { field: 'finishTime', headerName: 'Finish Time', editable: true,  flex: 1 },
  { field: 'primeTotal', headerName: 'Prime Total', flex: 1 },
  { field: 'totalHour', headerName: 'Total Hour', flex: 1 },
  { field: 'called', headerName: 'Called', editable: true, flex: 1 },
];

// Creates row data for the DataGrid
const rows = [
  { id: 1, head: '001002003 -654258', lateral: 'CM', sg: '06-05',
    contact: 'George Washington', phoneNumber: '111-2345', rqstFlo: '16.77',
    hours: '11', estStart: 'Thu 1430', primeDate: '0208', primeTime: '0635',
    startDate: '0208', startTime: '1430', finishDate: '0208', finishTime: '1735',
    primeTotal: '7:55', totalHour: '3:05', called: 'o'
  },
  { id: 2, head: '001002003 -654258', lateral: 'CM', sg: '06-05',
    contact: 'George Washington', phoneNumber: '111-2345', rqstFlo: '16.77',
    hours: '11', estStart: 'Thu 1430', primeDate: '0208', primeTime: '0635',
    startDate: '0208', startTime: '1430', finishDate: '0208', finishTime: '1735',
    primeTotal: '7:55', totalHour: '3:05', called: 'o'
  },
  { id: 3, head: '001002003 -654258', lateral: 'CM', sg: '06-05',
    contact: 'George Washington', phoneNumber: '111-2345', rqstFlo: '16.77',
    hours: '11', estStart: 'Thu 1430', primeDate: '0208', primeTime: '0635',
    startDate: '0208', startTime: '1430', finishDate: '0208', finishTime: '1735',
    primeTotal: '7:55', totalHour: '3:05', called: 'o'
  },
  { id: 4, head: '001002003 -654258', lateral: 'CM', sg: '06-05',
    contact: 'George Washington', phoneNumber: '111-2345', rqstFlo: '16.77',
    hours: '11', estStart: 'Thu 1430', primeDate: '0208', primeTime: '0635',
    startDate: '0208', startTime: '1430', finishDate: '0208', finishTime: '1735',
    primeTotal: '7:55', totalHour: '3:05', called: 'o'
  },
  { id: 5, head: ' ', lateral: ' ', sg: ' ',
    contact: ' ', phoneNumber: ' ', rqstFlo: ' ',
    hours: ' ', estStart: ' ', primeDate: ' ', primeTime: ' ',
    startDate: ' ', startTime: ' ', finishDate: ' ', finishTime: ' ',
    primeTotal: ' ', totalHour: '', called: ' '
  }
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
export default function HFSTable() {
  return (
    <Box sx = {{height: 'auto', width: '100%', paddingLeft: 4, paddingRight: 4}}>
      <DataGrid
      rows={rows}
      columns={columns}
      hideFooter

      slots={{
        toolbar: CustomToolbar
      }}
      />
    </Box>
  );
}