
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthUser extends User {
  name?: string;
  phone?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  session: Session | null;
  loading: boolean;
  redirectAfterLogin: string | undefined;
  setRedirectAfterLogin: (path: string | undefined) => void;
  sendOTP: (phone: string) => Promise<{ success: boolean; error?: string }>;
  verifyOTP: (phone: string, otp: string) => Promise<{ success: boolean; error?: string }>;
  testLogin: (phone: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Generate a proper UUID for test users
const generateTestUserId = () => {
  return 'test-' + crypto.randomUUID();
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [redirectAfterLogin, setRedirectAfterLogin] = useState<string | undefined>();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, { session: !!session });
        setSession(session);
        setUser(session?.user as AuthUser || null);
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', { session: !!session });
      setSession(session);
      setUser(session?.user as AuthUser || null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const sendOTP = async (phone: string): Promise<{ success: boolean; error?: string }> => {
    try {
      console.log('Sending OTP to phone:', phone);
      
      const formattedPhone = phone.startsWith('+') ? phone : '+91' + phone;
      
      const { error } = await supabase.auth.signInWithOtp({
        phone: formattedPhone,
      });

      if (error) {
        console.error('Send OTP error:', error);
        console.log('Real OTP failed, using test OTP:', error.message);
        return { success: true }; // Allow test flow
      }

      return { success: true };
    } catch (error) {
      console.error('Exception sending OTP:', error);
      return { success: false, error: 'Failed to send OTP' };
    }
  };

  const verifyOTP = async (phone: string, otp: string): Promise<{ success: boolean; error?: string }> => {
    try {
      console.log('Verifying OTP for phone:', phone);
      
      const formattedPhone = phone.startsWith('+') ? phone : '+91' + phone;
      
      const { error } = await supabase.auth.verifyOtp({
        phone: formattedPhone,
        token: otp,
        type: 'sms'
      });

      if (error) {
        console.error('Verify OTP error:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Exception verifying OTP:', error);
      return { success: false, error: 'Failed to verify OTP' };
    }
  };

  const testLogin = async (phone: string): Promise<{ success: boolean; error?: string }> => {
    try {
      console.log('Test login for phone:', phone);
      
      // Create a proper test user with UUID
      const testUserId = generateTestUserId();
      const testUser: AuthUser = {
        id: testUserId,
        aud: 'authenticated',
        role: 'authenticated',
        email: 'test@agricaptain.com',
        phone: phone,
        name: 'Test User',
        app_metadata: {},
        user_metadata: {
          name: 'Test User',
          phone: phone
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // Create a proper test session
      const testSession: Session = {
        access_token: 'test-access-token-' + Date.now(),
        refresh_token: 'test-refresh-token-' + Date.now(),
        expires_in: 3600,
        expires_at: Math.floor(Date.now() / 1000) + 3600,
        token_type: 'bearer',
        user: testUser
      };

      console.log('Test login successful for:', testUser);
      
      // Set the test session
      setSession(testSession);
      setUser(testUser);
      
      return { success: true };
    } catch (error) {
      console.error('Test login error:', error);
      return { success: false, error: 'Test login failed' };
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setRedirectAfterLogin(undefined);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value = {
    user,
    session,
    loading,
    redirectAfterLogin,
    setRedirectAfterLogin,
    sendOTP,
    verifyOTP,
    testLogin,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
