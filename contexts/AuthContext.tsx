import { useRouter } from 'next/router';
import React, { createContext, useState, useEffect, useContext } from 'react';

interface AuthContextProps {
  userToken?: string | null;
  login: (token: string) => void;
  logout: () => void;
  isLoggedIn: boolean
}

const AuthContext = createContext<AuthContextProps | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }: React.PropsWithChildren<{}>) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  
  const login = (token: string) => {
    setUserTokenWithStorage(token);
    setUserToken(token);
    setIsLoggedIn(true);
  };

  const setUserTokenWithStorage = (token: string | null) => {
    setUserToken(token);
    if (token) {
      localStorage.setItem('access_token', token);
    } else {
      localStorage.removeItem('access_token');
    }
  };
  
  const logout = () => {
    setUserTokenWithStorage(null);
    setUserToken(null);
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ userToken, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = (): any => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('Auth Context must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuthContext };