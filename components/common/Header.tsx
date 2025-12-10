"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Avatar, Button, Dropdown, Space, MenuProps } from "antd";
import { LogIn, User, CalendarDays, LogOut, Badge } from "lucide-react";

import { paths } from "@/utils/constants/paths";
import { useAuth } from "@/utils/hooks/useAuth";
import { useApiSWR } from "@/utils/hooks/useSWR";

import ContainerWrapper from "./ContainerWrapper";

interface UserProfile {
    id: number;
    email: string;
    name?: string;
}

export default function Header() {
    const pathname = usePathname();
    const { logout, isAuthenticated } = useAuth();
    const [userName, setUserName] = useState("");

    const authenticated = isAuthenticated();

    const { data: userProfile } = useApiSWR<UserProfile>(authenticated ? "/profile" : null);

    useEffect(() => {
        if (authenticated && userProfile) {
            setUserName(userProfile.name || userProfile.email || "User");
        } else if (authenticated) {
            try {
                const token =
                    typeof window !== "undefined"
                        ? localStorage.getItem("token") ||
                          document.cookie
                              .split(";")
                              .find((c) => c.trim().startsWith("token="))
                              ?.split("=")[1]
                        : null;
                if (token) {
                    const payload = JSON.parse(atob(token.split(".")[1]));
                    setUserName(payload.email || "User");
                }
            } catch (e) {
                setUserName("User");
            }
        } else {
            setUserName("");
        }
    }, [authenticated, userProfile]);

    // Listen for token updates
    useEffect(() => {
        const handleTokenUpdate = () => {
            // Force re-render by checking auth again
            window.location.reload();
        };

        window.addEventListener("token-updated", handleTokenUpdate);
        window.addEventListener("storage", handleTokenUpdate);

        return () => {
            window.removeEventListener("token-updated", handleTokenUpdate);
            window.removeEventListener("storage", handleTokenUpdate);
        };
    }, []);

    const pages = [
        { label: "Trang chủ", path: paths.home },
        { label: "Sân bóng", path: paths.fields },
        { label: "Tìm trận", path: paths.find_match },
        { label: "Tin tức", path: paths.news },
    ];

    const handleLogout = () => {
        logout();
        setUserName("");
    };

    const dropdownItems: MenuProps["items"] = [
        {
            key: "profile",
            label: <Link href="/profile">Hồ sơ cá nhân</Link>,
            icon: <User className="w-4 h-4" />,
        },
        {
            key: "bookings",
            label: <Link href="/my-bookings">Đơn đặt sân</Link>,
            icon: <CalendarDays className="w-4 h-4" />,
        },
        { type: "divider" },
        {
            key: "logout",
            label: "Đăng xuất",
            icon: <LogOut className="w-4 h-4" />,
            danger: true,
            onClick: handleLogout,
        },
    ];

    return (
        <header className="border-b border-gray-500 bg-surface">
            <ContainerWrapper className="py-4 flex items-center justify-between">
                <Link
                    href={paths.home}
                    className="text-xl font-bold text-primary flex items-center gap-3 text-primary-800"
                >
                    <Badge className="w-8 h-8" />
                    <span> Bet88</span>
                </Link>

                <nav>
                    <ul className="flex items-center gap-8">
                        {pages.map((page) => {
                            const isActive = pathname === page.path;

                            return (
                                <li key={page.label}>
                                    <Link
                                        href={page.path}
                                        className={`
                          flex items-center gap-2 py-2 text-[16px] font-medium transition-colors
                          ${isActive ? "text-[#39FF14]" : "text-gray-500 hover:text-[#39FF14]"}
                        `}
                                    >
                                        {page.label}
                                    </Link>
                                </li>
                            );
                        })}

                        <li>
                            {authenticated && userName ? (
                                <Dropdown menu={{ items: dropdownItems }} trigger={["click"]}>
                                    <Space className="cursor-pointer hover:opacity-80 transition">
                                        <Avatar size="default" className="bg-primary">
                                            {userName.charAt(0).toUpperCase()}
                                        </Avatar>
                                    </Space>
                                </Dropdown>
                            ) : (
                                <Button
                                    type="primary"
                                    icon={<LogIn className="w-5 h-5" />}
                                    onClick={() => (window.location.href = paths.login)}
                                >
                                    Đăng nhập
                                </Button>
                            )}
                        </li>
                    </ul>
                </nav>
            </ContainerWrapper>
        </header>
    );
}
