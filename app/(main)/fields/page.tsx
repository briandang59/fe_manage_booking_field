"use client";

import { useState } from "react";

import { Input, Rate, Select, Slider, InputNumber, Button } from "antd";
import { RefreshCcw } from "lucide-react";

import CardWrapper from "@/components/common/CardWrapper";
import ContainerWrapper from "@/components/common/ContainerWrapper";
import UserField from "@/components/common/UserField";
import UserTag from "@/components/common/UserTag";
import { mockFields } from "@/utils/mock-datas/field";
import { fieldTypes } from "@/utils/mock-datas/field-type";
import { grassTypes } from "@/utils/mock-datas/grass-type";

function FieldsPage() {
    const [priceRange, setPriceRange] = useState<[number, number]>([20, 500]);

    const onSliderChange = (value: number[]) => {
        setPriceRange([value[0], value[1]]);
    };

    const onMinChange = (value: number | null) => {
        if (value !== null) {
            setPriceRange([value, priceRange[1]]);
        }
    };

    const onMaxChange = (value: number | null) => {
        if (value !== null) {
            setPriceRange([priceRange[0], value]);
        }
    };

    return (
        <ContainerWrapper className="grid grid-cols-[25%_74%] gap-8 my-8">
            <CardWrapper className="flex flex-col gap-8 min-h-[500px] h-fit sticky top-5 z-50">
                <div className="flex items-center justify-between">
                    <p className="text-[16px] font-medium text-[#ececec]">Tìm kiếm</p>
                    <Button icon={<RefreshCcw size={14} />} type="primary"></Button>
                </div>
                <Input placeholder="Nhập tên sân" size="large" />

                <p className="text-[16px] font-medium text-[#ececec]">Địa chỉ</p>
                <Select size="large" placeholder="Xã" />
                <Select size="large" placeholder="Tỉnh/Thành phố" />

                <p className="text-[16px] font-medium text-[#ececec]">Loại sân</p>
                <ul className="flex items-center gap-2 flex-wrap">
                    {fieldTypes.map((fieldType, index) => (
                        <li key={index}>
                            <UserTag className="cursor-pointer text-[14px]">
                                {fieldType.name}
                            </UserTag>
                        </li>
                    ))}
                </ul>

                <p className="text-[16px] font-medium text-[#ececec]">Giá theo giờ (k)</p>

                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-2">
                        <InputNumber
                            min={0}
                            max={priceRange[1]}
                            style={{ width: "100%" }}
                            value={priceRange[0]}
                            onChange={onMinChange}
                            formatter={(value) => `${value}k`}
                            parser={(value) => value?.replace("k", "") as unknown as number}
                        />
                        <span className="text-[#ececec]">-</span>
                        <InputNumber
                            min={priceRange[0]}
                            max={2000}
                            style={{ width: "100%" }}
                            value={priceRange[1]}
                            onChange={onMaxChange}
                            formatter={(value) => `${value}k`}
                            parser={(value) => value?.replace("k", "") as unknown as number}
                        />
                    </div>

                    <Slider
                        range
                        min={0}
                        max={1000}
                        step={10}
                        value={priceRange}
                        onChange={onSliderChange}
                    />
                </div>

                <p className="text-[16px] font-medium text-[#ececec]">Loại cỏ</p>
                <ul className="flex items-center gap-2 flex-wrap">
                    {grassTypes.map((grassType, index) => (
                        <li key={index}>
                            <UserTag className="cursor-pointer text-[14px]">
                                {grassType.name}
                            </UserTag>
                        </li>
                    ))}
                </ul>

                <p className="text-[16px] font-medium text-[#ececec]">Đánh giá</p>
                <Rate />
                <p className="text-[16px] font-medium text-[#ececec]">Lọc theo</p>
                <Select placeholder="Sort by" size="large" />
            </CardWrapper>
            <div className="flex flex-col gap-8">
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mockFields.map((field) => (
                        <li key={field.id}>
                            {" "}
                            <UserField {...field} />
                        </li>
                    ))}
                </ul>
            </div>
        </ContainerWrapper>
    );
}

export default FieldsPage;
