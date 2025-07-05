
import React, { createContext, useContext, useState } from 'react';

interface TestUser {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface TestAuthContextType {
  testUser: TestUser | null;
  setTestUser: (user: TestUser | null) => void;
  isTestMode: boolean;
  setTestMode: (mode: boolean) => void;
}

const TestAuthContext = createContext<TestAuthContextType | undefined>(undefined);

export const useTestAuth = () => {
  const context = useContext(TestAuthContext);
  if (!context) {
    throw new Error('useTestAuth must be used within a TestAuthProvider');
  }
  return context;
};

export const TestAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [testUser, setTestUser] = useState<TestUser | null>(null);
  const [isTestMode, setTestMode] = useState(false);

  return (
    <TestAuthContext.Provider value={{
      testUser,
      setTestUser,
      isTestMode,
      setTestMode
    }}>
      {children}
    </TestAuthContext.Provider>
  );
};
