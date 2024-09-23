import { Typography } from '@mui/material'
import React from 'react'

const NameAndNote = () => {
  return (
    <>
    <Typography 
        sx={{
          fontSize:'20px',
          fontWeight:700
        }}
        >
          Hello, Sang
        </Typography>
        <Typography>
        From your account dashboard. you can easily check & view your
        <br/>
        Recent Orders, manage your Shipping and Billing Addresses and
        <br/>
        edit your Password and Account Details.
        </Typography></>
  )
}

export default NameAndNote