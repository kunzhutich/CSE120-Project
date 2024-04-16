import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import {GridToolbar, DataGrid, gridClasses} from '@mui/x-data-grid';
import { alpha, styled } from '@mui/material/styles';

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity,
      ),
      '&:hover': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity,
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  },
}));

// Creates column definitions for the DataGrid
const columns = [
  { field: 'un', headerName: '#UN', flex: 1, headerClassName: 'super-app-theme--header'},
  { field: 'lateral', headerName: 'Lat', flex: 1, headerClassName: 'super-app-theme--header' },
  { field: 'sg', headerName: 'SG', flex: 1, headerClassName: 'super-app-theme--header' },
  { field: 'contact', headerName: 'Contact', flex: 1, headerClassName: 'super-app-theme--header'},
  { field: 'phoneNumber', headerName: 'Phone', flex: 1, headerClassName: 'super-app-theme--header'},
  { field: 'rqstFlo', headerName: 'Rqst Flo', flex: 1, headerClassName: 'super-app-theme--header' },
  { field: 'hours', headerName: 'Hours', flex: 1, headerClassName: 'super-app-theme--header' },
  { field: 'estStart', headerName: 'Est Start', editable: true, flex: 1.25, headerClassName: 'super-app-theme--header'},
  { field: 'primeDate', headerName: 'Prime Date', editable: true, flex: 1, headerClassName: 'super-app-theme--header'},
  { field: 'primeTime', headerName: 'Prime Time', editable: true, flex: 1, headerClassName: 'super-app-theme--header'},
  { field: 'startDate', headerName: 'Start Date', editable: true, flex: 1, headerClassName: 'super-app-theme--header' },
  { field: 'startTime', headerName: 'Start Time', editable: true, flex: 1, headerClassName: 'super-app-theme--header' },
  { field: 'finishDate', headerName: 'Finish Date', editable: true, flex: 1, headerClassName: 'super-app-theme--header' },
  { field: 'finishTime', headerName: 'Finish Time', editable: true, flex: 1, headerClassName: 'super-app-theme--header' },
  { field: 'totalHours', headerName: 'totalHours', editable: true, flex: 1, headerClassName: 'super-app-theme--header' },
  { field: 'build', headerName: 'BI', editable: true, flex: 1, headerClassName: 'super-app-theme--header' },
  { field: 'called', headerName: 'Called', editable: true, flex: 1, headerClassName: 'super-app-theme--header' },
  { field: 'wdoNotes', headerName: 'WDO Notes', editable: true, flex: 2, headerClassName: 'super-app-theme--header' },
  { field: 'farmerComments', headerName: 'Farmer Comments', editable: true, flex: 2, headerClassName: 'super-app-theme--header' },
  { field: 'mark', headerName: 'Mark', flex: 1, headerClassName: 'super-app-theme--header' },
  { field: 'towaResponse', headerName: 'Towa Response', flex: 1, headerClassName: 'super-app-theme--header' },
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

  {id: 1, un: ' ', lateral: ' ', sg: ' ',
    contact: ' ', phoneNumber: ' ', rqstFlo: ' ',
    hours: ' ', estStart: ' ', primeDate: ' ', primeTime: ' ', 
    startDate: ' ', startTime: ' ', finishDate: ' ', finishTime: ' ', 
    totalHours: ' ', build: ' ', called: ' ', wdoNotes: ' ',
    farmerComments: ' ', mark: ' ', towaResponse: ' ',
  },

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
    <Box sx = {{height: '100vh', width: '100%', paddingTop: 2, paddingLeft: 4, paddingRight: 4, '& .super-app-theme--header': {
      backgroundColor: 'rgba(101, 176, 193, 0.5)',
    }}}>
      <StripedDataGrid
      rows={rows}
      columns={columns}
      hideFooter

      slots={{
        toolbar: GridToolbar,
      }}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
      }
      />
    </Box>
  );
}