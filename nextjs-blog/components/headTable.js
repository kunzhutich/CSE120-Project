import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import StripedDataGrid from './StripedDataGrid'; // Import the StripedDataGrid component
import CustomToolbar from './CustomToolbar'; // Import the CustomToolbar component

// Creates column definitions for the DataGrid

const columns = [
    { field: 'id', headerName: 'Combo', width: 130, hide: true, headerClassName: 'super-app-theme--header' },
    { field: 'lat', headerName: 'Lateral', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'sg', headerName: 'SG', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'name', headerName: 'Contact', flex: 2, headerClassName: 'super-app-theme--header' },
    { field: 'phone', headerName: 'Phone', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'flow', headerName: 'Rqst Flo', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'hours', headerName: 'Hours', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'est_start', headerName: 'Est Start', editable: true, flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'prime_date', headerName: 'Prime Date', editable: true, flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'prime_time', headerName: 'Prime Time', editable: true, flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'start_date', headerName: 'Start Date', editable: true, flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'start_time', headerName: 'Start Time', editable: true, flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'finish_date', headerName: 'Finish Date', editable: true, flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'finish_time', headerName: 'Finish Time', editable: true,  flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'prime_total', headerName: 'Prime Total', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'total_hours', headerName: 'Total Hour', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'called', headerName: 'Called', editable: true, flex: 1, headerClassName: 'super-app-theme--header' },
];



export default function HeadTable(props) {
    const { requiredString, headerColor  } = props;
    console.log(requiredString);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const sa = sessionStorage.getItem('sa');
                const response = await fetch(`http://127.0.0.1:5000/${requiredString}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'SA': sa,
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                // Map the fetched data to include a unique 'id' for each row using 'combo'
                const formattedData = data.map((item) => ({
                    ...item,
                    id: item.combo, // Use `combo` as the `id`
                }));
                setOrders(formattedData);
            } catch (error) {
                console.error("Failed to fetch orders:", error);
            }
        };

        fetchOrders();
    }, []);

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

    const handleProcessRowUpdateError = React.useCallback((error) => {
        console.log(error);
    }, []);

  return (
    <Box sx = {{height: 'auto', width: '100%', paddingLeft: 4, paddingRight: 4, '& .super-app-theme--header': {
      backgroundColor: headerColor,
    },}}>
      <StripedDataGrid
      rows={orders}
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