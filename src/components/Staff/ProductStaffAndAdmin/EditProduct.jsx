import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Box, Typography, TextField, Grid, Button, CircularProgress } from '@mui/material';
import FileUploader from '../../Firebase/FileUploader';   // Import component FileUploader

const ProductDetails = () => {
  const { id } = useParams(); // Lấy id sản phẩm từ URL
  const [product, setProduct] = useState(null); // Lưu trữ thông tin sản phẩm
  const [loading, setLoading] = useState(true); // Trạng thái loading

  const handleInputChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    const userData = JSON.parse(localStorage.getItem('userData')); // Lấy userData từ localStorage
    const token = userData ? userData.token : null; // Lấy token

    if (!token) {
      alert('Token không hợp lệ. Vui lòng đăng nhập lại.');
      return;
    }

    // Cập nhật thêm các trường như countSell và status
    const productData = {
      name: product.name,
      categoryId: product.categoryId,  // Cập nhật categoryId nếu có thay đổi
      categoryName: product.categoryName,
      price: product.price,
      description: product.description,
      ingredient: product.ingredient,
      userManual: product.userManual,
      warrantyPolicy: product.warrantyPolicy,
      story: product.story,
      urlImg: product.urlImg, // Đường dẫn ảnh
      score: product.score, // Cập nhật điểm sản phẩm nếu có
      countSell: product.countSell, // Cập nhật số lượng bán
      status: product.status, // Cập nhật trạng thái (active, inactive, v.v...)
    };

    try {
      const response = await axios.post(
        `https://exe201be.io.vn/api/product/update/${id}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200 && response.data.success) {
        alert('Sản phẩm đã được cập nhật thành công!');
      } else {
        alert('Cập nhật sản phẩm thất bại!');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Lỗi khi cập nhật sản phẩm!');
    }
  };

  const handleImageUploadSuccess = (imageUrl) => {
    // Cập nhật URL ảnh vào sản phẩm
    setProduct({
      ...product,
      urlImg: imageUrl,
    });
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const token = userData ? userData.token : null;

      if (!token) {
        alert('Token không hợp lệ. Vui lòng đăng nhập lại.');
        return;
      }

      try {
        const response = await axios.get(
          `https://exe201be.io.vn/api/product/byid/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.status === 200 && response.data.success) {
          setProduct(response.data.data); // Cập nhật thông tin sản phẩm
        } else {
          alert('Không thể lấy thông tin sản phẩm!');
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
        alert('Lỗi khi lấy thông tin sản phẩm!');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (!product) return <Typography variant="h6" color="error">Không tìm thấy sản phẩm.</Typography>;

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={3}>
        {/* Phần chứa hình ảnh sản phẩm */}
        <Grid item xs={12}>
          <img
            src={product.urlImg}
            alt={product.name}
            height="300"
            style={{ width: '100%', objectFit: 'contain' }} // Đảm bảo ảnh không bị lệch
          />
          <FileUploader
            onUploadSuccess={handleImageUploadSuccess}
            defaultImage={product.urlImg} // Hiển thị ảnh mặc định nếu có
          />
        </Grid>

        {/* Phần chứa các TextField để chỉnh sửa thông tin sản phẩm */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {/* Các trường thông tin sản phẩm */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Tên sản phẩm"
                variant="outlined"
                fullWidth
                name="name"
                value={product.name}
                onChange={handleInputChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Danh mục"
                variant="outlined"
                fullWidth
                name="categoryName"
                value={product.categoryName}
                onChange={handleInputChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Giá tiền"
                variant="outlined"
                fullWidth
                name="price"
                type="number"
                value={product.price}
                onChange={handleInputChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Mô tả"
                variant="outlined"
                fullWidth
                name="description"
                value={product.description}
                onChange={handleInputChange}
                margin="normal"
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Nguyên liệu"
                variant="outlined"
                fullWidth
                name="ingredient"
                value={product.ingredient}
                onChange={handleInputChange}
                margin="normal"
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Hướng dẫn sử dụng"
                variant="outlined"
                fullWidth
                name="userManual"
                value={product.userManual}
                onChange={handleInputChange}
                margin="normal"
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Chế độ bảo hành"
                variant="outlined"
                fullWidth
                name="warrantyPolicy"
                value={product.warrantyPolicy}
                onChange={handleInputChange}
                margin="normal"
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Câu chuyện sản phẩm"
                variant="outlined"
                fullWidth
                name="story"
                value={product.story}
                onChange={handleInputChange}
                margin="normal"
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Số lượng bán"
                variant="outlined"
                fullWidth
                name="countSell"
                value={product.countSell}
                onChange={handleInputChange}
                margin="normal"
                type="number"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Trạng thái"
                variant="outlined"
                fullWidth
                name="status"
                value={product.status}
                onChange={handleInputChange}
                margin="normal"
              />
            </Grid>
          </Grid>
          <Button onClick={handleSave} variant="contained" color="primary" sx={{ marginTop: 2 }}>
            Lưu
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetails;
