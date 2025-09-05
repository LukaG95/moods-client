import { useEffect, useState, useCallback } from "react";
import type { AxiosRequestConfig, AxiosError } from "axios";
import { api } from "@/lib/api";

type RequiredConfig = AxiosRequestConfig & { 
  url: string; 
  method: string
};

export function useFetch<T = unknown>({url, method}: RequiredConfig) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.request<T>({url, method});
      setData((res.data as T) ?? null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [url, method]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, loading, error, refetch, setData };
}