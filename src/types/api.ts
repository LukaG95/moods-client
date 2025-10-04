// Shared API-related types

import { AxiosRequestConfig } from "axios";

// Envelope that every response has
export type BaseResponse = {
  success: boolean;
  message?: string;
};

// API response = envelope + generic payload
export type ApiResponse<T extends object> = BaseResponse & T;

// Example domain types (extend as needed)
export type User = {
  id: number;
  username: string;
  email: string;
};

// Response from /auth/me
export type UserResponse = ApiResponse<{ user: User | null }>;

// Request config type (required url + method)
export type FetchConfig = AxiosRequestConfig & {
  url: string;
  method: string;
};


export type ApiError = {
  error_id: number;    // unique error code (client or server)
  message: string;    // human-readable fallback
  status?: number;    // optional HTTP status code
  details?: unknown;  // extra info for debugging
};
