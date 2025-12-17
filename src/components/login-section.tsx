'use client';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { auth} from '../firebase';
import { Plane } from 'lucide-react';

const LoginSection: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleNavigation = async (uid: string) => {
    try {
      const res = await fetch(`${API_URL}/api/users/${uid}`);
      if (res.ok) {
        const userData = await res.json();
        if (userData.isProfileComplete) {
          navigate('/home', { replace: true });
          return;
        }
      }
      navigate('/profile', { replace: true });
    } catch (e: any) {
      console.error("Error checking profile status", e);
      navigate('/profile', { replace: true });
    }
  };

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const clearSensitive = () => {
    setPassword('');
    setConfirmPassword('');
  };

  const firebaseCodeToMessage = (code?: string) => {
    switch (code) {
      case 'auth/invalid-email':
        return 'The email address is not valid.';
      case 'auth/user-disabled':
        return 'This user account has been disabled.';
      case 'auth/user-not-found':
        return 'No user found with this email.';
      case 'auth/wrong-password':
        return 'Incorrect password.';
      case 'auth/email-already-in-use':
        return 'This email is already in use.';
      case 'auth/weak-password':
        return 'Password is too weak (min 6 characters).';
      case 'auth/operation-not-allowed':
        return 'Email/Password sign-in is not enabled for this Firebase project.';
      case 'auth/network-request-failed':
        return 'Network error. Check your connection and try again.';
      case 'auth/too-many-requests':
        return 'Too many attempts. Please try again later.';
      case 'auth/invalid-credential':
        return 'Invalid email or password.';
      case 'auth/popup-closed-by-user':
        return 'Sign-in popup was closed before completing.';
      case 'auth/cancelled-popup-request':
        return 'Another sign-in attempt is already in progress.';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  };

  const handleOAuth = async (providerName: 'google' | 'github') => {
    setError('');
    setLoading(true);
    try {
      const provider =
        providerName === 'google' ? new GoogleAuthProvider() : new GithubAuthProvider();

      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('OAuth sign-in user:', user.displayName, user.email, user.uid);
      await handleNavigation(user.uid);
    } catch (err: unknown) {
      console.error(err);
      const code = err instanceof FirebaseError ? err.code : undefined;
      setError(firebaseCodeToMessage(code));
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (!email) {
      setError('Please enter your email.');
      setLoading(false);
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.');
      setLoading(false);
      return;
    }

    if (!isLogin) {
      if (!name) {
        setError('Please enter your full name.');
        setLoading(false);
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        setLoading(false);
        return;
      }
    }

    try {
      let uid;
      if (isLogin) {
        const uc = await signInWithEmailAndPassword(auth, email, password);
        uid = uc.user.uid;
      } else {
        const uc = await createUserWithEmailAndPassword(auth, email, password);
        uid = uc.user.uid;
        if (uc.user && name) {
          await updateProfile(auth.currentUser!, { displayName: name });
        }
      }

      await handleNavigation(uid);
    } catch (err: unknown) {
      console.error('Full login error:', err);
      const code = err instanceof FirebaseError ? err.code : undefined;
      setError(firebaseCodeToMessage(code));
      setLoading(false);
    } finally {
      if (!loading) {
        clearSensitive();
      }
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Enter your email first to receive password reset instructions.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setError('Password reset email sent. Check your inbox.');
    } catch (err: unknown) {
      console.error(err);
      const code = err instanceof FirebaseError ? err.code : undefined;
      setError(firebaseCodeToMessage(code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="login" className="py-24 bg-background relative overflow-hidden min-h-screen">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 px-4">
            <div className="flex items-center gap-2 mb-6">
              <Plane className="h-10 w-10 text-primary" />
              <span className="text-3xl font-bold">Bharath Voyage</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold leading-tight">Start Your Journey Today</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Join thousands of travelers discovering India&apos;s hidden gems. Create personalized itineraries,
              book experiences, and connect with local guides.
            </p>
          </div>

          <div className="px-4">
            <div className="bg-card rounded-2xl shadow-2xl p-6">
              <div className="mb-4">
                <h3 className="text-2xl font-semibold">{isLogin ? 'Welcome Back' : 'Create Account'}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {isLogin ? 'Log in to continue your journey' : 'Sign up to start exploring India'}
                </p>
              </div>

              {error && (
                <div
                  role="alert"
                  className="mb-4 rounded-md bg-red-50 border border-red-200 px-4 py-2 text-sm text-red-700"
                >
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">
                      Full name
                    </label>
                    <input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full h-11 rounded-md border px-3 text-sm bg-transparent"
                      required={!isLogin}
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full h-11 rounded-md border px-3 text-sm bg-transparent"
                    required
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="password" className="block text-sm font-medium text-muted-foreground">
                      Password
                    </label>
                    {isLogin && (
                      <button
                        type="button"
                        onClick={handleForgotPassword}
                        className="text-sm text-primary hover:underline"
                      >
                        Forgot?
                      </button>
                    )}
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full h-11 rounded-md border px-3 text-sm bg-transparent"
                    required
                  />
                </div>

                {!isLogin && (
                  <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-muted-foreground mb-1">
                      Confirm Password
                    </label>
                    <input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      className="w-full h-11 rounded-md border px-3 text-sm bg-transparent"
                      required={!isLogin}
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 rounded-md bg-primary text-white font-medium text-base disabled:opacity-60"
                >
                  {loading ? (isLogin ? 'Signing in...' : 'Creating account...') : isLogin ? 'Log In' : 'Sign Up'}
                </button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <button
                  onClick={() => handleOAuth('google')}
                  disabled={loading}
                  className="flex items-center justify-center gap-2 h-11 rounded-md border hover:bg-surface disabled:opacity-70 disabled:cursor-not-allowed"
                  aria-label="Continue with Google"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    <>
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="currentColor"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="currentColor"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="currentColor"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="currentColor"
                        />
                      </svg>
                      Google
                    </>
                  )}
                </button>
              </div>

              <div className="text-center text-sm mt-6">
                {isLogin ? (
                  <p className="text-muted-foreground">
                    {"Don't have an account? "}
                    <button
                      type="button"
                      onClick={() => {
                        setIsLogin(false);
                        setError('');
                      }}
                      className="text-primary font-medium hover:underline"
                    >
                      Sign up
                    </button>
                  </p>
                ) : (
                  <p className="text-muted-foreground">
                    {'Already have an account? '}
                    <button
                      type="button"
                      onClick={() => {
                        setIsLogin(true);
                        setError('');
                      }}
                      className="text-primary font-medium hover:underline"
                    >
                      Log in
                    </button>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginSection;