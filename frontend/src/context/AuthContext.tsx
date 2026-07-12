import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import toast from 'react-hot-toast';
import { authApi, setAuthToken } from '../services/api';
import type { AuthResponse, LoginPayload, RegisterPayload, User } from '../types';

interface AuthContextValue {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('scamshield-token'));
  const [loading, setLoading] = useState(false);

  const logout = useCallback(() => {
    localStorage.removeItem('scamshield-token');
    setToken(null);
    setUser(null);
    setAuthToken(null);
    toast.success('Logged out successfully');
  }, []);

  const login = useCallback(async (payload: LoginPayload) => {
    setLoading(true);
    try {
      const { data } = await authApi.login(payload);
      const authData = data as AuthResponse;
      localStorage.setItem('scamshield-token', authData.token);
      setToken(authData.token);
      setUser(authData.user);
      setAuthToken(authData.token);
      toast.success(`Welcome back, ${authData.user.name}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (payload: RegisterPayload) => {
    setLoading(true);
    try {
      const { data } = await authApi.register(payload);
      const authData = data as AuthResponse;
      localStorage.setItem('scamshield-token', authData.token);
      setToken(authData.token);
      setUser(authData.user);
      setAuthToken(authData.token);
      toast.success(`Account created for ${authData.user.name}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      loading,
      login,
      register,
      logout,
      isAuthenticated: Boolean(token),
    }),
    [user, token, loading, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside an AuthProvider');
  }
  return context;
};
