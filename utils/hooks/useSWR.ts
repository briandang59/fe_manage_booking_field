"use client";

import useSWR from "swr";

import { swrFetcher } from "@/utils/api/swr-config";

/**
 * Custom hook để sử dụng SWR với API client
 *
 * @example
 * ```tsx
 * const { data, error, isLoading, mutate } = useApiSWR('/users/profile');
 * ```
 */
export function useApiSWR<T = any>(url: string | null, options?: any) {
    return useSWR<T>(url, swrFetcher, options);
}
