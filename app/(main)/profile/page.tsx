"use client";
import { Avatar, Button, Tabs, TabsProps } from "antd";

import CardWrapper from "@/components/common/CardWrapper";
import ContainerWrapper from "@/components/common/ContainerWrapper";
import UserBooking from "@/components/common/UserBooking";
import UserTag from "@/components/common/UserTag";
import { bookings } from "@/utils/mock-datas/booking";

function ProfilePage() {
    const items: TabsProps["items"] = [
        {
            key: "1",
            label: "Sắp tới",
            children: (
                <div>
                    <ul className="flex flex-col gap-8">
                        {bookings.map((booking, index) => (
                            <li key={index}>
                                <UserBooking
                                    address={booking.address}
                                    end_time={booking.end_time}
                                    field_name={booking.field_name}
                                    field_url={booking.field_avatar_url}
                                    start_time={booking.start_time}
                                    status={booking.status}
                                    key={index}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            ),
        },
        {
            key: "2",
            label: "Đã qua",
            children: (
                <div>
                    <ul className="flex flex-col gap-8">
                        {bookings.map((booking, index) => (
                            <li key={index}>
                                <UserBooking
                                    address={booking.address}
                                    end_time={booking.end_time}
                                    field_name={booking.field_name}
                                    field_url={booking.field_avatar_url}
                                    start_time={booking.start_time}
                                    status={booking.status}
                                    key={index}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            ),
        },
    ];
    const onChangeTab = (key: string) => {
        console.log(key);
    };
    return (
        <ContainerWrapper className="grid grid-cols-[25%_75%] gap-16 mt-8">
            <div className="flex flex-col gap-8">
                <CardWrapper>
                    <div className="flex flex-col gap-8">
                        <div className="flex items-center gap-4">
                            <Avatar
                                src="https://avatars.githubusercontent.com/u/167729556?v=4"
                                alt="avatar"
                                size={80}
                            />
                            <div className="flex flex-col gap-0">
                                <p className="text-[24px] font-bold">Brian Dang</p>
                                <p className="text-[14px] text-gray-300">0359088784</p>
                                <p className="text-[14px] text-gray-300">dvquang5902@gmail.com</p>
                            </div>
                        </div>
                        <Button type="primary">Chỉnh sửa thông tin</Button>
                    </div>
                </CardWrapper>
                <CardWrapper>
                    <p className="text-[15px] font-bold">Thông tin người dùng</p>
                    <div className="grid grid-cols-2 gap-4 my-4">
                        <UserTag>
                            <p className="text-[14px] text-gray-500 font-medium">Vị trí</p>
                            <p className="text-[14px]">Tiền vệ</p>
                        </UserTag>
                        <UserTag>
                            <p className="text-[14px] text-gray-500 font-medium">Khả năng</p>
                            <p className="text-[14px]">Mới chơi</p>
                        </UserTag>
                    </div>
                    <p className="text-[15px] font-bold">Lịch rảnh</p>
                    <div className="flex flex-wrap gap-4 my-4">
                        <UserTag className="bg-[#234B1C]! text-[#39FF14]! rounded-full! p-2! font-medium">
                            Monday 6pm - 7pm
                        </UserTag>
                        <UserTag className="bg-[#234B1C]! text-[#39FF14]! rounded-full! p-2! font-medium">
                            Monday 6pm - 7pm
                        </UserTag>
                    </div>
                </CardWrapper>
            </div>
            <div>
                <h3 className="text-[24px] font-bold">Sân đã đặt</h3>
                <Tabs defaultActiveKey="1" items={items} onChange={onChangeTab} />
            </div>
        </ContainerWrapper>
    );
}

export default ProfilePage;
