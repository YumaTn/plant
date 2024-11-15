import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Grid, Avatar, IconButton } from '@mui/material';
import { Person, Image as ImageIcon } from '@mui/icons-material';  // Import Icon
import { storage } from '../../Firebase/firebaseConfig'; 
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; // Import các hàm cần thiết từ Firebase
import axios from 'axios';  // Import axios

const AdminCreateBlog = () => {
  const [userName, setUserName] = useState('');
  const [urlAvatar, setUrlAvatar] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [urlImg1, setUrlImg1] = useState(null);
  const [urlImg2, setUrlImg2] = useState(null);
  const [urlImg3] = useState('string'); // URL cố định cho ảnh 3
  const [urlImg4] = useState('string'); // URL cố định cho ảnh 4
  const [urlImg5] = useState('string'); // URL cố định cho ảnh 5

  const handleImageUpload = (event, setImage) => {
    const file = event.target.files[0];
    if (file) {
      const storageRef = ref(storage, `images/${file.name}`); // Tham chiếu đến Firebase Storage
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Handle progress or state changes if needed
        },
        (error) => {
          console.log(error);
        },
        () => {
          // Khi upload thành công, lấy URL ảnh từ Firebase Storage
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImage(downloadURL); // Cập nhật URL ảnh trong state
          });
        }
      );
    }
  };

  const handleCreateBlog = () => {
    // Gọi API để tạo blog
    const blogData = {
      userName,
      urlAvatar,
      title,
      description,
      urlImg1,
      urlImg2,
      urlImg3,
      urlImg4,
      urlImg5,
    };

    // Gọi API sử dụng Axios
    axios.post('https://exe201be.io.vn/api/blogs/create', blogData)
      .then((response) => {
        console.log('Blog created successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error creating blog:', error);
      });
  };

  return (
    <Box sx={{ p: 3, maxWidth: '800px', margin: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center' }}>
        Tạo Blog Mới
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label="Tên người dùng"
            variant="outlined"
            fullWidth
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
        </Grid>

        {/* Avatar */}
        <Grid item xs={12} sm={6}>
          <IconButton
            component="label"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: 100,
              height: 100,
              backgroundColor: '#f0f0f0',
              borderRadius: '60%',
              padding: 2,
              cursor: 'pointer',
            }}
          >
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => handleImageUpload(e, setUrlAvatar)}
            />
            {urlAvatar ? (
              <Avatar
                src={urlAvatar}
                alt="Avatar"
                sx={{
                  width: 80,
                  height: 80,
                  objectFit: 'cover',
                }}
              />
            ) : (
              <Person sx={{ fontSize: 30, color: '#9e9e9e' }} />
            )}
          </IconButton>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Tiêu đề"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
        </Grid>
        
        {/* Ảnh 1 */}
        <Grid item xs={12} sm={6}>
          <IconButton
            component="label"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
              backgroundColor: '#f0f0f0',
              borderRadius: 2,
              padding: 2,
              cursor: 'pointer',
            }}
          >
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => handleImageUpload(e, setUrlImg1)}
            />
            {urlImg1 ? (
              <img
                src={urlImg1}
                alt="Image 1"
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <ImageIcon sx={{ fontSize: 50, color: '#9e9e9e' }} />
            )}
          </IconButton>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Mô tả"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
        </Grid>

        {/* Ảnh 2 */}
        <Grid item xs={12} sm={6}>
          <IconButton
            component="label"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
              backgroundColor: '#f0f0f0',
              borderRadius: 2,
              padding: 2,
              cursor: 'pointer',
            }}
          >
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => handleImageUpload(e, setUrlImg2)}
            />
            {urlImg2 ? (
              <img
                src={urlImg2}
                alt="Image 2"
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <ImageIcon sx={{ fontSize: 50, color: '#9e9e9e' }} />
            )}
          </IconButton>
        </Grid>

        {/* Nút tạo blog */}
        <Grid item xs={12}>
          <Button
            variant="contained"
            fullWidth
            sx={{ marginTop: 3, backgroundColor: 'green' }}
            onClick={handleCreateBlog}
          >
            Tạo Blog
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminCreateBlog;
