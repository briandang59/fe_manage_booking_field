"use client";

import { SWRConfig } from "swr";

import { swrConfig } from "@/utils/api/swr-config";

interface SWRProviderProps {
    children: React.ReactNode;
}

export default function SWRProvider({ children }: SWRProviderProps) {
    return <SWRConfig value={swrConfig}>{children}</SWRConfig>;
}
