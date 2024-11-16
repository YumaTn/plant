import React, { useState, useEffect } from 'react';
import { Button, LinearProgress, Box, Typography, IconButton } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from './firebaseConfig'; 

const FileUploader = ({ onUploadSuccess, defaultImage }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(defaultImage || '');

  useEffect(() => {
    if (defaultImage) {
      setImageUrl(defaultImage);
    }
  }, [defaultImage]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = () => {
    if (!file) return;

    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    const allowedImageExtensions = ['jpg', 'jpeg', 'png', 'gif'];

    if (!allowedImageExtensions.includes(fileExtension)) {
        console.error('Invalid file type. Only images are allowed.');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error('Upload error:', error);
        setUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        onUploadSuccess(downloadURL);
        setImageUrl(downloadURL);
        setUploading(false);
      }
    );
  };

  return (
    <Box>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="file-upload"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="file-upload">
        <IconButton component="span">
          <PhotoCamera />
        </IconButton>
      </label>

      {file && (
        <Typography variant="body2" sx={{ mt: 2 }}>
          Selected file: {file.name}
        </Typography>
      )}


      {uploading && <LinearProgress sx={{ mt: 2 }} variant="determinate" value={uploadProgress} />}
      
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={handleUpload}
        disabled={uploading || !file}
      >
        Tải ảnh lên
      </Button>
    </Box>
  );
};

export default FileUploader;
