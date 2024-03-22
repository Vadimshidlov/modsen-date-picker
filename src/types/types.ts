import React, { ChangeEvent, ReactNode } from "react";
import { SET_FIRST_CALENDAR_DATE } from "@/constants";

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
    weekStartsOnSunday: boolean;
    dateValue: string;
    dateSecondValue: string;
    dateCalendarValue: string;
    dispatch: React.Dispatch<DatePickerActionsType>;
    weekMode: boolean;
    minDate: Date;
    maxDate: Date;
    withRange: boolean;
};

export type CalendarDayButtonPropsType = {
    type: string;
    text: string;
    isInnerDay?: boolean;
    onClick?: () => void;
    onDoubleClick?: () => void;
};

export type CalendarWeekModePropsType = {
    weekStartsOnSunday: boolean;
    dateValue: string;
    dateSecondValue: string;
    dateCalendarValue: string;
    dispatch: React.Dispatch<DatePickerActionsType>;
    minDate: Date;
    maxDate: Date;
    withRange: boolean;
    handleOpenTodo: (calendarItem: CalendarItemsType) => void;
};

export type CalendarYearModePropsType = {
    weekStartsOnSunday: boolean;
    dateValue: string;
    dateSecondValue: string;
    dateCalendarValue: string;
    dispatch: React.Dispatch<DatePickerActionsType>;
    minDate: Date;
    maxDate: Date;
    withRange: boolean;
    handleOpenTodo: (calendarItem: CalendarItemsType) => void;
};

export type ChangeRangeDatePropsType = {
    calendarItem: CalendarItemsType;
    dispatch: (value: DatePickerActionsType) => void;
    dayNumber: number | undefined;
    monthNumber: number | undefined;
    yearNumber: number | undefined;
    secondYearNumber: number | undefined;
    secondMonthNumber: number | undefined;
    secondDayNumber: number | undefined;
};

export type DateInputProps = {
    value: string;
    dateRangeFirstValue: string;
    dateRangeSecondValue: string;
    setIsShowCalendar: (value: React.SetStateAction<boolean>) => void;
    dispatch: React.Dispatch<DatePickerActionsType>;
    minDate: Date;
    maxDate: Date;
    isWithRange: boolean;
    isFirstDate: boolean;
};

export type DateRangeFirstActionType = {
    type: "SET_CALENDAR_AND_PICKER_DATE";
    payload: {
        dateValue: string;
        dateRangeFirstValue: string;
        calendarValue?: string;
    };
};

export type SetFirstCalendarDateActionType = {
    type: "SET_FIRST_CALENDAR_DATE";
    payload: {
        dateValue: string;
        dateRangeFirstValue: string;
        calendarValue?: string;
    };
};

export type DateRangeSecondActionType = {
    type: "SET_SECOND_CALENDAR_DATE";
    payload: {
        dateValue: string;
        dateRangeSecondValue: string;
        calendarValue?: string;
    };
};

export type DatePickerActionType = {
    type: // | "SET_FIRST_CALENDAR_DATE"
    // | "SET_SECOND_CALENDAR_DATE"
    // | "SET_CALENDAR_AND_PICKER_DATE"
    | "CLEAR_SECOND_CALENDAR_DATE"
        | "СLEAR_CALENDAR_AND_PICKER_DATE"
        | "СLEAR_PICKER_DATES"
        | "SET_TODO_DATE"
        | "SET_CALENDAR_DATE";
    payload: {
        dateValue: string;
        calendarValue?: string;
    };
};

export type DatePickerClearActionType = {
    type: "СLEAR_PICKER_DATES" | "CLEAR_FIRST_PICKER_DATE" | "CLEAR_TODO_DATE";
};

export type DatePickerActionsType =
    | SetFirstCalendarDateActionType
    | DatePickerActionType
    | DateRangeSecondActionType
    | DateRangeFirstActionType
    | DatePickerClearActionType;

export type CalendarItemsType = {
    year: number;
    month: number;
    date: number;
};

export type DatePickerStateType = {
    datePickerFirstValue: string;
    datePickerSecondValue?: string;
    calendarValue: string;
};

export type DayButtonPropsType = {
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
    color?: string;
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

export type TodoFormPropsType = {
    todoTitle: string;
    handleAddTodoText: (e: ChangeEvent<HTMLInputElement>) => void;
    handleAddTodo: () => void;
};

export type TodoItemPropsType = {
    todoItem: TodoDataType;
    todoItemDate: string;
    handleChangeTodoStatus: (todoDate: string, todoId: string) => void;
    handleRemoveTodo: (todoDate: string, todoId: string) => void;
};

export type TodoListPropsType = {
    todoItemDate: string;
    todos: TodoDataType[];
    handleChangeTodoStatus: (todoDate: string, todoId: string) => void;
    handleRemoveTodo: (todoDate: string, todoId: string) => void;
};

export type TodoModalPropsType = {
    todoItemDate: string;
    dispatch: React.Dispatch<DatePickerActionType | DatePickerClearActionType>;
};

export type TodoDataType = {
    title: string;
    completed: boolean;
    id: string;
};

export type TodoStorageType = {
    date: string;
    todos: TodoDataType[];
};

export type DatePickerPropsType = {
    weekStartsOnSunday: boolean;
    withRange: boolean;
    weekMode: boolean;
    minDate: Date;
    maxDate: Date;
};
