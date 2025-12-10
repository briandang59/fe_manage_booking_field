"use client";

import { Suspense, useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { Spin, message } from "antd";

import { apiClient } from "@/utils/api/client";
import { paths } from "@/utils/constants/paths";

function AuthCallbackContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

    useEffect(() => {
        const handleCallback = () => {
            try {
                const token = searchParams.get("token");
                const error = searchParams.get("error");

                if (error) {
                    throw new Error(decodeURIComponent(error));
                }

                if (!token) {
                    throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
                }

                apiClient.setAuthToken(token);

                const savedRole =
                    typeof window !== "undefined" ? sessionStorage.getItem("oauth_role") : null;
                if (savedRole) {
                    sessionStorage.removeItem("oauth_role");
                }

                setStatus("success");
                message.success("Đăng nhập thành công!");

                setTimeout(() => {
                    router.push(paths.home);
                }, 1000);
            } catch (error) {
                console.error("Auth callback error:", error);
                setStatus("error");
                message.error(error instanceof Error ? error.message : "Đăng nhập thất bại");

                setTimeout(() => {
                    router.push(paths.login);
                }, 2000);
            }
        };

        handleCallback();
    }, [searchParams, router]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                {status === "loading" && (
                    <>
                        <Spin size="large" />
                        <p className="mt-4 text-gray-400 text-[16px]">Đang xử lý đăng nhập...</p>
                    </>
                )}
                {status === "success" && (
                    <>
                        <div className="text-green-500 text-2xl mb-4">✓</div>
                        <p className="text-gray-400 text-[16px]">
                            Đăng nhập thành công! Đang chuyển hướng...
                        </p>
                    </>
                )}
                {status === "error" && (
                    <>
                        <div className="text-red-500 text-2xl mb-4">✗</div>
                        <p className="text-gray-400 text-[16px]">
                            Đăng nhập thất bại! Đang chuyển hướng...
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}

export default function AuthCallbackPage() {
    return (
        <Suspense
            fallback={
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <Spin size="large" />
                        <p className="mt-4 text-gray-400">Đang tải...</p>
                    </div>
                </div>
            }
        >
            <AuthCallbackContent />
        </Suspense>
    );
}
