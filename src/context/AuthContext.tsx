import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authAPI } from '../api/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  bio?: string;
  coins?: number;
  carbonSaved?: number;
  plasticSaved?: number;
  followers?: any[];
  following?: any[];
  interests?: string[];
  onboardingDone?: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
  updateUser: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '366980377728-sb8tucgr2jn0kmahv90gqpjqjr1voc6u.apps.googleusercontent.com', // Match your client ID
      offlineAccess: true,
    });
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      const storedUser = await AsyncStorage.getItem('user');

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));

        // Refresh user data from server
        try {
          const res = await authAPI.getMe();
          setUser(res.data.user);
          await AsyncStorage.setItem('user', JSON.stringify(res.data.user));
        } catch (err) {
          // Token might be expired — clear auth
          await AsyncStorage.removeItem('token');
          await AsyncStorage.removeItem('user');
          setToken(null);
          setUser(null);
        }
      }
    } catch (err) {
      console.log('Error loading auth:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    await AsyncStorage.setItem('token', newToken);
    await AsyncStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (e) {
      // Not signed in or other error
    }
    setToken(null);
    setUser(null);
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    AsyncStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
