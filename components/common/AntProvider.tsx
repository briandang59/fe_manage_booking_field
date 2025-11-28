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

                    colorBorder: "#343434",
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
                        colorBorder: "#343434",
                        colorPrimaryHover: "#32D583",
                        colorBgContainer: "#2C2C2E",
                        colorText: "#ececec",
                    },

                    InputNumber: {
                        borderRadius: 8,
                        colorBorder: "#343434",
                        colorPrimaryHover: "#32D583",
                        colorBgContainer: "#2C2C2E",
                        colorText: "#ececec",
                        handleVisible: true,
                        handleBorderColor: "#343434",
                        handleBg: "#2C2C2E",
                    },

                    Form: {
                        labelColor: "#ececec",
                    },

                    Popover: {
                        colorBgElevated: "#2C2C2E",
                    },

                    Dropdown: {
                        colorBgElevated: "#2C2C2E",
                        colorText: "#ececec",
                        borderRadiusLG: 16,
                    },

                    Select: {
                        borderRadius: 12,
                        colorBorder: "#343434",
                        colorBgContainer: "#2C2C2E",
                        colorText: "#ececec",
                        colorBgElevated: "#2C2C2E",
                        optionSelectedBg: "rgba(50, 213, 131, 0.1)",
                        optionActiveBg: "rgba(255, 255, 255, 0.08)",
                    },

                    Slider: {
                        railBg: "rgba(255, 255, 255, 0.15)",
                        railHoverBg: "rgba(255, 255, 255, 0.25)",
                        trackBg: "#39FF14",
                        trackHoverBg: "#32D583",
                        handleColor: "#39FF14",
                        handleActiveColor: "#39FF14",
                    },

                    Rate: {
                        starBg: "rgba(255, 255, 255, 0.15)",
                        starColor: "#fadb14",
                    },

                    Card: {
                        borderRadiusLG: 16,
                        colorBgContainer: "#1E1E1E",
                    },

                    Modal: {
                        borderRadiusLG: 20,
                        contentBg: "#2C2C2E",
                        headerBg: "#2C2C2E",
                    },

                    Menu: {
                        borderRadius: 16,
                        itemHoverBg: "rgba(50, 213, 131, 0.1)",
                        itemSelectedBg: "#E6FFF2",
                        itemSelectedColor: "#32D583",
                        popupBg: "#2C2C2E",
                    },

                    Avatar: {
                        containerSizeLG: 48,
                    },

                    Table: {
                        borderRadius: 16,
                        colorBorder: "#343434",
                        colorBgContainer: "#2C2C2E",
                        headerBg: "#1f1f1f",
                        headerColor: "#ececec",
                        rowHoverBg: "rgba(255, 255, 255, 0.04)",
                        colorText: "#ececec",
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
