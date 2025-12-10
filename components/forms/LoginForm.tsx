"use client";
import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form, message } from "antd";
import { useForm, FormProvider } from "react-hook-form";

import { emailRules, passwordRules } from "@/utils/constants/formValidation";
import { paths } from "@/utils/constants/paths";
import { loginSchema } from "@/utils/constants/schemas";
import { useAuth } from "@/utils/hooks/useAuth";

import GoogleButton from "../common/GoogleButton";
import FormInput from "../form-components/FormInput";

interface LoginFormData {
    email: string;
    password: string;
}

function LoginForm() {
    const router = useRouter();
    const { login, loginWithGoogle } = useAuth();
    const [loading, setLoading] = useState(false);

    const methods = useForm<LoginFormData>({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { handleSubmit } = methods;

    const onSubmit = async (data: LoginFormData) => {
        setLoading(true);
        try {
            const response = await login(data);

            if (response.error) {
                message.error(response.error || "Đăng nhập thất bại!");
                return;
            }

            message.success("Đăng nhập thành công!");
            router.push(paths.home);
        } catch (error) {
            message.error("Đăng nhập thất bại!");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        loginWithGoogle();
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
                    <h3 className="text-[#ececec] text-[28px] font-bold">Chào mừng trở lại</h3>
                    <p className="text-gray-300 text-[16px]">
                        Nhập thông tin để truy cập tài khoản của bạn
                    </p>
                </div>

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
                <div className="flex justify-end mb-4">
                    <Link href={`/${paths.forgot_password}`}>Quên mật khẩu ?</Link>
                </div>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block loading={loading}>
                        Đăng nhập
                    </Button>
                </Form.Item>
                <div className="flex items-center gap-2 justify-center my-4">
                    <div className="flex-1 h-px bg-gray-600"></div>
                    <span className="text-gray-400 text-sm px-2">Hoặc</span>
                    <div className="flex-1 h-px bg-gray-600"></div>
                </div>
                <Form.Item>
                    <GoogleButton onClick={handleGoogleLogin} label="Đăng nhập với Google" />
                </Form.Item>
                <div className="flex items-center gap-2 justify-center">
                    <span className="text-[#ececec] text-[16px]"> Chưa có tài khoản?</span>
                    <Link href={`${paths.register}`}>Đăng ký</Link>
                </div>
            </Form>
        </FormProvider>
    );
}

export default LoginForm;
