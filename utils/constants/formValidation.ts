import { RegisterOptions, FieldValues, FieldPath } from "react-hook-form";

type ValidationRules<
    TFieldValues extends FieldValues = FieldValues,
    TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = RegisterOptions<TFieldValues, TFieldName>;

export const emailRules: ValidationRules<{ email: string }, "email"> = {
    required: "Email là bắt buộc",
    pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Email không hợp lệ",
    },
};

export const passwordRules: ValidationRules<{ password: string }, "password"> = {
    required: "Mật khẩu là bắt buộc",
    minLength: {
        value: 6,
        message: "Mật khẩu phải ít nhất 6 ký tự",
    },
};

export const roleRules: ValidationRules<{ role: string }, "role"> = {
    required: "Vui lòng chọn vai trò",
};

export const descriptionRules: ValidationRules<{ description: string }, "description"> = {
    maxLength: {
        value: 200,
        message: "Mô tả tối đa 200 ký tự",
    },
};
