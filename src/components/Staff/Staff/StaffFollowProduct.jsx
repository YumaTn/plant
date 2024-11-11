import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button,
  TableFooter, TablePagination, IconButton
} from '@mui/material';
import { FirstPage, LastPage, KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const orders = [
  { id: 3066, customer: 'Olivia Rhye', product: 'Content curating app', quantity: 1, price: '120.000đ' },
  { id: 3065, customer: 'Phoenix Baker', product: 'Design software', quantity: 2, price: '120.000đ' },
  { id: 3064, customer: 'Lana Steiner', product: 'Data prediction', quantity: 1, price: '120.000đ' },
  { id: 3063, customer: 'Demi Wilkinson', product: 'Productivity app', quantity: 1, price: '120.000đ' },
  { id: 3062, customer: 'Candice Wu', product: 'Web app integrations', quantity: 2, price: '120.000đ' },
  { id: 3061, customer: 'Natali Craig', product: 'Sales CRM', quantity: 4, price: '120.000đ' },
  { id: 3060, customer: 'Drew Cano', product: 'Automation and workflow', quantity: 2, price: '120.000đ' },
];

function StaffFollowProduct() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Mã giao dịch</strong></TableCell>
            <TableCell><strong>Khách hàng</strong></TableCell>
            <TableCell><strong>Sản phẩm</strong></TableCell>
            <TableCell><strong>Số lượng</strong></TableCell>
            <TableCell><strong>Giá tiền</strong></TableCell>
            <TableCell><strong></strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order) => (
            <TableRow key={order.id}>
              <TableCell>#{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{order.product}</TableCell>
              <TableCell>{order.quantity}</TableCell>
              <TableCell>{order.price}</TableCell>
              <TableCell>
                <Button style={{ color: 'blue' }}>Xác nhận</Button>
                <Button style={{ color: 'red' }}>Hủy</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              colSpan={6}
              count={orders.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
              labelRowsPerPage="Số hàng mỗi trang"
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div style={{ flexShrink: 0, marginLeft: theme.spacing(2.5) }}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
        {theme.direction === 'rtl' ? <LastPage /> : <FirstPage />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton onClick={handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="next page">
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="last page">
        {theme.direction === 'rtl' ? <FirstPage /> : <LastPage />}
      </IconButton>
    </div>
  );
}

export default StaffFollowProduct;
