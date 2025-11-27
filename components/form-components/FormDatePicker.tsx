import React from "react";

import { Form, DatePicker } from "antd";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { Controller, Control, RegisterOptions, useFormContext } from "react-hook-form";
import { FieldPath, FieldValues } from "react-hook-form";

interface FormDatePickerProps<TFieldValues extends FieldValues = FieldValues> {
    name: FieldPath<TFieldValues>;
    control?: Control<TFieldValues>;
    rules?: RegisterOptions<TFieldValues, FieldPath<TFieldValues>>;
    label?: React.ReactNode;
    placeholder?: string;
    format?: string;
    [key: string]: any;
}

const FormDatePickerBase = <TFieldValues extends FieldValues = FieldValues>({
    name,
    control,
    rules,
    label,
    placeholder = "Chọn ngày...",
    format = "YYYY-MM-DD",
    ...props
}: FormDatePickerProps<TFieldValues>) => {
    const contextControl = useFormContext<TFieldValues>()?.control;
    const _control = control || contextControl;

    if (!_control) {
        throw new Error("FormDatePicker phải dùng trong FormProvider hoặc pass control prop");
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
                    <DatePicker
                        placeholder={placeholder}
                        format={format}
                        value={field.value ? dayjs(field.value as Date | string) : null}
                        onChange={(date: Dayjs | null) =>
                            field.onChange(date ? date.toDate() : null)
                        }
                        {...props}
                    />
                </Form.Item>
            )}
        />
    );
};

export const FormDatePickerContext = FormDatePickerBase;
export const FormDatePicker = FormDatePickerBase;

export default FormDatePicker;
