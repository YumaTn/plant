import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import Footer from './Footer'

const Header = () => {
  return (
    <Box>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </Box>
  )
}

export default Header