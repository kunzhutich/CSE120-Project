import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import StripedDataGrid from './StripedDataGrid'; // Import the StripedDataGrid component
import CustomToolbar from './CustomToolbar'; // Import the CustomToolbar component
import useSWR from "swr";
import fetcher from '../utils/fetcher';

// Creates column definitions for the DataGrid

const columns = [
  { field: 'id', headerName: '', width: 30, hide: true, headerClassName: 'super-app-theme--header' },
  { field: 'head', headerName: 'Head', flex: 2, headerClassName: 'super-app-theme--header' },
  { field: 'lat', headerName: 'Lateral', flex: 1, headerClassName: 'super-app-theme--header' },
  { field: 'name', headerName: 'Contact', flex: 2, headerClassName: 'super-app-theme--header' },
  { field: 'phone', headerName: 'Phone', flex: 1, headerClassName: 'super-app-theme--header' },
  { field: 'flow', headerName: 'Rqst Flo', flex: 1, headerClassName: 'super-app-theme--header' },
  { field: 'hours', headerName: 'Hours', flex: 1, headerClassName: 'super-app-theme--header' },
  { field: 'est_start', headerName: 'Est Start', editable: true, flex: 1, headerClassName: 'super-app-theme--header' },
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


export default function HeadTable(props) {
    const { requiredString, headerColor  } = props;
    console.log(requiredString);
    const [orders, setOrders] = useState([]);

    const handleProcessRowUpdateError = React.useCallback((error) => {
        console.log(error);
    }, []);

    const {data, error, loading} = useSWR(`http://127.0.0.1:5000/${requiredString}`, fetcher, {refreshInterval: 1000});

    if (error) return <div>Failed to load</div>
    if (loading) return <div>Loading</div>

    if (!data) return <div>No Data</div>

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
    <Box sx = {{height: 'auto', width: '100%', paddingLeft: 4, paddingRight: 4, '& .super-app-theme--header': {
      backgroundColor: headerColor,
    },}}>
      <StripedDataGrid
      rows={head1}
      columns={columns}
      processRowUpdate={(updatedRow, originalRow) =>
          handleCellEditCommit(updatedRow)
      }
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