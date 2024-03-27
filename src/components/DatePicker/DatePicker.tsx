import * as React from "react";
import { useReducer, useState } from "react";
import { DatePickerFormContainer, DatePickerStyled } from "@/components/DatePicker/index";
import { DateInput } from "@/components/DateInput/index";
import { Flex } from "@/components/Flex/index";
import { Calendar } from "@/components/Calendar";
import { Text } from "@/components/Text/index";
import { ClearButton } from "@/components/Button/Button";
import { TodoModal } from "@/components/TodoModal";
import { getCurrentDate } from "@/utils/date/index";
import { DatePickerPropsType } from "@/types";
import {
    CLEAR_FIRST_PICKER_DATE,
    CLEAR_SECOND_CALENDAR_DATE,
    CLEAR_TODO_DATE,
    DEFAULT_HOLIDAYS,
    SET_CALENDAR_AND_PICKER_DATE,
    SET_CALENDAR_DATE,
    SET_FIRST_CALENDAR_DATE,
    SET_SECOND_CALENDAR_DATE,
    SET_TODO_DATE,
    THEME,
    СLEAR_CALENDAR_AND_PICKER_DATE,
    СLEAR_PICKER_DATES,
} from "@/constants";
import { DatePickerActionsType } from "@/types/types";
import { TodoTooltip } from "@/components/TodoTooltip/index";
import { ErrorBoundary } from "@/components/ErrorBoundary/index";
import { ThemeWrapper } from "@/components/ThemeWrapper";

const initialPickerState = {
    datePickerFirstValue: "",
    datePickerSecondValue: "",
    dateRangeFirstValue: "",
    dateRangeSecondValue: "",
    calendarValue: getCurrentDate(),
    todoItemDate: "",
};

const reducer = (state = initialPickerState, action: DatePickerActionsType) => {
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
            if (action.payload.dateRangeFirstValue.length < 10) {
                return {
                    ...state,
                    datePickerFirstValue: action.payload.dateValue,
                    dateRangeFirstValue: action.payload.dateRangeFirstValue,
                };
            }

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
            return {
                ...state,
                datePickerFirstValue: "",
                dateRangeFirstValue: "",
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
    withHolidays,
    holidaysList = DEFAULT_HOLIDAYS,
}: DatePickerPropsType) {
    const [isShowCalendar, setIsShowCalendar] = useState(false);
    const [pickerState, dispatch] = useReducer(reducer, initialPickerState);

    const handleClearPicker = () => {
        if (withRange) {
            dispatch({ type: СLEAR_PICKER_DATES });
        } else {
            dispatch({ type: CLEAR_FIRST_PICKER_DATE });
        }
    };

    return (
        <ThemeWrapper theme={THEME}>
            <ErrorBoundary>
                <DatePickerStyled>
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
                        <Flex>
                            <TodoTooltip />
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
                                withHolidays={withHolidays}
                                holidaysList={holidaysList}
                            />
                            <ClearButton onClick={handleClearPicker}>Clear</ClearButton>
                        </Flex>
                    )}
                    {pickerState.todoItemDate && (
                        <TodoModal todoItemDate={pickerState.todoItemDate} dispatch={dispatch} />
                    )}
                </DatePickerStyled>
            </ErrorBoundary>
        </ThemeWrapper>
    );
}
