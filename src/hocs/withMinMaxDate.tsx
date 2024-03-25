import * as React from "react";
import { ComponentType, FC } from "react";
import { DatePickerPropsType } from "@/types";

export const withMinMaxDate =
    (minDate: Date, maxDate: Date) =>
    <P extends DatePickerPropsType>(
        WrappedComponent: ComponentType<P>,
    ): FC<Omit<P, "minDate" | "maxDate">> =>
    (props: Omit<P, "minDate" | "maxDate">) => {
        const { ...rest } = props;

        return <WrappedComponent {...(rest as P)} minDate={minDate} maxDate={maxDate} />;
    };
