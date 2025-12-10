import { SWRConfiguration } from "swr";

import { apiClient } from "./client";

/**
 * SWR Fetcher function sử dụng API client
 */
export const swrFetcher = async <T = any>(url: string): Promise<T> => {
    const response = await apiClient.get<T>(url);

    if (response.error) {
        throw new Error(response.error);
    }

    if (!response.data) {
        throw new Error("No data returned");
    }

    return response.data;
};

/**
 * SWR Configuration mặc định
 */
export const swrConfig: SWRConfiguration = {
    fetcher: swrFetcher,
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    shouldRetryOnError: true,
    errorRetryCount: 3,
    errorRetryInterval: 5000,
    onError: (error) => {
        console.error("SWR Error:", error);
    },
};
