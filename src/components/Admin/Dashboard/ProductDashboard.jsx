import { Box, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts'
import React from 'react'

const ProductDashboard = () => {
    const props = {
        width: 500,
        height: 200,
      };
  return (
    <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Số lượng sản phẩm
        </Typography>
    <PieChart
      {...props}
      series={[
        {
          data: [
            { id: 0, value: 10, label: (location) => `${location}+A` },
            { id: 1, value: 15, label: (location) => `${location}+B` },
            { id: 2, value: 20, label: (location) => `${location}+C` },
          ],
          type: 'pie',
          arcLabel: 'label',
        },
      ]}
    />
    </Box>
  )
}

export default ProductDashboard