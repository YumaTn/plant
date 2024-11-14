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

  useEffect(() => {
    // Get token from localStorage
    const tokenData = JSON.parse(localStorage.getItem('userData')) || {};
    const token = tokenData.token;

    // Fetch order history from API
    axios.get('https://exe201be.io.vn/api/cart/cartbycurrentuser', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        if (response.data.success) {
          const orderData = response.data.data.orderDetails || [];
          
          const formattedOrders = orderData.slice(0, 5).map(order => ({
            id: order.orderId || '',
            productName: order.productName || '',
            date: order.date || '',
            quantity: order.quantity || '',
            price: order.price || 0
          }));
          
          setOrders(formattedOrders);
        }
      })
      .catch(error => {
        console.error('Error fetching order history:', error);
      });
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
              View All
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
              <TableCell align="center" >Giá</TableCell>
            </TableRow>
          </TableHead>
          <TableBody component={Paper} >
            {orders.map((order) => (
              <TableRow key={order.id} >
                <TableCell align="center">{order.id}</TableCell>
                <TableCell align="center">{order.productName}</TableCell>
                <TableCell align="center">{order.date}</TableCell>
                <TableCell align="center">{order.quantity}</TableCell>
                <TableCell align="center">{order.price.toLocaleString('vi-VN')} VNĐ</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
