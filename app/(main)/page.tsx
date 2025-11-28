"use client";

import { Button, Typography, Row, Col, Card, Badge, Timeline } from "antd";
import { MapPin, Calendar as CalendarIcon, Trophy, ArrowRight, CheckCircle2 } from "lucide-react";

import ContainerWrapper from "@/components/common/ContainerWrapper";
import UserField from "@/components/common/UserField";
import { featuredFieldsMock, tournamentsMock, howItWorksSteps } from "@/utils/mock-datas/home-data";

const { Title, Paragraph } = Typography;

export default function Home() {
    return (
        <main className="bg-[#121212] min-h-screen pb-20">
            <section className="relative h-[600px] flex items-center justify-center">
                <div
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=2070&auto=format&fit=crop')",
                    }}
                >
                    <div className="absolute inset-0 bg-black/60"></div>
                </div>

                <div className="relative z-10 text-center px-4 flex flex-col items-center">
                    <Title className="text-4xl md:text-6xl font-black text-white uppercase mb-4 tracking-wider leading-tight">
                        Trận đấu tiếp theo <br /> đang chờ bạn.
                    </Title>
                    <Paragraph className="text-gray-300 text-lg md:text-xl max-w-2xl mb-12">
                        Tìm và đặt sân bóng địa phương tốt nhất ngay lập tức. Trận đấu tiếp theo của
                        bạn chỉ cách một cú nhấp chuột.
                    </Paragraph>
                </div>
            </section>

            <div className="h-32 md:h-40"></div>

            <ContainerWrapper className="flex flex-col gap-20">
                <section>
                    <SectionHeader title="Sân nổi bật gần bạn" link="#" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredFieldsMock.map((field) => (
                            <UserField key={field.id} {...field} />
                        ))}
                    </div>
                </section>

                <section>
                    <SectionHeader title="Tìm sân trên bản đồ" />
                    <div className="rounded-3xl overflow-hidden border border-[#343434] h-[400px] relative group">
                        <img
                            src="https://i.imgur.com/8Z0qQ6V.png"
                            alt="Map placeholder"
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-500 scale-105 group-hover:scale-100"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20">
                            <Title level={3} className="text-white mb-4 drop-shadow-lg">
                                Khám phá các sân bóng quanh khu vực HCMC
                            </Title>
                            <Button
                                size="large"
                                className="bg-[#39FF14] text-black font-bold border-none hover:bg-[#32D583] flex items-center gap-2 shadow-xl backdrop-blur-sm"
                            >
                                <MapPin size={20} /> Mở bản đồ tương tác
                            </Button>
                        </div>
                    </div>
                </section>

                <section>
                    <SectionHeader title="Giải đấu sắp diễn ra" link="#" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {tournamentsMock.map((tour) => (
                            <Card
                                key={tour.id}
                                bordered={false}
                                className="bg-[#1E1E1E] border border-[#343434] hover:border-[#39FF14] transition-all duration-300 overflow-hidden"
                                styles={{ body: { padding: 0 } }}
                            >
                                <div className="p-6 flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-4">
                                        <Title
                                            level={4}
                                            className="text-white m-0 line-clamp-2 flex-1"
                                        >
                                            {tour.title}
                                        </Title>
                                        <Badge
                                            count={tour.type}
                                            style={{
                                                backgroundColor: "#2C2C2E",
                                                color: "#39FF14",
                                                border: "1px solid #343434",
                                                fontWeight: "bold",
                                            }}
                                        />
                                    </div>

                                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                                        <CalendarIcon size={16} className="text-[#39FF14]" />
                                        {tour.date}
                                    </div>

                                    <div className="space-y-2 mb-6 flex-1">
                                        {tour.details.map((detail, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-center gap-2 text-gray-300 text-sm"
                                            >
                                                {idx === 0 ? (
                                                    <Trophy size={16} className="text-yellow-500" />
                                                ) : (
                                                    <CheckCircle2
                                                        size={16}
                                                        className="text-gray-500"
                                                    />
                                                )}
                                                {detail}
                                            </div>
                                        ))}
                                    </div>

                                    <Button
                                        block
                                        size="large"
                                        style={{
                                            backgroundColor:
                                                tour.statusColor === "#39FF14"
                                                    ? "#39FF14"
                                                    : "transparent",
                                            color:
                                                tour.statusColor === "#39FF14"
                                                    ? "black"
                                                    : tour.statusColor,
                                            borderColor: tour.statusColor,
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {tour.status}
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </section>

                <section className="mb-20">
                    <SectionHeader title="Cách thức hoạt động" />
                    <Row gutter={[48, 48]} align="middle">
                        <Col xs={24} md={12}>
                            <Timeline
                                className="mt-8"
                                items={howItWorksSteps.map((step, index) => ({
                                    dot: (
                                        <div className="border border-[#39FF14] p-3 rounded-full flex items-center justify-center">
                                            <step.icon size={24} className="text-[#39FF14]" />
                                        </div>
                                    ),
                                    children: (
                                        <div className="ml-4 mb-16">
                                            <Title level={4} className="text-white mb-2">
                                                {index + 1}. {step.title}
                                            </Title>
                                            <Paragraph className="text-gray-400 text-base">
                                                {step.description}
                                            </Paragraph>
                                        </div>
                                    ),
                                }))}
                            />
                        </Col>

                        <Col xs={24} md={12}>
                            <div className="relative h-[500px] w-full">
                                <div className="absolute top-20 left-0 w-3/5 h-3/5 rounded-3xl overflow-hidden border-2 border-[#343434] z-0 transform -rotate-6 shadow-2xl">
                                    <img
                                        src="https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=600&q=80"
                                        alt="Play"
                                        className="w-full h-full object-cover opacity-70"
                                    />
                                </div>
                                <div className="absolute top-0 right-0 w-3/5 h-3/5 rounded-3xl overflow-hidden border-2 border-[#39FF14]/50 z-10 shadow-xl">
                                    <img
                                        src="https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&q=80"
                                        alt="Book"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="absolute bottom-0 left-1/4 w-3/5 h-3/5 rounded-3xl overflow-hidden border-2 border-[#39FF14] z-20 transform rotate-3 shadow-[0_20px_50px_rgba(57,255,20,0.3)]">
                                    <img
                                        src="https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=600&q=80"
                                        alt="Score"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur p-3 rounded-xl border border-[#39FF14]/30 flex items-center gap-3">
                                        <CheckCircle2 size={20} className="text-[#39FF14]" />
                                        <span className="text-white font-medium">
                                            Đặt sân thành công!
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </section>
            </ContainerWrapper>
        </main>
    );
}

const SectionHeader = ({ title, link }: { title: string; link?: string }) => (
    <div className="flex justify-between items-end mb-8">
        <Title level={2} className="text-white m-0 uppercase font-bold tracking-wide">
            {title}
        </Title>
        {link && (
            <a
                href={link}
                className="text-[#39FF14] hover:text-[#32D583] flex items-center gap-1 font-medium transition-colors"
            >
                Xem tất cả <ArrowRight size={16} />
            </a>
        )}
    </div>
);
