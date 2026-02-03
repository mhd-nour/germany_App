/**
 * LernDeutsch AI - Auth Hook
 */

import React, {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
} from "react";
import type { User, AuthState } from "../types";
import {
  signIn as authSignIn,
  signUp as authSignUp,
  signOut as authSignOut,
  getCurrentUser,
  onAuthStateChange,
  resetPassword as authResetPassword,
} from "../services/auth";

interface AuthContextType extends AuthState {
  signIn: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  signUp: (
    email: string,
    password: string,
    displayName?: string,
  ) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  resetPassword: (
    email: string,
  ) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const useAuthProvider = () => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    // Check initial session
    const initAuth = async () => {
      const user = await getCurrentUser();
      setState({
        user,
        isLoading: false,
        isAuthenticated: !!user,
      });
    };

    initAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = onAuthStateChange((user) => {
      setState({
        user,
        isLoading: false,
        isAuthenticated: !!user,
      });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    const result = await authSignIn(email, password);

    if (result.success && result.user) {
      setState({
        user: result.user,
        isLoading: false,
        isAuthenticated: true,
      });
    } else {
      setState((prev) => ({ ...prev, isLoading: false }));
    }

    return { success: result.success, error: result.error };
  }, []);

  const signUp = useCallback(
    async (email: string, password: string, displayName?: string) => {
      setState((prev) => ({ ...prev, isLoading: true }));
      const result = await authSignUp(email, password, displayName);

      if (result.success && result.user) {
        setState({
          user: result.user,
          isLoading: false,
          isAuthenticated: true,
        });
      } else {
        setState((prev) => ({ ...prev, isLoading: false }));
      }

      return { success: result.success, error: result.error };
    },
    [],
  );

  const signOut = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true }));
    await authSignOut();
    setState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    return await authResetPassword(email);
  }, []);

  return {
    ...state,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };
};

// AuthProvider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuthProvider();
  
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
