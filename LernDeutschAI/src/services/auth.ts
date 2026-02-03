/**
 * LernDeutsch AI - Authentication Service
 */

import { supabase } from "./supabase";
import type { User, Profile } from "../types";

export interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
}

/**
 * Sign up with email and password
 */
export const signUp = async (
  email: string,
  password: string,
  displayName?: string,
): Promise<AuthResult> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName,
        },
      },
    });

    if (error) throw error;

    if (data.user) {
      // Create profile entry
      await supabase.from("profiles").insert({
        id: data.user.id,
        display_name: displayName || null,
      });

      return {
        success: true,
        user: {
          id: data.user.id,
          email: data.user.email || "",
        },
      };
    }

    return { success: false, error: "Unknown error during sign up" };
  } catch (error: any) {
    console.error("Sign up error:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Sign in with email and password
 */
export const signIn = async (
  email: string,
  password: string,
): Promise<AuthResult> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    if (data.user) {
      return {
        success: true,
        user: {
          id: data.user.id,
          email: data.user.email || "",
        },
      };
    }

    return { success: false, error: "Unknown error during sign in" };
  } catch (error: any) {
    console.error("Sign in error:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Sign out current user
 */
export const signOut = async (): Promise<{
  success: boolean;
  error?: string;
}> => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    console.error("Sign out error:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Get current session
 */
export const getCurrentSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  } catch (error) {
    console.error("Get session error:", error);
    return null;
  }
};

/**
 * Get current user
 */
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) throw error;

    if (user) {
      // Fetch profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      return {
        id: user.id,
        email: user.email || "",
        profile: profile as Profile | undefined,
      };
    }
    return null;
  } catch (error) {
    console.error("Get user error:", error);
    return null;
  }
};

/**
 * Reset password
 */
export const resetPassword = async (
  email: string,
): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    console.error("Reset password error:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Update user profile
 */
export const updateProfile = async (
  userId: string,
  updates: Partial<Profile>,
): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase
      .from("profiles")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId);

    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    console.error("Update profile error:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Listen to auth state changes
 */
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return supabase.auth.onAuthStateChange(async (event, session) => {
    if (session?.user) {
      const user = await getCurrentUser();
      callback(user);
    } else {
      callback(null);
    }
  });
};
