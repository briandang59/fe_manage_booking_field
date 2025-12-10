"use client";
import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form, message, Steps } from "antd";
import clsx from "clsx";
import { ArrowLeft, Building, User } from "lucide-react";
import { useForm, FormProvider } from "react-hook-form";

import { emailRules, passwordRules } from "@/utils/constants/formValidation";
import { paths } from "@/utils/constants/paths";
import { registerSchema } from "@/utils/constants/schemas";
import { useAuth } from "@/utils/hooks/useAuth";

import FormInput from "../form-components/FormInput";

interface RegisterFormData {
    email: string;
    password: string;
    rePassword: string;
    role: string;
}

function RegisterForm() {
    const router = useRouter();
    const { register: registerUser, loginWithGoogle } = useAuth();
    const [loading, setLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    const methods = useForm<RegisterFormData>({
        resolver: yupResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            rePassword: "",
            role: "",
        },
    });

    const { handleSubmit, setValue, watch } = methods;
    const selectedRole = watch("role");

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

    const handleRoleChange = (role: string) => {
        setValue("role", role, { shouldValidate: true });
    };

    const handleNextStep = () => {
        if (!selectedRole) {
            message.warning("Vui lòng chọn vai trò của bạn");
            return;
        }
        setCurrentStep(1);
    };

    const handleBackStep = () => {
        setCurrentStep(0);
    };

    const onSubmit = async (data: RegisterFormData) => {
        setLoading(true);
        try {
            const { rePassword, ...registerData } = data;
            const response = await registerUser(registerData);

            if (response.error) {
                message.error(response.error || "Đăng ký thất bại!");
                return;
            }

            message.success("Đăng ký thành công!");
            router.push(paths.home);
        } catch (error) {
            message.error("Đăng ký thất bại!");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        // Truyền role đã chọn vào Google OAuth flow
        loginWithGoogle(selectedRole);
    };

    const steps = [
        {
            title: "Chọn vai trò",
            description: "Bạn muốn đăng ký với vai trò gì?",
        },
        {
            title: "Đăng ký",
            description: "Nhập thông tin để tạo tài khoản",
        },
    ];

    return (
        <FormProvider {...methods}>
            <div className="w-[500px] flex flex-col gap-6">
                {/* Steps Indicator */}
                <Steps
                    current={currentStep}
                    items={steps}
                    className="mb-8"
                    labelPlacement="vertical"
                />

                {/* Step 1: Chọn Role */}
                {currentStep === 0 && (
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2 items-center">
                            <h3 className="text-[#ececec] text-[28px] font-bold">
                                Chào mừng thành viên mới
                            </h3>
                            <p className="text-gray-300 text-[16px] text-center">
                                Chọn vai trò của bạn để bắt đầu
                            </p>
                        </div>

                        <ul className="grid grid-cols-2 gap-6">
                            {roleOptions.map((item, index) => (
                                <li
                                    key={index}
                                    className={clsx(
                                        `h-[120px] rounded-2xl border p-4 flex flex-col items-center justify-center gap-4 cursor-pointer
                                        transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
                                        hover:scale-[1.04] hover:shadow-lg will-change-transform`,
                                        selectedRole === item.key
                                            ? "border-[#39FF14]/80 text-[#39FF14] shadow-[0_0_12px_#39ff1444] scale-[1.02]"
                                            : "border-[#ececec]/40 text-[#ececec]/70"
                                    )}
                                    onClick={() => handleRoleChange(item.key)}
                                >
                                    {item.icon}
                                    <span className="font-medium">{item.label}</span>
                                </li>
                            ))}
                        </ul>

                        <Button
                            type="primary"
                            block
                            size="large"
                            onClick={handleNextStep}
                            disabled={!selectedRole}
                        >
                            Tiếp theo
                        </Button>

                        <div className="flex items-center gap-2 justify-center">
                            <span className="text-[#ececec] text-[16px]">Đã có tài khoản?</span>
                            <Link href={`${paths.login}`}>Đăng nhập</Link>
                        </div>
                    </div>
                )}

                {/* Step 2: Form Đăng Ký */}
                {currentStep === 1 && (
                    <Form
                        onFinish={handleSubmit(onSubmit)}
                        layout="vertical"
                        size="large"
                        className="flex flex-col gap-4"
                    >
                        <div className="flex flex-col gap-2 items-center mb-4">
                            <h3 className="text-[#ececec] text-[28px] font-bold">
                                Thông tin đăng ký
                            </h3>
                            <p className="text-gray-300 text-[16px] text-center">
                                Vai trò:{" "}
                                <span className="text-[#39FF14]">
                                    {selectedRole === "user" ? "Người dùng" : "Chủ sân bóng"}
                                </span>
                            </p>
                        </div>

                        <Button
                            type="text"
                            icon={<ArrowLeft />}
                            onClick={handleBackStep}
                            className="self-start mb-2 text-gray-400 hover:text-[#39FF14]"
                        >
                            Quay lại
                        </Button>

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
                        <FormInput<RegisterFormData>
                            name="rePassword"
                            rules={passwordRules}
                            label="Xác nhận mật khẩu"
                            placeholder="Nhập lại mật khẩu"
                            type="password"
                        />

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block loading={loading}>
                                Đăng ký
                            </Button>
                        </Form.Item>

                        <div className="flex items-center gap-2 justify-center my-4">
                            <div className="flex-1 h-px bg-gray-600"></div>
                            <span className="text-gray-400 text-sm px-2">Hoặc</span>
                            <div className="flex-1 h-px bg-gray-600"></div>
                        </div>

                        <Form.Item>
                            <Button
                                type="default"
                                block
                                onClick={handleGoogleLogin}
                                className="flex items-center justify-center gap-2"
                            >
                                <svg
                                    className="w-5 h-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335"
                                    />
                                </svg>
                                Đăng ký với Google
                            </Button>
                        </Form.Item>

                        <div className="flex items-center gap-2 justify-center">
                            <span className="text-[#ececec] text-[16px]">Đã có tài khoản?</span>
                            <Link href={`${paths.login}`}>Đăng nhập</Link>
                        </div>
                    </Form>
                )}
            </div>
        </FormProvider>
    );
}

export default RegisterForm;
