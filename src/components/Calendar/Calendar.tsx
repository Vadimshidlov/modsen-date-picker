/* eslint-disable react/no-array-index-key */
import { MouseEvent } from "react";
import { CalendarPropsType } from "@/types";
import { CalendarYearMode } from "@/components/Calendar/CalendarYearMode";
import { CalendarWeekMode } from "@/components/Calendar/CalendarWeekMode";
import { CalendarItemsType } from "@/components/DatePicker/DatePicker";
import { getDateValueFromCalendarItem } from "@/utils/date";

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
}: CalendarPropsType) {
    const handleOpenTodo = (event: MouseEvent, calendarItem: CalendarItemsType) => {
        event.preventDefault();

        dispatch({
            type: "SET_TODO_DATE",
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
        />
    );
}
