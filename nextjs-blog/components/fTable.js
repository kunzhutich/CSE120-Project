import * as React from 'react';
import Box from '@mui/material/Box';
import {DataGrid} from '@mui/x-data-grid';

const columns = [
  {
    field: 'id', headerName: 'ID', width: 30
  },
  {
    field: 'combo', headerName: 'Combo', width: 150
  },
  { 
    field: 'lateral', headerName: 'Lat', width: 50
  },
  { field: 'sg', headerName: 'SG', width: 75
  },
  {
    field: 'name', headerName: 'Name', width: 200
  },
  {
    field: 'phoneNumber', headerName: 'Phone', width: 100
  },
  {
    field: 'flow', headerName: 'Flow', width: 75
  },
  {
    field: 'hours', headerName: 'Hours', width: 10
  },
  {
    field: 'acre', headerName: 'Acre', width: 75
  },
  {
    field: 'crop', headerName: 'Crop', width: 10
  },
  {
    field: 'type', headerName: 'Type', width: 10
  },
  {
    field: 'date', headerName: 'Date', width: 100
  },
  { 
    field: 'sbxcfs', headerName: 'SBXCFS', width: 75
  },
  {
    field: 'head', headerName: 'Head', width: 75
  },
  {
    field: 'estStart', headerName: 'Est Start', width: 100
  },
  {
    field: 'estStop', headerName: 'Est Stop', width: 100
  },
];

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