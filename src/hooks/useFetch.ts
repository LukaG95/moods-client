import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { api } from "@/lib/api";
import type { ApiResponse, FetchConfig } from "@/types/api";
import { ApiError } from "@/types/api";

type FetchOptions = {
  auto?: boolean; // instant fetch on mount
};

export function useFetch<T extends object>(
  baseConfig?: FetchConfig, // mutation style - baseConfig is passed as props so we don't have to write a useEffect in the component that calls this useFetch
  { auto = true }: FetchOptions = {}
) {
  const [data, setData] = useState<ApiResponse<T> | null>(null);
  const [loading, setLoading] = useState<boolean>(!!(auto && baseConfig));
  const [error, setError] = useState<ApiError | null>(null);

  const refetch = useCallback(
    async (overrideConfig?: FetchConfig) => {
      const finalConfig = overrideConfig || baseConfig;
      if (!finalConfig) {
        throw new Error("No request config provided to useFetch");
      }

      const { url, method, ...rest } = finalConfig;

      setLoading(true);
      setError(null);

      try {
        const res = await api.request<ApiResponse<T>>({
          url,
          method,
          ...rest,
        });
        setData(res.data ?? null);
        return true;
      } catch (err: unknown) {
        let error: ApiError;

        if (axios.isAxiosError(err)) {
          const error_id = err.response?.data.error_id;
          const serverMessage = err.response?.data.message;

          error = {
            error_id,
            message: serverMessage ?? "Something went wrong. Please try again.",
            details: err.response?.data,
          };
        } else {
          error = {
            error_id: 0,
            message: "Unexpected error occurred.",
          };
        }

        console.error("ApiError:", error);
        setError(error);
        setData(null);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [baseConfig]
  );

  useEffect(() => {
    if (auto && baseConfig) {
      refetch();
    }
  }, [auto, baseConfig, refetch]);

  return { data, loading, error, refetch, setData };
}
