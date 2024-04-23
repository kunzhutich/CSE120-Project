import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import StripedDataGrid from './StripedDataGrid'; // Import the StripedDataGrid component
import CustomToolbar from './CustomToolbar'; // Import the CustomToolbar component

// Creates column definitions for the DataGrid

const columns = [
  { field: 'id', headerName: '', width: 30, hide: true, headerClassName: 'super-app-theme--header' },
  { field: 'head', headerName: 'Head', flex: 2, headerClassName: 'super-app-theme--header' },
  { field: 'lateral', headerName: 'Lateral', flex: 1, headerClassName: 'super-app-theme--header' },
  { field: 'name', headerName: 'Contact', flex: 2, headerClassName: 'super-app-theme--header' },
  { field: 'phone', headerName: 'Phone', flex: 1, headerClassName: 'super-app-theme--header' },
  { field: 'rqstFlo', headerName: 'Rqst Flo', flex: 1, headerClassName: 'super-app-theme--header' },
  { field: 'hours', headerName: 'Hours', flex: 1, headerClassName: 'super-app-theme--header' },
  { field: 'estStart', headerName: 'Est Start', editable: true, flex: 1, headerClassName: 'super-app-theme--header' },
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

// Creates row data for the DataGrid
//const rows = [
//  { id: 1, head: '001002003 -654258', lateral: 'CM', sg: '06-05',
//    contact: 'George Washington', phoneNumber: '111-2345', rqstFlo: '16.77',
//    hours: '11', estStart: 'Thu 1430', primeDate: '0208', primeTime: '0635',
//    startDate: '0208', startTime: '1430', finishDate: '0208', finishTime: '1735',
//    primeTotal: '7:55', totalHour: '3:05', called: 'o'
//  },
//  { id: 2, head: '001002003 -654258', lateral: 'CM', sg: '06-05',
//    contact: 'George Washington', phoneNumber: '111-2345', rqstFlo: '16.77',
//    hours: '11', estStart: 'Thu 1430', primeDate: '0208', primeTime: '0635',
//    startDate: '0208', startTime: '1430', finishDate: '0208', finishTime: '1735',
//    primeTotal: '7:55', totalHour: '3:05', called: 'o'
//  },
//  { id: 3, head: '001002003 -654258', lateral: 'CM', sg: '06-05',
//    contact: 'George Washington', phoneNumber: '111-2345', rqstFlo: '16.77',
//    hours: '11', estStart: 'Thu 1430', primeDate: '0208', primeTime: '0635',
//    startDate: '0208', startTime: '1430', finishDate: '0208', finishTime: '1735',
//    primeTotal: '7:55', totalHour: '3:05', called: 'o'
//  },
//  { id: 4, head: '001002003 -654258', lateral: 'CM', sg: '06-05',
//    contact: 'George Washington', phoneNumber: '111-2345', rqstFlo: '16.77',
//    hours: '11', estStart: 'Thu 1430', primeDate: '0208', primeTime: '0635',
//    startDate: '0208', startTime: '1430', finishDate: '0208', finishTime: '1735',
//    primeTotal: '7:55', totalHour: '3:05', called: 'o'
//  },
//  { id: 5, head: ' ', lateral: ' ', sg: ' ',
//    contact: ' ', phoneNumber: ' ', rqstFlo: ' ',
//    hours: ' ', estStart: ' ', primeDate: ' ', primeTime: ' ',
//    startDate: ' ', startTime: ' ', finishDate: ' ', finishTime: ' ',
//    primeTotal: ' ', totalHour: '', called: ' '
//  }
//];

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