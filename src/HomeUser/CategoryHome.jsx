import { Box, Typography } from '@mui/material'
import BonsaiHome from '../scss/BonsaiHome.png'
import CatusHome from '../scss/CatusHome.png'
import CreepersHome from '../scss/SceepersHome.png'
import SucculentsHome from '../scss/SucculentsHome.png'
import SeedsHome from '../scss/SeedsHome.png'
import DecorateItemHome from '../scss/DecorateItemHome.png'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import React from 'react'
import { Link } from 'react-router-dom'

const CategoryHome = () => {
  return (
    <>
    <Box sx={{ position: 'relative',display:'flex',justifyContent: 'center' }}>
    <Link 
        component={Link}
        to="/bonsai"
        style={{ textDecoration: 'none',color:'black' }}
        >        
    <Box sx={{flexDirection: 'column',display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
    <img src={BonsaiHome} alt="Blog Banner" style={{ width: '50%', height: 'auto' }} />
    <Typography
    sx={{
        fontSize:20,
        fontWeight:'bold',
    }}
    >Bonsai</Typography>
    </Box>
    </Link> 

    <Link 
        component={Link}
        to="/cactus"
        style={{ textDecoration: 'none',color:'black' }}
        >  
    <Box sx={{flexDirection: 'column',display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
    <img src={CatusHome} alt="Blog Banner" style={{ width: '50%', height: 'auto' }} />
    <Typography
    sx={{
        fontSize:20,
        fontWeight:'bold',
    }}
    >Cactus</Typography>
    </Box>
    </Link> 
    <Link 
        component={Link}
        to="/creepers"
        style={{ textDecoration: 'none',color:'black' }}
        >
    <Box sx={{flexDirection: 'column',display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
    <img src={CreepersHome} alt="Blog Banner" style={{ width: '50%', height: 'auto' }} />
    <Typography
    sx={{
        fontSize:20,
        fontWeight:'bold',
    }}
    >Creepers</Typography>
    </Box>
    </Link>

    <Link 
        component={Link}
        to="/succulents"
        style={{ textDecoration: 'none',color:'black' }}
        >
    <Box sx={{flexDirection: 'column',display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
    <img src={SucculentsHome} alt="Blog Banner" style={{ width: '50%', height: 'auto' }} />
    <Typography
    sx={{
        fontSize:20,
        fontWeight:'bold',
    }}
    >Succulents</Typography>
    </Box>
    </Link>

    <Link 
        component={Link}
        to="/seeds"
        style={{ textDecoration: 'none',color:'black' }}
        >
    <Box sx={{flexDirection: 'column',display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
    <img src={SeedsHome} alt="Blog Banner" style={{ width: '50%', height: 'auto' }} />
    <Typography
    sx={{
        fontSize:20,
        fontWeight:'bold',
    }}
    >Seeds</Typography>
    </Box>
    </Link>

    <Link 
        component={Link}
        to="/decorateItem"
        style={{ textDecoration: 'none',color:'black' }}
        >
    <Box sx={{flexDirection: 'column',display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
    <img src={DecorateItemHome} alt="Blog Banner" style={{ width: '50%', height: 'auto' }} />
    <Typography
    sx={{
        fontSize:20,
        fontWeight:'bold',
    }}
    >Decorate Items</Typography>
    </Box>
    </Link>
</Box>
<Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '20px 0',marginRight:12 }}>
        <Link 
          component={Link}
          to="/bestselling"
          style={{ textDecoration: 'none', color: 'gray' }}
        >
          <Typography sx={{ color: 'gray', display: 'flex', alignItems: 'center' }}>
            View all
            <ArrowForwardIcon sx={{ marginLeft: 0.5, color: 'gray' }} />
          </Typography>
        </Link>
      </Box>
 </>
  )
}

export default CategoryHome