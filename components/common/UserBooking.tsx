import { Button, Image } from "antd";
import dayjs from "dayjs";

import { images } from "@/assets/images";

import CardWrapper from "./CardWrapper";
import UserTag from "./UserTag";

type BookingStatus = "cancel" | "accepted" | "pending";

interface IUserBookingProps {
    status: BookingStatus | string;
    field_name: string;
    start_time: string;
    end_time: string;
    address: string;
    field_url: string;
}

function UserBooking(props: IUserBookingProps) {
    const mappingStatus: Record<string, { color: string; label: string }> = {
        canceled: {
            color: "bg-[#4A0E0E]! text-[#FF4C4C] border border-[#FF4C4C]",
            label: "Đã hủy",
        },
        accepted: {
            color: "bg-[#234B1C]! text-[#39FF14] border border-[#39FF14]",
            label: "Đã xác nhận",
        },
        pending: {
            color: "bg-[#4A3A0E]! text-[#FFCC33] border border-[#FFCC33]",
            label: "Chờ xác nhận",
        },
    };

    const statusInfo = mappingStatus[props.status] || mappingStatus["pending"];

    const formatDateTime = (start: string, end: string) => {
        const s = dayjs(start);
        const e = dayjs(end);
        return `${s.format("HH:mm")} - ${e.format("HH:mm")} | ${s.format("DD/MM/YYYY")}`;
    };

    return (
        <CardWrapper className="min-h-[200px] grid grid-cols-[60%_39%] gap-6 text-[#EAEAEA] p-4">
            <div className="flex flex-col gap-3 justify-between flex-1">
                <UserTag
                    className={`w-fit px-3 py-1 text-[11px] rounded-full! font-medium ${statusInfo.color}`}
                >
                    {statusInfo.label}
                </UserTag>

                <h3 className="text-[20px] md:text-[24px] font-bold text-gray-800 dark:text-white leading-tight">
                    {props.field_name}
                </h3>

                <div className="flex flex-col gap-1">
                    <p className="text-[14px] md:text-[16px] text-gray-500 font-medium">
                        {formatDateTime(props.start_time, props.end_time)}
                    </p>
                    <p className="text-[14px] md:text-[16px] text-gray-500 truncate max-w-[400px]">
                        {props.address}
                    </p>
                </div>

                <div className="flex items-center gap-3 mt-2">
                    <Button type="primary" className="bg-blue-600">
                        Xem chi tiết
                    </Button>
                    {props.status === "pending" && (
                        <Button danger className="hover:bg-red-50 bg-transparent!">
                            Hủy
                        </Button>
                    )}
                </div>
            </div>

            <div className="flex-1 w-full h-[150px] md:h-[200px] shrink-0 rounded-xl overflow-hidden bg-gray-100">
                <Image
                    src={!props.field_url ? images.defaulImage.src : props.field_url}
                    alt={props.field_name}
                    width="100%"
                    height="100%"
                    className="object-cover"
                    preview={false}
                />
            </div>
        </CardWrapper>
    );
}

export default UserBooking;
