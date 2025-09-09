import { createContext, useContext } from "react";
import { useFetch } from "@/hooks/useFetch";
import type { User, UserResponse } from "@/types/api";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  setUser: (u: UserResponse | null) => void;
  refetch: () => Promise<void>;
  error: unknown;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data, loading, setData: setUser, refetch, error } = useFetch<{ user: User | null }>({
    method: "GET",
    url: "/api/auth/me",
  });

  return (
    <AuthContext.Provider
      value={{ user: data?.user ?? null, loading, setUser, refetch, error }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
