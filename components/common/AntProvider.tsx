"use client";

import React from "react";

import { ConfigProvider, theme } from "antd";

interface IAntdProviderProps {
    children: React.ReactNode;
}

export default function AntdProvider({ children }: IAntdProviderProps) {
    return (
        <ConfigProvider
            theme={{
                // 1. Kích hoạt thuật toán Dark Mode mặc định
                algorithm: theme.darkAlgorithm,

                // 2. Token toàn cục
                token: {
                    colorPrimary: "#39FF14",
                    colorInfo: "#32D583",
                    colorSuccess: "#52c41a",
                    colorWarning: "#faad14",
                    colorError: "#ff4d4f",

                    colorBgBase: "#121212",
                    colorBgContainer: "#2C2C2E",
                    colorBgElevated: "#2C2C2E",
                    colorText: "#ececec",
                    colorTextSecondary: "rgba(236, 236, 236, 0.65)",
                    colorTextPlaceholder: "rgba(236, 236, 236, 0.45)",

                    colorBorder: "#343434",
                    colorBorderSecondary: "#424242",
                    borderRadius: 8,

                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    fontSize: 15,
                },

                // 3. Cấu hình chi tiết
                components: {
                    Button: {
                        colorPrimary: "#39FF14",
                        colorPrimaryHover: "#32D583",
                        colorPrimaryActive: "#2eb06d",
                        colorTextLightSolid: "#121212",
                        primaryShadow: "0 2px 0 rgba(0, 0, 0, 0.04)",
                        borderRadius: 12,
                        fontWeight: 600,
                        controlHeight: 40,
                    },

                    Input: {
                        colorBgContainer: "#2C2C2E",
                        colorBorder: "#343434",
                        activeBorderColor: "#39FF14",
                        hoverBorderColor: "#39FF14",
                        borderRadius: 8,
                        controlHeight: 40,
                    },
                    InputNumber: {
                        colorBgContainer: "#2C2C2E",
                        colorBorder: "#343434",
                        activeBorderColor: "#39FF14",
                        hoverBorderColor: "#39FF14",
                        borderRadius: 8,
                        controlHeight: 40,
                        handleVisible: true,
                    },
                    Select: {
                        colorBgContainer: "#2C2C2E",
                        colorBorder: "#343434",
                        colorPrimaryHover: "#39FF14",
                        borderRadius: 12,
                        controlHeight: 40,
                        optionSelectedBg: "rgba(57, 255, 20, 0.1)",
                    },

                    // --- ĐÃ SỬA: DatePicker áp dụng cho cả TimePicker ---
                    DatePicker: {
                        colorBgContainer: "#2C2C2E",
                        colorBorder: "#343434",
                        activeBorderColor: "#39FF14",
                        hoverBorderColor: "#39FF14",
                        borderRadius: 8,
                        controlHeight: 40,
                        colorBgElevated: "#1E1E1E", // Màu nền popup lịch/giờ
                        cellHoverBg: "rgba(57, 255, 20, 0.1)",
                        cellActiveWithRangeBg: "rgba(57, 255, 20, 0.15)",
                        cellRangeBorderColor: "rgba(57, 255, 20, 0.5)",
                    },

                    Checkbox: {
                        colorPrimary: "#39FF14",
                        colorPrimaryHover: "#32D583",
                        colorBgContainer: "transparent",
                        colorBorder: "#666",
                    },
                    Radio: {
                        colorPrimary: "#39FF14",
                        buttonSolidCheckedColor: "#121212",
                    },
                    Switch: {
                        colorPrimary: "#39FF14",
                        colorPrimaryHover: "#32D583",
                    },
                    Slider: {
                        railBg: "rgba(255, 255, 255, 0.15)",
                        railHoverBg: "rgba(255, 255, 255, 0.25)",
                        trackBg: "#39FF14",
                        trackHoverBg: "#32D583",
                        handleColor: "#39FF14",
                        handleActiveColor: "#39FF14",
                    },
                    Form: {
                        labelColor: "#ececec",
                        itemMarginBottom: 24,
                    },
                    Table: {
                        colorBgContainer: "#2C2C2E",
                        headerBg: "#1F1F1F",
                        headerColor: "#ececec",
                        headerBorderRadius: 16,
                        borderColor: "#343434",
                        rowHoverBg: "rgba(255, 255, 255, 0.04)",
                        borderRadius: 16,
                    },
                    Card: {
                        colorBgContainer: "#1E1E1E",
                        colorBorderSecondary: "#343434",
                        borderRadiusLG: 16,
                    },
                    List: {
                        colorBgContainer: "#1E1E1E",
                    },
                    Tag: {
                        borderRadius: 4,
                    },
                    Avatar: {
                        containerSizeLG: 48,
                    },
                    Image: {
                        colorBgContainer: "#2C2C2E",
                    },
                    Menu: {
                        colorBgContainer: "#2C2C2E",
                        popupBg: "#2C2C2E",
                        itemHoverBg: "rgba(57, 255, 20, 0.1)",
                        itemSelectedBg: "rgba(57, 255, 20, 0.15)",
                        itemSelectedColor: "#39FF14",
                        borderRadius: 12,
                    },
                    Tabs: {
                        itemColor: "#999",
                        itemSelectedColor: "#39FF14",
                        itemHoverColor: "#39FF14",
                        inkBarColor: "#39FF14",
                    },
                    Breadcrumb: {
                        itemColor: "rgba(236, 236, 236, 0.5)",
                        linkColor: "rgba(236, 236, 236, 0.5)",
                        lastItemColor: "#ececec",
                        separatorColor: "rgba(236, 236, 236, 0.3)",
                        linkHoverColor: "#39FF14",
                    },
                    Pagination: {
                        itemActiveBg: "#39FF14",
                        colorPrimary: "#121212",
                        itemBg: "#2C2C2E",
                    },
                    Modal: {
                        contentBg: "#2C2C2E",
                        headerBg: "#2C2C2E",
                        borderRadiusLG: 20,
                    },
                    Drawer: {
                        colorBgElevated: "#1E1E1E",
                    },
                    Popover: {
                        colorBgElevated: "#2C2C2E",
                    },
                    Dropdown: {
                        colorBgElevated: "#2C2C2E",
                        controlItemBgHover: "rgba(57, 255, 20, 0.1)",
                    },
                    Message: {
                        contentBg: "#2C2C2E",
                        contentPadding: "12px 20px",
                    },
                    Notification: {
                        colorBgElevated: "#2C2C2E",
                    },
                    Rate: {
                        starBg: "rgba(255, 255, 255, 0.15)",
                        starColor: "#fadb14",
                    },
                    Skeleton: {
                        colorFill: "#2C2C2E",
                        colorFillContent: "#343434",
                    },
                    Segmented: {
                        itemSelectedBg: "#343434",
                        itemSelectedColor: "#39FF14",
                        trackBg: "#121212",
                    },
                },
            }}
        >
            {children}
        </ConfigProvider>
    );
}
