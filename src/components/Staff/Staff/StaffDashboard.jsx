import { Box } from '@mui/material'
import React from 'react'
import ProductDashboard from '../../Admin/Dashboard/ProductDashboard'
import MoneyDashboard from '../../Admin/Dashboard/MoneyDashboard'

const StaffDashboard = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box >
        <MoneyDashboard />
      </Box>
      <Box sx={{ mt: 2 }}>
        <ProductDashboard />
      </Box>
    </Box>
  )
}

export default StaffDashboard