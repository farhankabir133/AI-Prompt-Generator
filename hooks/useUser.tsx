import React, { createContext, useState, useContext, ReactNode } from 'react';

// This is a MOCK user system. In a real app, this would be
// replaced with a proper authentication library (e.g., Firebase Auth, Auth0).

interface User {
  isAuthenticated: boolean;
  promptsRemaining: number;
}

interface UserContextType {
  user: User;
  login: () => void;
  logout: () => void;
  updateMyUserData: (data: Partial<User>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const MOCK_AUTH_USER: User = {
    isAuthenticated: true,
    promptsRemaining: 20,
};

const MOCK_ANON_USER: User = {
    isAuthenticated: false,
    promptsRemaining: 0, // Anon user limit is handled by usePromptCounter
};


export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Simple session persistence for mock
  const [user, setUser] = useState<User>(() => {
      const stored = sessionStorage.getItem('mock-user');
      return stored ? JSON.parse(stored) : MOCK_ANON_USER;
  });

  const login = () => {
      sessionStorage.setItem('mock-user', JSON.stringify(MOCK_AUTH_USER));
      setUser(MOCK_AUTH_USER);
  };

  const logout = () => {
      sessionStorage.removeItem('mock-user');
      setUser(MOCK_ANON_USER);
  };
  
  const updateMyUserData = (data: Partial<User>) => {
      setUser(prevUser => {
          const updatedUser = { ...prevUser, ...data };
          if(updatedUser.isAuthenticated) {
              sessionStorage.setItem('mock-user', JSON.stringify(updatedUser));
          }
          return updatedUser;
      });
  };

  return (
    <UserContext.Provider value={{ user, login, logout, updateMyUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
