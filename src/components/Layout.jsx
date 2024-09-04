import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import Navbar from './Navbar'
import React from 'react'

const WhiteTheme = createTheme ({
    Palette:{
        Mode:'white'
    }
})

const Layout = ({children}) => {
  return (
    <ThemeProvider theme={WhiteTheme}>
        <CssBaseline/>
        <div>
            <Navbar/>
        </div>
        {children}
    </ThemeProvider>
  )
}

export default Layout