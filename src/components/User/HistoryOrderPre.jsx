import React, { useEffect, useState } from 'react';
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
import axios from 'axios';

export default function HistoryOrderPre() {
  const [orders, setOrders] = useState([]);

  // Function to get token from localStorage
  const getTokenFromStorage = () => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        return JSON.parse(userData).token;
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        return null;
      }
    }
    return null;
  };

  // Call API to get orders data
  useEffect(() => {
    const token = getTokenFromStorage();

    if (token) {
      axios.post('https://exe201be.io.vn/api/order/allordercurrenuser', {
        orderId: '',
        pageNum: 1,
        pageSize: 999,
        status: 2
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        if (response.data.success) {
          // Only take the first 5 orders
          const first5Orders = response.data.data.pageData.slice(0, 5);
          setOrders(first5Orders);
        } else {
          console.error('Error fetching data:', response.data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    } else {
      console.error('No token found in localStorage');
    }
  }, []);

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
          width: '91%',
          borderColor: '#E4E7E9',
          backgroundColor: 'white',
          borderTopLeftRadius: 4,
        }}
      >
        <Typography sx={{ fontWeight: 500, padding: 1 }}>Lịch sử giao dịch gần đây</Typography>
        <Link to="/userlist/orderhistory" style={{ textDecoration: 'none' }}>
          <Box display="flex" alignItems="center">
            <Typography variant="body2" color="#FA8232" sx={{ textDecoration: 'none' }}>
              Xem tất cả
            </Typography>
            <ArrowForwardIcon sx={{ marginLeft: 0.5, color: '#FA8232' }} />
          </Box>
        </Link>
      </Box>

      <TableContainer>
        <Table
          sx={{
            minWidth: 650,
            border: 1,
            borderColor: '#E4E7E9',
            width: "92.5%",
            backgroundColor: '#F2F4F5',
          }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="center">Order ID</TableCell>
              <TableCell align="center">Tên sản phẩm</TableCell>
              <TableCell align="center">Ngày</TableCell>
              <TableCell align="center">Số lượng</TableCell>
              <TableCell align="center">Giá</TableCell>
            </TableRow>
          </TableHead>
          <TableBody component={Paper}>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell align="center">{order.id}</TableCell>
                <TableCell align="center">{order.orderDetails[0].productName}</TableCell>
                <TableCell align="center">{order.date}</TableCell>
                <TableCell align="center">{order.orderDetails[0].quantity}</TableCell>
                <TableCell align="center">
                  {order.totalPrice.toLocaleString('vi-VN')} VNĐ
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
