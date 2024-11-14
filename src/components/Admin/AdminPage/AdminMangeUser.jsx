import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Snackbar } from '@mui/material';
import axios from 'axios';
import PagingAll from '../../Staff/Staff/PagingAll'; // Import PagingAll component

const AdminMangeUser = () => {
  const [users, setUsers] = useState([]); // State to store the users data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [totalPages, setTotalPages] = useState(1); // State for total pages
  
  const [openModal, setOpenModal] = useState(false); // State to manage modal visibility
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  // Fetching the data from the API when the component mounts or when currentPage changes
  const fetchUsers = async () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const token = userData ? userData.token : null;

    if (!token) {
      alert('Token không hợp lệ. Vui lòng đăng nhập lại.');
      return;
    }

    try {
      const response = await axios.post(
        'https://exe201be.io.vn/api/user/search',
        {
          pageNum: currentPage,  // Use currentPage from state
          pageSize: 10,          // Set page size (you can adjust it as needed)
          name: '',              // Search by name (if applicable)
          status: null,          // Filter by status (only active users in this example)
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Pass token in the header
          },
        }
      );
      if (response.status === 200 && response.data) {
        setUsers(response.data.data.pageData); // Update users data
        setTotalPages(response.data.data.pageInfo.totalPage); // Update total pages
        setLoading(false); // Set loading to false once data is fetched
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false); // Handle error and stop loading
    }
  };

  useEffect(() => {
    fetchUsers(); // Fetch data when the component mounts or when currentPage changes
  }, [currentPage]); // Re-run when currentPage changes

  // Helper function to format the status with colors
  const formatStatus = (status) => {
    return status ? (
      <span style={{ color: 'green' }}>Đang hoạt động</span>
    ) : (
      <span style={{ color: 'gray' }}>Đã vô hiệu hóa</span>
    );
  };

  // Handle change status action
  const handleChangeStatus = async (userId, status) => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const token = userData ? userData.token : null;

    if (!token) {
      alert('Token không hợp lệ. Vui lòng đăng nhập lại.');
      return;
    }

    const newStatus = !status; // Đảo giá trị status

    try {
      const response = await axios.post(
        `https://exe201be.io.vn/api/user/change-status/${userId}?status=${newStatus}`, // Truyền status trực tiếp trong URL
        {}, // Body rỗng vì status đã ở trong URL
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert('Trạng thái người dùng đã được cập nhật');
        fetchUsers(); // Làm mới danh sách người dùng
      }
      console.log(response);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  // Handle create new admin (without passing role)
  const handleCreateAdmin = () => {
    setOpenModal(true); // Open modal to create an admin
  };

  // Handle create new staff (without passing role)
  const handleCreateStaff = () => {
    setOpenModal(true); // Open modal to create a staff
  };

  // Handle create user (admin or staff) with no role in the API
  const handleCreateUser = async () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const token = userData ? userData.token : null;
    console.log(token)
    if (!token) {
      alert('Token không hợp lệ. Vui lòng đăng nhập lại.');
      return;
    }

    try {
      const apiUrl = `https://exe201be.io.vn/api/user/admin?account=${email}&password=${password}&name=${userName}`; 

      // If role is not admin, use the respective API endpoint for staff
      const response = await axios.post(
        apiUrl,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setSnackbarMessage('Tạo Admin thành công');
        setSnackbarOpen(true);
        alert('Admin đã được tạo thành công');
        setOpenModal(false); // Close the modal
        fetchUsers(); // Reload users data
      }
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Có lỗi xảy ra, vui lòng thử lại');
    }
  };
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        Quản lý người dùng
      </Typography>

      {/* Nút tạo Staff và Admin */}
      <Button variant="contained" color="primary" onClick={handleCreateStaff} style={{ marginRight: 10 }}>
        Tạo Staff
      </Button>
      <Button variant="contained" color="secondary" onClick={handleCreateAdmin}>
        Tạo Admin
      </Button>

      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>Vai trò</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.userName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell>{user.roleName}</TableCell>
                <TableCell>{formatStatus(user.status)}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleChangeStatus(user.id, user.status)}
                  >
                    {user.status ? 'Vô hiệu hóa' : 'Kích hoạt'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal để tạo Staff hoặc Admin */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Tạo Người Dùng</DialogTitle>
        <DialogContent>
          <TextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginBottom: 20 }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: 20 }}
          />
          <TextField
            label="User Name"
            fullWidth
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            style={{ marginBottom: 20 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} color="secondary">
            Hủy
          </Button>
          <Button color="primary" onClick={handleCreateUser}>
            Tạo
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
      {/* Pass currentPage, setCurrentPage, and totalPages to PagingAll */}
      <PagingAll currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
    </div>
  );
};

export default AdminMangeUser;
