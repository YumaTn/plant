import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function HistoryOrderPre() {
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          border: 1,
          padding: 1,
          marginTop: 4,
          borderColor: '#E4E7E9',
          backgroundColor: 'white',
          borderTopleftRadius: 4,
          borderTopLeftRadius: 4,
          marginRight: 10.5,
        }}
      >
        <Typography sx={{ fontWeight: 500, padding: 1 }}>RECENT ORDER</Typography>
        <Link to="/orderhistory" style={{ textDecoration: 'none' }}>
          <Box display="flex" alignItems="center">
            <Typography variant="body2" color="#FA8232" sx={{ textDecoration: 'none' }}>
              View All
            </Typography>
            <ArrowForwardIcon sx={{ marginLeft: 0.5, color: '#FA8232' }} />
          </Box>
        </Link>
      </Box>

      <TableContainer>
        {/* Table Content */}
        <Table
          sx={{
            minWidth: 650,
            border: 1,
            borderColor: '#E4E7E9',
            width: 1040,
            backgroundColor: '#F2F4F5',
          }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="center">Order ID</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody component={Paper}>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">
                  <Link to="#" style={{ textDecoration: 'none', display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                    <Box display="flex" alignItems="center">
                      <Typography sx={{ color: '#FA8232', textDecoration: 'none' }}>
                        View All
                      </Typography>
                      <ArrowForwardIcon sx={{ marginLeft: 0.5, color: '#FA8232' }} />
                    </Box>
                  </Link>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
