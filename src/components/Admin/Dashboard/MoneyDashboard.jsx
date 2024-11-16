import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { LinePlot } from '@mui/x-charts/LineChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { Typography } from '@mui/material';
import axios from 'axios';

const MoneyDashboard = () => {
  const [monthlyRevenue, setMonthlyRevenue] = useState(Array(12).fill(0)); // Dữ liệu doanh thu 12 tháng
  const [totalRevenue, setTotalRevenue] = useState(0); // Tổng doanh thu

  // Hàm fetch dữ liệu từ API
  const fetchData = async () => {
    try {
      const response = await axios.post('https://exe201be.io.vn/api/order/search', {
        pageNum: 1,
        pageSize: 999,
        orderId: '',
        status: 2,
      });

      if (response.data && response.data.success) {
        const orders = response.data.data.pageData;

        // Tính tổng doanh thu theo tháng
        const revenueByMonth = Array(12).fill(0); // Mảng doanh thu theo tháng
        let total = 0; // Tổng doanh thu

        orders.forEach((order) => {
          const date = new Date(order.date);
          const month = date.getMonth(); // Lấy tháng (0 - 11)
          if (!isNaN(month)) {
            revenueByMonth[month] += order.totalPrice;
            total += order.totalPrice; // Cộng vào tổng doanh thu
          }
        });

        // Cập nhật dữ liệu
        setMonthlyRevenue(revenueByMonth); // Đơn vị: trăm nghìn
        setTotalRevenue(total); // Tổng doanh thu
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Gọi API khi component render lần đầu
  useEffect(() => {
    fetchData();
  }, []);

  // Tên các tháng
  const months = [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12',
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#333' }}>
        Tổng tiền thu
      </Typography>
      <Box sx={{ width: '100%', maxWidth: 800 }}>
        <ResponsiveChartContainer
          xAxis={[
            {
              scaleType: 'band',
              data: months, // Trục X là các tháng
              id: 'months',
              label: 'Tháng',
            },
          ]}
          yAxis={[
            {
              id: 'money',
              tickFormat: (value) => `${value * 100} nghìn`, // Hiển thị đơn vị "trăm nghìn"
            },
          ]}
          series={[
            {
              type: 'line',
              id: 'revenue',
              yAxisId: 'money',
              data: monthlyRevenue, // Dữ liệu doanh thu theo tháng
            },
          ]}
          height={400}
          width={700}
          margin={{ left: 70, right: 70 }}
        >
          <LinePlot />
          <ChartsXAxis axisId="months" label="Tháng trong năm 2024" labelFontSize={18} />
          <ChartsYAxis axisId="money" position="left" />
        </ResponsiveChartContainer>
      </Box>
      {/* Hiển thị tổng tiền */}
      <Typography variant="h6" align="center" sx={{ mt: 3, fontWeight: 'bold', color: 'green' }}>
        Tổng tiền thu trong năm: {Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(totalRevenue)} VNĐ
      </Typography>
    </Box>
  );
};

export default MoneyDashboard;
