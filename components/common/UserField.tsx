import { Image, Rate, Button, Tag } from "antd";
import { ArrowRight } from "lucide-react";

import { paths } from "@/utils/constants/paths";

import CardWrapper from "./CardWrapper";

export interface IUserFieldProps {
    id: number;
    field_name: string;
    branch_name: string;
    field_thumb: string;
    address: string;
    field_types: string[];
    price_per_hour: number;
    grass_type: string;
    rating: number;
    slug: string;
}

function UserField(props: IUserFieldProps) {
    const {
        slug,
        field_name,
        branch_name,
        field_thumb,
        address,
        field_types,
        price_per_hour,
        grass_type,
        rating,
    } = props;

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);
    };

    return (
        <CardWrapper
            className="flex flex-col h-full p-0 overflow-hidden border border-[#343434] group hover:border-[#39FF14] transition-colors duration-300"
            type="field"
            href={`${paths.fields}/${slug}`}
        >
            <div className="relative w-full h-[180px] overflow-hidden">
                <Image
                    src={field_thumb}
                    alt={field_name}
                    preview={false}
                    width="100%"
                    height="100%"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[14px] text-[#39FF14] font-semibold border border-[#39FF14]/30">
                    {grass_type}
                </div>
            </div>

            <div className="flex flex-col flex-1 p-4 gap-4">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-[16px] font-bold text-[#ececec] line-clamp-1">
                            {field_name}
                        </h3>
                        <p className="text-[14px] text-[#32D583] font-medium">{branch_name}</p>
                    </div>
                </div>
                <div className="flex items-center justify-between gap-2">
                    <Rate disabled defaultValue={rating} allowHalf className="text-xs" />
                    <span className="text-[14px] text-gray-400">({rating})</span>
                </div>
                <div className="flex items-start gap-1 text-gray-400 text-sm min-h-10">
                    <span className="line-clamp-2 text-[14px]">{address}</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                    {field_types.map((type, index) => (
                        <Tag
                            key={index}
                            color="#2C2C2E"
                            className="text-gray-300 border-[#444] mr-0"
                        >
                            {type}
                        </Tag>
                    ))}
                </div>
                <div className="flex-1"></div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#343434]">
                    <div>
                        <p className="text-[14px] text-gray-400">Giá từ</p>
                        <p className="text-[16px] font-bold text-[#39FF14]">
                            {formatCurrency(price_per_hour)}
                            <span className="text-[16px] font-normal text-white">/h</span>
                        </p>
                    </div>
                </div>
            </div>
        </CardWrapper>
    );
}

export default UserField;
