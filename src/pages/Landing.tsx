// src/components/Landing.tsx
import React, { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleGoogle = async () => {
    setError('');
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const user = result.user;
      console.log('signed in user:', user.displayName, user.email, user.uid);
      navigate('/profile', { replace: true });
    } catch (err: unknown) {
      const message =
        err && typeof err === 'object' && 'message' in err && typeof (err as any).message === 'string'
          ? (err as any).message
          : 'Google sign-in failed. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #e0f2fe 0%, #f8fafc 100%)',
        px: 2,
        py: 6,
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 480,
          borderRadius: 3,
          boxShadow: '0 18px 60px rgba(15,23,42,0.12)',
        }}
        role="region"
        aria-label="Sign in"
      >
        <CardHeader
          title="Welcome to Bharath Voyage"
          subheader="Sign in to start planning your next journey across India"
          sx={{ textAlign: 'center', pb: 2 }}
        />
        <CardContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 2 }}>
            Sign in with your Google account to access trip planning, personalized itineraries, and save your travel preferences.
          </Typography>
        </CardContent>
        <CardActions sx={{ px: 3, pb: 3, flexDirection: 'column', gap: 1.5 }}>
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleGoogle}
            sx={{ textTransform: 'none', py: 1.5 }}
            disabled={loading}
            aria-label="Continue with Google"
          >
            {loading ? 'Signing in...' : 'Continue with Google'}
          </Button>
          <Typography variant="caption" color="text.secondary" textAlign="center">
            By signing in you agree to receive trip planning updates and travel recommendations.
          </Typography>
        </CardActions>
      </Card>
    </Box>
  );
};

export default Landing;
