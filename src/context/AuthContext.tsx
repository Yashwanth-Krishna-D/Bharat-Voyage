import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import {
    onAuthStateChanged,
    signOut as firebaseSignOut,
    setPersistence,
    browserLocalPersistence
} from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from '../firebase';

interface UserProfile {
    uid: string;
    name: string;
    email: string;
    photoURL?: string | null;
    phone?: string | null;
    location?: any;
    isProfileComplete: boolean;
    [key: string]: any;
}

interface AuthContextType {
    currentUser: User | null;
    userProfile: UserProfile | null;
    loading: boolean;
    logout: () => Promise<void>;
    refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    const fetchUserProfile = async (uid: string) => {
        try {
            const res = await fetch(`${API_URL}/api/users/${uid}`);
            if (res.ok) {
                const data = await res.json();
                setUserProfile(data);
            } else {
                console.warn('User profile not found in backend');
                setUserProfile(null);
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
            setUserProfile(null);
        }
    };

    useEffect(() => {
        setPersistence(auth, browserLocalPersistence)
            .catch((error) => {
                console.error("Auth persistence error:", error);
            });

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);
            if (user) {
                await fetchUserProfile(user.uid);
            } else {
                setUserProfile(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const logout = async () => {
        setUserProfile(null);
        await firebaseSignOut(auth);
    };

    const refreshProfile = async () => {
        if (currentUser) {
            await fetchUserProfile(currentUser.uid);
        }
    };

    const value = {
        currentUser,
        userProfile,
        loading,
        logout,
        refreshProfile
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
