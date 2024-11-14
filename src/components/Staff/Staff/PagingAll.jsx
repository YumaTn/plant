import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PagingAll({ currentPage, setCurrentPage, totalPages }) {
  const handlePageChange = (event, value) => {
    setCurrentPage(value);  // Cập nhật trang hiện tại khi người dùng nhấn nút phân trang
  };

  return (
    <Stack spacing={2} sx={{ marginLeft: "70%", marginTop: 10 }}>
      <Pagination
        count={totalPages}  // Tổng số trang
        page={currentPage}  // Trang hiện tại
        onChange={handlePageChange}  // Khi thay đổi trang
      />
    </Stack>
  );
}
