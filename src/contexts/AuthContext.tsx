
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  panCard?: string;
  aadharCard?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginWithOTP: (phone: string, otp: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string, phone?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  signOut: () => Promise<void>;
  sendOTP: (phone: string) => Promise<{ success: boolean; error?: string }>;
  updateUser: (userData: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>;
  redirectAfterLogin?: string;
  setRedirectAfterLogin: (path?: string) => void;
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
  const [user, setUser] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [redirectAfterLogin, setRedirectAfterLogin] = useState<string | undefined>();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        setSession(session);
        
        if (session?.user) {
          // Fetch profile
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          if (profile) {
            setUser({
              id: profile.id,
              name: profile.name,
              email: session.user.email || '',
              phone: profile.phone,
              address: profile.address,
              panCard: profile.pan_card,
              aadharCard: profile.aadhar_card
            });
          }
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const validateInput = (email?: string, password?: string, name?: string, phone?: string) => {
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'Please enter a valid email address';
    }
    
    if (password && password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    
    if (name && name.trim().length < 2) {
      return 'Name must be at least 2 characters long';
    }
    
    if (phone && !/^\+?[1-9]\d{9,14}$/.test(phone.replace(/\s/g, ''))) {
      return 'Please enter a valid phone number with country code';
    }
    
    return null;
  };

  const validatePAN = (pan: string) => {
    return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan);
  };

  const validateAadhar = (aadhar: string) => {
    return /^\d{12}$/.test(aadhar.replace(/\s/g, ''));
  };

  const updateUser = async (userData: Partial<UserProfile>): Promise<{ success: boolean; error?: string }> => {
    if (!session?.user) {
      return { success: false, error: 'User not authenticated' };
    }

    try {
      const validationError = validateInput(undefined, undefined, userData.name, userData.phone);
      if (validationError) {
        return { success: false, error: validationError };
      }

      if (userData.panCard && !validatePAN(userData.panCard)) {
        return { success: false, error: 'Invalid PAN card format. Please use format: ABCDE1234F' };
      }

      if (userData.aadharCard && !validateAadhar(userData.aadharCard)) {
        return { success: false, error: 'Invalid Aadhar card format. Please enter 12 digits' };
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          name: userData.name,
          phone: userData.phone,
          address: userData.address,
          pan_card: userData.panCard,
          aadhar_card: userData.aadharCard
        })
        .eq('id', session.user.id);

      if (error) {
        console.error('Profile update error:', error);
        return { success: false, error: 'Failed to update profile' };
      }

      setUser(prev => prev ? { ...prev, ...userData } : null);
      return { success: true };
    } catch (error) {
      console.error('Update user error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const validationError = validateInput(email, password);
      if (validationError) {
        return { success: false, error: validationError };
      }

      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password
      });

      if (error) {
        console.error('Login error:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const signup = async (name: string, email: string, password: string, phone?: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const validationError = validateInput(email, password, name, phone);
      if (validationError) {
        return { success: false, error: validationError };
      }

      const { error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            name: name.trim(),
            phone: phone?.trim()
          }
        }
      });

      if (error) {
        console.error('Signup error:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const loginWithOTP = async (phone: string, otp: string): Promise<{ success: boolean; error?: string }> => {
    try {
      let formattedPhone = phone.trim();
      if (!formattedPhone.startsWith('+')) {
        formattedPhone = '+91' + formattedPhone.replace(/^0+/, '');
      }

      const validationError = validateInput(undefined, undefined, undefined, formattedPhone);
      if (validationError) {
        return { success: false, error: validationError };
      }

      if (!/^\d{6}$/.test(otp)) {
        return { success: false, error: 'OTP must be 6 digits' };
      }

      console.log('Verifying OTP for phone:', formattedPhone);

      const { error } = await supabase.auth.verifyOtp({
        phone: formattedPhone,
        token: otp,
        type: 'sms'
      });

      if (error) {
        console.error('OTP verification error:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('OTP login error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const sendOTP = async (phone: string): Promise<{ success: boolean; error?: string }> => {
    try {
      let formattedPhone = phone.trim();
      if (!formattedPhone.startsWith('+')) {
        formattedPhone = '+91' + formattedPhone.replace(/^0+/, '');
      }

      const validationError = validateInput(undefined, undefined, undefined, formattedPhone);
      if (validationError) {
        return { success: false, error: validationError };
      }

      console.log('Sending OTP to phone:', formattedPhone);

      const { error } = await supabase.auth.signInWithOtp({
        phone: formattedPhone
      });

      if (error) {
        console.error('Send OTP error:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Send OTP error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const signOut = async (): Promise<void> => {
    await logout();
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      login,
      loginWithOTP,
      signup,
      logout,
      signOut,
      sendOTP,
      updateUser,
      redirectAfterLogin,
      setRedirectAfterLogin
    }}>
      {children}
    </AuthContext.Provider>
  );
};
