import React from "react";

import { Form, DatePicker } from "antd";
import type { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { Controller, Control, RegisterOptions, useFormContext } from "react-hook-form";
import { FieldPath, FieldValues } from "react-hook-form";

type RangeValue = [Dayjs | null, Dayjs | null] | null;

interface FormRangeDatePickerProps<TFieldValues extends FieldValues = FieldValues> {
    name: FieldPath<TFieldValues>;
    control?: Control<TFieldValues>;
    rules?: RegisterOptions<TFieldValues, FieldPath<TFieldValues>>;
    label?: React.ReactNode;
    placeholder?: [string, string];
    format?: string;
    disabledDate?: RangePickerProps["disabledDate"];
    [key: string]: any;
}

const FormRangeDatePickerBase = <TFieldValues extends FieldValues = FieldValues>({
    name,
    control,
    rules,
    label,
    placeholder = ["Từ ngày", "Đến ngày"],
    format = "YYYY-MM-DD",
    disabledDate,
    ...props
}: FormRangeDatePickerProps<TFieldValues>) => {
    const contextControl = useFormContext<TFieldValues>()?.control;
    const _control = control || contextControl;

    if (!_control) {
        throw new Error("FormRangeDatePicker phải dùng trong FormProvider hoặc pass control prop");
    }

    return (
        <Controller
            name={name}
            control={_control}
            rules={rules}
            render={({ field, fieldState: { error } }) => {
                const value: RangeValue = field.value
                    ? [dayjs(field.value[0]), dayjs(field.value[1])]
                    : null;

                return (
                    <Form.Item
                        label={label}
                        validateStatus={error ? "error" : ""}
                        help={error?.message}
                    >
                        <DatePicker.RangePicker
                            placeholder={placeholder}
                            format={format}
                            value={value}
                            onChange={(dates: RangeValue) => {
                                const dateValues = dates
                                    ? [dates[0]?.toDate(), dates[1]?.toDate()]
                                    : null;
                                field.onChange(dateValues);
                            }}
                            disabledDate={disabledDate}
                            {...props}
                        />
                    </Form.Item>
                );
            }}
        />
    );
};

export const FormRangeDatePickerContext = FormRangeDatePickerBase;
export const FormRangeDatePicker = FormRangeDatePickerBase;

export default FormRangeDatePicker;
