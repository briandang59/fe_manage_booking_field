"use client";

import { Input, Button, Divider, Space } from "antd";
import { Facebook, Twitter, Instagram, Youtube, Send, MapPin, Phone, Mail } from "lucide-react";

import ContainerWrapper from "@/components/common/ContainerWrapper";

export default function Footer() {
    return (
        <footer className="bg-[#121212] border-t border-[#343434] pt-16 pb-8">
            <ContainerWrapper>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-black text-white uppercase tracking-wider">
                            Sport<span className="text-[#39FF14]">Booking</span>
                        </h2>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Nền tảng đặt sân bóng trực tuyến hàng đầu. Kết nối đam mê, kiến tạo trận
                            đấu đỉnh cao chỉ với vài cú click chuột.
                        </p>
                        <div className="space-y-2 pt-2">
                            <div className="flex items-center gap-3 text-gray-400 text-sm">
                                <MapPin size={16} className="text-[#39FF14] shrink-0" />
                                <span>30 Phan Thúc Duyện, Tân Bình, TP.HCM</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-400 text-sm">
                                <Phone size={16} className="text-[#39FF14] shrink-0" />
                                <span>1900 123 456</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-400 text-sm">
                                <Mail size={16} className="text-[#39FF14] shrink-0" />
                                <span>support@sportbooking.vn</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-[#ececec] font-bold text-lg mb-6">Khám phá</h3>
                        <ul className="space-y-3">
                            {[
                                "Về chúng tôi",
                                "Danh sách sân",
                                "Giải đấu",
                                "Tin tức",
                                "Tuyển dụng",
                            ].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-[#39FF14] text-sm transition-colors duration-300"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-[#ececec] font-bold text-lg mb-6">Hỗ trợ</h3>
                        <ul className="space-y-3">
                            {[
                                "Trung tâm trợ giúp",
                                "Điều khoản sử dụng",
                                "Chính sách bảo mật",
                                "Hướng dẫn đặt sân",
                                "Khiếu nại",
                            ].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-[#39FF14] text-sm transition-colors duration-300"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-[#ececec] font-bold text-lg mb-6">Đăng ký nhận tin</h3>
                        <p className="text-gray-400 text-sm mb-4">
                            Nhận thông báo về các giải đấu và ưu đãi mới nhất.
                        </p>
                        <div className="flex gap-2">
                            <Input
                                placeholder="Email của bạn"
                                className="bg-[#1E1E1E] border-[#343434] text-white hover:border-[#39FF14] focus:border-[#39FF14]"
                            />
                            <Button
                                type="primary"
                                icon={<Send size={16} />}
                                className="bg-[#39FF14] text-black border-none hover:bg-[#32D583]"
                            />
                        </div>
                    </div>
                </div>

                <Divider className="border-[#343434]" />

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4">
                    <p className="text-gray-500 text-sm">
                        © 2024 SportBooking. All rights reserved.
                    </p>
                    <Space size="large">
                        {[Facebook, Twitter, Instagram, Youtube].map((Icon, idx) => (
                            <a
                                key={idx}
                                href="#"
                                className="text-gray-400 hover:text-[#39FF14] transition-colors duration-300"
                            >
                                <Icon size={20} />
                            </a>
                        ))}
                    </Space>
                </div>
            </ContainerWrapper>
        </footer>
    );
}
