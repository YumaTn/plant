import { colors, createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import Navbar from './Navbar'
import React from 'react'

const WhiteTheme = createTheme({
  palette: {
      mode: 'light',
      background: {
          default: '#F0F5F0' 
      }
  }
});

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