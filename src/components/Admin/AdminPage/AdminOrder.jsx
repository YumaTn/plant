import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PagingAll from '../../Staff/Staff/PagingAll';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const AdminOrder = () => {
    const [orders, setOrders] = useState([]);  // Dữ liệu đơn hàng
    const [currentPage, setCurrentPage] = useState(1);  // Trang hiện tại
    const [totalPages, setTotalPages] = useState(1);  // Tổng số trang

    // Hàm lấy tất cả đơn hàng
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

    // Hàm nhóm sản phẩm theo orderId và sắp xếp
    const groupAndSortProducts = (products) => {
        const grouped = products.reduce((acc, product) => {
            const { orderId, userName, couponId, date, totalPrice, productName, quantity, price } = product;

            if (!acc[orderId]) {
                acc[orderId] = {
                    orderId,
                    userName,
                    couponId,
                    date,
                    totalPrice,
                    products: [],
                };
            }

            // Thêm sản phẩm vào nhóm của `orderId`
            acc[orderId].products.push({ productName, quantity, price });
            return acc;
        }, {});

        // Chuyển thành mảng và sắp xếp theo ngày (mới nhất trước)
        return Object.values(grouped).sort((a, b) => new Date(b.date) - new Date(a.date));
    };

    // Hàm xử lý tất cả đơn hàng và phân trang
    const fetchAndProcessGroupedOrders = async () => {
        const allOrders = await fetchAllOrders();

        // Gom tất cả sản phẩm từ đơn hàng
        const products = allOrders.flatMap((order) =>
            order.orderDetails.map((product) => ({
                orderId: order.id,
                userName: order.userName,
                couponId: order.couponId,
                date: order.date,
                productName: product.productName,
                quantity: product.quantity,
                price: product.price,
                totalPrice: product.price * product.quantity,
            }))
        );

        // Lọc các sản phẩm có ngày hợp lệ
        const filteredProducts = products.filter(
            (product) => new Date(product.date).toLocaleDateString('vi-VN') !== '1/1/1'
        );

        // Nhóm và sắp xếp
        const groupedOrders = groupAndSortProducts(filteredProducts);

        // Phân trang
        const pageSize = 10;
        const paginatedOrders = groupedOrders.slice((currentPage - 1) * pageSize, currentPage * pageSize);
        setOrders(paginatedOrders); // Dữ liệu của trang hiện tại
        setTotalPages(Math.ceil(groupedOrders.length / pageSize)); // Tổng số trang
    };

    useEffect(() => {
        fetchAndProcessGroupedOrders();
    }, [currentPage]);

    // Xuất CSV
    const downloadCSV = async () => {
        const allOrders = await fetchAllOrders();
        const products = allOrders.flatMap((order) =>
            order.orderDetails.map((product) => ({
                orderId: order.id,
                userName: order.userName,
                couponId: order.couponId,
                date: order.date,
                productName: product.productName,
                quantity: product.quantity,
                price: product.price,
                totalPrice: product.price * product.quantity,
            }))
        );

        // Lọc các sản phẩm có ngày hợp lệ
        const filteredProducts = products.filter(
            (product) => new Date(product.date).toLocaleDateString('vi-VN') !== '1/1/1'
        );

        // Nhóm và sắp xếp
        const groupedOrders = groupAndSortProducts(filteredProducts);

        // Chuẩn bị dữ liệu CSV
        const csvRows = [
            ['ID', 'Tên người dùng', 'Mã coupon', 'Tổng giá', 'Ngày đặt', 'Tên sản phẩm', 'Số lượng'], // Header
        ];

        groupedOrders.forEach((order) => {
            order.products.forEach((product) => {
                csvRows.push([
                    order.orderId,
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
                Xuất ra file Excel
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
                        {orders.map((order) => (
                            <TableRow key={order.orderId}>
                                <TableCell>{order.orderId}</TableCell>
                                <TableCell sx={{ color: 'green' }}>{order.userName}</TableCell>
                                <TableCell>
                                    {order.couponId === "DEFAULT" ? "Không có mã giảm giá" : order.couponId}
                                </TableCell>
                                <TableCell sx={{ color: 'red' }}>
                                    {order.totalPrice.toLocaleString('vi-VN')} VNĐ
                                </TableCell>
                                <TableCell>{new Date(order.date).toLocaleDateString('vi-VN')}</TableCell>
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
