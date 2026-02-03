/**
 * LernDeutsch AI - Supabase Client Configuration
 */

import { createClient } from "@supabase/supabase-js";
import * as SecureStore from "expo-secure-store";

// ============ Environment Configuration ============
// Uses environment variables from .env file
const SUPABASE_URL =
  process.env.SUPABASE_URL || "https://teukipnmicauzloegvtk.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRldWtpcG5taWNhdXpsb2VndnRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4MDQ4MzIsImV4cCI6MjA4NTM4MDgzMn0.pEg1v4eX-yggM44vPUatLWAQPonVmy9GlnihV424S2k";

// ============ Secure Storage Adapter for Auth ============
const ExpoSecureStoreAdapter = {
  getItem: async (key: string): Promise<string | null> => {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.error("SecureStore getItem error:", error);
      return null;
    }
  },
  setItem: async (key: string, value: string): Promise<void> => {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error("SecureStore setItem error:", error);
    }
  },
  removeItem: async (key: string): Promise<void> => {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.error("SecureStore removeItem error:", error);
    }
  },
};

// ============ Supabase Client ============
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// ============ Storage Bucket Names ============
export const STORAGE_BUCKETS = {
  sourceImages: "source-images",
  avatars: "avatars",
};

// ============ Helper Functions ============

/**
 * Upload an image to Supabase Storage
 */
export const uploadImage = async (
  uri: string,
  bucket: string,
  path: string,
): Promise<{ url: string | null; error: Error | null }> => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, blob, {
        contentType: "image/jpeg",
        upsert: false,
      });

    if (error) throw error;

    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return { url: urlData.publicUrl, error: null };
  } catch (error) {
    console.error("Upload error:", error);
    return { url: null, error: error as Error };
  }
};

/**
 * Get signed URL for private images
 */
export const getSignedUrl = async (
  bucket: string,
  path: string,
  expiresIn: number = 3600,
): Promise<string | null> => {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(path, expiresIn);

    if (error) throw error;
    return data.signedUrl;
  } catch (error) {
    console.error("Signed URL error:", error);
    return null;
  }
};
