import * as React from 'react';
import Box from '@mui/material/Box';
import {GridToolbar, DataGrid} from '@mui/x-data-grid';

// Creates column definitions for the DataGrid
const columns = [
  { field: 'combo', headerName: 'Combo', flex: 2.5 },
  { field: 'lateral', headerName: 'Lat', flex: 1 },
  { field: 'sg', headerName: 'SG', flex: 1 },
  { field: 'name', headerName: 'Name1', flex: 1.5 },
  { field: 'phoneNumber', headerName: 'Phone', flex: 1.5 },
  { field: 'flow', headerName: 'Flow', flex: 1 },
  { field: 'hours', headerName: 'Hours', flex: 1 },
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
const rows = [
  {id: 1, combo: '019007009 -650082', lateral: 'CERES', sg: '01-01.5',
    name: 'Vito Chiesa', phoneNumber: '531-5235', flow: '0.93',
    hours: '48', date: '10/09', tranTime: '13280347', ex: null, final: 'N',
    comment: 'HOME 8832916', sbxcfs: '0.93', head: 'M', estStart: 'Thu 1430', 
    estFinish: 'Fri 1300', attention: null
  },
  {id: 2, combo: '019004018 -650081', lateral: 'CERES', sg: '02-01.5',
  name: 'Vito Chiesa', phoneNumber: '531-5235', flow: '1.34',
  hours: '72', date: '10/09', tranTime: '13272572', ex: null, final: 'N',
  comment: 'HM 8832916', sbxcfs: '1.34', head: 'M', estStart: 'Thu 1200', 
  estFinish: 'Sun 1200', attention: null
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
export default function MordersTable() {
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