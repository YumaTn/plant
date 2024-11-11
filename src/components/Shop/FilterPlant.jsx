import React, { useEffect, useState } from 'react';
import axios from 'axios';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function FilterPlant() {
  const [ecologicalData, setEcologicalData] = useState([]);
  const [openCategories, setOpenCategories] = useState({});

  // Gọi API với body request và cập nhật dữ liệu vào ecologicalData
  useEffect(() => {
    axios.post('https://exe201be.io.vn/api/ecologicalcharacterictic/search', {
      pageNum: 1,
      pageSize: 10,
      name: "",
      status: true
    })
      .then(response => {
        if (response.data.success) {
          setEcologicalData(response.data.data.pageData);
        }
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  // Hàm toggle mở/đóng danh mục
  const handleToggleCategory = (id) => {
    setOpenCategories(prevState => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <List
      sx={{ width: '264px', height: 'auto', maxWidth: 360, bgcolor: 'background.paper', borderRadius: 1, marginLeft: '60px', top: '109px' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {/* All Categories */}
      <ListItemButton>
        <ListItemIcon>
        </ListItemIcon>
        <ListItemText primary={<Typography variant="body2" sx={{ fontSize: '14px' }}>All Categories</Typography>} />
      </ListItemButton>

      {/* Hiển thị các danh mục từ API */}
      {ecologicalData.map((category) => (
        <React.Fragment key={category.id}>
          <ListItemButton onClick={() => handleToggleCategory(category.id)} sx={{ pl: 4 }}>
            <ListItemIcon>
              {openCategories[category.id] ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body2" sx={{ fontSize: '14px' }}>{`${category.name} (${category.desciption})`}</Typography>} />
          </ListItemButton>
          
          {openCategories[category.id] && (
            <List component="div" disablePadding>
              {category.listCategory.map((subCategory) => (
                <Link to={`/shop/${subCategory.name}`} key={subCategory.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <ListItemButton sx={{ pl: 8 }}>
                    <ListItemText primary={<Typography variant="body2" sx={{ fontSize: '14px' }}>{`${subCategory.name} (${subCategory.description})`}</Typography>} />
                  </ListItemButton>
                </Link>
              ))}
            </List>
          )}
        </React.Fragment>
      ))}
    </List>
  );
}
