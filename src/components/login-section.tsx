// src/components/Landing.tsx
'use client';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../firebase'; // adjust path if needed
import { Compass } from 'lucide-react';

const LoginSection: React.FC = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Form state
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const clearSensitive = () => {
    setPassword('');
    setConfirmPassword('');
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
      navigate('/profile', { replace: true });
    } catch (err: unknown) {
      console.error(err);
      const message =
        err && typeof err === 'object' && 'message' in err && typeof (err as any).message === 'string'
          ? (err as any).message
          : 'OAuth sign-in failed. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // basic validation
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
      // Sign up flow: require name and confirm password
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
      if (isLogin) {
        // sign in existing user
        const cred = await signInWithEmailAndPassword(auth, email, password);
        console.log('signed in:', cred.user.uid);
      } else {
        // create user
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        // Optionally update profile with displayName (requires import of updateProfile)
        // await updateProfile(cred.user, { displayName: name });
        console.log('account created:', cred.user.uid);
      }
      navigate('/profile', { replace: true });
    } catch (err: unknown) {
      console.error(err);
      const message =
        err && typeof err === 'object' && 'message' in err && typeof (err as any).message === 'string'
          ? (err as any).message
          : isLogin
          ? 'Sign in failed. Please check your credentials.'
          : 'Sign up failed. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
      clearSensitive();
    }
  };

  return (
    <section id="login" className="py-24 bg-background relative overflow-hidden min-h-screen">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Marketing Content */}
          <div className="space-y-6 px-4">
            <div className="flex items-center gap-2 mb-6">
              <Compass className="h-10 w-10 text-primary" />
              <span className="text-3xl font-bold">Bharath Voyage</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold leading-tight">Start Your Journey Today</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Join thousands of travelers discovering India&apos;s hidden gems. Create personalized itineraries,
              book experiences, and connect with local guides.
            </p>
          </div>

          {/* Right Side - Auth Card */}
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
                        onClick={() => {
                          // You can implement forgot password flow here
                          // For now show a friendly message
                          setError('Forgot password flow not implemented yet.');
                        }}
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
                  className="flex items-center justify-center gap-2 h-11 rounded-md border hover:bg-surface"
                  aria-label="Continue with Google"
                >
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
                </button>

                {/* <button
                  onClick={() => handleOAuth('github')}
                  disabled={loading}
                  className="flex items-center justify-center gap-2 h-11 rounded-md border hover:bg-surface"
                  aria-label="Continue with GitHub"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  GitHub
                </button> */}
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
