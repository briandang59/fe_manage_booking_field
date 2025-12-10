// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";

import { Image } from "antd";
import { X } from "lucide-react";

import { images } from "@/assets/images";
import AntdProvider from "@/components/common/AntProvider";
import SWRProvider from "@/components/common/SWRProvider";

import "../globals.scss";

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
                    <SWRProvider>
                        <div className="grid grid-cols-2 gap-2 min-h-screen">
                            <Image
                                src={images.authImage.src}
                                alt="auth-image"
                                preview={false}
                                height={"100%"}
                                width={"100%"}
                                className="object-cover"
                            />
                            <main className="flex flex-col gap-16">
                                <div className="flex justify-end">
                                    <Link
                                        href={`/`}
                                        className="rounded-full min-size-[50px] flex items-center justify-center p-8"
                                    >
                                        <X />
                                    </Link>
                                </div>
                                <div className="p-8 flex items-center justify-center flex-1">
                                    {children}
                                </div>
                            </main>
                        </div>
                    </SWRProvider>
                </AntdProvider>
            </body>
        </html>
    );
}
