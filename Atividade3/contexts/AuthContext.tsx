import { authAPI, User } from '@/services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface AuthContextData {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStorageData();
  }, []);

  async function loadStorageData() {
    try {
      const storedToken = await AsyncStorage.getItem('@jwt_token');
      const storedUser = await AsyncStorage.getItem('@user');

      if (storedToken && storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const response = await authAPI.login(email, password);
      
      await AsyncStorage.setItem('@jwt_token', response.jwt);
      await AsyncStorage.setItem('@user', JSON.stringify(response.user));
      
      setUser(response.user);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao fazer login');
    }
  }

  async function signUp(name: string, email: string, password: string) {
    try {
      const user = await authAPI.register(name, email, password);
      
      await signIn(email, password);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao cadastrar');
    }
  }

  async function signOut() {
    try {
      await AsyncStorage.removeItem('@jwt_token');
      await AsyncStorage.removeItem('@user');
      setUser(null);
    } catch (error) {
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

