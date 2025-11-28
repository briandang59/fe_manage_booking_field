"use client";

import { useState } from "react";

import { Breadcrumb, Button, Card, Rate, DatePicker, Progress, TimePicker } from "antd";
import dayjs from "dayjs";
import { MapPin, Car, Coffee, LandPlot, Lightbulb, ShowerHead, Users } from "lucide-react";

import CardWrapper from "@/components/common/CardWrapper";
import ContainerWrapper from "@/components/common/ContainerWrapper";
import FieldDetailGallery from "@/components/common/FieldDetailGallery";

function FieldDetailPage() {
    const [timeRange, setTimeRange] = useState<any>(null);

    const PRICE_PER_HOUR = 250000;

    const calculateTotal = () => {
        if (!timeRange || !timeRange[0] || !timeRange[1]) return 0;
        const duration = timeRange[1].diff(timeRange[0], "hour", true);
        return Math.max(0, duration * PRICE_PER_HOUR);
    };

    const totalPrice = calculateTotal();

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);
    };

    return (
        <ContainerWrapper className="my-8 flex flex-col gap-6">
            <Breadcrumb
                items={[
                    {
                        title: (
                            <a href="/" className="text-gray-400 hover:text-[#39FF14]">
                                Trang chủ
                            </a>
                        ),
                    },
                    {
                        title: (
                            <a href="/fields" className="text-gray-400 hover:text-[#39FF14]">
                                Sân bóng
                            </a>
                        ),
                    },
                    { title: <span className="text-[#ececec]">Sân Bóng Chảo Lửa</span> },
                ]}
            />

            <div className="rounded-2xl overflow-hidden shadow-md">
                <FieldDetailGallery />
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="flex-1 w-full lg:w-auto flex flex-col gap-8">
                    <div>
                        <h1 className="text-3xl font-bold text-[#ececec] mb-3">
                            Sân Bóng Chảo Lửa - Pitch A
                        </h1>
                        <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm text-gray-400 mb-4">
                            <div className="flex items-center gap-2">
                                <MapPin size={18} className="text-[#39FF14]" />
                                <span className="text-gray-300 text-[14px]">
                                    30 Phan Thúc Duyện, Tân Bình, TP.HCM
                                </span>
                            </div>
                        </div>
                    </div>

                    <Card className="border-[#343434] bg-[#1E1E1E] shadow-lg" bordered={false}>
                        <h3 className="text-[16px] font-bold text-[#ececec] mb-6">Chi tiết sân</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                            <DetailItem icon={LandPlot} text="Cỏ nhân tạo chuẩn FIFA 4G" />
                            <DetailItem icon={Users} text="Phù hợp đá 5 người & 7 người" />
                            <DetailItem icon={Lightbulb} text="Hệ thống chiếu sáng chuyên nghiệp" />
                            <DetailItem icon={ShowerHead} text="Phòng thay đồ & Phòng tắm" />
                            <DetailItem icon={Car} text="Bãi gửi xe miễn phí" />
                            <DetailItem icon={Coffee} text="Canteen & Khu vực chờ" />
                        </div>
                    </Card>

                    <div>
                        <h3 className="text-[16px] font-bold text-[#ececec] mb-4">Vị trí</h3>
                        <div className="rounded-2xl overflow-hidden border border-[#343434] h-[300px] relative bg-[#2C2C2E] group">
                            <iframe
                                title="map"
                                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                                    "30 Phan Thúc Duyện, Phường 4, Tân Bình, TP.HCM"
                                )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                                className="w-full h-full border-0"
                                loading="lazy"
                                allowFullScreen
                                style={{ filter: "invert(90%) hue-rotate(180deg) contrast(90%)" }}
                            />
                        </div>
                    </div>

                    <Card className="border-[#343434] bg-[#1E1E1E] shadow-lg" bordered={false}>
                        <h3 className="text-[16px] font-bold text-[#ececec] mb-6">
                            Đánh giá & Xếp hạng
                        </h3>
                        <div className="flex flex-col md:flex-row gap-8 items-center">
                            <div className="flex flex-col items-center justify-center p-4 gap-4">
                                <span className="text-5xl font-black text-[#ececec]">4.8</span>
                                <Rate
                                    disabled
                                    defaultValue={4.8}
                                    allowHalf
                                    className="mt-2 mb-1 text-sm"
                                />
                                <span className="text-gray-400 text-sm">Dựa trên 124 đánh giá</span>
                            </div>
                            <div className="flex-1 w-full space-y-2">
                                <RatingProgressBar star={5} percent={85} />
                                <RatingProgressBar star={4} percent={10} />
                                <RatingProgressBar star={3} percent={3} />
                                <RatingProgressBar star={2} percent={2} />
                                <RatingProgressBar star={1} percent={0} />
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="w-full lg:w-[380px] shrink-0 relative">
                    <div className="sticky top-6 flex flex-col gap-6">
                        <CardWrapper className="border-[#343434] bg-[#1E1E1E] shadow-xl flex flex-col gap-6">
                            <h3 className="text-[16px] font-bold text-[#ececec] mb-4">Đặt lịch</h3>

                            <div className="mb-4">
                                <label className="text-gray-400 text-[14px] mb-2 block">
                                    Chọn ngày
                                </label>
                                <DatePicker
                                    className="w-full bg-[#2C2C2E] border-[#343434] text-[#ececec]"
                                    defaultValue={dayjs()}
                                    format={"DD/MM/YYYY"}
                                    placeholder="Chọn ngày đá"
                                    size="large"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="text-gray-400 text-[14px] mb-2 block">
                                    Chọn khung giờ (Vào - Ra)
                                </label>

                                <TimePicker.RangePicker
                                    format="HH:mm"
                                    minuteStep={30}
                                    placeholder={["Giờ vào", "Giờ ra"]}
                                    className="w-full bg-[#2C2C2E] border-[#343434] text-[#ececec] hover:border-[#39FF14] focus:border-[#39FF14]"
                                    onChange={(values) => setTimeRange(values)}
                                    popupClassName="custom-time-picker-popup"
                                    disabledTime={() => ({
                                        disabledHours: () => [],
                                    })}
                                    size="large"
                                />
                            </div>
                            {timeRange && timeRange[0] && timeRange[1] && (
                                <div className="mt-3 p-3 bg-[#2C2C2E] rounded-lg border border-[#343434] flex justify-between items-center">
                                    <div className="text-sm">
                                        <p className="text-gray-400 text-[14px]">Thời gian đá:</p>
                                        <p className="text-[#ececec] font-medium text-[16px]">
                                            {timeRange[1].diff(timeRange[0], "hour", true)} giờ
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-gray-400 text-[14px]">Tạm tính:</p>
                                        <p className="text-[#39FF14] font-bold text-[16px]">
                                            {formatCurrency(totalPrice)}
                                        </p>
                                    </div>
                                </div>
                            )}
                            <Button
                                type="primary"
                                size="large"
                                block
                                disabled={totalPrice === 0}
                                className="bg-[#39FF14] text-black font-bold hover:bg-[#32D583] h-12 border-none rounded-xl text-lg disabled:bg-gray-600 disabled:text-gray-400"
                            >
                                Đặt ngay
                            </Button>
                        </CardWrapper>
                    </div>
                </div>
            </div>
        </ContainerWrapper>
    );
}

const DetailItem = ({ icon: Icon, text }: { icon: any; text: string }) => (
    <div className="flex items-center gap-3">
        <Icon size={20} className="text-[#39FF14]" />
        <span className="text-gray-300 text-[14px]">{text}</span>
    </div>
);

const RatingProgressBar = ({ star, percent }: { star: number; percent: number }) => (
    <div className="flex items-center gap-3 text-sm">
        <span className="text-gray-400 w-3 text-[14px]">{star}</span>
        <Progress
            percent={percent}
            strokeColor="#39FF14"
            trailColor="#2C2C2E"
            showInfo={false}
            size="small"
            className="flex-1"
        />
        <span className="text-gray-400 w-8 text-right text-[14px]">{percent}%</span>
    </div>
);

export default FieldDetailPage;
