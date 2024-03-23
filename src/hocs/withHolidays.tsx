import React, { ComponentType, FC } from "react";
import { HolidaysListType } from "@/constants/calendar";

export const withHolidays =
    (holidaysList: HolidaysListType[]) =>
    <P extends object>(
        WrappedComponent: ComponentType<P & { holidaysList: HolidaysListType[] }>,
    ): FC<Omit<P, "minDate" | "maxDate">> =>
    (props: Omit<P, "minDate" | "maxDate">) => {
        const { ...rest } = props;

        return <WrappedComponent {...(rest as P)} withHolidays holidaysList={holidaysList} />;
    };
