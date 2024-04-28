import { alpha, styled } from '@mui/material/styles';
import { DataGrid, gridClasses } from '@mui/x-data-grid';

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}`]: {
    '&.even': {
      backgroundColor: theme.palette.grey[200],
      '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
        '@media (hover: none)': {
          backgroundColor: 'transparent',
        },
      },
    },
    '&.abnormal': {
      backgroundColor: '#ff0000', // Red background for abnormal rows
      color: theme.palette.getContrastText('#ff0000'),
      '&:hover': {
        backgroundColor: alpha(theme.palette.error.dark, 0.8),
        '@media (hover: none)': {
          backgroundColor: '#ff0000',
        },
      },
    },
  },
  [`& .${gridClasses.cell}`]: {
    '&:focus-within': {
      outline: `solid ${alpha(theme.palette.primary.main, 0.5)} 2px`,
    },
  },
}));

export default StripedDataGrid;
