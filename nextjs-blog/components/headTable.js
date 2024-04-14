import React from 'react';
import Box from '@mui/material/Box';
import StripedDataGrid from './StripedDataGrid'; // Import the StripedDataGrid component
import CustomToolbar from './CustomToolbar'; // Import the CustomToolbar component

// Creates column definitions for the DataGrid
const columns = [
  { field: 'id', headerName: '', width: 30, hide: true, headerClassName: 'super-app-theme--header' },
  { field: 'head', headerName: 'Head', flex: 2, headerClassName: 'super-app-theme--header' },
  { field: 'lateral', headerName: 'Lateral', flex: 1, headerClassName: 'super-app-theme--header' },
  { field: 'contact', headerName: 'Contact', flex: 2, headerClassName: 'super-app-theme--header' },
  { field: 'phoneNumber', headerName: 'Phone', flex: 1, headerClassName: 'super-app-theme--header' },
  { field: 'rqstFlo', headerName: 'Rqst Flo', flex: 1, headerClassName: 'super-app-theme--header' },
  { field: 'hours', headerName: 'Hours', flex: 1, headerClassName: 'super-app-theme--header' },
  { field: 'estStart', headerName: 'Est Start', editable: true, flex: 1, headerClassName: 'super-app-theme--header' },
  { field: 'primeDate', headerName: 'Prime Date', editable: true, flex: 1, headerClassName: 'super-app-theme--header' },
  { field: 'primeTime', headerName: 'Prime Time', editable: true, flex: 1, headerClassName: 'super-app-theme--header' },
  { field: 'startDate', headerName: 'Start Date', editable: true, flex: 1, headerClassName: 'super-app-theme--header' },
  { field: 'startTime', headerName: 'Start Time', editable: true, flex: 1, headerClassName: 'super-app-theme--header' },
  { field: 'finishDate', headerName: 'Finish Date', editable: true, flex: 1, headerClassName: 'super-app-theme--header' },
  { field: 'finishTime', headerName: 'Finish Time', editable: true,  flex: 1, headerClassName: 'super-app-theme--header' },
  { field: 'primeTotal', headerName: 'Prime Total', flex: 1, headerClassName: 'super-app-theme--header' },
  { field: 'totalHour', headerName: 'Total Hour', flex: 1, headerClassName: 'super-app-theme--header' },
  { field: 'called', headerName: 'Called', editable: true, flex: 1, headerClassName: 'super-app-theme--header' },
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

export default function HeadTable() {
  return (
    <Box sx = {{height: 'auto', width: '100%', paddingTop: 9, paddingLeft: 4, paddingRight: 4, '& .super-app-theme--header': {
      backgroundColor: 'rgba(108, 193, 101)',
    }, headerClassName: 'super-app-theme--header'}}>
      <StripedDataGrid
      rows={rows}
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