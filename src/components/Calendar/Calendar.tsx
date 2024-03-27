import * as React from "react";
import { CalendarItemsType, CalendarPropsType } from "@/types";
import { CalendarYearMode } from "@/components/Calendar/CalendarYearMode";
import { CalendarWeekMode } from "@/components/Calendar/CalendarWeekMode";
import { getDateValueFromCalendarItem } from "@/utils/date";
import { SET_TODO_DATE } from "@/constants";

export function Calendar({
    weekStartsOnSunday,
    dateValue,
    dateSecondValue,
    dateCalendarValue,
    dispatch,
    weekMode,
    minDate,
    maxDate,
    withRange,
    withHolidays,
    holidaysList,
}: CalendarPropsType) {
    const handleOpenTodo = (calendarItem: CalendarItemsType) => {
        dispatch({
            type: SET_TODO_DATE,
            payload: {
                dateValue: getDateValueFromCalendarItem(calendarItem),
            },
        });
    };

    return weekMode ? (
        <CalendarWeekMode
            handleOpenTodo={handleOpenTodo}
            weekStartsOnSunday={weekStartsOnSunday}
            dateValue={dateValue}
            dateSecondValue={dateSecondValue}
            dateCalendarValue={dateCalendarValue}
            dispatch={dispatch}
            minDate={minDate}
            maxDate={maxDate}
            withRange={withRange}
            withHolidays={withHolidays}
            holidaysList={holidaysList}
        />
    ) : (
        <CalendarYearMode
            handleOpenTodo={handleOpenTodo}
            weekStartsOnSunday={weekStartsOnSunday}
            dateValue={dateValue}
            dateSecondValue={dateSecondValue}
            dateCalendarValue={dateCalendarValue}
            dispatch={dispatch}
            minDate={minDate}
            maxDate={maxDate}
            withRange={withRange}
            withHolidays={withHolidays}
            holidaysList={holidaysList}
        />
    );
}
