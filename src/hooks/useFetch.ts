import { useEffect, useState, useCallback } from "react";
import axios, { type AxiosRequestConfig, AxiosError } from "axios";
import { api } from "@/lib/api";
import type { ApiResponse } from "@/types/api";

type RequiredConfig = AxiosRequestConfig & {
  method: string;
  url: string;
};

export function useFetch<T extends object>({ method, url }: RequiredConfig) {
  const [data, setData] = useState<ApiResponse<T> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.request<ApiResponse<T>>({ url, method });
      setData(res.data ?? null);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err);
      } else {
        setError(new AxiosError("Unexpected error"));
      }
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [url, method]);

  useEffect(() => {
    void refetch();
  }, [refetch]);

  return { data, loading, error, refetch, setData };
}
