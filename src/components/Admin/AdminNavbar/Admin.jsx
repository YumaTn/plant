import { Box, Typography } from '@mui/material'
import React from 'react'
import AdminNavbar from '../AdminNavbar/AdminNavbar'
import { Outlet } from 'react-router-dom'

const Admin = () => {
  return (
    <>
    <Box sx={{display:'flex'}}>
        <AdminNavbar/>
        <Box component="main" sx={{flexGrow:1,p:3,marginTop:'55px'}}>
        <Outlet/>
        </Box>
    </Box>
    </>
  )
}

export default Admin