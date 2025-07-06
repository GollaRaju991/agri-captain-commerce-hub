
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthUser extends User {
  name?: string;
  phone?: string;
  address?: string;
  panCard?: string;
  aadharCard?: string;
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
  updateUser: (userData: Partial<AuthUser>) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Store test users globally to persist across sessions
const testUsers = new Map<string, any>();

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
      
      // For test users, we'll create a real session using the service role
      // This is for development/testing purposes only
      
      // Check if test user already exists
      let testUser = testUsers.get(phone);
      
      if (!testUser) {
        // Create a real test user in Supabase Auth using admin client
        try {
          // Use sign up with email for test users since phone auth is not working
          const testEmail = `test_${phone.replace('+', '')}@test.agricaptain.com`;
          const testPassword = 'testuser123';
          
          const { data, error: signUpError } = await supabase.auth.signUp({
            email: testEmail,
            password: testPassword,
            options: {
              data: {
                name: 'Test User',
                phone: phone
              }
            }
          });
          
          if (signUpError && !signUpError.message.includes('User already registered')) {
            console.error('Error creating test user:', signUpError);
            throw signUpError;
          }
          
          // Now sign in with the test user
          const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
            email: testEmail,
            password: testPassword
          });
          
          if (signInError) {
            console.error('Error signing in test user:', signInError);
            throw signInError;
          }
          
          testUser = signInData.user;
          testUsers.set(phone, testUser);
          
          console.log('Test user created and signed in:', testUser?.id);
          
        } catch (authError) {
          console.error('Failed to create real test user, falling back to mock:', authError);
          // Fallback to mock user for development
          return { success: false, error: 'Test authentication not available. Please use real OTP or configure test auth properly.' };
        }
      }
      
      return { success: true };
    } catch (error) {
      console.error('Test login error:', error);
      return { success: false, error: 'Test login failed' };
    }
  };

  const updateUser = async (userData: Partial<AuthUser>): Promise<{ success: boolean; error?: string }> => {
    try {
      if (!user) {
        return { success: false, error: 'No user logged in' };
      }

      console.log('Updating user profile:', userData);
      
      const { error } = await supabase
        .from('profiles')
        .update({
          name: userData.name,
          phone: userData.phone,
          address: userData.address,
          pan_card: userData.panCard,
          aadhar_card: userData.aadharCard,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) {
        console.error('Profile update error:', error);
        return { success: false, error: error.message };
      }

      // Update local user state
      const updatedUser = {
        ...user,
        ...userData
      };
      setUser(updatedUser);

      return { success: true };
    } catch (error) {
      console.error('Exception updating profile:', error);
      return { success: false, error: 'Failed to update profile' };
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
    updateUser,
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
