import * as React from "react";
import { ComponentType, FC } from "react";
import { DatePickerPropsType } from "@/types";

export const withRange =
    <P extends DatePickerPropsType>(WrappedComponent: ComponentType<P>): FC<Omit<P, "withRange">> =>
    (props: Omit<P, "withRange">) => {
        const { ...rest } = props;

        return <WrappedComponent {...(rest as P)} {...props} withRange />;
    };
