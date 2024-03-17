import { ChangeEvent, useReducer, useState } from "react";
import { DatePickerStyled } from "@/components/DatePicker/DatePicker.styled";
import { DateInput } from "@/components/DateInput/index";
import { Flex } from "@/components/Flex/index";
import { GlobalStyles } from "@/components/GlobalStyle/index";
import { Calendar } from "@/components/Calendar";

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

const WITH_RANGE = false;

const initialPickerState = {
    datePickerFirstValue: "",
    datePickerSecondValue: "",
    calendarValue: "",
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
        | "SET_CALENDAR_DATE";
    payload: {
        dateValue: string;
    };
};

const reducer = (state = initialPickerState, action: DatePickerActionType) => {
    switch (action.type) {
        case "SET_FIRST_CALENDAR_DATE":
            console.log({ ...state, datePickerFirstValue: action.payload.dateValue });

            return { ...state, datePickerFirstValue: action.payload.dateValue };
        case "SET_SECOND_CALENDAR_DATE":
            console.log({
                ...state,
                datePickerSecondValue: action.payload.dateValue,
            });

            return {
                ...state,
                datePickerSecondValue: action.payload.dateValue,
            };
        case "SET_CALENDAR_DATE":
            console.log({
                ...state,
                calendarValue: action.payload.dateValue,
            });

            return {
                ...state,
                calendarValue: action.payload.dateValue,
            };
        case "SET_CALENDAR_AND_PICKER_DATE":
            console.log({
                ...state,
                datePickerFirstValue: action.payload.dateValue,
                calendarValue: action.payload.dateValue,
            });

            return {
                ...state,
                datePickerFirstValue: action.payload.dateValue,
                calendarValue: action.payload.dateValue,
            };
        default:
            return state;
    }
};

// export function DatePicker({minValue, maxValue, reversWeek, weekMode, withRange}) {
export function DatePicker() {
    const [isShowCalendar, setIsShowCalendar] = useState(false);
    const [weekStartsOnSunday] = useState(false);
    const [pickerState, dispatch] = useReducer(reducer, initialPickerState);

    return (
        <DatePickerStyled>
            <GlobalStyles />
            <Flex margin="20px 0px 0px 0px">
                <DateInput
                    dispatch={dispatch}
                    value={pickerState.datePickerFirstValue}
                    // handleClearInput={handleClearInput}
                    // handleInputChange={handleInputChange}
                    setIsShowCalendar={setIsShowCalendar}
                />
            </Flex>
            {isShowCalendar && (
                <Calendar
                    // weekStartsOnSunday={weekStartsOnSunday}
                    weekStartsOnSunday
                    dateValue={pickerState.datePickerFirstValue}
                    dateCalendarValue={pickerState.calendarValue}
                    // handleSetDate={handleSetDate}
                    dispatch={dispatch}
                    // weekMode={false}
                    weekMode
                />
            )}
        </DatePickerStyled>
    );
}
