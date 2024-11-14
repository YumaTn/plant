import { Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { React, useState, useEffect } from 'react';
import axios from 'axios';
import SearchProduct from '../Shop/SearchProduct';
import { Link } from 'react-router-dom';
import Paging from './Paging';

const Succulents = () => {
    const [SucculentsList, setSucculentsList] = useState([]); 
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0); // Tổng số sản phẩm
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm); 

    const formatPrice = (price) => {
        return price.toLocaleString('vi-VN');
    };

    const itemsPerPage = 9; // Số sản phẩm mỗi trang

    // Fetch toàn bộ dữ liệu sản phẩm
    const fetchPlants = async () => {
        try {
            const response = await axios.post('https://exe201be.io.vn/api/product/search', {
                "pageNum": 1,
                "pageSize": 999, 
                "name": debouncedSearchTerm, 
                "status": true,
            });

            if (response.data.success) {
                const filteredPlants = response.data.data.pageData.filter(plant => plant.categoryName === "succulent");
                setSucculentsList(filteredPlants);
                setTotalItems(filteredPlants.length); // Cập nhật tổng số sản phẩm
            }
        } catch (error) {
            console.error("Error fetching the plants data:", error);
        }
    };

    // Debouncing: Gọi API khi searchTerm thay đổi và dừng gõ trong 500ms
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm); // Cập nhật từ khóa sau khi dừng gõ
        }, 500);

        return () => clearTimeout(timeoutId); // Cleanup timeout khi component unmounts hoặc searchTerm thay đổi
    }, [searchTerm]);

    // Gọi API khi từ khóa debounced thay đổi hoặc trang thay đổi
    useEffect(() => {
        fetchPlants(); // Gọi API để lấy toàn bộ danh sách Succulents
    }, [debouncedSearchTerm]);

    // Chia sản phẩm theo trang, đảm bảo rằng mỗi trang chỉ có tối đa 9 sản phẩm
    const getPaginatedItems = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return SucculentsList.slice(startIndex, endIndex); // Lấy sản phẩm theo trang
    };

    // Hàm xử lý tìm kiếm khi người dùng nhấn vào nút tìm kiếm
    const handleSearch = () => {
        setCurrentPage(1); // Đặt lại trang đầu tiên khi tìm kiếm mới
    };

    return (
        <>
            <SearchProduct searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearch={handleSearch} />
            <Grid container spacing={4} justifyContent="center" sx={{ marginTop: '20px' }}>
                {getPaginatedItems().map((plant) => (
                    <Grid item key={plant.id}>
                        <Card sx={{ width: 300, borderRadius: '10px', boxShadow: 3 }}>
                            <CardMedia
                                component="img"
                                image={plant.urlImg}
                                alt={plant.name}
                                sx={{ height: 200, objectFit: 'cover' }}
                                loading="lazy"
                            />
                            <CardContent sx={{ textAlign: 'center' }}>
                                <Typography 
                                    variant="h6" 
                                    gutterBottom
                                    sx={{
                                        display: '-webkit-box',
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        WebkitLineClamp: 1, // Giới hạn tên hiển thị 1 dòng
                                        textOverflow: 'ellipsis', // Thêm dấu "..." nếu tên dài
                                    }}
                                >
                                    {plant.name}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {formatPrice(plant.price)} VNĐ
                                </Typography>
                                <Link to={`/productdetail/${plant.id}`} style={{ textDecoration: 'none' }}>
                                    <Button variant="contained" sx={{ backgroundColor: "#3B823E", width: '100%' }}>
                                        Mua
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Paging 
                currentPage={currentPage} 
                setCurrentPage={setCurrentPage} 
                totalItems={totalItems} 
                itemsPerPage={itemsPerPage}
            />
        </>
    );
}

export default Succulents;
