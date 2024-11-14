import React, { useState, useEffect } from 'react';
import { TextField, Box, Button, Typography, Grid, MenuItem, Select, InputLabel, FormControl, Avatar } from '@mui/material';
import axios from 'axios';
import { storage } from '../../Firebase/firebaseConfig'; 
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';  

const CreateProduct = () => {
  const [productData, setProductData] = useState({
    urlImg: '',
    category: '', // categoryId
    name: '',
    price: '',
    quantity: '',
    description: '',
    ingredient: '',
    userManual: '',
    warrantyPolicy: '',
    story: '',
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Lấy userData từ storage (ví dụ, localStorage)
  const userData = JSON.parse(localStorage.getItem('userData')); // Hoặc sử dụng nơi bạn lưu trữ userData
  const token = userData?.token;
  const userId = userData?.userId;

  const navigate = useNavigate();  // Khởi tạo navigate

  useEffect(() => {
    // Gọi API để lấy danh sách category
    axios.post('https://exe201be.io.vn/api/category/search', {
      pageNum: 1,
      pageSize: 999,
      name: "",
      status: true
    })
    .then(response => {
      setCategories(response.data.data.pageData); // Lưu danh sách category vào state
    })
    .catch(error => {
      console.error('Error fetching categories:', error);
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setLoading(progress); // Hiển thị progress upload
        },
        (error) => {
          console.error('Error uploading image:', error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setProductData({ ...productData, urlImg: downloadURL }); // Lưu URL ảnh vào state
            setLoading(false); // Dừng trạng thái tải sau khi hoàn tất
          });
        }
      );
    }
  };

  const handleSubmit = async () => {
    if (!token || !userId) {
      console.error('Token or UserId not found!');
      return;
    }

    const productPayload = {
      urlImg: productData.urlImg,
      name: productData.name,
      price: productData.price,
      quantity: productData.quantity,
      description: productData.description,
      ingredient: productData.ingredient,
      userManual: productData.userManual,
      warrantyPolicy: productData.warrantyPolicy,
      story: productData.story,
      categoryId: productData.category, // categoryId
      userId: userId, // userId từ storage
    };

    setLoading(true);

    try {
      const response = await axios.post(
        'https://exe201be.io.vn/api/product/create',
        productPayload,
        {
          headers: {
            'Authorization': `Bearer ${token}`, // Gửi token trong header Authorization
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.success) {
        console.log('Product created successfully:', response.data);
        navigate(-1);  // Quay lại trang trước
      } else {
        console.error('Error creating product:', response.data.message);
      }
    } catch (error) {
      console.error('Error creating product:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxWidth="800px" mx="auto" p={3}>
      <Typography variant="h4" align="center" gutterBottom>
        Tạo sản phẩm
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <input
            accept="image/*"
            type="file"
            style={{ display: 'none' }}
            id="upload-image"
            onChange={handleImageUpload} // Handle image upload
          />
          <label htmlFor="upload-image">
            <Avatar
              src={productData.urlImg}
              sx={{ width: 100, height: 100, cursor: 'pointer', margin: '0 auto' }}
              alt="Product Image"
            />
          </label>
          <Typography align="center">Tải ảnh lên</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Danh mục</InputLabel>
            <Select
              label="Category"
              name="category"
              value={productData.category}
              onChange={handleInputChange}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {/* Các trường nhập liệu khác (name, price, quantity, description...) */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Tên"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Giá"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
            fullWidth
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Số lượng"
            name="quantity"
            value={productData.quantity}
            onChange={handleInputChange}
            fullWidth
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Mô tả"
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            fullWidth
            multiline
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Thành phần"
            name="ingredient"
            value={productData.ingredient}
            onChange={handleInputChange}
            fullWidth
            multiline
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Hướng dẫn sử dụng"
            name="userManual"
            value={productData.userManual}
            onChange={handleInputChange}
            fullWidth
            multiline
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Chính sách bảo hành"
            name="warrantyPolicy"
            value={productData.warrantyPolicy}
            onChange={handleInputChange}
            fullWidth
            multiline
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Câu truyện"
            name="story"
            value={productData.story}
            onChange={handleInputChange}
            fullWidth
            multiline
          />
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="center" mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Tạo...' : 'Tạo'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateProduct;
