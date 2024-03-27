import * as React from "react";
import { ComponentType, FC } from "react";
import { DatePickerPropsType } from "@/types";

export const withWeekSunday =
    <P extends DatePickerPropsType>(
        WrappedComponent: ComponentType<P>,
    ): FC<Omit<P, "weekStartsOnSunday">> =>
    (props: Omit<P, "weekStartsOnSunday">) => {
        const { ...rest } = props;

        return <WrappedComponent {...(rest as P)} weekMode />;
    };
