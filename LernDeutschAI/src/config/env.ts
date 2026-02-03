/**
 * LernDeutsch AI - Environment Configuration
 *
 * These values are loaded from environment variables at build time.
 * In development, you can set them in .env file.
 */

// Supabase Configuration
export const SUPABASE_URL =
  process.env.SUPABASE_URL || "https://teukipnmicauzloegvtk.supabase.co";
export const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRldWtpcG5taWNhdXpsb2VndnRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4MDQ4MzIsImV4cCI6MjA4NTM4MDgzMn0.pEg1v4eX-yggM44vPUatLWAQPonVmy9GlnihV424S2k";
export const SUPABASE_STORAGE_BUCKET =
  process.env.SUPABASE_STORAGE_BUCKET_SOURCE_IMAGES || "source-images";

// App Configuration
export const APP_NAME = "LernDeutsch AI";
export const APP_VERSION = "1.0.0";

// Feature Flags
declare const __DEV__: boolean;
export const ENABLE_DEBUG_LOGGING =
  typeof __DEV__ !== "undefined" ? __DEV__ : true;
export const ENABLE_MOCK_DATA = false;

// AI Configuration (for Phase 3)
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
