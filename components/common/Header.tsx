"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Avatar, Button, Dropdown, Space, MenuProps } from "antd";
import { LogIn, User, CalendarDays, LogOut, Badge } from "lucide-react";

import { paths } from "@/utils/constants/paths";

export default function Header() {
    const pathname = usePathname();

    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [userName, setUserName] = useState("Nguyễn Văn A");

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) setIsLoggedIn(true);
    }, []);

    const pages = [
        { label: "Trang chủ", path: paths.home },
        { label: "Sân bóng", path: paths.fields },
        { label: "Tìm trận", path: paths.find_match },
        { label: "Tin tức", path: paths.news },
    ];

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        setIsLoggedIn(false);
        window.location.href = paths.home;
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
        <header className="border-b border-border bg-surface">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
                <Link
                    href={paths.home}
                    className="text-2xl font-bold text-primary flex items-center gap-3 text-primary-800"
                >
                    <Badge className="w-8 h-8" />
                    <span> Bet88</span>
                </Link>

                <nav>
                    <ul className="flex items-center gap-12">
                        {pages.map((page) => {
                            const isActive = pathname === page.path;

                            return (
                                <li key={page.label}>
                                    <Link
                                        href={page.path}
                                        className={`
                      flex items-center gap-2 py-2 text-lg font-medium transition-colors
                      ${isActive ? "text-primary" : "text-text-muted hover:text-text"}
                    `}
                                    >
                                        {page.label}
                                    </Link>
                                </li>
                            );
                        })}

                        <li>
                            {isLoggedIn ? (
                                <Dropdown menu={{ items: dropdownItems }} trigger={["click"]}>
                                    <Space className="cursor-pointer hover:opacity-80 transition">
                                        <Avatar size="large" className="bg-primary">
                                            {userName.charAt(0).toUpperCase()}
                                        </Avatar>
                                    </Space>
                                </Dropdown>
                            ) : (
                                <Button
                                    type="primary"
                                    size="large"
                                    icon={<LogIn className="w-5 h-5" />}
                                    onClick={() => (window.location.href = paths.login)}
                                >
                                    Đăng nhập
                                </Button>
                            )}
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
