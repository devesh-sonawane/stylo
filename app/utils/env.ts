import { Platform } from "react-native";

// Function to get environment variables safely using Expo's built-in support
export const getEnvVariable = (key: string): string | undefined => {
  return process.env[key];
};

// Get backend API URL with fallback to localhost
export const getBackendApiUrl = (): string => {
  const apiUrl = process.env.EXPO_PUBLIC_BACKEND_API_URL;
  if (!apiUrl) {
    console.warn(
      "Backend API URL not found in environment variables, using default localhost:8000"
    );
    return "http://localhost:8000";
  }
  return apiUrl;
};

// Validate that the backend API URL is available
export const validateBackendApiUrl = (): boolean => {
  const apiUrl = getBackendApiUrl();
  return !!apiUrl;
};
