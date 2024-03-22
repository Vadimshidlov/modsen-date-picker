import React, { useReducer, useState } from "react";
import { DatePickerFormContainer, DatePickerStyled } from "@/components/DatePicker/index";
import { DateInput } from "@/components/DateInput/index";
import { Flex } from "@/components/Flex/index";
import { GlobalStyles } from "@/components/GlobalStyle/index";
import { Calendar } from "@/components/Calendar";
import { Text } from "@/components/Text/index";
import { ClearButton } from "@/components/Button/Button";
import { TodoModal } from "@/components/TodoModal";
import { getCurrentDate } from "@/utils/date/index";
import { DatePickerActionType, DatePickerClearActionType, DatePickerPropsType } from "@/types";
import {
    CLEAR_FIRST_PICKER_DATE,
    CLEAR_SECOND_CALENDAR_DATE,
    CLEAR_TODO_DATE,
    SET_CALENDAR_AND_PICKER_DATE,
    SET_CALENDAR_DATE,
    SET_FIRST_CALENDAR_DATE,
    SET_SECOND_CALENDAR_DATE,
    SET_TODO_DATE,
    СLEAR_CALENDAR_AND_PICKER_DATE,
    СLEAR_PICKER_DATES,
} from "@/constants";
import {
    DateRangeSecondActionType,
    DateRangeFirstActionType,
    DatePickerActionsType,
} from "@/types/types";

const initialPickerState = {
    datePickerFirstValue: "",
    datePickerSecondValue: "",
    dateRangeFirstValue: "",
    dateRangeSecondValue: "",
    calendarValue: getCurrentDate(),
    todoItemDate: "",
};

const reducer = (
    state = initialPickerState,
    action: // | DatePickerActionType
    // | DatePickerClearActionType
    // DateRangeSecondActionType | DateRangeFirstActionType,
    DatePickerActionsType,
) => {
    switch (action.type) {
        case SET_FIRST_CALENDAR_DATE:
            return {
                ...state,
                datePickerFirstValue: action.payload.dateValue,
                dateRangeFirstValue: action.payload.dateRangeFirstValue,
            };
        case SET_SECOND_CALENDAR_DATE:
            return {
                ...state,
                datePickerSecondValue: action.payload.dateValue,
                dateRangeSecondValue: action.payload.dateRangeSecondValue,
            };
        case CLEAR_SECOND_CALENDAR_DATE:
            return {
                ...state,
                datePickerSecondValue: "",
                dateRangeSecondValue: "",
            };
        case SET_CALENDAR_DATE:
            return {
                ...state,
                calendarValue: action.payload.dateValue,
            };
        case SET_CALENDAR_AND_PICKER_DATE:
            return {
                ...state,
                datePickerFirstValue: action.payload.dateValue,
                dateRangeFirstValue: action.payload.dateRangeFirstValue,
                calendarValue:
                    action.payload.dateRangeFirstValue === ""
                        ? getCurrentDate()
                        : action.payload.dateRangeFirstValue,
            };
        case СLEAR_CALENDAR_AND_PICKER_DATE:
            console.log("СLEAR_CALENDAR_AND_PICKER_DATE case");

            return {
                ...state,
                datePickerFirstValue: "",
                dateRangeFirstValue: "",
                // calendarValue: "",
            };
        case CLEAR_FIRST_PICKER_DATE:
            return {
                ...state,
                datePickerFirstValue: "",
                dateRangeFirstValue: "",
            };
        case СLEAR_PICKER_DATES:
            return {
                ...state,
                datePickerFirstValue: "",
                datePickerSecondValue: "",
                dateRangeFirstValue: "",
                dateRangeSecondValue: "",
            };
        case SET_TODO_DATE:
            return {
                ...state,
                todoItemDate: action.payload.dateValue,
            };
        case CLEAR_TODO_DATE:
            return {
                ...state,
                todoItemDate: "",
            };
        default:
            return state;
    }
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

    console.log(pickerState);

    const handleClearPicker = () => {
        if (withRange) {
            dispatch({ type: СLEAR_PICKER_DATES });
        } else {
            dispatch({ type: CLEAR_FIRST_PICKER_DATE });
        }
    };

    return (
        <DatePickerStyled>
            <GlobalStyles />
            <DatePickerFormContainer>
                {withRange && <Text>From:</Text>}
                <DateInput
                    dispatch={dispatch}
                    value={pickerState.datePickerFirstValue}
                    dateRangeFirstValue={pickerState.dateRangeFirstValue}
                    dateRangeSecondValue={pickerState.dateRangeSecondValue}
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
                            value={pickerState.datePickerSecondValue}
                            dateRangeFirstValue={pickerState.dateRangeFirstValue}
                            dateRangeSecondValue={pickerState.dateRangeSecondValue}
                            setIsShowCalendar={setIsShowCalendar}
                            minDate={minDate}
                            maxDate={maxDate}
                            isWithRange={withRange}
                            isFirstDate={false}
                        />
                    </>
                )}
            </DatePickerFormContainer>
            {isShowCalendar && (
                <Flex direction="column">
                    <Calendar
                        weekStartsOnSunday={weekStartsOnSunday}
                        dateValue={pickerState.dateRangeFirstValue}
                        dateSecondValue={pickerState.dateRangeSecondValue}
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
