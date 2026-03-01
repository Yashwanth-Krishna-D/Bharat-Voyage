import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { updateProfile } from 'firebase/auth';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Loader2, Camera, MapPin, ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';

type LocationOption = {
    label: string;
    displayName: string;
    lat: string;
    lon: string;
};

const Account: React.FC = () => {
    const navigate = useNavigate();
    const { currentUser, userProfile, refreshProfile, loading: authLoading } = useAuth();

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [bio, setBio] = useState<string>('');

    const [locationQuery, setLocationQuery] = useState<string>('');
    const [locationOptions, setLocationOptions] = useState<LocationOption[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<LocationOption | null>(null);
    const [isSearchingLocation, setIsSearchingLocation] = useState(false);

    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);

    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null);


    useEffect(() => {
        if (authLoading) return;
        if (!currentUser) {
            navigate('/', { replace: true });
            return;
        }

        setName(currentUser.displayName || '');
        setEmail(currentUser.email || '');
        setPhotoPreview(currentUser.photoURL || null);

        if (userProfile) {
            setPhone(userProfile.phone || '');
            setBio(userProfile.bio || '');
            if (userProfile.location) {
                setSelectedLocation(userProfile.location);
                setLocationQuery(userProfile.location.label || '');
            }
        }

    }, [currentUser, userProfile, authLoading, navigate]);

    useEffect(() => {
        if (!locationQuery.trim() || selectedLocation?.label === locationQuery) {
            setLocationOptions([]);
            return;
        }

        if (selectedLocation && locationQuery === selectedLocation.label) return;

        const controller = new AbortController();
        const timeoutId = setTimeout(async () => {
            setIsSearchingLocation(true);
            try {
                const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
                    locationQuery
                )}&format=json&addressdetails=1&limit=5`;

                const res = await fetch(url, { signal: controller.signal });
                if (res.ok) {
                    const data = await res.json();
                    const mapped: LocationOption[] = data.map((item: any) => {
                        const address = item.address || {};
                        const labelParts = [
                            address.city || address.town || address.village || address.county || item.display_name.split(',')[0],
                            address.state,
                            address.country
                        ].filter(Boolean);
                        const label = labelParts.join(', ');
                        return {
                            label,
                            displayName: item.display_name,
                            lat: item.lat,
                            lon: item.lon
                        };
                    });
                    const unique = mapped.filter((v, i, a) => a.findIndex(t => (t.label === v.label)) === i);
                    setLocationOptions(unique);
                }
            } catch (err: any) {
                if (err.name !== 'AbortError') console.error(err);
            } finally {
                setIsSearchingLocation(false);
            }
        }, 400);

        return () => {
            clearTimeout(timeoutId);
            controller.abort();
        };
    }, [locationQuery, selectedLocation]);


    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setPhotoFile(file);
            const reader = new FileReader();
            reader.onload = (ev) => setPhotoPreview(ev.target?.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentUser) return;

        setSaving(true);
        setMessage(null);

        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

        try {
            let photoURL = currentUser.photoURL;
            if (photoFile) {
                const fileRef = storageRef(storage, `profiles/${currentUser.uid}/avatar_${Date.now()}`);
                await uploadBytes(fileRef, photoFile);
                photoURL = await getDownloadURL(fileRef);
                await updateProfile(currentUser, { photoURL });
            }

            if (name !== currentUser.displayName) {
                await updateProfile(currentUser, { displayName: name });
            }

            const userData = {
                uid: currentUser.uid,
                email: currentUser.email,
                name,
                phone,
                bio,
                photoURL,
                location: selectedLocation,
                isProfileComplete: true,
            };

            const res = await fetch(`${API_URL}/api/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!res.ok) {
                throw new Error('Failed to save profile on server');
            }

            await refreshProfile();
            setMessage({ type: 'success', text: 'Profile updated successfully!' });

        } catch (err: any) {
            console.error(err);
            setMessage({ type: 'error', text: err.message || 'Something went wrong.' });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar>
                <Button variant="ghost" onClick={() => navigate('/home')} className="gap-2 text-slate-600 hover:text-slate-900">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Button>
            </Navbar>

            <div className="pt-[100px] pb-10 px-4 flex justify-center">
                <Card className="w-full max-w-4xl shadow-md border-slate-200">
                    <CardHeader className="border-b border-slate-100 pb-6">
                        <CardTitle className="text-2xl font-bold text-slate-800">Account Settings</CardTitle>
                        <CardDescription>Manage your profile and personal preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-8">
                        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-3 gap-8">

                            {/* Left Column: Avatar */}
                            <div className="md:col-span-1 flex flex-col items-center space-y-4">
                                <div className="relative group">
                                    <Avatar className="w-40 h-40 border-4 border-white shadow-lg">
                                        <AvatarImage src={photoPreview || ''} className="object-cover" />
                                        <AvatarFallback className="text-5xl bg-slate-100 text-slate-400">{name.charAt(0).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <label
                                        htmlFor="avatar-upload-account"
                                        className="absolute bottom-2 right-2 p-2.5 bg-orange-600 text-white rounded-full cursor-pointer hover:bg-orange-700 transition-colors shadow-lg"
                                    >
                                        <Camera className="w-5 h-5" />
                                        <input
                                            id="avatar-upload-account"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handlePhotoChange}
                                        />
                                    </label>
                                </div>
                                <div className="text-center">
                                    <h3 className="font-semibold text-lg text-slate-900">{name || 'Your Name'}</h3>
                                    <p className="text-slate-500 text-sm">{email}</p>
                                </div>
                            </div>

                            <div className="md:col-span-2 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input
                                            id="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone</Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="+91..."
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input
                                        id="email"
                                        value={email}
                                        disabled
                                        className="bg-slate-50 text-slate-500"
                                    />
                                </div>

                                <div className="space-y-2 relative">
                                    <Label htmlFor="location">Location</Label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                        <Input
                                            id="location"
                                            className="pl-9"
                                            value={locationQuery}
                                            onChange={(e) => {
                                                setLocationQuery(e.target.value);
                                                if (selectedLocation && e.target.value !== selectedLocation.label) {
                                                    setSelectedLocation(null);
                                                }
                                            }}
                                            placeholder="Search your city..."
                                            autoComplete="off"
                                        />
                                        {isSearchingLocation && (
                                            <div className="absolute right-3 top-3">
                                                <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
                                            </div>
                                        )}
                                    </div>
                                    {locationOptions.length > 0 && (
                                        <div className="absolute z-10 w-full mt-1 bg-white text-slate-900 rounded-md border border-slate-200 shadow-xl animate-in fade-in-0 zoom-in-95 max-h-60 overflow-y-auto">
                                            <ul className="py-1">
                                                {locationOptions.map((opt, idx) => (
                                                    <li
                                                        key={idx}
                                                        className="px-3 py-2.5 hover:bg-orange-50 cursor-pointer text-sm border-b border-slate-50 last:border-0"
                                                        onClick={() => {
                                                            setSelectedLocation(opt);
                                                            setLocationQuery(opt.label);
                                                            setLocationOptions([]);
                                                        }}
                                                    >
                                                        <div className="font-medium text-slate-800">{opt.label}</div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="bio">Bio</Label>
                                    <Input
                                        id="bio"
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                        placeholder="Tell us about yourself..."
                                    />
                                </div>

                                <div className="pt-4 flex items-center justify-between">
                                    {message && (
                                        <span className={`text-sm font-medium ${message.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
                                            {message.text}
                                        </span>
                                    )}
                                    <Button type="submit" disabled={saving || !name} className="ml-auto bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                                        {saving ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Saving Changes...
                                            </>
                                        ) : (
                                            'Save Changes'
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Account;
