const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

export interface ApiError {
    error: string;
    message?: string;
}

export interface ApiResponse<T = any> {
    data?: T;
    meta?: any;
    error?: string;
    message?: string;
}

class ApiClient {
    private baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    private getToken(): string | null {
        if (typeof window === "undefined") return null;
        // Ưu tiên lấy từ localStorage, nếu không có thì lấy từ cookies
        const localToken = localStorage.getItem("token");
        if (localToken) return localToken;

        // Lấy từ cookies
        const cookies = document.cookie.split(";");
        for (const cookie of cookies) {
            const [name, value] = cookie.trim().split("=");
            if (name === "token") {
                return decodeURIComponent(value);
            }
        }
        return null;
    }

    private setToken(token: string): void {
        if (typeof window === "undefined") return;
        // Lưu vào localStorage
        localStorage.setItem("token", token);

        // Lưu vào cookies (expires sau 7 ngày)
        const expires = new Date();
        expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 ngày
        document.cookie = `token=${encodeURIComponent(token)}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
    }

    private removeToken(): void {
        if (typeof window === "undefined") return;
        // Xóa từ localStorage
        localStorage.removeItem("token");

        // Xóa từ cookies
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
        const token = this.getToken();
        const url = `${this.baseURL}${endpoint}`;

        const headers: HeadersInit = {
            "Content-Type": "application/json",
            ...options.headers,
        };

        if (token) {
            (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
        }

        try {
            const response = await fetch(url, {
                ...options,
                headers,
            });

            const raw = await response.json().catch(() => ({}));

            if (!response.ok) {
                // Handle 401 Unauthorized - token expired or invalid
                if (response.status === 401) {
                    this.removeToken();
                    if (typeof window !== "undefined") {
                        window.location.href = "/sign-in";
                    }
                }

                const errorMessage =
                    raw?.error?.message ||
                    raw?.error?.name ||
                    raw?.message ||
                    raw?.error ||
                    `HTTP ${response.status}: ${response.statusText}`;

                return {
                    error: errorMessage,
                    message: errorMessage,
                    data: raw?.data,
                    meta: raw?.meta,
                };
            }

            // Strapi-style success: { data, meta }
            const payload = raw?.data !== undefined ? raw.data : raw;

            return {
                data: payload as T,
                meta: raw?.meta,
            };
        } catch (error) {
            return {
                error: error instanceof Error ? error.message : "Network error occurred",
            };
        }
    }

    async get<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, { ...options, method: "GET" });
    }

    async post<T>(endpoint: string, body?: any, options?: RequestInit): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            ...options,
            method: "POST",
            body: body ? JSON.stringify(body) : undefined,
        });
    }

    async put<T>(endpoint: string, body?: any, options?: RequestInit): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            ...options,
            method: "PUT",
            body: body ? JSON.stringify(body) : undefined,
        });
    }

    async delete<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, { ...options, method: "DELETE" });
    }

    async patch<T>(endpoint: string, body?: any, options?: RequestInit): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            ...options,
            method: "PATCH",
            body: body ? JSON.stringify(body) : undefined,
        });
    }

    // Auth helpers
    setAuthToken(token: string): void {
        this.setToken(token);
        // Dispatch custom event để Header có thể update
        if (typeof window !== "undefined") {
            window.dispatchEvent(new Event("token-updated"));
        }
    }

    clearAuthToken(): void {
        this.removeToken();
        // Dispatch custom event để Header có thể update
        if (typeof window !== "undefined") {
            window.dispatchEvent(new Event("token-updated"));
        }
    }

    isAuthenticated(): boolean {
        const token = this.getToken();
        if (!token) return false;

        try {
            // Decode JWT to check expiration
            const payload = JSON.parse(atob(token.split(".")[1]));
            const exp = payload.exp * 1000; // Convert to milliseconds
            return Date.now() < exp;
        } catch (e) {
            return false;
        }
    }
}

export const apiClient = new ApiClient(API_BASE_URL);
