import * as React from "react";
import { ComponentType, FC } from "react";
import { DatePickerPropsType } from "@/types";

export const withWeekMode =
    <P extends DatePickerPropsType>(WrappedComponent: ComponentType<P>): FC<Omit<P, "weekMode">> =>
    (props: Omit<P, "weekMode">) => {
        const { ...rest } = props;

        return <WrappedComponent {...(rest as P)} weekMode />;
    };
