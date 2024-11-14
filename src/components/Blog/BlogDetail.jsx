import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Divider, useTheme } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BlogDetail = () => {
  const theme = useTheme();
  const { id } = useParams(); // Lấy id từ URL
  const [blogDetail, setBlogDetail] = useState(null);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        const response = await axios.get(`https://exe201be.io.vn/api/blogs/byid/${id}`);
        setBlogDetail(response.data.data); // Lưu dữ liệu blog vào state
      } catch (error) {
        console.error('Error fetching blog detail:', error);
      }
    };

    fetchBlogDetail();
  }, [id]); // Gọi lại API khi id thay đổi

  if (!blogDetail) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Paper sx={{ maxWidth: '800px', margin: 'auto', p: 3, backgroundColor: 'transparent' }}>
      <Box component="header" sx={{ mb: 2 }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', color: '#333', marginTop: '50px' }}>
          {blogDetail.title}
        </Typography>
        <Typography variant="subtitle2" sx={{ color: '#777', mt: 1, display: 'flex', alignItems: 'center' }}>
          <Box
            component="img"
            src={blogDetail.urlAvatar}
            alt="avatar"
            sx={{
              width: 50, // Điều chỉnh kích thước avatar
              height: 50,
              borderRadius: '50%', // Bo tròn hình ảnh
              marginRight: 1, // Khoảng cách giữa avatar và tên người dùng
            }}
          />
          <span className="author">{blogDetail.userName}</span>
          <span className="date" style={{ marginLeft: '10px' }}>
            {new Date(blogDetail.date).toLocaleDateString()}
          </span>
        </Typography>
      </Box>

      <Box component="section">
        {/* Hiển thị hình ảnh từ API */}
        <Box component="img" src={blogDetail.urlImg1} alt="Blog Detail 1" sx={{ width: '100%', height: 'auto', mb: 2 }} />
        <Typography paragraph>{blogDetail.description}</Typography>

        {/* Hiển thị các hình ảnh khác nếu có */}
        {blogDetail.urlImg2 && (
          <Box component="img" src={blogDetail.urlImg2} alt="Blog Detail 2" sx={{ width: '100%', height: 'auto', mb: 2 }} />
        )}
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box component="footer">
        <Typography variant="h5" component="h2" sx={{ color: '#333' }}>
          Conclusion
        </Typography>
        <Typography paragraph>
          {blogDetail.description}
        </Typography>
      </Box>
    </Paper>
  );
};

export default BlogDetail;
