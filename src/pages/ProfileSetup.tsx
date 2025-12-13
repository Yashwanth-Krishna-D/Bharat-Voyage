import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Snackbar,
  Autocomplete,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { db, storage } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

type LocationOption = {
  label: string;
  displayName: string;
  lat: string;
  lon: string;
};

const ProfileSetup: React.FC = () => {
  const navigate = useNavigate();

  const { currentUser, loading: authLoading } = useAuth();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  const [locationQuery, setLocationQuery] = useState<string>('');
  const [locationOptions, setLocationOptions] = useState<LocationOption[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<LocationOption | null>(null);

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const [savingStatus, setSavingStatus] = useState<string | null>(null);
  const [error, setError] = useState<string>('');
  const [snackOpen, setSnackOpen] = useState<boolean>(false);

  useEffect(() => {
    if (authLoading) return;
    if (!currentUser) {
      navigate('/', { replace: true });
      return;
    }
    setName(currentUser.displayName || '');
    setEmail(currentUser.email || '');
    setPhotoPreview(currentUser.photoURL || null);
  }, [currentUser, authLoading, navigate]);


  useEffect(() => {
    if (!locationQuery.trim()) {
      setLocationOptions([]);
      return;
    }

    const controller = new AbortController();

    const fetchLocations = async () => {
      try {
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          locationQuery
        )}&format=json&addressdetails=1&limit=6`;

        const res = await fetch(url, {
          signal: controller.signal,
          headers: {
            'Accept-Language': 'en',
          },
        });

        if (!res.ok) {
          console.warn('Nominatim responded with', res.status);
          setLocationOptions([]);
          return;
        }

        const data = await res.json();

        const mapped: LocationOption[] = [];
        const seen = new Set<string>();

        (data || []).forEach((item: any) => {
          const address = item.address || {};
          const labelParts = [
            address.city || address.town || address.village || address.county || item.display_name.split(',')[0],
            address.state,
            address.country,
          ].filter(Boolean);
          const label = labelParts.join(', ');
          if (!seen.has(label)) {
            seen.add(label);
            mapped.push({
              label,
              displayName: item.display_name,
              lat: item.lat,
              lon: item.lon,
            });
          }
        });

        setLocationOptions(mapped);
      } catch (err) {
        if ((err as any)?.name !== 'AbortError') {
          console.error('Location fetch error', err);
        }
      }
    };

    const timeout = setTimeout(fetchLocations, 350); 
    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, [locationQuery]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setPhotoFile(f);
    if (f) {
      const reader = new FileReader();
      reader.onload = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(f);
    }
  };

  const validatePhone = (p: string) => {
    const digits = p.replace(/\D/g, '');
    return digits.length === 0 || (digits.length >= 7 && digits.length <= 15);
  };

  const handleSave = async () => {
    setError('');
    if (!currentUser) {
      setError('Not authenticated.');
      return;
    }
    if (!name.trim()) {
      setError('Name is required.');
      return;
    }
    if (!validatePhone(phone)) {
      setError('Please enter a valid phone number.');
      return;
    }

    setSavingStatus('Saving...');

    try {
      let photoURL: string | null = currentUser.photoURL ?? null;

      if (photoFile && currentUser.uid) {
        setSavingStatus('Uploading photo...');
        const sRef = storageRef(storage, `profiles/${currentUser.uid}/profile`);
        const arrayBuffer = await photoFile.arrayBuffer();
        await uploadBytes(sRef, new Uint8Array(arrayBuffer));
        photoURL = await getDownloadURL(sRef);
      }

      const location = selectedLocation
        ? {
          label: selectedLocation.label,
          displayName: selectedLocation.displayName,
          lat: selectedLocation.lat,
          lon: selectedLocation.lon,
        }
        : null;

      const profileData: Record<string, any> = {
        uid: currentUser.uid,
        name: name.trim(),
        email,
        phone: phone.trim() || null,
        location,
        photoURL,
        updatedAt: new Date(),
        isProfileComplete: true,
      };

      setSavingStatus('Finalizing...');

      await updateProfile(currentUser, {
        displayName: name.trim(),
        photoURL: photoURL
      });

      await Promise.race([
        setDoc(doc(db, 'users', currentUser.uid), profileData, { merge: true }),
        new Promise((resolve) => setTimeout(resolve, 2500))
      ]);

      setSnackOpen(true);
      setTimeout(() => navigate('/home', { replace: true }), 500);
    } catch (e) {
      console.error("Save error:", e);
      setError('Failed to save profile. Please check connection.');
      setSavingStatus(null);
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Complete your profile
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            <Avatar src={photoPreview ?? undefined} sx={{ width: 120, height: 120 }}>
              {!photoPreview && name ? name.charAt(0).toUpperCase() : null}
            </Avatar>

            <Button variant="outlined" component="label" startIcon={<PhotoCameraIcon />}>
              Upload photo
              <input type="file" accept="image/*" hidden onChange={handlePhotoChange} />
            </Button>

            <Typography variant="caption" color="text.secondary" textAlign="center">
              Optional. Max recommended size 2MB.
            </Typography>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <TextField label="Name" value={name} fullWidth onChange={(e) => setName(e.target.value)} />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField label="Email" value={email} fullWidth disabled />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Autocomplete<LocationOption, false, false, false>
                options={locationOptions}
                getOptionLabel={(o) => o.label}
                filterOptions={(x) => x}
                inputValue={locationQuery}
                onInputChange={(_e: React.SyntheticEvent, val: string) => setLocationQuery(val)}
                value={selectedLocation}
                onChange={(_e: React.SyntheticEvent, val: LocationOption | null) => setSelectedLocation(val)}
                isOptionEqualToValue={(option, value) => !!value && option.lat === value.lat && option.lon === value.lon}
                renderInput={(params) => <TextField {...params} label="Location" placeholder="Type city (e.g., Chennai)" />}
                loadingText="Searching..."
                noOptionsText={locationQuery ? 'No results' : 'Type to search'}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField label="Phone (optional)" value={phone} fullWidth onChange={(e) => setPhone(e.target.value)} />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Box display="flex" gap={2} alignItems="center">
                <Button variant="contained" onClick={handleSave} disabled={!!savingStatus}>
                  {savingStatus ? (
                    <>
                      <CircularProgress size={16} sx={{ mr: 1, color: 'inherit' }} />
                      {savingStatus}
                    </>
                  ) : (
                    'Save'
                  )}
                </Button>

                <Button variant="text" onClick={() => navigate('/home')}>
                  Skip
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Snackbar open={snackOpen} autoHideDuration={2500} onClose={() => setSnackOpen(false)} message="Saved" />
    </Box>
  );
};

export default ProfileSetup;