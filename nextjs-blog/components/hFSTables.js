import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import StripedDataGrid from './StripedDataGrid'; // Import the StripedDataGrid component
import {GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton,
        GridToolbarDensitySelector, DataGrid} from '@mui/x-data-grid';
import useSWR from "swr";
import fetcher from '../utils/fetcher';


// Creates column definitions for the DataGrid
const columns = [
    { field: 'id', headerName: 'Head', width: 150, headerClassName: 'super-app-theme--header' },
    { field: 'sg', headerName: 'SG', width: 75, headerClassName: 'super-app-theme--header'},
    { field: 'name', headerName: 'Contact', width: 250, headerClassName: 'super-app-theme--header'},
    { field: 'hours', headerName: 'Hours', width: 75, headerClassName: 'super-app-theme--header'},
    { field: 'estStart', headerName: 'Est Start', editable: true, headerClassName: 'super-app-theme--header'},
];

// Custom toolbar for datagrid settings
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

export default function HFSTable(props) {
    const { requiredString, headerColor  } = props;
    console.log(requiredString);
    const [orders, setOrders] = useState([]);

    const {data, error, loading} = useSWR(`http://127.0.0.1:5000/${requiredString}`, fetcher, {refreshInterval: 1000});

    if (error) return <div>Failed to load</div>
    if (loading) return <div>Loading</div>

    if(!data) return <div>No Data</div>

    const handleCellEditCommit = async (updatedRow) => {
        try {
            const { id, ...updatedOrder } = updatedRow; // Destructure the updatedRow object to get id and rest of the updatedOrder
            const updatedOrders = orders.map(order =>
                order.id === id ? { ...order, ...updatedOrder } : order
            );
            setOrders(updatedOrders);

            const encodedId = encodeURIComponent(id);

            // Send the updated data to your backend API for saving
            const sa = sessionStorage.getItem('sa');
            const response = await fetch(`http://127.0.0.1:5000/updateOrder/${encodedId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'SA': sa,
                },
                body: JSON.stringify(updatedOrder), // Send the entire updatedOrder object
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            if (response.ok) {
                console.log(message);
            }
        } catch (error) {
            console.error('Failed to update order:', error);
        };
    };

    const head1 = data.map((item) => ({
        ...item,
        id: item.combo, // Use `combo` as the `id`
    }));

return (
    <Box sx = {{height: 420, width: '39vw', paddingLeft: 2, paddingRight: 4, '& .super-app-theme--header': {
      backgroundColor: headerColor,
    }}}>
        <StripedDataGrid
            rows={head1}
            columns={columns}
            hideFooter

      slots={{
        toolbar: CustomToolbar
      }}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
      }
      processRowUpdate={(updatedRow, originalRow) =>
            handleCellEditCommit(updatedRow)
      }
        />
    </Box>
    );
}