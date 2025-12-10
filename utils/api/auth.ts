import { apiClient, ApiResponse } from "./client";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    name?: string;
    role?: string;
}

export interface AuthResponse {
    token: string;
    user?: {
        id: number;
        email: string;
        name?: string;
        role?: string;
    };
}

export const authApi = {
    /**
     * Đăng nhập với email và password
     */
    async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
        const response = await apiClient.post<AuthResponse>("/auth/local/login", credentials);

        // Strapi-style: token nằm trong response.data
        const token = response.data?.token;
        if (token) {
            apiClient.setAuthToken(token);
        }

        return response;
    },

    /**
     * Đăng ký tài khoản mới
     */
    async register(data: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
        const response = await apiClient.post<AuthResponse>("/auth/local/register", data);

        const token = response.data?.token;
        if (token) {
            apiClient.setAuthToken(token);
        }

        return response;
    },

    /**
     * Đăng nhập với Google OAuth
     * Redirect trực tiếp đến backend endpoint
     * Backend sẽ tự động redirect đến Google, sau đó redirect về frontend callback URL với token
     * @param role - Role của user (user/founder) - chỉ cần khi đăng ký
     */
    loginWithGoogle(role?: string): void {
        if (typeof window === "undefined") return;

        // Lưu role vào sessionStorage nếu có (để backend có thể lấy sau)
        if (role) {
            sessionStorage.setItem("oauth_role", role);
        }

        // Truyền role qua query parameter để backend có thể nhận và truyền qua state
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1"}/auth/google/login`;
        const url = role ? `${apiUrl}?role=${encodeURIComponent(role)}` : apiUrl;

        // Backend sẽ tự động redirect về FRONTEND_URL/auth/callback?token=xxx
        // Cấu hình FRONTEND_URL trong backend .env file
        window.location.href = url;
    },

    /**
     * Đăng ký với Google OAuth (luồng đăng ký riêng)
     * Tương tự loginWithGoogle nhưng trỏ tới endpoint register
     * @param role - Role của user (user/founder)
     */
    registerWithGoogle(role?: string): void {
        if (typeof window === "undefined") return;

        if (role) {
            sessionStorage.setItem("oauth_role", role);
        }

        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1"}/auth/google/register`;

        const url = role ? `${apiUrl}?role=${encodeURIComponent(role)}` : apiUrl;

        window.location.href = url;
    },

    /**
     * Đăng xuất
     */
    logout(): void {
        apiClient.clearAuthToken();
        if (typeof window !== "undefined") {
            window.location.href = "/sign-in";
        }
    },

    /**
     * Kiểm tra xem user đã đăng nhập chưa
     */
    isAuthenticated(): boolean {
        return apiClient.isAuthenticated();
    },
};
