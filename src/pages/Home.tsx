import React from 'react';
import { Box, Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import IndiaBg from '../assets/Background-Image.png';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(${IndiaBg})`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'left',
        position: 'relative',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          p: 10,
          mt: -8,
          mr: 45,
          textAlign: 'right',
        }}
      >

     <Button
          variant="contained"
          size="large"
          sx={{
            fontWeight: 'bold',
            borderRadius: '30px',
            px: 4,
            py: 1.2,
          }}
          onClick={() => navigate('/plan')}
        >
          Plan Your Trip
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
