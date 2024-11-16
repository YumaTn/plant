import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';

const ReturnHome = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/shop/AllProduct');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f9f9f9',
        textAlign: 'center',
      }}
    >
      {/* Thông báo không có sản phẩm */}
      <Typography
        variant="h6"
        sx={{
          marginBottom: '16px',
          color: '#555',
        }}
      >
        Không có sản phẩm nào được thêm vào giỏ hàng, vui lòng tới trang cửa hàng.
      </Typography>

      {/* Nút Trở về cửa hàng */}
      <Button
        onClick={handleClick}
        sx={{
          padding: '10px 20px',
          fontSize: '16px',
          color: 'green',
          border: '2px solid green',
          borderRadius: '8px',
          backgroundColor: 'transparent',
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: 'green',
            color: 'white',
          },
        }}
      >
        Trở về cửa hàng
      </Button>
    </Box>
  );
};

export default ReturnHome;
