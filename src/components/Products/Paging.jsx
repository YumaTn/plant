import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function Paging({ currentPage, setCurrentPage, totalItems, itemsPerPage }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage); // Tính số trang từ tổng số sản phẩm

  const handlePageChange = (event, value) => {
    setCurrentPage(value); // Cập nhật trang hiện tại khi người dùng thay đổi
  };

  return (
    <Stack spacing={2} sx={{ marginLeft: "70%", marginTop: 10 }}>
      <Pagination
        count={totalPages > 0 ? totalPages : 1} // Nếu không có sản phẩm, số trang là 1
        page={currentPage} 
        onChange={handlePageChange} 
      />
    </Stack>
  );
}
