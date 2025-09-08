import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useUser } from './useUser';

const ANON_PROMPT_LIMIT = 10;
const ANON_STORAGE_KEY = 'anon-prompts-remaining';

interface PromptCounterContextType {
  promptsRemaining: number;
  decrementPrompts: () => void;
  resetAnonPrompts: () => void;
}

const PromptCounterContext = createContext<PromptCounterContextType | undefined>(undefined);

export const PromptCounterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, updateMyUserData } = useUser();
  const [anonPrompts, setAnonPrompts] = useState<number>(() => {
    const stored = localStorage.getItem(ANON_STORAGE_KEY);
    return stored ? parseInt(stored, 10) : ANON_PROMPT_LIMIT;
  });

  const promptsRemaining = user.isAuthenticated ? user.promptsRemaining : anonPrompts;

  const decrementPrompts = () => {
    if (user.isAuthenticated) {
        updateMyUserData({ promptsRemaining: Math.max(0, user.promptsRemaining - 1) });
    } else {
        const newCount = Math.max(0, anonPrompts - 1);
        setAnonPrompts(newCount);
        localStorage.setItem(ANON_STORAGE_KEY, newCount.toString());
    }
  };

  const resetAnonPrompts = () => {
      setAnonPrompts(ANON_PROMPT_LIMIT);
      localStorage.setItem(ANON_STORAGE_KEY, ANON_PROMPT_LIMIT.toString());
  }

  useEffect(() => {
    // Sync local state if storage changes in another tab
    const handleStorageChange = (e: StorageEvent) => {
        if (e.key === ANON_STORAGE_KEY) {
            setAnonPrompts(e.newValue ? parseInt(e.newValue, 10) : ANON_PROMPT_LIMIT);
        }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <PromptCounterContext.Provider value={{ promptsRemaining, decrementPrompts, resetAnonPrompts }}>
      {children}
    </PromptCounterContext.Provider>
  );
};

export const usePromptCounter = () => {
  const context = useContext(PromptCounterContext);
  if (context === undefined) {
    throw new Error('usePromptCounter must be used within a PromptCounterProvider');
  }
  return context;
};
