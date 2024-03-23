import React, { ComponentType, FC } from "react";
// import { DatePickerPropsType } from "@/types";
// export type withMinMaxDatePropsType = {
//     minDate?: Date;
//     maxDate?: Date;
// };

// export const withMinMaxDate = <P extends DatePickerPropsType>(
//     WrappedComponent: ComponentType<P>,
// ): FC<P & withMinMaxDatePropsType> => {
//     const ComponentWithMinMaxDate: FC<P & withMinMaxDatePropsType> = (props) => {
//         const { minDate: propMinDate, maxDate: propMaxDate, ...rest } = props;
//
//         const minDate = propMinDate || new Date(2021, 0, 1);
//         const maxDate = propMaxDate || new Date(2025, 0, 1);
//
//         return <WrappedComponent {...(rest as P)} minDate={minDate} maxDate={maxDate} withRange />;
//     };
//
//     return ComponentWithMinMaxDate;
// };

export const withMinMaxDate =
    (minDate: Date, maxDate: Date) =>
    <P extends object>(
        WrappedComponent: ComponentType<P & { minDate: Date; maxDate: Date }>,
    ): FC<Omit<P, "minDate" | "maxDate">> =>
    (props: Omit<P, "minDate" | "maxDate">) => {
        const { ...rest } = props;

        return <WrappedComponent {...(rest as P)} minDate={minDate} maxDate={maxDate} />;
    };
