import * as React from 'react';
import Box from '@mui/material/Box';
import {DataGrid} from '@mui/x-data-grid';

// Creates column definitions for the DataGrid
const columns = [
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
  
  // Creates row data for the DataGrid
  const rows = [
    { id: 1, lateral: 'CM', sg: '06-05',
      contact: 'George Washington', phoneNumber: '111-2345', flow: '16.77',
      hours: '11', estStop: '11 am', startDate: '12/9', startTime: '1', finDate: '12/10',
      finTime: '12 pm', hrs: '#H1', billed: '25', called: 'yes', notes: 'none', 
      farmerCom: 'good water', abnormal: 'no', towaResp: 'thumbs up'

    },
  ];
  
  export default function MTable() {
    return (
      <Box sx = {{height: 'auto', width: '100%'}}>
        <DataGrid
        rows={rows}
        columns={columns}
        hideFooter
        />
      </Box>
    );
  }