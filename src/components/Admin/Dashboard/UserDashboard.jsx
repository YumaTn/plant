import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts';

const UserDashboard = () => {
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState(0);  // Số lượng người dùng
  const [staffData, setStaffData] = useState(0);  // Số lượng nhân viên

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData')); // Lấy token từ localStorage
    const token = userData?.token; // Lấy token
    console.log(token);

    if (token) {
      // Gửi yêu cầu API để lấy danh sách người dùng
      axios
        .post(
          'https://exe201be.io.vn/api/user/search',
          {
            pageNum: 1,
            pageSize: 999,
            keyWord: '',
            role: 'All',
            status: true,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Thêm token vào header Authorization
            },
          }
        )
        .then((response) => {
          // Lọc những người có role là 'Admin'
          const filteredUsers = response.data.data.pageData.filter(
            (user) => user.roleName !== 'Admin'
          );
          setUsers(filteredUsers);

          // Tính số lượng User và Staff
          const userCount = filteredUsers.filter(user => user.roleName === 'User').length;
          const staffCount = filteredUsers.filter(user => user.roleName === 'Staff').length;

          // Cập nhật dữ liệu biểu đồ
          setUserData(userCount);
          setStaffData(staffCount);
        })
        .catch((error) => {
          // Xử lý lỗi và log thông tin chi tiết
          if (error.response) {
            console.log('API error response:', error.response);
            console.log('Status code:', error.response.status);
            console.log('Response data:', error.response.data);
          } else if (error.request) {
            console.log('API error request:', error.request);
          } else {
            console.log('Error', error.message);
          }
        });
    } else {
      console.log('No token found');
    }
  }, []);

  const chartProps = {
    width: 500,
    height: 300,
    xAxis: [{ data: ['User', 'Staff'], scaleType: 'band' }],
  };

  // Tính tổng số lượng User và Staff
  const totalUsersAndStaff = userData + staffData;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Số lượng người dùng
      </Typography>
      <BarChart
        {...chartProps}
        series={[
          {
            data: [userData, staffData],  // Dữ liệu riêng biệt cho User và Staff
            label: 'Vai trò', 
            color: ['#4caf50'],  // Màu sắc cho User (xanh lá) và Staff (cam)
          },
        ]}
      />
      
      {/* Hiển thị tổng số người dùng với màu xanh */}
      <Typography variant="h6" sx={{ mt: 3, color: 'green' }}>
        Tổng người dùng: {userData}
      </Typography>
      
      {/* Hiển thị tổng số nhân viên với màu cam */}
      <Typography variant="h6" sx={{ mt: 1, color: 'orange' }}>
        Tổng nhân viên: {staffData}
      </Typography>

      {/* Hiển thị tổng số người dùng và nhân viên */}
      <Typography variant="h6" sx={{ mt: 1 }}>
        Tổng người dùng và nhân viên: {totalUsersAndStaff}
      </Typography>
    </Box>
  );
};

export default UserDashboard;
