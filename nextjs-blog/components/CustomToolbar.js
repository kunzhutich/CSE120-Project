import React from 'react';
import { GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector } from '@mui/x-data-grid';

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

export default CustomToolbar;
