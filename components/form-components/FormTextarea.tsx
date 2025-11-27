import React from "react";

import { Form, Input } from "antd";
import { Controller, Control, RegisterOptions, useFormContext } from "react-hook-form";
import { FieldPath, FieldValues } from "react-hook-form";

interface FormTextareaProps<TFieldValues extends FieldValues = FieldValues> {
    name: FieldPath<TFieldValues>;
    control?: Control<TFieldValues>;
    rules?: RegisterOptions<TFieldValues, FieldPath<TFieldValues>>;
    label?: React.ReactNode;
    placeholder?: string;
    rows?: number;
    [key: string]: any;
}

const FormTextareaBase = <TFieldValues extends FieldValues = FieldValues>({
    name,
    control,
    rules,
    label,
    placeholder = "Nhập nội dung...",
    rows = 4,
    ...props
}: FormTextareaProps<TFieldValues>) => {
    const contextControl = useFormContext<TFieldValues>()?.control;
    const _control = control || contextControl;

    if (!_control) {
        throw new Error("FormTextarea phải dùng trong FormProvider hoặc pass control prop");
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
                    <Input.TextArea rows={rows} placeholder={placeholder} {...field} {...props} />
                </Form.Item>
            )}
        />
    );
};

export const FormTextareaContext = FormTextareaBase;
export const FormTextarea = FormTextareaBase;

export default FormTextarea;
