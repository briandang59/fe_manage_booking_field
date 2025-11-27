"use client";
import Link from "next/link";

import { Button, Form, message } from "antd";
import { useForm, FormProvider } from "react-hook-form";

import { emailRules, passwordRules } from "@/utils/constants/formValidation";
import { paths } from "@/utils/constants/paths";

import FormInput from "../form-components/FormInput";

interface LoginFormData {
    email: string;
    password: string;
}

function LoginForm() {
    const methods = useForm<LoginFormData>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { handleSubmit } = methods;

    const onSubmit = async (data: LoginFormData) => {
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
                    <Button type="primary" htmlType="submit" block>
                        Đăng nhập
                    </Button>
                </Form.Item>
                <div className="flex items-center gap-2 justify-center">
                    <span className="text-[#ececec] text-[16px]"> Chưa có tài khoản?</span>
                    <Link href={`/${paths.register}`}>Đăng ký</Link>
                </div>
            </Form>
        </FormProvider>
    );
}

export default LoginForm;
