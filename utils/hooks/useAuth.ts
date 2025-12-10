"use client";

import { useCallback } from "react";

import { authApi, LoginRequest, RegisterRequest } from "@/utils/api/auth";

export const useAuth = () => {
    const login = useCallback(async (credentials: LoginRequest) => {
        const response = await authApi.login(credentials);
        return response;
    }, []);

    const register = useCallback(async (data: RegisterRequest) => {
        const response = await authApi.register(data);
        return response;
    }, []);

    const loginWithGoogle = useCallback((role?: string) => {
        authApi.loginWithGoogle(role);
    }, []);

    const logout = useCallback(() => {
        authApi.logout();
    }, []);

    const isAuthenticated = useCallback(() => {
        return authApi.isAuthenticated();
    }, []);

    return {
        login,
        register,
        loginWithGoogle,
        logout,
        isAuthenticated,
    };
};
