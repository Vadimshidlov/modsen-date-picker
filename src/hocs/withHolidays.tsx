import * as React from "react";
import { ComponentType, FC } from "react";
import { HolidaysListType } from "@/constants/calendar";
import { DatePickerPropsType } from "@/types";

export const withHolidays =
    (holidaysList: HolidaysListType[]) =>
    <P extends DatePickerPropsType>(
        WrappedComponent: ComponentType<P>,
    ): FC<Omit<P, "withHolidays" | "holidaysList">> =>
    (props: Omit<P, "withHolidays" | "holidaysList">) => {
        const { ...rest } = props;

        return <WrappedComponent {...(rest as P)} withHolidays holidaysList={holidaysList} />;
    };
