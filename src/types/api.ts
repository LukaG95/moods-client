// Shared API-related types

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
