import React from 'react';
import { Box, Typography, Paper, Divider, useTheme } from '@mui/material';
import BlogDetail_1 from '../../scss/BlogDetail_1.png';
import BlogDetail_2 from '../../scss/BlogDetail_2.png';

const BlogDetail = () => {
  const theme = useTheme();

  return (
    <Paper sx={{ maxWidth: '800px', margin: 'auto', p: 3, backgroundColor: 'transparent' }}>
      <Box component="header" sx={{ mb: 2 }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', color: '#333', marginTop: '50px' }}>
          The Impact of Water with the Plant: How Plants Are Growing
        </Typography>
        <Typography variant="subtitle2" sx={{ color: '#777', mt: 1 }}>
          <span className="author">Nhat Sang</span>
          <span className="date" style={{ marginLeft: '10px' }}>May 29, 2003</span>
        </Typography>
      </Box>

      <Box component="section">
        <Box component="img" src={BlogDetail_1} alt="Blog Detail 1" sx={{ width: '100%', height: 'auto', mb: 2 }} />
        <Typography paragraph>
          Traveling is an enriching experience that opens up new horizons, exposes us to different
          cultures, and creates memories that last a lifetime. However, traveling can also be
          stressful and overwhelming, especially if you don’t plan and prepare adequately...
        </Typography>

        <Typography variant="h5" component="h2" sx={{ color: '#333', mt: 2 }}>
          Research Your Destination
        </Typography>
        <Typography paragraph>
          Before embarking on your journey, take the time to research your destination. This includes
          understanding the local culture, customs, and laws, as well as identifying top attractions...
        </Typography>

        <Typography variant="h5" component="h2" sx={{ color: '#333', mt: 2 }}>
          Plan Your Itinerary
        </Typography>
        <Typography paragraph>
          While it’s essential to leave room for spontaneity and unexpected adventures, having a rough
          itinerary can help you make the most of your time and budget...
        </Typography>

        <Box sx={{
          backgroundColor: '#f0f0f0',
          p: 2,
          borderLeft: `5px solid ${theme.palette.warning.main}`,
          my: 3,
          fontStyle: 'italic',
        }}>
          “Traveling can expose you to new environments and potential health risks, so it’s crucial
          to take precautions to stay safe and healthy.”
        </Box>

        <Box component="img" src={BlogDetail_2} alt="Blog Detail 2" sx={{ width: '100%', height: 'auto', mb: 2 }} />

        <Typography variant="h5" component="h2" sx={{ color: '#333', mt: 2 }}>
          Pack Lightly and Smartly
        </Typography>
        <Typography paragraph>
          Packing can be a daunting task, but with some careful planning and smart choices, you can
          pack light and efficiently...
        </Typography>

        <Typography variant="h5" component="h2" sx={{ color: '#333', mt: 2 }}>
          Stay Safe and Healthy
        </Typography>
        <Typography paragraph>
          Traveling can expose you to new environments and potential health risks, so it’s crucial to
          take precautions to stay safe and healthy. This includes researching any required
          vaccinations...
        </Typography>

        <Typography variant="h5" component="h2" sx={{ color: '#333', mt: 2 }}>
          Immerse Yourself in the Local Culture
        </Typography>
        <Typography paragraph>
          One of the most rewarding aspects of traveling is immersing yourself in the local culture and
          customs...
        </Typography>

        <Typography variant="h5" component="h2" sx={{ color: '#333', mt: 2 }}>
          Capture Memories
        </Typography>
        <Typography paragraph>
          Finally, don’t forget to capture memories of your journey. Whether it’s through photographs,
          journaling, or souvenirs, preserving the moments and experiences...
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box component="footer">
        <Typography variant="h5" component="h2" sx={{ color: '#333' }}>
          Conclusion
        </Typography>
        <Typography paragraph>
          Traveling is an art form that requires a blend of planning, preparation, and spontaneity...
        </Typography>
      </Box>
    </Paper>
  );
};

export default BlogDetail;
