import { alpha, styled } from '@mui/material/styles';
import { DataGrid, gridClasses } from '@mui/x-data-grid';

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
    [`& .${gridClasses.row}`]: {
        '&.even': {
            backgroundColor: theme.palette.grey[200],
            '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.2),
            },
        },
        '&.abnormal': {
            backgroundColor: '#ff0000',
            color: theme.palette.getContrastText('#ff0000'),
            '&:hover': {
                backgroundColor: alpha(theme.palette.error.dark, 0.8),
            },
            [`& .${gridClasses.cell}`]: {
                color: 'inherit', // Ensuring all text within cells inherit
                '& input, & select, & .MuiInputBase-input, & .MuiOutlinedInput-input': {
                    color: 'inherit',
                    '&::placeholder': {
                        color: 'inherit',
                    },
                },
                '& .MuiSelect-select': {  // Targeting the select dropdown component specifically
                    color: 'inherit',
                },
                '& .MuiInputBase-root': {  // Ensuring all input roots in MUI adopt the text color
                    color: 'inherit',
                },
                '& .MuiPickerBase-picker, & .MuiPickerBase-picker .MuiInputBase-input': { // Specifically targeting date/time picker inputs
                    color: 'inherit',
                }
            }
        },
        '&.dark-gray': {
            backgroundColor: '#424242',
            color: theme.palette.getContrastText('#424242'),
            '&:hover': {
                backgroundColor: alpha(theme.palette.grey[900], 0.8),
            },
            [`& .${gridClasses.cell}`]: {
                color: 'inherit', // Ensuring all text within cells inherit
                '& input, & select, & .MuiInputBase-input, & .MuiOutlinedInput-input': {
                    color: 'inherit',
                    '&::placeholder': {
                        color: 'inherit',
                    },
                },
                '& .MuiSelect-select': {  // Targeting the select dropdown component specifically
                    color: 'inherit',
                },
                '& .MuiInputBase-root': {  // Ensuring all input roots in MUI adopt the text color
                    color: 'inherit',
                },
                '& .MuiPickerBase-picker, & .MuiPickerBase-picker .MuiInputBase-input': { // Specifically targeting date/time picker inputs
                    color: 'inherit',
                }
            }
        }
    },
    [`& .${gridClasses.cell}`]: {
        '&:focus-within': {
            outline: `solid ${alpha(theme.palette.primary.main, 0.5)} 2px`,
        },
    },
}));

export default StripedDataGrid;