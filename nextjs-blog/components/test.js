import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React from 'react';

function SimpleTest() {
    const columns = [
        { field: 'id', headerName: 'ID', width: 150, hide: true },
        { field: 'name', headerName: 'Name', width: 150, hide: true },
    ];

    const rows = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
    ];

    return (
        <div style={{ height: 300, width: '100%' }}>
            <DataGrid 
                rows={rows} 
                columns={columns} 
                slots={{
                    toolbar: GridToolbar,
                }}
                initialState={{
                    columns: {
                      columnVisibilityModel: {
                        // Hide columns status and traderName, the other columns will remain visible
                        // status: false,
                        // traderName: false,
                        name: false,
                        id: false
                      },
                    },
                  }}
            />
        </div>
    );
}

export default SimpleTest;
