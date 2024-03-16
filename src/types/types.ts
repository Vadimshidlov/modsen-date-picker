import { ReactNode } from "react";
import { CalendarItemsType } from "@/components/DatePicker/DatePicker";

export type ButtonPropsType = {
    direction?: "row" | "column";
    align?: "flex-start" | "flex-end" | "center" | "stretch";
    justify?:
        | "flex-start"
        | "flex-end"
        | "center"
        | "space-between"
        | "space-around"
        | "space-evenly";
    margin?: string;
    border?: string;
    borderRadius?: string;
    padding?: string;
    width?: string;
    maxWidth?: string;
    minWidth?: string;
    height?: string;
    rowGap?: string;
    columnGap?: string;
    children: ReactNode;
};

export type CalendarPropsType = {
    // calendarItems: CalendarItemsType[];
    weekStartsOnSunday: boolean;
    dateValue: string;
    // calendarValue: string;
    handleSetDate: (dateValue: string) => void;
    // handlePrevYear: () => void;
    // handleNextYear: () => void;
    // handlePrevMonth: () => void;
    // handleNextMonth: () => void;
};
