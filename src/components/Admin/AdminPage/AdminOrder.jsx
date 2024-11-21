import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PagingAll from '../../Staff/Staff/PagingAll';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const AdminOrder = () => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.post('https://exe201be.io.vn/api/order/search', {
                    pageNum: currentPage,
                    pageSize: 10,
                    status: 2,
                });

                if (response.data.success) {
                    setOrders(response.data.data.pageData); // Cập nhật danh sách đơn hàng
                    setTotalPages(response.data.data.pageInfo.totalPage); // Cập nhật tổng số trang
                } else {
                    console.error('Failed to fetch orders');
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, [currentPage]);

    // Lấy tất cả đơn hàng
    const fetchAllOrders = async () => {
        try {
            let allOrders = [];
            let page = 1;
            const pageSize = 10;
            let totalPage;

            do {
                const response = await axios.post('https://exe201be.io.vn/api/order/search', {
                    pageNum: page,
                    pageSize,
                    status: 2,
                });

                if (response.data.success) {
                    const { pageData, pageInfo } = response.data.data;
                    allOrders = allOrders.concat(pageData);
                    totalPage = pageInfo.totalPage;
                    page++;
                } else {
                    console.error('Failed to fetch all orders');
                    break;
                }
            } while (page <= totalPage);

            return allOrders;
        } catch (error) {
            console.error('Error fetching all orders:', error);
            return [];
        }
    };

    // Nhóm và sắp xếp đơn hàng
    const processOrders = (orders) => {
        const groupedOrders = orders
            .filter(order => new Date(order.date).toLocaleDateString('vi-VN') !== '1/1/1') // Lọc các dòng có ngày hợp lệ
            .reduce((acc, order) => {
                const { id, userName, couponId, date, orderDetails } = order;

                // Tính tổng giá cho orderId
                const totalPrice = orderDetails.reduce((sum, detail) => sum + detail.price * detail.quantity, 0);

                // Nếu chưa có, khởi tạo
                if (!acc[id]) {
                    acc[id] = {
                        id,
                        userName,
                        couponId,
                        date,
                        totalPrice,
                        products: [],
                    };
                }

                // Gom tất cả sản phẩm vào `products`
                acc[id].products.push(...orderDetails);

                return acc;
            }, {});

        // Sắp xếp theo ngày từ mới nhất đến cũ nhất
        return Object.values(groupedOrders).sort(
            (a, b) => new Date(b.date) - new Date(a.date)
        );
    };

    // Xuất CSV
    const downloadCSV = async () => {
        // Lấy toàn bộ dữ liệu đơn hàng
        const allOrders = await fetchAllOrders();
        const processedOrders = processOrders(allOrders);

        // Chuẩn bị dữ liệu CSV
        const csvRows = [
            ['ID', 'Tên người dùng', 'Mã coupon', 'Tổng giá', 'Ngày đặt', 'Tên sản phẩm', 'Số lượng'], // Header
        ];

        processedOrders.forEach((order) => {
            order.products.forEach((product) => {
                csvRows.push([
                    order.id,
                    order.userName,
                    order.couponId === "DEFAULT" ? "Không có mã giảm giá" : order.couponId,
                    order.totalPrice,
                    new Date(order.date).toLocaleDateString('vi-VN'),
                    product.productName,
                    product.quantity,
                ]);
            });
        });

        // Tạo chuỗi CSV
        const bom = '\uFEFF'; // Thêm BOM để hỗ trợ Unicode
        const csvContent = csvRows.map((row) => row.join(',')).join('\n');
        const csvWithBom = bom + csvContent;

        // Tạo file và tải xuống
        const blob = new Blob([csvWithBom], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.setAttribute('download', 'orders.csv');
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center' }}>
                Quản lý Đơn hàng
            </Typography>

            {/* Nút tải xuống CSV */}
            <Button variant="contained" color="primary" onClick={downloadCSV} sx={{ mb: 2 }}>
                Xuất ra file excel
            </Button>

            {/* Hiển thị bảng đơn hàng */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Tên người dùng</TableCell>
                            <TableCell>Mã coupon</TableCell>
                            <TableCell>Tổng giá</TableCell>
                            <TableCell>Ngày đặt</TableCell>
                            <TableCell>Tên sản phẩm</TableCell>
                            <TableCell>Số lượng</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {processOrders(orders).map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell sx={{ color: 'green' }}>{order.userName}</TableCell>
                                <TableCell>
                                    {order.couponId === "DEFAULT" ? "Không có mã giảm giá" : order.couponId}
                                </TableCell>
                                <TableCell sx={{ color: 'red' }}>
                                    {order.totalPrice.toLocaleString('vi-VN')} VNĐ
                                </TableCell>
                                <TableCell>
                                    {new Date(order.date).toLocaleDateString('vi-VN')}
                                </TableCell>
                                <TableCell sx={{ color: 'brown' }}>
                                    {order.products.map((product, index) => (
                                        <Typography key={index}>{product.productName}</Typography>
                                    ))}
                                </TableCell>
                                <TableCell sx={{ color: 'teal' }}>
                                    {order.products.map((product, index) => (
                                        <Typography key={index}>{product.quantity}</Typography>
                                    ))}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Phân trang */}
            <PagingAll
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
            />
        </Box>
    );
};

export default AdminOrder;
