import { Box, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductDashboard = () => {
  const [categories, setCategories] = useState([]);
  const [categoryPercentages, setCategoryPercentages] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState([]);  // State to store the counts of products for each category

  // Tạo một hàm để sinh màu sắc ngẫu nhiên
  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // API call to fetch category data
  useEffect(() => {
    axios
      .post('https://exe201be.io.vn/api/category/search', {
        pageNum: 1,
        pageSize: 999,
        name: '',
        status: true,
      })
      .then((response) => {
        if (response.data.success) {
          const data = response.data.data.pageData;
          setCategories(data);
          calculateCategoryPercentages(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching categories: ", error);
      });
  }, []);

  // Function to calculate percentage and count of products
  const calculateCategoryPercentages = (categoriesData) => {
    let totalProducts = 0;
    const categoryData = categoriesData.map(category => {
      const categoryCount = category.listProducts.length;
      totalProducts += categoryCount;
      return { name: category.name, count: categoryCount };
    });

    const percentages = categoryData.map(category => ({
      name: category.name,
      value: ((category.count / totalProducts) * 100).toFixed(2),
      count: category.count,  // Add count for each category
    }));

    setCategoryPercentages(percentages);
    setCategoryCounts(categoryData);  // Save the counts of products
  };

  // Tạo mảng màu sắc cho các danh mục
  const categoryColors = categoryPercentages.map(() => generateRandomColor());

  // Chia mảng thành 2 phần
  const firstHalf = categoryPercentages.slice(0, Math.ceil(categoryPercentages.length / 2));
  const secondHalf = categoryPercentages.slice(Math.ceil(categoryPercentages.length / 2));

  const chartProps = {
    width: 500,
    height: 300,
  };

  return (
    <Box sx={{ p: 3, backgroundColor: 'white', borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
        Số lượng sản phẩm theo danh mục
      </Typography>

      {/* Display both PieCharts in a horizontal row */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        {/* Display First PieChart */}
        <PieChart
          {...chartProps}
          series={[
            {
              data: firstHalf.map((category, index) => ({
                id: category.name,
                value: parseFloat(category.value),
                color: categoryColors[index],  // Assign color dynamically
              })),
              type: 'pie',
              arcLabel: (d) => {
                return d.value > 0 ? `${d.id}: ${d.value}%` : ''; // Hide percentage for 0%
              },
              labelLine: false, // Không vẽ đường nối label
              labelAlign: 'center', // Canh giữa nhãn
            },
          ]}
          sx={{ borderRadius: 1 }}
        />

        {/* Display Second PieChart */}
        <PieChart
          {...chartProps}
          series={[
            {
              data: secondHalf.map((category, index) => ({
                id: category.name,
                value: parseFloat(category.value),
                color: categoryColors[firstHalf.length + index],  // Assign color dynamically
              })),
              type: 'pie',
              arcLabel: (d) => {
                return d.value > 0 ? `${d.id}: ${d.value}%` : ''; // Hide percentage for 0%
              },
              labelLine: false, // Không vẽ đường nối label
              labelAlign: 'center', // Canh giữa nhãn
            },
          ]}
          sx={{ borderRadius: 1 }}
        />
      </Box>

      {/* Category Percentages Display */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
          Chi tiết phân bố sản phẩm
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {categoryPercentages.map((category, index) => (
            <Box
              key={category.name}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: 1,
                backgroundColor: categoryColors[index],  // Color for each category
                borderRadius: 1,
                alignItems: 'center',
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#fff' }}>
                {category.name}
              </Typography>
              <Typography variant="body1" sx={{ color: '#fff' }}>
                {category.value}% - {category.count} sản phẩm {/* Show percentage and product count */}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDashboard;
