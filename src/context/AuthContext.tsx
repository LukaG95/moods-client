import { createContext, useContext, useMemo } from "react";
import { useFetch } from "@/hooks/useFetch";
import type { User, UserResponse } from "@/types/api";
import type { FetchConfig } from "@/types/api";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  setUser: (u: UserResponse | null) => void;
  refetchAuth: (config?: FetchConfig) => Promise<boolean>;
  error: unknown;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const config = useMemo(() => ({ method: "GET", url: "/api/auth/me" }), []);
  const {
    data,
    loading,
    setData: setUser,
    refetch,
    error,
  } = useFetch<{ user: User | null }>(config);

  return (
    <AuthContext.Provider
      value={{
        user: data?.user ?? null,
        loading,
        setUser,
        refetchAuth: refetch,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
