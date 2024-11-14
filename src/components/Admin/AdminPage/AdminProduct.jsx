import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
} from '@mui/material';
import { Delete as DeleteIcon, Search as SearchIcon, Edit as EditIcon } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import PagingAll from '../../Staff/Staff/PagingAll';

const AdminProduct = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to page 1 when search term changes
  };

  const handleEditClick = (productId) => {
    // Chuyển hướng đến trang chỉnh sửa sản phẩm
    navigate(`/admin/edit/${productId}`);
  };

  const handleDelete = async (id) => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const token = userData ? userData.token : null;

    if (!token) {
      alert('Token không hợp lệ. Vui lòng đăng nhập lại.');
      return;
    }

    if (window.confirm('Bạn có chắc muốn xóa sản phẩm này không?')) {
      try {
        const response = await axios.post(
          `https://exe201be.io.vn/api/product/detele/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.status === 200) {
          setData(data.filter((item) => item.id !== id));
          alert('Sản phẩm đã được xóa thành công!');
        } else {
          alert('Xóa sản phẩm thất bại!');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Xóa sản phẩm thất bại!');
      }
    }
  };

  const handleCreateClick = () => {
    // Chuyển hướng đến trang chỉnh sửa sản phẩm
    navigate(`/admin/create`);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.post(
          'https://exe201be.io.vn/api/product/search', // URL của API
          {
            pageNum: currentPage,
            pageSize: rowsPerPage,
            name: searchTerm,
            categoryName: searchTerm,
            status: true,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.status === 200 && response.data) {
          if (response.data.data && response.data.data.pageInfo) {
            setTotalPages(response.data.data.pageInfo.totalPage);
            setData(response.data.data.pageData);
          } else {
            console.error('Total pages not found in response');
          }
        } else {
          console.error(`API request failed with status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [currentPage, rowsPerPage, searchTerm]);

  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN');
  };

  return (
    <div style={{ padding: 20 }}>
      <Box display="flex" alignItems="center" gap={2} marginBottom={2}>
        <TextField
          variant="outlined"
          placeholder="Tìm kiếm"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: <SearchIcon />,
          }}
          style={{ flex: 1 }}
        />

        <Button variant="contained" color="primary" onClick={() => handleCreateClick()}>
          Thêm sản phẩm
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ảnh</TableCell>
              <TableCell>Tên sản phẩm</TableCell>
              <TableCell>Danh mục</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell>Giá tiền</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <img
                    src={row.urlImg}
                    alt="Product"
                    style={{ borderRadius: '50%', width: 40, height: 40 }}
                  />
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.categoryName}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{formatPrice(row.price)} VNĐ</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEditClick(row.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(row.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PagingAll currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
    </div>
  );
};

export default AdminProduct;
