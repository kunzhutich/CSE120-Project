import * as React from 'react';
import Box from '@mui/material/Box';
import {DataGrid} from '@mui/x-data-grid';

// Creates column definitions for the DataGrid
const columns = [
  { field: 'id', headerName: '', width: 30 },
  { field: 'combo', headerName: 'Combo', flex: 2 },
  { field: 'lateral', headerName: 'Lat', flex: 1 },
  { field: 'sg', headerName: 'SG', flex: 1 },
  { field: 'name', headerName: 'Name', flex: 2 },
  { field: 'phoneNumber', headerName: 'Phone', flex: 1 },
  { field: 'flow', headerName: 'Flow', flex: 1 },
  { field: 'hours', headerName: 'Hours', flex: 1 },
  { field: 'acre', headerName: 'Acre', flex: 1 },
  { field: 'crop', headerName: 'Crop', flex: 1 },
  { field: 'type', headerName: 'Type', flex: 1 },
  { field: 'date', headerName: 'Date', editable: true, flex: 1 },
  { field: 'sbxcfs', headerName: 'SBXCFS', flex: 1 },
  { field: 'head', headerName: 'Head', editable: true, flex: 1 },
  { field: 'estStart', headerName: 'Est Start', editable: true, flex: 1 },
  { field: 'estStop', headerName: 'Est Stop', editable: true, flex: 1 },
];

// Creates row data for the DataGrid
const rows = [
  { id: 1, combo: '001002003 -654258', lateral: 'CM', sg: '06-05',
    name: 'George Washington', phoneNumber: '111-2345', flow: '16.77',
    hours: '11', acre: '22.00', crop: '29', type: '1', date: '12/10',
    sbxcfs: '16.77', head: '#H1', estStart: 'Thu 1430', estStop: 'Fri 0130' 
  },
];

export default function FTable() {
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