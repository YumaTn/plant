import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton, Box } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';

const rows = [
  { id: '#96457961', status: 'IN PROGRESS', date: 'Dec 30, 2019 07:52', total: '$80 (5 Products)' },
  { id: '#71676167', status: 'COMPLETED', date: 'Dec 7, 2019 23:26', total: '$70 (4 Products)' },
  { id: '#12345678', status: 'CANCELED', date: 'Dec 1, 2019 11:30', total: '$50 (3 Products)' },
  // Add more unique rows as needed
];

function getStatusColor(status) {
  switch (status) {
    case 'IN PROGRESS':
      return '#FA8232'; // Orange
    case 'COMPLETED':
      return '#2DB224'; // Green
    case 'CANCELED':
      return '#EE5858'; // Red
    default:
      return '#000000'; // Default to black if none of the above
  }
}

function OrderHistory() {
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const handlePrevPage = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < Math.ceil(rows.length / rowsPerPage) - 1) setPage(page + 1);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="Order history table">
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Total</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={row.id + index}> {/* Ensure unique key */}
                <TableCell component="th" scope="row">{row.id}</TableCell>
                <TableCell align="left" sx={{ color: getStatusColor(row.status) }}>{row.status}</TableCell>
                <TableCell align="left">{row.date}</TableCell>
                <TableCell align="left">{row.total}</TableCell>
                <TableCell align="left" sx={{ display: 'flex', alignItems: 'center' }}>
                  <Link to="/userlist/orderhistorydetail" style={{ textDecoration: 'none', color: '#2DA5F3' }}>
                  <Box display="flex" alignItems="center">
                    <Typography>View Details</Typography>
                    <ArrowForwardIcon sx={{ marginLeft: 0.5, color: '#2DA5F3' }} />
                    </Box>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography component="div" align="center" sx={{ mt: 2 }}>
        <IconButton onClick={handlePrevPage} disabled={page === 0} sx={{ borderRadius: '50%' }}>
          <ArrowBackIosIcon />
        </IconButton>
        {Array.from({ length: Math.ceil(rows.length / rowsPerPage) }, (_, index) => (
          <IconButton
            key={index}
            onClick={() => setPage(index)}
            sx={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              margin: '0 4px',
              backgroundColor: 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <span style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              backgroundColor: page === index ? 'primary.main' : 'grey.300',
              color: 'black',
            }}>
              {index + 1}
            </span>
          </IconButton>
        ))}
        <IconButton onClick={handleNextPage} disabled={page === Math.ceil(rows.length / rowsPerPage) - 1} sx={{ borderRadius: '50%' }}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Typography>
    </>
  );
}

export default OrderHistory;
