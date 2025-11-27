import React from "react";

import { Form, Checkbox } from "antd";
import { Controller, Control, RegisterOptions, useFormContext } from "react-hook-form";
import { FieldPath, FieldValues } from "react-hook-form";

interface CheckboxOption {
    label: React.ReactNode;
    value: string | number;
}

interface FormCheckboxProps<TFieldValues extends FieldValues = FieldValues> {
    name: FieldPath<TFieldValues>;
    control?: Control<TFieldValues>;
    rules?: RegisterOptions<TFieldValues, FieldPath<TFieldValues>>;
    label?: React.ReactNode;
    options?: CheckboxOption[];
    [key: string]: any;
}

const FormCheckboxBase = <TFieldValues extends FieldValues = FieldValues>({
    name,
    control,
    rules,
    label,
    options = [],
    ...props
}: FormCheckboxProps<TFieldValues>) => {
    const contextControl = useFormContext<TFieldValues>()?.control;
    const _control = control || contextControl;

    if (!_control) {
        throw new Error("FormCheckbox phải dùng trong FormProvider hoặc pass control prop");
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
                    {options.length > 0 ? (
                        <Checkbox.Group
                            options={options.map((opt) => ({ label: opt.label, value: opt.value }))}
                            {...field}
                            {...props}
                        />
                    ) : (
                        <Checkbox {...field} {...props}>
                            {label}
                        </Checkbox>
                    )}
                </Form.Item>
            )}
        />
    );
};

export const FormCheckboxContext = FormCheckboxBase;
export const FormCheckbox = FormCheckboxBase;

export default FormCheckbox;
