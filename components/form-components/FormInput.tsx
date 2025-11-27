import React from "react";

import { Form, Input } from "antd";
import { Controller, Control, RegisterOptions, useFormContext } from "react-hook-form";
import { FieldPath, FieldValues } from "react-hook-form";

interface FormInputProps<TFieldValues extends FieldValues = FieldValues> {
    name: FieldPath<TFieldValues>;
    control?: Control<TFieldValues>; // Optional cho context
    rules?: RegisterOptions<TFieldValues, FieldPath<TFieldValues>>;
    label?: React.ReactNode;
    placeholder?: string;
    type?: string;
    [key: string]: any;
}

// Version chung (dùng prop hoặc control từ context)
const FormInputBase = <TFieldValues extends FieldValues = FieldValues>({
    name,
    control,
    rules,
    label,
    placeholder = "Nhập giá trị...",
    type = "text",
    ...props
}: FormInputProps<TFieldValues>) => {
    const contextControl = useFormContext<TFieldValues>()?.control;
    const _control = control || contextControl;

    if (!_control) {
        throw new Error("FormInput phải dùng trong FormProvider hoặc pass control prop");
    }

    return (
        <Controller
            name={name}
            control={_control}
            rules={rules}
            render={({ field, fieldState: { error } }) => (
                <Form.Item
                    label={label}
                    validateStatus={error ? "error" : ""}
                    help={error?.message}
                >
                    <Input type={type} placeholder={placeholder} {...field} {...props} />
                </Form.Item>
            )}
        />
    );
};

// Export version context (dùng chính)
export const FormInputContext = FormInputBase;

// Export version prop (cũ, nếu cần)
export const FormInput = FormInputBase;

export default FormInput;
