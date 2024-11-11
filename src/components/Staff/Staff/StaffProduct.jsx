import React, { useState } from 'react';
import {
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  TablePagination,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Search as SearchIcon } from '@mui/icons-material';

const initialData = [
  {
    id: 1,
    image: 'https://via.placeholder.com/40',
    name: 'Olivia Rhye',
    description: '',
    instructions: '',
    ingredients: '',
    warranty: '',
    story: '',
    price: '120,000đ',
    quantity: 20,
    type: 'Cactus',
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/40',
    name: 'Phoenix Baker',
    description: '',
    instructions: '',
    ingredients: '',
    warranty: '',
    story: '',
    price: '120,000đ',
    quantity: 35,
    type: 'Creepers',
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/40',
    name: 'Lana Steiner',
    description: '',
    instructions: '',
    ingredients: '',
    warranty: '',
    story: '',
    price: '120,000đ',
    quantity: 15,
    type: 'Bonsai',
  },
  {
    id: 4,
    image: 'https://via.placeholder.com/40',
    name: 'Demi Wilkinson',
    description: '',
    instructions: '',
    ingredients: '',
    warranty: '',
    story: '',
    price: '120,000đ',
    quantity: 27,
    type: 'Seeds',
  },
  {
    id: 5,
    image: 'https://via.placeholder.com/40',
    name: 'Candice Wu',
    description: '',
    instructions: '',
    ingredients: '',
    warranty: '',
    story: '',
    price: '120,000đ',
    quantity: 25,
    type: 'Succulents',
  },
  {
    id: 6,
    image: 'https://via.placeholder.com/40',
    name: 'Natali Craig',
    description: '',
    instructions: '',
    ingredients: '',
    warranty: '',
    story: '',
    price: '120,000đ',
    quantity: 40,
    type: 'Decorate Items',
  },
  {
    id: 7,
    image: 'https://via.placeholder.com/40',
    name: 'Drew Cano',
    description: '',
    instructions: '',
    ingredients: '',
    warranty: '',
    story: '',
    price: '120,000đ',
    quantity: 20,
    type: 'Cactus',
  },
];

const StaffProduct = () => {
  const [data, setData] = useState(initialData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    instructions: '',
    ingredients: '',
    warranty: '',
    story: '',
    price: '',
    quantity: '',
    type: '',
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleOpenDialog = (record = null) => {
    setIsEditMode(!!record);
    setCurrentRecord(record);
    if (record) {
      setFormValues(record);
    } else {
      setFormValues({
        name: '',
        description: '',
        instructions: '',
        ingredients: '',
        warranty: '',
        story: '',
        price: '',
        quantity: '',
        type: '',
      });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    if (isEditMode) {
      setData(data.map(item => (item.id === currentRecord.id ? { ...formValues, id: currentRecord.id } : item)));
    } else {
      const newProduct = { ...formValues, id: data.length + 1, image: 'https://via.placeholder.com/40' };
      setData([...data, newProduct]);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa sản phẩm này không?')) {
      setData(data.filter(item => item.id !== id));
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div style={{ padding: 20 }}>
      <Box display="flex" alignItems="center" gap={2} marginBottom={2}>
        <TextField
          variant="outlined"
          placeholder="Tìm kiếm"
          InputProps={{
            startAdornment: <SearchIcon />,
          }}
          style={{ flex: 1 }}
        />
        <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
          Thêm sản phẩm
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ảnh</TableCell>
              <TableCell>Tên sản phẩm</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell>Giá tiền</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <img src={row.image} alt="Product" style={{ borderRadius: '50%', width: 40, height: 40 }} />
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpenDialog(row)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(row.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Số hàng mỗi trang"
        />
      </TableContainer>

      <Dialog open={isDialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{isEditMode ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm'}</DialogTitle>
        <DialogContent>
          <InputLabel>Tên</InputLabel>
          <TextField
            margin="dense"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            fullWidth
            required
          />
          <InputLabel>Mô tả</InputLabel>
          <TextField
            margin="dense"
            name="description"
            value={formValues.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={2}
          />
          <InputLabel>Hướng dẫn sử dụng</InputLabel>
          <TextField
            margin="dense"
            name="instructions"
            value={formValues.instructions}
            onChange={handleChange}
            fullWidth
            multiline
            rows={2}
          />
          <InputLabel>Nguyên liệu</InputLabel>
          <TextField
            margin="dense"
            name="ingredients"
            value={formValues.ingredients}
            onChange={handleChange}
            fullWidth
            multiline
            rows={2}
          />
          <InputLabel>Chính sách bảo hành</InputLabel>
          <TextField
            margin="dense"
            name="warranty"
            value={formValues.warranty}
            onChange={handleChange}
            fullWidth
            multiline
            rows={2}
          />
          <InputLabel>Story</InputLabel>
          <TextField
            margin="dense"
            name="story"
            value={formValues.story}
            onChange={handleChange}
            fullWidth
            multiline
            rows={2}
          />
          <InputLabel>Ảnh</InputLabel>
          <TextField
            margin="dense"
            name="image"
            value={formValues.image}
            onChange={handleChange}
            fullWidth
          />
          <InputLabel>Giá</InputLabel>
          <TextField
            margin="dense"
            name="price"
            value={formValues.price}
            onChange={handleChange}
            fullWidth
          />
          <InputLabel>Số lượng</InputLabel>
          <TextField
            margin="dense"
            name="quantity"
            type="number"
            value={formValues.quantity}
            onChange={handleChange}
            fullWidth
          />
          <InputLabel>Type</InputLabel>
          <FormControl fullWidth>
            <Select
              name="type"
              value={formValues.type}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="Cactus">Cactus</MenuItem>
              <MenuItem value="Creepers">Creepers</MenuItem>
              <MenuItem value="Bonsai">Bonsai</MenuItem>
              <MenuItem value="Seeds">Seeds</MenuItem>
              <MenuItem value="Succulents">Succulents</MenuItem>
              <MenuItem value="Decorate Items">Decorate Items</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Hủy
          </Button>
          <Button onClick={handleSave} color="primary">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StaffProduct;
