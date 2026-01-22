import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';
import { login as loginApi, LoginRequest } from '../api/auth';
import { getToken, removeToken, saveToken } from '../utils/storage';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const logout = useCallback((): void => {
    removeToken();
    setUser(null);
    setToken(null);
    setError(null);
    // Optional: Show confirmation message
    console.log('Você foi deslogado com sucesso');
    // Redirect to login page
    navigate('/login');
  }, [navigate]);

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const storedToken = getToken();
    if (storedToken) {
      setToken(storedToken);
      // TODO: Validate token and fetch user data
      // For now, we'll just set the token
      // In a real app, you'd call refreshUser() here
    }
    setIsLoading(false);
  }, []);

  // Listen for logout events from API client (e.g., on 401 errors)
  useEffect(() => {
    const handleLogoutEvent = () => {
      logout();
    };

    window.addEventListener('auth:logout', handleLogoutEvent);
    return () => {
      window.removeEventListener('auth:logout', handleLogoutEvent);
    };
  }, [logout]);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const loginData: LoginRequest = { email, password };
      const response = await loginApi(loginData);

      // Save token to localStorage
      saveToken(response.token);

      // Update state
      setUser(response.user);
      setToken(response.token);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao fazer login. Tente novamente.';
      setError(errorMessage);
      removeToken();
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUser = async (): Promise<void> => {
    const storedToken = getToken();
    if (!storedToken) {
      setUser(null);
      setToken(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // TODO: Implement API call to validate token and fetch user data
      // For now, we'll just validate that token exists
      setToken(storedToken);
      // In a real app, you'd make an API call like:
      // const user = await getUserProfile();
      // setUser(user);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao validar token.';
      setError(errorMessage);
      removeToken();
      setUser(null);
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextValue = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    isLoading,
    error,
    login,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
