"use client";

import { ReactNode } from "react";

import { ConfigProvider } from "antd";

export default function AntdProvider({ children }: { children: ReactNode }) {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#338000",
                    colorInfo: "#32D583",
                    colorSuccess: "#52c41a",
                    colorWarning: "#faad14",
                    colorError: "#ff4d4f",

                    borderRadius: 12,
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    fontSize: 15,
                },

                components: {
                    Button: {
                        colorPrimaryActive: "#2DCB77",
                        borderRadius: 12,
                        fontWeight: 400,
                    },
                    Input: {
                        borderRadius: 12,
                        colorBorder: "#d1f5e1",
                        colorPrimaryHover: "#32D583",
                    },
                    Select: {
                        borderRadius: 12,
                    },
                    Card: {
                        borderRadiusLG: 16,
                    },
                    Modal: {
                        borderRadiusLG: 20,
                    },
                    Dropdown: {
                        borderRadiusLG: 16,
                    },
                    Menu: {
                        borderRadius: 16,
                        itemHoverBg: "rgba(50, 213, 131, 0.1)",
                        itemSelectedBg: "#E6FFF2",
                        itemSelectedColor: "#32D583",
                    },
                    Avatar: {
                        containerSizeLG: 48,
                    },
                    Table: {
                        borderRadius: 16,
                    },
                },
            }}
        >
            {children}
        </ConfigProvider>
    );
}
