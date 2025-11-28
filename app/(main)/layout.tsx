// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import AntdProvider from "@/components/common/AntProvider";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";

import "../globals.css";

// Geist font từ Vercel – đẹp miễn bàn
const geistSans = Geist({
    variable: "--font-geist-sans",
    // sẽ được dùng trong @theme
    subsets: ["latin"],
    display: "swap",
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Field Booking Pro",
    description: "Quản lý đặt sân thể thao chuyên nghiệp",
    keywords: "đặt sân, bóng đá, cầu lông, tennis, quản lý sân",
    authors: [{ name: "Your Name" }],
    openGraph: {
        title: "Field Booking Pro",
        description: "Hệ thống đặt sân thể thao nhanh chóng & hiện đại",
        type: "website",
        locale: "vi_VN",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="vi" className="dark" suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://fonts.bunny.net" />
            </head>
            <body
                className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          antialiased 
         bg-[#121212]    
         text-[#EAEAEA]      
          min-h-screen 
          flex flex-col
        `}
            >
                <AntdProvider>
                    <Header />
                    <main className="flex-1">{children}</main>
                    <Footer />
                </AntdProvider>
            </body>
        </html>
    );
}
