import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  panCard?: string;
  aadharCard?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithOTP: (phone: string, otp: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, phone?: string) => Promise<boolean>;
  logout: () => void;
  sendOTP: (phone: string) => Promise<boolean>;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('agricaptain_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('agricaptain_user', JSON.stringify(updatedUser));
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: '1',
      name: 'John Farmer',
      email,
      phone: '+91 9876543210'
    };
    
    setUser(mockUser);
    localStorage.setItem('agricaptain_user', JSON.stringify(mockUser));
    
    // Handle return URL after login
    const returnTo = localStorage.getItem('returnTo');
    if (returnTo) {
      localStorage.removeItem('returnTo');
      window.location.href = returnTo;
    }
    
    return true;
  };

  const loginWithOTP = async (phone: string, otp: string): Promise<boolean> => {
    // Simulate OTP verification
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (otp === '123456') {
      const mockUser: User = {
        id: '2',
        name: 'AgriCaptain User',
        email: '',
        phone
      };
      
      setUser(mockUser);
      localStorage.setItem('agricaptain_user', JSON.stringify(mockUser));
      
      // Handle return URL after login
      const returnTo = localStorage.getItem('returnTo');
      if (returnTo) {
        localStorage.removeItem('returnTo');
        window.location.href = returnTo;
      }
      
      return true;
    }
    return false;
  };

  const signup = async (name: string, email: string, password: string, phone?: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: '3',
      name,
      email,
      phone
    };
    
    setUser(mockUser);
    localStorage.setItem('agricaptain_user', JSON.stringify(mockUser));
    
    // Handle return URL after signup
    const returnTo = localStorage.getItem('returnTo');
    if (returnTo) {
      localStorage.removeItem('returnTo');
      window.location.href = returnTo;
    }
    
    return true;
  };

  const sendOTP = async (phone: string): Promise<boolean> => {
    // Simulate sending OTP
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`OTP sent to ${phone}: 123456`);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('agricaptain_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      loginWithOTP,
      signup,
      logout,
      sendOTP,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};
