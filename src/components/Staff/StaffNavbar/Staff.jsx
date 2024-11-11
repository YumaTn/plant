import { Box, Typography } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import StaffNavbar from './StaffNavbar'

const Admin = () => {
  return (
    <>
    <Box sx={{display:'flex'}}>
        <StaffNavbar/>
        <Box component="main" sx={{flexGrow:1,p:3,marginTop:'55px'}}>
        <Outlet/>
        </Box>
    </Box>
    </>
  )
}

export default Admin