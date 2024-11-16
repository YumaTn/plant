import React from 'react';
import { Box, TextField} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchProduct = ({searchTerm, setSearchTerm, handleSearch}) => {

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" sx={{ marginTop: 2, marginRight: 10 }}>
        <TextField
          id="filled-search"
          type="search"
          variant="outlined"
          placeholder=""
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
          sx={{
            border: 'black solid 1px',
            borderRadius: '20px',
            width: '400px',
            height:'50px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '20px',
              paddingRight: '40px',
              '& fieldset': {
                borderColor: 'transparent',
              },
              '&:hover fieldset': {
                borderColor: 'transparent',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'transparent',
              },
            },
          }}
          InputProps={{
            endAdornment: (
              <Box 
                sx={{ 
                  position: 'absolute', 
                  right: '10px', 
                  cursor: 'pointer',
                  '&:hover': {
                    color: '#3B823E', // Change the color on hover
                    transform: 'scale(1.2)', // Scale the icon on hover
                    transition: 'transform 0.2s ease, color 0.2s ease' // Smooth transition
                  }
                }} 
                onClick={handleSearch}
              >
                <SearchIcon />
              </Box>
            ),
          }}
        />
      </Box>
    </Box>
  );
};

export default SearchProduct;
