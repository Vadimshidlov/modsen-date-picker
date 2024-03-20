import React, { ChangeEvent, useReducer, useState } from "react";
import { DatePickerStyled } from "@/components/DatePicker/DatePicker.styled";
import { DateInput } from "@/components/DateInput/index";
import { Flex } from "@/components/Flex/index";
import { GlobalStyles } from "@/components/GlobalStyle/index";
import { Calendar } from "@/components/Calendar";
import { Text } from "@/components/Text/index";
import { ClearButton } from "@/components/Button/Button";
import { TodoModal } from "@/components/TodoModal";

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

export const getCurrentDate = (): string => {
    const currentDate = new Date();
    const day =
        currentDate.getDate() < 10 ? `0${currentDate.getDate()}` : `${currentDate.getDate()}`;
    const month =
        currentDate.getMonth() + 1 < 10
            ? `0${currentDate.getMonth() + 1}`
            : `${currentDate.getMonth() + 1}`;
    const year = currentDate.getFullYear();

    return `${day}/${month}/${year}`;
};

const initialPickerState = {
    datePickerFirstValue: "",
    datePickerSecondValue: "",
    calendarValue: getCurrentDate(),
    todoItemDate: "",
};

const getInitialState = (): DatePickerStateType => ({
    datePickerFirstValue: "",
    datePickerSecondValue: "",
    calendarValue: "",
});

export type DatePickerActionType = {
    type:
        | "SET_FIRST_CALENDAR_DATE"
        | "SET_SECOND_CALENDAR_DATE"
        | "SET_CALENDAR_AND_PICKER_DATE"
        | "CLEAR_SECOND_CALENDAR_DATE"
        | "СLEAR_CALENDAR_AND_PICKER_DATE"
        | "СLEAR_PICKER_DATES"
        | "SET_TODO_DATE"
        | "SET_CALENDAR_DATE";
    payload: {
        dateValue: string;
    };
};

export type DatePickerClearActionType = {
    type: "СLEAR_PICKER_DATES" | "CLEAR_FIRST_PICKER_DATE" | "CLEAR_TODO_DATE";
};

const reducer = (
    state = initialPickerState,
    action: DatePickerActionType | DatePickerClearActionType,
) => {
    switch (action.type) {
        case "SET_FIRST_CALENDAR_DATE":
            return { ...state, datePickerFirstValue: action.payload.dateValue };
        case "SET_SECOND_CALENDAR_DATE":
            return {
                ...state,
                datePickerSecondValue: action.payload.dateValue,
            };
        case "CLEAR_SECOND_CALENDAR_DATE":
            return {
                ...state,
                datePickerSecondValue: "",
            };
        case "SET_CALENDAR_DATE":
            return {
                ...state,
                calendarValue: action.payload.dateValue,
            };
        case "SET_CALENDAR_AND_PICKER_DATE":
            if (action.payload.dateValue.length < 10) {
                return {
                    ...state,
                    datePickerFirstValue: action.payload.dateValue,
                };
            }

            return {
                ...state,
                datePickerFirstValue: action.payload.dateValue,
                calendarValue:
                    action.payload.dateValue === "" ? getCurrentDate() : action.payload.dateValue,
            };
        case "СLEAR_CALENDAR_AND_PICKER_DATE":
            return {
                ...state,
                datePickerFirstValue: "",
                // calendarValue: state.datePickerFirstValue,
            };
        case "CLEAR_FIRST_PICKER_DATE":
            return {
                ...state,
                datePickerFirstValue: "",
            };
        case "СLEAR_PICKER_DATES":
            return {
                ...state,
                datePickerFirstValue: "",
                datePickerSecondValue: "",
            };
        case "SET_TODO_DATE":
            return {
                ...state,
                todoItemDate: action.payload.dateValue,
                // calendarValue: state.datePickerFirstValue,
            };
        case "CLEAR_TODO_DATE":
            console.log({
                ...state,
                todoItemDate: "",
            });

            return {
                ...state,
                todoItemDate: "",
            };
        default:
            return state;
    }
};

export type DatePickerPropsType = {
    weekStartsOnSunday: boolean;
    withRange: boolean;
    weekMode: boolean;
    minDate: Date;
    maxDate: Date;
};

export function DatePicker({
    weekStartsOnSunday,
    withRange,
    weekMode,
    minDate,
    maxDate,
}: DatePickerPropsType) {
    const [isShowCalendar, setIsShowCalendar] = useState(false);
    const [pickerState, dispatch] = useReducer(reducer, initialPickerState);
    const [isOpenModal, setIsOpenModal] = useState(false);

    const handleClearPicker = () => {
        if (withRange) {
            dispatch({ type: "СLEAR_PICKER_DATES" });
        } else {
            dispatch({ type: "CLEAR_FIRST_PICKER_DATE" });
        }
    };

    return (
        <DatePickerStyled>
            <GlobalStyles />
            <Flex margin="20px 0px 0px 0px" direction="column">
                {withRange && <Text>From:</Text>}
                <DateInput
                    dispatch={dispatch}
                    value={pickerState.datePickerFirstValue}
                    setIsShowCalendar={setIsShowCalendar}
                    minDate={minDate}
                    maxDate={maxDate}
                    isWithRange={withRange}
                    isFirstDate
                />

                {withRange && (
                    <>
                        <Text>To:</Text>
                        <DateInput
                            dispatch={dispatch}
                            // dispatch={dispatch}
                            value={pickerState.datePickerSecondValue}
                            setIsShowCalendar={setIsShowCalendar}
                            minDate={minDate}
                            maxDate={maxDate}
                            isWithRange={withRange}
                            isFirstDate={false}
                        />
                    </>
                )}
            </Flex>
            {isShowCalendar && (
                <Flex direction="column">
                    <Calendar
                        weekStartsOnSunday={weekStartsOnSunday}
                        dateValue={pickerState.datePickerFirstValue}
                        dateSecondValue={pickerState.datePickerSecondValue}
                        dateCalendarValue={pickerState.calendarValue}
                        dispatch={dispatch}
                        weekMode={weekMode}
                        minDate={minDate}
                        maxDate={maxDate}
                        withRange={withRange}
                    />
                    <ClearButton onClick={handleClearPicker}>Clear</ClearButton>
                </Flex>
            )}
            {pickerState.todoItemDate && (
                <TodoModal todoItemDate={pickerState.todoItemDate} dispatch={dispatch} />
            )}
        </DatePickerStyled>
    );
}
