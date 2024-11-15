import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PagingAll from '../../Staff/Staff/PagingAll';
import { Box, Card, CardContent, CardMedia, Typography, Avatar, IconButton, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
const AdminBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [totalPages, setTotalPages] = useState(1); // Tổng số trang
  const navigate = useNavigate();
  // Gọi API mỗi khi currentPage thay đổi
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.post('https://exe201be.io.vn/api/blogs/search', {
          pageNum: currentPage,
          pageSize: 10,
          title: '',
          status: true,
        });

        if (response.data.success) {
          setBlogs(response.data.data.pageData); // Dữ liệu blog
          setTotalPages(response.data.data.totalPages); // Cập nhật tổng số trang
        } else {
          console.error('Failed to fetch blogs');
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, [currentPage]);

  const handleCreateBlog = () => {
    navigate(`/admin/blog/create`);
  };
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center' }}>
        Quản lý Blog
      </Typography>

      {/* Nút Tạo Blog */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button
          variant="contained"
          onClick={handleCreateBlog}
          sx={{
            padding: '10px 20px',
            borderRadius: 2,
            textTransform: 'none',
            backgroundColor:"#3B823E"
          }}
        >
          Tạo Blog
        </Button>
      </Box>

      {/* Hiển thị danh sách blog */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {blogs.map((blog) => (
          <Card
            key={blog.id}
            sx={{
              width: 300,
              boxShadow: 3,
              borderRadius: 2,
              position: 'relative',
              overflow: 'hidden',
              transition: 'transform 0.3s ease, background-color 0.3s ease',
              '&:hover': {
                transform: 'scale(1.02)', // Phóng to nhẹ
                '&:before': {
                  opacity: 0.8, // Làm tối nền
                },
                '.edit-icon': {
                  opacity: 1, // Hiện icon
                  transform: 'translateY(0)', // Di chuyển icon lên
                },
              },
              '&:before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.7)', // Màu overlay
                opacity: 0, // Mặc định ẩn overlay
                transition: 'opacity 0.3s ease', // Hiệu ứng mượt
                zIndex: 1, // Đảm bảo overlay nằm dưới chữ
              },
            }}
          >
            <IconButton
              className="edit-icon"
              sx={{
                position: 'absolute',
                top: '50%',
                left: '40%',
                transform: 'translate(-50%, 50%)', // Đặt ở giữa thẻ
                zIndex: 2, // Đặt icon lên trên
                opacity: 0, // Mặc định ẩn icon
                transition: 'opacity 0.3s ease, transform 0.3s ease',
                color: '#fff', // Màu trắng cho icon
              }}
            >
              <DeleteIcon fontSize="large" />
            </IconButton>
            <CardMedia
              component="img"
              height="150"
              image={blog.urlImg1}
              alt={blog.title}
            />

            <CardContent
              sx={{
                color: 'black',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold', }}>
                {blog.title}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <Avatar src={blog.urlAvatar} alt={blog.userName} sx={{ mr: 1 }} />
                <Typography variant="body2" color="inherit">
                  {blog.userName}
                </Typography>
              </Box>

              <Typography variant="body2" color="inherit" sx={{ mt: 1 }}>
                {new Date(blog.date).toLocaleDateString('vi-VN')}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Phân trang */}
      <PagingAll
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </Box>
  );
};

export default AdminBlog;
