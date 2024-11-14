import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';
import axios from 'axios';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN');
  };
  useEffect(() => {
    // Get token from localStorage or wherever it is stored
    const tokenData = JSON.parse(localStorage.getItem('userData')) || {};
    const token = tokenData.token;

    // Fetch order data from the API
    axios.get('https://exe201be.io.vn/api/cart/cartbycurrentuser', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        if (response.data.success) {
          const orderData = response.data.data.orderDetails || [];
          setOrders(orderData);
        }
      })
      .catch(error => {
        console.error('Error fetching order history:', error);
      });
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="Order history table">
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell align="center">Tên sản phẩm</TableCell>
              <TableCell align="center">Ngày</TableCell>
              <TableCell align="center">Số lượng</TableCell>
              <TableCell align="center">Giá</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={order.id + index}> {/* Ensure unique key */}
                <TableCell component="th" scope="row">{order.orderId}</TableCell>
                <TableCell align="center">{order.productName || 'N/A'}</TableCell>
                <TableCell align="center">{order.date || 'N/A'}</TableCell>
                <TableCell align="center">{order.quantity || 'N/A'}</TableCell>
                <TableCell align="center">{formatPrice(order.price) } VNĐ</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default OrderHistory;
