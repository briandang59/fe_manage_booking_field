import * as yup from "yup";

export const loginSchema = yup.object({
    email: yup.string().required("Email là bắt buộc").email("Email không hợp lệ"),
    password: yup.string().required("Mật khẩu là bắt buộc").min(6, "Mật khẩu phải ít nhất 6 ký tự"),
});

export const registerSchema = yup.object({
    email: yup.string().required("Email là bắt buộc").email("Email không hợp lệ"),
    password: yup.string().required("Mật khẩu là bắt buộc").min(6, "Mật khẩu phải ít nhất 6 ký tự"),
    rePassword: yup
        .string()
        .required("Xác nhận mật khẩu là bắt buộc")
        .oneOf([yup.ref("password")], "Mật khẩu xác nhận không khớp"),
    role: yup.string().required("Vui lòng chọn vai trò"),
});
