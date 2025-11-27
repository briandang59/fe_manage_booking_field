"use client";

import React from "react";

import { ConfigProvider } from "antd";

interface IAntdProviderProps {
    children: React.ReactNode;
}

export default function AntdProvider({ children }: IAntdProviderProps) {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#39FF14",
                    colorInfo: "#32D583",
                    colorSuccess: "#52c41a",
                    colorWarning: "#faad14",
                    colorError: "#ff4d4f",

                    borderRadius: 8,
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    fontSize: 15,
                    colorTextPlaceholder: "rgba(236, 236, 236, 0.6)",
                },

                components: {
                    Button: {
                        colorPrimary: "#39FF14",
                        colorPrimaryHover: "#39FF14",
                        colorPrimaryActive: "#39FF14",

                        colorTextLightSolid: "#121212",

                        boxShadow: "none",
                        controlOutline: "none",
                        defaultShadow: "none",

                        borderRadius: 12,
                        fontWeight: 500,
                        fontSize: 14,
                    },

                    Input: {
                        borderRadius: 8,
                        colorBorder: "#d1f5e1",
                        colorPrimaryHover: "#32D583",
                        colorBgContainer: "#2C2C2E",
                        colorText: "#ececec",
                    },

                    Form: {
                        labelColor: "#ececec",
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

                    Tabs: {
                        itemColor: "#EAEAEA",
                    },
                },
            }}
        >
            {children}
        </ConfigProvider>
    );
}
