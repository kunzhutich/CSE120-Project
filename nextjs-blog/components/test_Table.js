import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const BasicTable = ({ orders }) => {
  // Define custom styles
  const tableStyle = {
    minWidth: 650,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const headerCellStyle = {
    backgroundColor: '#f5f5f5',
    borderBottom: '2px solid #e0e0e0',
    fontWeight: 'bold',
    padding: '12px 16px',
  };

  const cellStyle = {
    padding: '12px 16px',
  };

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yogurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  return (
    <TableContainer component={Paper} style={tableStyle}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table"></Table>
      <Table aria-label='basic table'>
        <TableHead>
          <TableRow>
            <TableCell style={headerCellStyle}>ID</TableCell>
            <TableCell style={headerCellStyle}>Combo</TableCell>
            <TableCell style={headerCellStyle}>Lat</TableCell>
            <TableCell style={headerCellStyle}>SG</TableCell>
            <TableCell style={headerCellStyle}>Name</TableCell>
            <TableCell style={headerCellStyle}>Phone</TableCell>
            <TableCell style={headerCellStyle}>Flow</TableCell>
            <TableCell style={headerCellStyle}>Hours</TableCell>
            <TableCell style={headerCellStyle}>Acre</TableCell>
            <TableCell style={headerCellStyle}>Crop</TableCell>
            <TableCell style={headerCellStyle}>Type</TableCell>
            <TableCell style={headerCellStyle}>Date</TableCell>
            <TableCell style={headerCellStyle}>SBXCFS</TableCell>
            <TableCell style={headerCellStyle}>Head</TableCell>
            <TableCell style={headerCellStyle}>Est Start</TableCell>
            <TableCell style={headerCellStyle}>Est Stop</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
            {/* <TableRow>
            <TableCell style={cellStyle}>Test</TableCell>
            <TableCell style={cellStyle} align='right'></TableCell>
            <TableCell style={cellStyle} align='right'></TableCell>
            <TableCell style={cellStyle} align='right'></TableCell>
            <TableCell style={cellStyle} align='right'></TableCell>
            <TableCell style={cellStyle} align='right'></TableCell>
            <TableCell style={cellStyle} align='right'></TableCell>
            <TableCell style={cellStyle} align='right'></TableCell>
            <TableCell style={cellStyle} align='right'></TableCell>
            <TableCell style={cellStyle} align='right'></TableCell>
            <TableCell style={cellStyle} align='right'></TableCell>
            <TableCell style={cellStyle} align='right'></TableCell>
            <TableCell style={cellStyle} align='right'></TableCell>
            <TableCell style={cellStyle} align='right'></TableCell>
            <TableCell style={cellStyle} align='right'></TableCell>
            <TableCell style={cellStyle} align='right'></TableCell>
            </TableRow> */}

            {/* <TableRow>
            <TableCell style={cellStyle}>Test</TableCell>
            <TableCell style={cellStyle} align='right'></TableCell>
            <TableCell style={cellStyle} align='right'></TableCell>
            <TableCell style={cellStyle} align='right'></TableCell>
            <TableCell style={cellStyle} align='right'></TableCell>
            <TableCell style={cellStyle} align='right'></TableCell>
            <TableCell style={cellStyle} align='right'></TableCell>
            <TableCell style={cellStyle} align='right'></TableCell>
            <TableCell style={cellStyle} align='right'></TableCell>
            <TableCell style={cellStyle} align='right'></TableCell>
            <TableCell style={cellStyle} align='right'></TableCell>
            <TableCell style={cellStyle} align='right'></TableCell>
            <TableCell style={cellStyle} align='right'></TableCell>
            <TableCell style={cellStyle} align='right'></TableCell>
            <TableCell style={cellStyle} align='right'></TableCell>
            <TableCell style={cellStyle} align='right'></TableCell>
            </TableRow>
            
            <TableRow>
            <TableCell style={cellStyle}>Test</TableCell>
            <TableCell style={cellStyle} align='right'></TableCell>
            <TableCell style={cellStyle} align='right'></TableCell>
            <TableCell style={cellStyle} align='right'></TableCell>
            <TableCell style={cellStyle} align='right'></TableCell>
            <TableCell style={cellStyle} align='right'></TableCell>
            <TableCell style={cellStyle} align='right'></TableCell>
            <TableCell style={cellStyle} align='right'></TableCell>
            <TableCell style={cellStyle} align='right'></TableCell>
            <TableCell style={cellStyle} align='right'></TableCell>
            <TableCell style={cellStyle} align='right'></TableCell>
            <TableCell style={cellStyle} align='right'></TableCell>
            <TableCell style={cellStyle} align='right'></TableCell>
            <TableCell style={cellStyle} align='right'></TableCell>
            <TableCell style={cellStyle} align='right'></TableCell>
            <TableCell style={cellStyle} align='right'></TableCell>
            </TableRow> */}

//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

export default BasicTable;
