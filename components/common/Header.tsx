"use client";

import { useState, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Avatar, Button, Dropdown, Space, MenuProps, message } from "antd";
import { LogIn, User, CalendarDays, LogOut, Badge } from "lucide-react";

import { UserProfile } from "@/types/response/user";
import { apiClient } from "@/utils/api/client";
import { paths } from "@/utils/constants/paths";
import { useAuth } from "@/utils/hooks/useAuth";

import ContainerWrapper from "./ContainerWrapper";

export default function Header() {
    const pathname = usePathname();
    const { logout, isAuthenticated } = useAuth();
    const [profile, setProfile] = useState<UserProfile | null>(null);

    const authenticated = isAuthenticated();

    useEffect(() => {
        const fetchProfile = async () => {
            if (authenticated) {
                const response = await apiClient.get<UserProfile>("/profile");
                if (response.error) {
                    message.error(response.error);
                } else if (response.data) {
                    setProfile(response.data);
                }
            }
        };
        fetchProfile();
    }, [authenticated]);

    useEffect(() => {
        const handleTokenUpdate = () => {
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
        setProfile(null);
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
                            {authenticated && profile ? (
                                <Dropdown menu={{ items: dropdownItems }} trigger={["click"]}>
                                    <Space className="cursor-pointer hover:opacity-80 transition">
                                        {profile?.avatar ? (
                                            <Image
                                                src={profile.avatar}
                                                alt="avatar"
                                                width={32}
                                                height={32}
                                                className="object-cover rounded-full"
                                            />
                                        ) : (
                                            <Avatar size="default">
                                                {profile?.email?.charAt(0).toUpperCase()}
                                            </Avatar>
                                        )}
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
