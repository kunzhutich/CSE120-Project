import * as React from 'react';
import Box from '@mui/material/Box';
import {DataGrid} from '@mui/x-data-grid';

// Creates column definitions for the DataGrid
const columns = [
  { field: 'id', headerName: '', width: 30 },
  { field: 'head', headerName: 'Head', flex: 2 },
  { field: 'lateral', headerName: 'Lateral', flex: 1 },
  { field: 'contact', headerName: 'Contact', flex: 2 },
  { field: 'phoneNumber', headerName: 'Phone', flex: 1 },
  { field: 'rqstFlo', headerName: 'Rqst Flo', flex: 1 },
  { field: 'hours', headerName: 'Hours', flex: 1 },
  { field: 'estStart', headerName: 'Est Start', flex: 1 },
  { field: 'primeDate', headerName: 'Prime Date', flex: 1 },
  { field: 'primeTime', headerName: 'Prime Time', flex: 1 },
  { field: 'startDate', headerName: 'Start Date', flex: 1 },
  { field: 'startTime', headerName: 'Start Time', flex: 1 },
  { field: 'finishDate', headerName: 'Finish Date', flex: 1 },
  { field: 'finishTime', headerName: 'Finish Time', flex: 1 },
  { field: 'primeTotal', headerName: 'Prime Total', flex: 1 },
  { field: 'totalHour', headerName: 'Total Hour', flex: 1 },
  { field: 'called', headerName: 'Called', flex: 1 },
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
  }
];

export default function HeadTable() {
  return (
    <Box sx = {{height: 847, width: '100%'}}>
      <DataGrid
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5
          },
        },
      }}
      pageSizeOptions={[5]}
      checkBoxSelection
      disableRowSelectionOnClick
      />
    </Box>
  );
}