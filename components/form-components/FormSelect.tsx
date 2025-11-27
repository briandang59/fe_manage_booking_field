import React from "react";

import { Form, Select } from "antd";
import { Controller, Control, RegisterOptions, useFormContext } from "react-hook-form";
import { FieldPath, FieldValues } from "react-hook-form";

interface SelectOption {
    value: string | number;
    label: React.ReactNode;
}

interface FormSelectProps<TFieldValues extends FieldValues = FieldValues> {
    name: FieldPath<TFieldValues>;
    control?: Control<TFieldValues>;
    rules?: RegisterOptions<TFieldValues, FieldPath<TFieldValues>>;
    label?: React.ReactNode;
    placeholder?: string;
    options: SelectOption[];
    [key: string]: any;
}

const FormSelectBase = <TFieldValues extends FieldValues = FieldValues>({
    name,
    control,
    rules,
    label,
    placeholder = "Chọn giá trị...",
    options = [],
    ...props
}: FormSelectProps<TFieldValues>) => {
    const contextControl = useFormContext<TFieldValues>()?.control;
    const _control = control || contextControl;

    if (!_control) {
        throw new Error("FormSelect phải dùng trong FormProvider hoặc pass control prop");
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
                    <Select placeholder={placeholder} {...field} {...props}>
                        {options.map((option) => (
                            <Select.Option key={option.value} value={option.value}>
                                {option.label}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            )}
        />
    );
};

export const FormSelectContext = FormSelectBase;
export const FormSelect = FormSelectBase;

export default FormSelect;
