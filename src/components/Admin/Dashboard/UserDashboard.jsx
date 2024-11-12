import { Box, Typography } from '@mui/material'
import { BarChart } from '@mui/x-charts'
import React from 'react'

const UserDashboard = () => {
    const chartProps = {
        width: 500,
        height: 300,
        xAxis: [{ data: ['A', 'B', 'C'], scaleType: 'band' }],
      };
  return (
    <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Số lượng người dùng
        </Typography>
        <BarChart
          {...chartProps}
          series={[
            {
              data: [2400, 1398, 9800],
              label: 'label 1',
            },
          ]}
        />
      </Box>
  )
}

export default UserDashboard