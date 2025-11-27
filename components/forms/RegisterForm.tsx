"use client";
import { useState } from "react";

import Link from "next/link";

import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form, message } from "antd";
import clsx from "clsx";
import { Building, User } from "lucide-react";
import { useForm, FormProvider } from "react-hook-form";

import { emailRules, passwordRules } from "@/utils/constants/formValidation";
import { paths } from "@/utils/constants/paths";
import { registerSchema } from "@/utils/constants/schemas";

import FormInput from "../form-components/FormInput";

interface RegisterFormData {
    email: string;
    password: string;
    rePassword: string;
    role: string;
}

function RegisterForm() {
    const methods = useForm<RegisterFormData>({
        resolver: yupResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            rePassword: "",
            role: "",
        },
    });

    const { handleSubmit } = methods;
    const roleOptions = [
        {
            label: "Người dùng",
            key: "user",
            icon: <User size={32} />,
        },
        {
            label: "Chủ sân bóng",
            key: "founder",
            icon: <Building size={32} />,
        },
    ];
    const [selectedRole, setSelectedRole] = useState<string>("user");
    const onSubmit = async (data: RegisterFormData) => {
        try {
            console.log("Login data:", data);
            message.success("Đăng nhập thành công!");
        } catch (error) {
            message.error("Đăng nhập thất bại!");
        }
    };

    return (
        <FormProvider {...methods}>
            <Form
                onFinish={handleSubmit(onSubmit)}
                layout="vertical"
                size="large"
                className="w-[500px]! flex flex-col gap-4"
            >
                <div className="flex flex-col gap-2 items-center mb-16">
                    <h3 className="text-[#ececec] text-[28px] font-bold">
                        Chào mừng thành viên mới
                    </h3>
                    <p className="text-gray-300 text-[16px]">
                        Nhập thông tin để truy cập tài khoản của bạn
                    </p>
                </div>
                <ul className="grid grid-cols-2 gap-8">
                    {roleOptions.map((item, index) => (
                        <li
                            key={index}
                            className={clsx(
                                `h-[100px] rounded-2xl border p-4 flex flex-col items-center justify-center gap-4 cursor-pointer
        transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
        hover:scale-[1.04] hover:shadow-lg will-change-transform`,
                                selectedRole === item.key
                                    ? "border-[#39FF14]/80 text-[#39FF14] shadow-[0_0_12px_#39ff1444] scale-[1.02]"
                                    : "border-[#ececec]/40 text-[#ececec]/70"
                            )}
                            onClick={() => setSelectedRole(item.key)}
                        >
                            {item.icon}
                            {item.label}
                        </li>
                    ))}
                </ul>
                <FormInput
                    name="email"
                    rules={emailRules}
                    label="Email"
                    placeholder="Nhập email"
                    type="email"
                />
                <FormInput
                    name="password"
                    rules={passwordRules}
                    label="Mật khẩu"
                    placeholder="Nhập mật khẩu"
                    type="password"
                />
                <FormInput
                    name="password"
                    rules={passwordRules}
                    label="Xác nhận mật khẩu"
                    placeholder="Nhập mật khẩu"
                    type="password"
                />

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Đăng ký
                    </Button>
                </Form.Item>
                <div className="flex items-center gap-2 justify-center">
                    <span className="text-[#ececec] text-[16px]"> Đã có tài khoản?</span>
                    <Link href={`${paths.login}`}>Đăng nhập</Link>
                </div>
            </Form>
        </FormProvider>
    );
}

export default RegisterForm;
