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
          setOrders(response.data.data.pageData);
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
                <TableCell component="th" scope="row">{order.id}</TableCell>
                <TableCell align="center">{order.orderDetails[0].productName}</TableCell>
                <TableCell align="center">{order.date}</TableCell>
                <TableCell align="center">{order.orderDetails[0].quantity || 'N/A'}</TableCell>
                <TableCell align="center">{formatPrice(order.orderDetails[0].price) } VNĐ</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default OrderHistory;
