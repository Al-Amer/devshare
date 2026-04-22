import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, signInWithEmail, signUpWithEmail, signInWithGoogle, logout } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    await signInWithEmail(email, password);
  };

  const register = async (email: string, password: string) => {
    await signUpWithEmail(email, password);
  };

  const loginWithGoogle = async () => {
    await signInWithGoogle();
  };

  const logoutUser = async () => {
    await logout();
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, loginWithGoogle, logout: logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};